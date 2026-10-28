# Change Record: 2026-10-28-017 - Backend Readiness Audit & Implementation Plan

## Metadata
- **ID:** 2026-10-28-017
- **Tanggal:** 2026-10-28
- **Status:** verified
- **Kategori:** Audit / Rencana Teknis & Desain Arsitektur
- **Penanggung jawab:** Orchestrator FixPoint
- **Terkait requirement:** FR-SRV-*, FR-SEC-*, NFR-*
- **Risk level:** Low (Hanya dokumentasi & perencanaan)

## Alasan
Melakukan audit kesiapan backend secara menyeluruh dan menyusun blueprint rencana implementasi bertahap (10 tahap) berdasarkan keputusan owner yang telah disetujui (ADR-001, ADR-002, Change 012, 014, 015, dan 016). Memastikan tim tidak melakukan implementasi spekulatif sebelum dependensi, kontrol keamanan, dan mitigasi risiko dirancang dengan jelas.

## Scope
### Termasuk
- Evaluasi komparatif Prisma ORM vs alternatif (Drizzle, Kysely) untuk PostgreSQL lokal dan Better Auth.
- Desain model entitas konseptual MVP (Users, Sessions, 2FA, Customers, Devices, Service Tickets, Status History, Audit Logs, Tracking Tokens).
- Roadmap implementasi 10 tahap lengkap dengan dependensi, risiko, DoD (Definition of Done), bukti pengujian, dan daftar keputusan owner yang dibutuhkan.
- Tinjauan keamanan mendalam (anti-IDOR, anti-escalation, public tracking token hashing & rate-limiting, append-only audit log).
- Strategi pengujian bertahap tanpa framework berlebih (`node:test` / `node:assert`).
- Pembaruan `CHANGELOG.md`.

### Tidak termasuk
- Pengubahan kode aplikasi (Next.js components, pages, styling).
- Instalasi package/dependency baru (`prisma`, `better-auth`, `pg`, dsb.).
- Pembuatan file skema implementasi atau eksekusi migrasi database.
- Eksekusi backend runtime atau modifikasi konfigurasi runtime.
- Operasi commit atau push git.

## File Terdampak
1. `docs/evidence/2026-10-28-017-backend-readiness-plan/prisma-orm-evaluation.md` (baru)
2. `docs/evidence/2026-10-28-017-backend-readiness-plan/conceptual-entity-model.md` (baru)
3. `docs/evidence/2026-10-28-017-backend-readiness-plan/backend-implementation-roadmap.md` (baru)
4. `docs/evidence/2026-10-28-017-backend-readiness-plan/security-and-testing-strategy.md` (baru)
5. `docs/changes/2026-10-28-017-backend-readiness-plan.md` (file ini)
6. `CHANGELOG.md` (pembaruan)

## Risiko & Mitigasi
- **Risiko:** Klaim palsu bahwa proteksi keamanan atau fitur backend sudah aktif padahal baru direncanakan.
- **Mitigasi:** Memisahkan secara tegas di setiap dokumen mana poin yang sudah disetujui owner dan mana yang masih PROPOSED/rekomendasi baru. Menegaskan status backend masih 0% terimplementasi.

## Pengujian Aktual & Verifikasi
- Pengecekan git status memastikan tidak ada perubahan file di `app/`, `package.json`, `package-lock.json`, atau file runtime.
- Konsistensi 9 status tiket, 3 role resmi (Owner, Admin, Kasir dengan Kasir di luar MVP), dan 7 keputusan autentikasi terjaga 100%.

## Evidence
- Direktori: `docs/evidence/2026-10-28-017-backend-readiness-plan/`
