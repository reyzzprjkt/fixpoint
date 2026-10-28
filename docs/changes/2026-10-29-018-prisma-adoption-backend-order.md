# Change Record: 2026-10-29-018 - Prisma Adoption & Backend Execution Ordering

## Metadata
- **ID:** 2026-10-29-018
- **Tanggal:** 2026-10-29
- **Status:** verified
- **Kategori:** Keputusan Arsitektur / Dokumentasi
- **Penanggung jawab:** Orchestrator FixPoint
- **Terkait requirement:** FR-SRV-*, FR-SEC-*, NFR-*
- **Risk level:** Low (Hanya dokumentasi keputusan)

## Alasan
Mencatat keputusan resmi owner untuk mengadopsi Prisma ORM sebagai ORM sistem PostgreSQL, mempertahankan Better Auth (ADR-002), menetapkan PostgreSQL lokal untuk development dengan provider production tetap TBD, serta menetapkan urutan pengerjaan backend: menyelesaikan keputusan desain tertunda terlebih dahulu sebelum implementasi bertahap dimulai.

## Scope
### Termasuk
- Pencatatan ADR-003 (`docs/decisions/ADR-003-prisma-orm-and-backend-order.md`).
- Pembaruan status Prisma menjadi disetujui di `docs/SYSTEM_DESIGN.md` dan `docs/DATABASE_SCHEMA.md`.
- Penyusunan daftar terurut keputusan desain tertunda yang harus diselesaikan sebelum coding (`docs/evidence/2026-10-29-018-prisma-adoption-backend-order/design-decisions-readiness.md`).
- Pembaruan `CHANGELOG.md`.

### Tidak termasuk
- Pengubahan kode aplikasi (`app/`).
- Instalasi package `prisma`, `@prisma/client`, atau dependency apapun.
- Pembuatan file schema implementasi (`prisma/schema.prisma`) atau migrasi database.
- Perubahan ADR-001 dan ADR-002.
- Operasi commit atau push git.

## Dokumen Terdampak
- `docs/decisions/ADR-003-prisma-orm-and-backend-order.md` (baru)
- `docs/evidence/2026-10-29-018-prisma-adoption-backend-order/design-decisions-readiness.md` (baru)
- `docs/changes/2026-10-29-018-prisma-adoption-backend-order.md` (baru)
- `docs/SYSTEM_DESIGN.md` (status ORM diperbarui)
- `docs/DATABASE_SCHEMA.md` (status ORM diperbarui)
- `CHANGELOG.md` (entri Change 018)

## Risiko & Mitigasi
- **Risiko:** Tim langsung melakukan `npm install prisma` dan membuat skema sebelum detail desain tiket/token disepakati.
- **Mitigasi:** ADR-003 dan dokumen kesiapan menetapkan klausul tegas bahwa seluruh keputusan desain tertunda wajib disepakati dan diverifikasi terlebih dahulu sebelum coding dimulai.

## Pengujian Aktual & Verifikasi
- Pemeriksaan git status menunjukkan tidak ada perubahan file di direktori `app/`, `package.json`, `package-lock.json`, atau runtime.
- Verifikasi silang dokumen memastikan: Prisma disetujui, PostgreSQL lokal dev, database production TBD, Better Auth tetap aktif, role resmi Owner/Admin/Kasir (Owner & Admin untuk MVP), 9 status tiket dipertahankan.

## Evidence
- Direktori: `docs/evidence/2026-10-29-018-prisma-adoption-backend-order/`
