# Roadmap Implementasi Backend Servis FixPoint (Bertahap & Terisolasi)

- **Status:** Perencanaan / PROPOSED (Menunggu Persetujuan Owner)
- **Prinsip Utama:** Step-by-step; setiap tahap harus memiliki testing mandiri dan evidence sebelum lanjut ke tahap berikutnya. Tidak ada kode spekulatif.

---

## Urutan Dependensi Implementasi (10 Tahap)

```
[1. DB Foundation & Prisma Setup]
                │
                ▼
[2. Better Auth Core & Next.js Mount]
                │
                ▼
[3. MFA Plugin & Enrollment/Recovery Flow]
                │
                ▼
[4. Dual Session Timeout Enforcement (8h / 30m)]
                │
                ▼
[5. Server-side Authorization & Guard (Owner vs Admin)]
                │
                ▼
[6. Owner-Only User & Account Management API]
                │
                ▼
[7. Append-Only Audit Logging Subsystem]
                │
                ▼
[8. Ticket Lifecycle & 9 Status Machine]
                │
                ▼
[9. Public Tracking API (Token Hashing & Rate Limiting)]
                │
                ▼
[10. Integration Testing, E2E Security & Deployment Prep]
```

---

## Detail Tahapan

### Tahap 1: Database Foundation & Prisma Migration Strategy
- **Tujuan:** Siapkan koneksi PostgreSQL lokal, skema Prisma awal, migration runner, dan Prisma client singleton.
- **Dependensi:** Konfirmasi owner untuk Prisma ORM; instalasi `prisma`, `@prisma/client`.
- **Risiko:** Exhaustion connection pool pada Next.js dev server jika singleton tidak diterapkan.
- **Kriteria Penerimaan (DoD):**
  - Migrasi awal sukses dijalankan di PostgreSQL lokal.
  - Skema memuat tabel dasar relasional sesuai model konseptual.
  - Script test koneksi mandiri (Node script / assert) berhasil query DB.
- **Bukti Diperlukan:** Log eksekusi `prisma migrate`, screenshot/log tabel terbuat di Postgres.
- **Keputusan Owner Diperlukan:** Persetujuan adopsi Prisma ORM.

### Tahap 2: Better Auth Core & Next.js App Router Integration
- **Tujuan:** Mount Better Auth handler di `/api/auth/[...all]`, integrasi `prismaAdapter`, konfigurasi session cookies.
- **Dependensi:** Tahap 1 selesai.
- **Risiko:** Cookie path mismatch pada Next.js subroutes atau server action cookies handling.
- **Kriteria Penerimaan (DoD):**
  - Endpoint `/api/auth/sign-in/email` dan `/api/auth/sign-out` berfungsi.
  - Sesi tersimpan di tabel `sessions` DB.
  - Password hashing standar industri (Argon2id/Scrypt bawaan Better Auth).
- **Bukti Diperlukan:** HTTP test script / curl log login sukses dan session cookie terbit.
- **Keputusan Owner Diperlukan:** Tidak ada (sudah diputuskan di ADR-002).

### Tahap 3: MFA (2FA) & Recovery Flow
- **Tujuan:** Aktifkan plugin `twoFactor` Better Auth untuk peran Owner dan Admin secara wajib.
- **Dependensi:** Tahap 2 selesai.
- **Risiko:** Admin/Owner terkunci keluar akun (*lockout*) jika orientasi MFA belum selesai saat user dibuat.
- **Kriteria Penerimaan (DoD):**
  - User Owner/Admin wajib melewati TOTP verification sebelum session aktif.
  - Backup codes ter-generate saat setup MFA.
  - Skenario login tanpa 2FA ditolak bagi role Owner/Admin.
- **Bukti Diperlukan:** Test flow login -> 2FA challenge -> verify TOTP -> session diterbitkan; verifikasi penggunaan backup code.
- **Keputusan Owner Diperlukan:** Kebijakan pemulihan jika user kehilangan device dan backup code (misal reset manual oleh Owner langsung via DB/khusus).

### Tahap 4: Dual Session Timeout Enforcement (8 Jam Absolut & 30 Menit Idle)
- **Tujuan:** Terapkan aturan sesi ADR-002: absolut 8 jam, idle timeout 30 menit.
- **Dependensi:** Tahap 2 & 3 selesai.
- **Risiko:** Asumsi bahwa Better Auth otomatis menangani kedua limit tanpa kode kustom.
- **Kriteria Penerimaan (DoD):**
  - Sesi otomatis ditolak jika idle > 30 menit meskipun cookie masih ada.
  - Sesi otomatis dipaksa logout/revoked jika total usia login > 8 jam, meskipun terus aktif.
  - Middleware / server guard memvalidasi kedua batas ini pada setiap request terproteksi.
- **Bukti Diperlukan:** Unit/integration test manipulasi timestamp sesi untuk simulasi idle > 30m dan age > 8h.
- **Keputusan Owner Diperlukan:** Tidak ada (aturan disetujui di ADR-002).

