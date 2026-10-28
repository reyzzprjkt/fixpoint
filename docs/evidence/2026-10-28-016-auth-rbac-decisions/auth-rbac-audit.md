# Evidence: 2026-10-28-016 - Auth & RBAC Decisions & Better Auth Capability Audit

- **Change ID:** 2026-10-28-016
- **Tanggal:** 2026-10-28
- **Jenis:** Audit Keputusan Owner & Kemampuan Teknis Better Auth

---

## 1. Verifikasi Keputusan Owner

| No | Keputusan | Status Tercatat | Referensi ADR |
|---|---|---|---|
| 1 | Provider: Better Auth | Approved (Owner) | ADR-002 §2.1 |
| 2 | MFA: Wajib Owner & Admin | Approved (Owner) — Detail teknis TBD | ADR-002 §2.2 |
| 3 | Session: Absolut 8 Jam, Idle 30 Menit | Approved (Owner) — Mekanisme kode TBD | ADR-002 §2.3 |
| 4 | Pengelolaan Akun & Role: Owner only | Approved (Owner) | ADR-002 §2.4 |
| 5 | Audit Log: Owner full, Admin read if granted | Approved (Owner) | ADR-002 §2.5 |
| 6 | Role: 1 role/user MVP; Owner/Admin/Kasir resmi | Approved (Owner) | ADR-002 §2.6 |
| 7 | Privilege Escalation: Anti-escalation & Least privilege | Approved (Owner) | ADR-002 §2.7 |

---

## 2. Audit Kemampuan Teknis Better Auth (Official Docs 2026)

### 2.1 Integrasi Next.js App Router
- **Status:** Terverifikasi resmi via dokumentasi.
- **Mekanisme:** Menggunakan `toNextJsHandler` pada catch-all route `app/api/auth/[...all]/route.ts`.
- **Client:** `@/lib/auth-client` via `createAuthClient` (`better-auth/react` atau `better-auth/client`).

### 2.2 Dukungan Multi-Factor Authentication (MFA / 2FA)
- **Status:** Terverifikasi resmi via plugin `twoFactor` (`better-auth/plugins`).
- **Fitur Bawaan:**
  - TOTP (Time-based One-Time Password) via Authenticator Apps (Google Authenticator, etc.).
  - Backup codes otomatis untuk recovery akun.
  - Endpoint verifikasi: `/two-factor/verify-totp`, `/two-factor/verify-backup-code`.
- **Hal yang masih perlu diuji/disiapkan:**
  - Alur orientasi pertama kali (enforcement flow) saat Owner/Admin pertama kali didaftarkan agar wajib mengaktifkan 2FA sebelum mengakses dashboard.
  - Mekanisme reset/pemulihan akun saat user kehilangan device & backup code (TBD kebijakan owner).

### 2.3 Pengelolaan Session & Idle Timeout (Dual-Limit)
- **Status:** Perlu penanganan khusus (Custom Enforcement).
- **Temuan Dokumentasi:**
  - Better Auth memiliki `session.expiresIn` (durasi kedaluwarsa sesi) dan `session.updateAge` (interval rolling update session).
  - Tidak ada konfigurasi bawaan terpisah untuk "absolute lifetime vs idle timeout" dalam satu setting deklaratif.
- **Strategi Implementasi Teknis yang Diperlukan:**
  - `expiresIn` dapat disetel ke idle window (30 menit) dengan rolling update via `updateAge`, namun untuk membatasi absolut 8 jam dari waktu login awal, diperlukan penyimpanan timestamp `loginAt` atau `absoluteExpiresAt` pada metadata session/database, kemudian divalidasi di middleware/server session hook.
  - **Penting:** Tidak boleh mengklaim kedua batas sudah aktif otomatis tanpa hook logika ini.

### 2.4 Kompatibilitas PostgreSQL
- **Status:** Terverifikasi resmi.
- **Mekanisme:** Mendukung native connection pool (`pg` / `Pool`) atau ORM adapter (`prismaAdapter` untuk Prisma, `drizzleAdapter` untuk Drizzle).
- **Schema & Migration:** Better Auth CLI menyediakan `npx auth generate` untuk skema dan `npx auth migrate` (bawaan Kysely) atau ORM schema generation.

---

## 3. Scope & Batasan Perubahan

- **Perubahan Kode Aplikasi:** Tidak ada (`0` file kode aplikasi diubah).
- **Dependency Ditambahkan:** Tidak ada (`0` package dipasang).
- **Database / Migration:** Tidak ada.
- **Typecheck & Build:** Tetap valid dan tidak terpengaruh karena hanya perubahan dokumentasi.
- **Git Operasi:** Tidak ada commit atau push.
