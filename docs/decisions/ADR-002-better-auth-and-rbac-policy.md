# ADR-002: Pemilihan Better Auth dan Kebijakan Autentikasi / RBAC MVP

- **Status:** Accepted (Keputusan Owner)
- **Tanggal:** 2026-10-28
- **Pengambil Keputusan:** Owner FixPoint
- **Terkait Dokumen:** `docs/PRD.md`, `docs/SECURITY.md`, `docs/SYSTEM_DESIGN.md`, `docs/RBAC.md`, `docs/ROADMAP.md`, `docs/DATABASE_SCHEMA.md`

---

## 1. Konteks

FixPoint membutuhkan fondasi autentikasi dan otorisasi internal (staf/manajemen) untuk MVP servis. Sebelumnya, evaluasi Change 013 mengidentifikasi Better Auth dan Auth.js, di mana Auth.js telah bergabung ke Better Auth. Pada Change 014 dan 015, owner menetapkan bahwa role resmi sistem hanya **Owner**, **Admin**, dan **Kasir**; Owner dan Admin masuk MVP, sedangkan role Kasir resmi tetapi fitur Kasir/POS ditunda ke fase berikutnya.

Kini owner memberikan keputusan final terkait 7 poin tata kelola autentikasi dan RBAC untuk MVP.

---

## 2. Keputusan Owner (Final)

### 2.1 Provider Autentikasi
- **Better Auth** disetujui sebagai provider autentikasi resmi sistem.
- Alasan: Kompatibel dengan Next.js App Router (`toNextJsHandler`), mendukung PostgreSQL (native Pool atau Prisma adapter), memiliki plugin Two-Factor resmi (TOTP/OTP), serta mengintegrasikan ekosistem Auth.js.

### 2.2 Multi-Factor Authentication (MFA)
- **MFA wajib bagi role Owner dan Admin.**
- Metode MFA teknis (TOTP authenticator app disarankan via plugin `twoFactor`; backup codes) dan mekanisme pemulihan akun: **detail teknis tetap TBD** sampai diuji pada tahap implementasi backend.

### 2.3 Kebijakan Sesi (Session Policy)
- **Batas sesi absolut:** **8 jam** (setelah 8 jam dari login awal, sesi kedaluwarsa penuh dan wajib re-autentikasi).
- **Idle timeout:** **30 menit** (jika tidak ada aktivitas selama 30 menit, sesi ditutup otomatis).
- *Catatan teknis implementasi:* Better Auth mendukung `session.expiresIn` dan rolling session via `session.updateAge`, namun pemisahan tegas antara batas absolut 8 jam dan idle sliding 30 menit membutuhkan hook verifikasi aktivitas atau metadata timestamp sesi tambahan di middleware/server check. Kedua batas ini **belum aktif** dan wajib diimplementasikan serta diuji saat coding backend dimulai.

### 2.4 Pengelolaan Akun dan Role
- **Owner bertanggung jawab penuh** mengelola akun internal dan penetapan role.
- **Admin tidak dapat mengubah role** atau memberikan hak akses di luar kewenangannya.

### 2.5 Tata Kelola Audit Log
- **Owner memiliki akses penuh** ke seluruh audit log sistem.
- **Admin hanya memiliki akses baca (read-only)** jika secara eksplisit diberikan izin oleh Owner via permission matrix.
- **Pengubahan atau penghapusan audit log dilarang keras / dibatasi ketat** di tingkat server/database, dan setiap upaya mutasi log wajib diaudit secara terpisah (append-only principle).

### 2.6 Role per Pengguna untuk MVP
- **Satu role per pengguna** (single role per user) untuk scope MVP.
- Role resmi sistem: **Owner**, **Admin**, dan **Kasir**.
- Scope MVP: hanya **Owner** dan **Admin**.
- Role **Kasir** tetap role resmi jangka panjang, namun modul/fitur Kasir/POS ditunda ke fase berikutnya.
- Tidak ada role lain (termasuk role "Teknisi" tidak ada dalam sistem).

### 2.7 Pencegahan Privilege Escalation
- Admin dilarang meningkatkan hak aksesnya sendiri (*self-privilege escalation*).
- Admin dilarang memberikan permission atau role yang tidak dimilikinya kepada akun lain.
- Prinsip *least privilege* dan verifikasi otorisasi wajib ditegakkan di sisi server (*server-side enforcement*), bukan hanya client-side check.

---

## 3. Konsekuensi & Keterbatasan

- **Kelebihan:** Standar keamanan tinggi untuk akses manajemen/operasional servis sejak awal; pembagian wewenang yang tegas antara Owner dan Admin; perlindungan akun sensitif dengan MFA wajib.
- **Tantangan Implementasi:** Implementasi dual timeout (absolut 8 jam + idle 30 menit) membutuhkan logika khusus pada middleware/session validator; alur orientasi MFA wajib perlu dipersiapkan agar user tidak terkunci pada saat setup pertama kali.
- **Status Implementasi:** Keputusan ini bersifat arsitektural dan dokumentatif. Tidak ada kode aplikasi, dependency `better-auth`, skema database, atau migration yang dibuat pada change ini.