### Tahap 5: Server-side Authorization & Role Guards
- **Tujuan:** Buat middleware/utility `requireRole(['OWNER'])` dan `requirePermission(...)` di sisi server.
- **Dependensi:** Tahap 4 selesai.
- **Risiko:** Kebocoran IDOR jika authorization hanya dicek di layout/komponen UI client.
- **Kriteria Penerimaan (DoD):**
  - Default deny untuk endpoint internal tanpa token sesi valid.
  - Admin ditolak saat mengakses rute khusus Owner (HTTP 403 Forbidden).
  - Tidak ada manipulasi client-side yang dapat menembus guard server.
- **Bukti Diperlukan:** Test script pemanggilan endpoint terproteksi dengan role Owner vs Admin vs Anonim.
- **Keputusan Owner Diperlukan:** Tidak ada (aturan disetujui di ADR-002).

### Tahap 6: Owner-Only User & Role Management
- **Tujuan:** API internal untuk Owner membuat staf Admin, reset status akun, dan mengelola profil staf.
- **Dependensi:** Tahap 5 selesai.
- **Risiko:** Admin mencoba membuat user atau mengubah role dirinya sendiri.
- **Kriteria Penerimaan (DoD):**
  - Hanya Owner yang dapat memanggil API create/update user.
  - Admin memanggil API user management langsung mendapat 403.
  - Anti-escalation aktif: input role divalidasi ketat (enum `OWNER`, `ADMIN`, `KASIR`; peran tidak valid ditolak).
- **Bukti Diperlukan:** Test assert pencegahan privilege escalation oleh Admin.
- **Keputusan Owner Diperlukan:** Format username/email standar untuk staf toko.

### Tahap 7: Append-Only Audit Logging Subsystem
- **Tujuan:** Modul logging server-side untuk mencatat setiap tindakan kritis (login, tiket dibuat, status tiket diubah, dll.).
- **Dependensi:** Tahap 1 & 5 selesai.
- **Risiko:** Log terhapus atau termodifikasi oleh Admin.
- **Kriteria Penerimaan (DoD):**
  - Mutasi data audit log ditolak di level DB (tidak ada API update/delete).
  - Owner dapat membaca log penuh.
  - Admin hanya bisa membaca jika diizinkan permission eksplisit.
- **Bukti Diperlukan:** Audit query test dan percobaan mutasi audit log yang gagal.
- **Keputusan Owner Diperlukan:** Kebijakan retensi log (berapa bulan/tahun disimpan).

### Tahap 8: Ticket Lifecycle & 9 Status Machine
- **Tujuan:** API CRUD Tiket Servis dengan validasi transisi status ketat antara 9 status resmi (`RECEIVED` s/d `CANCELLED`).
- **Dependensi:** Tahap 5 & 7 selesai.
- **Risiko:** Tiket loncat status tidak valid (misal dari `RECEIVED` langsung `CLOSED` tanpa inspeksi/pembayaran).
- **Kriteria Penerimaan (DoD):**
  - State machine memvalidasi transisi yang sah.
  - `COMPLETED` (servis selesai teknis) dan `READY_FOR_PICKUP` (siap diambil pelanggan) terpisah dan terverifikasi.
  - Setiap perubahan status otomatis menulis ke `ticket_status_history` dan `audit_logs` dalam 1 transaksi DB.
- **Bukti Diperlukan:** Integration test alur tiket penuh dari `RECEIVED` -> `CLOSED` dan penolakan transisi ilegal.
- **Keputusan Owner Diperlukan:** Matriks transisi status yang diizinkan (state machine rules).

### Tahap 9: Public Ticket Tracking API
- **Tujuan:** Endpoint publik `/api/tickets/track` yang menerima nomor tiket + secret token.
- **Dependensi:** Tahap 8 selesai.
- **Risiko:** Brute force token, timing attacks, data leak pelanggan.
- **Kriteria Penerimaan (DoD):**
  - Nomor tiket saja mengembalikan error tanpa memberi tahu keberadaan tiket.
  - Token dicocokkan via constant-time comparison dengan token hash di DB.
  - Rate limiting terpasang ketat (anti-enumeration).
  - Data yang dikembalikan terbatas (tidak menampilkan nomor telepon/alamat pelanggan/catatan internal).
- **Bukti Diperlukan:** Test script pencocokan token benar vs salah, rate limit trigger test.
- **Keputusan Owner Diperlukan:** Format panjang secret token (misal: 6 karakter alfanumerik vs 12 karakter hex).

### Tahap 10: Security Verification, E2E & Deployment Readiness
- **Tujuan:** Audit keamanan menyeluruh, pengujian terpadu, dan dokumentasi operasional lokal.
- **Dependensi:** Seluruh tahap 1-9 selesai.
- **Risiko:** Celah regresi sebelum rilis MVP.
- **Kriteria Penerimaan (DoD):**
  - Semua unit & integration test lulus 100%.
  - Zero sensitive secrets di source control.
  - Dokumentasi deployment lokal teruji.
- **Bukti Diperlukan:** Laporan hasil test runner, checklist security release ditandatangani.
- **Keputusan Owner Diperlukan:** Pemilihan provider database & hosting production (fase rilis).
