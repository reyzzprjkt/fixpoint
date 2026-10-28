# ADR-003: Adopsi Prisma ORM untuk PostgreSQL dan Urutan Pengerjaan Backend

- Status: Accepted
- Tanggal: 2026-10-29
- Pemilik keputusan: Owner FixPoint
- Terkait dokumen: `docs/PRD.md`, `docs/SYSTEM_DESIGN.md`, `docs/DATABASE_SCHEMA.md`, `docs/SECURITY.md`, `docs/ROADMAP.md`, ADR-001, ADR-002

---

## 1. Konteks
Setelah evaluasi teknis ORM pada Change 017 (`docs/evidence/2026-10-28-017-backend-readiness-plan/prisma-orm-evaluation.md`) membandingkan Prisma, Drizzle, dan Kysely, keputusan owner diperlukan untuk meresmikan ORM sistem.

Sebelumnya pada ADR-001, PostgreSQL disetujui untuk development lokal sementara Prisma berstatus PROPOSED. Pada ADR-002, Better Auth disetujui sebagai auth provider resmi.

## 2. Keputusan Owner (Final)

### 2.1 Adopsi ORM
- **Prisma ORM resmi disetujui** sebagai Object-Relational Mapping (ORM) untuk sistem FixPoint berbasis PostgreSQL.
- Database development lokal: **PostgreSQL**.
- Provider database production: **Tetap TBD** (ditentukan sebelum tahap deployment/hosting production).
- Provider autentikasi: **Better Auth** tetap dipertahankan sesuai ADR-002 (menggunakan `prismaAdapter`).

### 2.2 Urutan Pengerjaan Backend
- Selesaikan seluruh **keputusan desain yang tertunda** (transisi status tiket, parameter token tracking, alur recovery MFA, enforcement dual-timeout, strategi migrasi/backup) terlebih dahulu dalam dokumentasi sebelum coding.
- Implementasi backend dijalankan secara bertahap (step-by-step terisolasi) setelah keputusan dan dokumentasi diverifikasi.
- **Tidak ada implementasi database atau autentikasi pada Change 018.**

## 3. Konsekuensi
- **Positif:**
  - Single schema file (`schema.prisma`) terintegrasi langsung dengan adapter Better Auth (`prismaAdapter`).
  - Model data relasional, foreign keys, enums 9 status tiket, dan audit log memiliki type safety end-to-end dengan TypeScript Next.js App Router.
  - Alur kerja migrasi deklaratif via `prisma migrate dev`.
- **Trade-off & Mitigasi Teknis:**
  - Wajib menerapkan *PrismaClient Singleton* di Next.js App Router untuk mencegah koneksi habis saat Fast Refresh/HMR lokal.
  - Rollback skema harus ditangani secara eksplisit melalui migrasi perbaikan maju (*forward revert migration*).
- **Lingkup Role & Modul:**
  - Role resmi tetap **Owner**, **Admin**, dan **Kasir**.
  - Lingkup MVP servis tetap **Owner** dan **Admin** saja. Fitur Kasir/POS ditunda ke fase berikutnya.

## 4. Keamanan dan Data
- Kredensial koneksi PostgreSQL dev disimpan di `.env` lokal, dilarang di-commit ke Git.
- Tidak ada package atau schema implementasi yang dipasang sebelum fase coding yang disetujui.
