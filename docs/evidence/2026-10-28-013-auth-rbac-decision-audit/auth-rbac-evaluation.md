# Evidence: 2026-10-28-013 — Auth Evaluation

- **Change ID:** 2026-10-28-013
- **Tanggal:** 2026-10-28
- **Jenis:** Audit autentikasi & RBAC (tanpa implementasi)

## Stack aktual proyek
- Next.js 16.4.3 (App Router), React 19.3.1, TypeScript 7.0.2, Tailwind 4.3.3, Node 24.22.1, npm 12.2.1.
- Belum ada dependency auth/database/ORM.

## Perbandingan Better Auth vs Auth.js

| Aspek | Better Auth | Auth.js (next-auth) |
|---|---|---|
| Status proyek | Aktif, dokumentasi resmi tersedia | **Merged ke Better Auth** (halaman resmi Auth.js menyatakan "The Auth.js project is now part of Better Auth") |
| Kompatibilitas Next.js App Router | Dukungan eksplisit via `toNextJsHandler` di `/app/api/auth/[...all]/route.ts` | v5 beta; dokumentasi mencakup Next.js |
| Kompatibilitas TypeScript | TypeScript-first, schema inference | TypeScript support |
| Session & cookie | Session management bawaan, cookie handling | Session management bawaan |
| Database & ORM | Adapter bawaan: Kysely, Prisma, Drizzle, MongoDB, MySQL, PostgreSQL, SQLite; CLI generate/migrate | Adapter: Prisma, Drizzle, Kysely, dll. |
| Login & pemulihan akun | Email/password, social providers, plugin (passkey, magic link, username) | OAuth, magic link, credentials, WebAuthn |
| MFA | Plugin (passkey, dll.) — kebutuhan MFA disetujui owner | Tergantung provider/plugin |
| Kompleksitas implementasi | Satu instance `betterAuth`, handler Next.js, client `createAuthClient` | Konfigurasi provider + adapter + session |
| Risiko migrasi/pemeliharaan | Proyek yang menerima Auth.js; roadmap aktif | Status migrasi ke Better Auth direkomendasikan oleh pihak Auth.js |

### Sumber (resmi)
- Better Auth installation docs: https://www.better-auth.com/docs/installation
- Auth.js getting started: https://authjs.dev/getting-started (menyatakan Auth.js bergabung ke Better Auth)

### Rekomendasi (bukan keputusan owner)
- **Better Auth** direkomendasikan sebagai kandidat utama karena Auth.js telah bergabung ke Better Auth, serta dukungan adapter Prisma/PostgreSQL dan Next.js App Router yang eksplisit.
- **Pilihan final tetap TBD** sampai dikonfirmasi owner.

### Keterbatasan
- Versi package spesifik tidak dipasang/diuji; hanya evaluasi dokumentasi. Tidak ada dependency yang ditambahkan.
- MFA, session duration, pemulihan akun detail tetap TBD.

## Permission matrix (MVP, usulan — bukan keputusan final)

| Modul/tindakan | Owner | Admin | Kasir | Keterangan |
|---|---|---|---|---|
| Melihat dashboard | Allow | Jika diberi izin | Diluar MVP | Least privilege |
| Mengelola user internal | Allow | TBD (owner approval) | Deny | Sensitif |
| Mengubah role/permission | Allow | Deny (kecuali kebijakan eksplisit) | Deny | Owner-only by default |
| Mengelola pelanggan/perangkat | Allow | Jika diberi izin | Deny | Server-side scoping |
| Membuat tiket servis | Allow | Allow | Deny | Admin creates |
| Melihat tiket servis | Allow | Allow | Deny | Server-side filter |
| Mencatat diagnosa/inspeksi | Allow | Allow (setelah menugaskan) | Deny | Audit actor/waktu; role pelaksana teknis TBD |
| Memperbarui progres/status | Allow | Allow (transisi yang diizinkan) | Deny | Validasi server; role pelaksana teknis TBD |
| Menetapkan estimasi biaya | Allow | Allow | Deny (MVP) | Audit |
| Mencatat persetujuan pelanggan | Allow | Allow | Deny (MVP) | Audit |
| Membatalkan tiket | Allow | Allow | Deny (MVP) | Alasan wajib |
| Menutup tiket | Allow | Allow | Deny (MVP) | Serah terima |
| Melihat audit log | Allow | Read-only jika diberikan | Deny | Owner default |
| Mengubah pengaturan sistem | Allow | Hanya izin spesifik | Deny | Owner default |

Catatan: tugas pengerjaan teknis (diagnosis, catatan teknis, pembaruan progres) yang sebelumnya direferensikan ke role "Teknisi" kini **TBD — role pelaksana teknis belum ditetapkan owner** (lihat Change 014).

Prinsip: default deny, server-side authorization, company/customer scoping, audit actor/waktu untuk tindakan sensitif.
