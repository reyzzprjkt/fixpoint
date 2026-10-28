# Tinjauan Keamanan & Strategi Pengujian Backend Servis FixPoint

- **Status:** Perencanaan Keamanan / PROPOSED
- **Tujuan:** Menetapkan kontrol mitigasi risiko dan blueprint pengujian sebelum satu baris kode backend ditulis.

---

## 1. Pemisahan Persyaratan: Disetujui vs Rekomendasi Teknis Baru

| Aspek | Disetujui Owner (Final) | Rekomendasi Teknis Baru (PROPOSED / Perlu Review) |
|---|---|---|
| **Role Sistem** | Owner, Admin, Kasir (Kasir di luar MVP) | Pemetaan granular permission string (mis: `ticket:read`, `ticket:create`) |
| **Auth Provider** | Better Auth (ADR-002) | Pola singleton adapter Prisma untuk Better Auth |
| **MFA** | Wajib untuk Owner & Admin (ADR-002) | Enforcement grace period / alur force-setup saat first login |
| **Batas Sesi** | Absolut 8 jam, Idle 30 menit (ADR-002) | Header `X-Last-Activity` dan middleware session refresh window |
| **Tracking Publik** | Wajib Nomor Tiket + Secret Token (ADR-001) | Algoritma hashing token (SHA-256 salted) + rate limit 5 req/menit |
| **Audit Log** | Owner full, Admin read-only with permit (ADR-002) | PostgreSQL Trigger untuk blokir `UPDATE` & `DELETE` di level SQL |
| **Status Tiket** | 9 status resmi (`RECEIVED` s/d `CANCELLED`) | Matriks transisi status legal (State Machine table) |

*Perhatian: Tidak ada proteksi di kolom kanan yang boleh diklaim sudah aktif sebelum kode implementasi dan testing dijalankan.*

---

## 2. Blueprint Keamanan Spesifik

### 2.1 Validasi Input Server-Side & Anti-IDOR
- Seluruh endpoint API Route / Server Action wajib memvalidasi input menggunakan schema validator (Zod / native TypeScript assert).
- Jangan pernah mempercayai parameter ID dari URL (`ticketId`, `customerId`). Selalu validasi bahwa:
  - User internal memiliki role/permission yang sah untuk mengakses resource tersebut.
  - Sesi publik hanya bisa membaca tiket jika token cocok secara kriptografis (*constant-time compare*).

### 2.2 Pencegahan Privilege Escalation
- Endpoint update profile / user dilarang menerima mutasi field `role` secara mass assignment.
- Verifikasi mutasi role hanya diizinkan di endpoint terpisah yang dipagari guard ketat `requireRole(['OWNER'])`.

### 2.3 Perlindungan Endpoint Tracking Publik
- **Anti-Enumerasi:** Respons untuk "Tiket tidak ditemukan" dan "Token salah" dibuat identik (misal: HTTP 404 "Informasi tiket tidak ditemukan atau token tidak valid").
- **Rate Limiting:** Terapkan pembatasan per alamat IP (maksimum 5 request per menit untuk endpoint `/api/tickets/track`).
- **Penyimpanan Token:** Secret token tidak disimpan dalam teks polos (plaintext). Simpan hanya representasi hash-nya di database.

### 2.4 Integritas Audit Log (Append-Only)
- Tabel `audit_logs` hanya memiliki operasi `INSERT` dan `SELECT`.
- Di PostgreSQL, terapkan trigger atau cabut hak akses `UPDATE` dan `DELETE` dari user aplikasi untuk tabel ini:
  ```sql
  REVOKE UPDATE, DELETE ON TABLE audit_logs FROM fixpoint_app_user;
  ```

---

## 3. Strategi Pengujian (Testing Strategy)

Untuk menghindari keharusan memasang framework test raksasa sebelum dibutuhkan, pengujian backend dibagi menjadi 3 tingkat sederhana dan terisolasi:

1. **Assert-Based Unit Test (Zero Dependency):**
   - Menggunakan modul bawaan Node.js `node:assert` dan `node:test`.
   - Menguji logika transisi status tiket, parsing nomor tiket, validasi batas idle timeout, dan kalkulasi biaya servis.
2. **Integration API Tests (Database Isolated):**
   - Menjalankan instance PostgreSQL lokal khusus test (`fixpoint_test`).
   - Menguji transaksi Better Auth, skenario login Owner (MFA aktif), penolakan Admin saat mengubah role, dan pembuatan tiket.
3. **Security Boundary Verification:**
   - Script otomatis untuk mencoba menembus endpoint publik tanpa secret token.
   - Script untuk mencoba melakukan SQL injection / mass assignment pada input keluhan tiket.

---

## 4. Rencana Pemulihan & Backup Database

- **Backup Rutin Dev:** Script dump PostgreSQL sederhana (`pg_dump -Fc fixpoint_dev > backup.dump`).
- **Migration Failure Recovery:** Jika migrasi Prisma gagal di tengah jalan, terapkan forward fix atau bersihkan schema test menggunakan script rollback yang terdokumentasi. Jangan pernah memanipulasi riwayat tabel `_prisma_migrations` secara serampangan.
