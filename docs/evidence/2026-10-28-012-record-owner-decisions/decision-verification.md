# Evidence: 2026-10-28-012 - Record Owner Decisions

- **Change ID:** 2026-10-28-012
- **Tanggal:** 2026-10-28
- **Jenis:** Verifikasi konsistensi dokumentasi

## Keputusan owner yang dicatat
1. **Alur tiket:** 9 status final (RECEIVED, INSPECTING, WAITING_APPROVAL, WAITING_PARTS, IN_PROGRESS, COMPLETED, READY_FOR_PICKUP, CLOSED, CANCELLED); COMPLETED dan READY_FOR_PICKUP tetap terpisah; CANCELLED tersedia sebagai jalur pembatalan. Transisi status tetap PROPOSED (belum disepakati).
2. **Pelacakan publik:** kode tiket + token rahasia terpisah; nomor tiket saja tidak cukup; prinsip minimisasi data, validasi server, rate limiting, anti-enumerasi. Detail token tetap PROPOSED/TBD.
3. **Database:** PostgreSQL lokal untuk development; provider production TBD; Prisma tetap PROPOSED sampai keputusan ORM dikonfirmasi.

## Verifikasi konsistensi
- `docs/PRD.md` §4.2: tracking mechanism ditandai CONFIRMED (mekanisme), detail PROPOSED/TBD.
- `docs/PRD.md` §6.1: status list ditandai disetujui owner.
- `docs/PRD.md` §10: item 5 dan 9 diperbarui (mekanisme disetujui; DB lokal dev).
- `docs/SYSTEM_DESIGN.md` §2: Database row → PostgreSQL lokal dev / provider prod TBD; ORM row → Prisma PROPOSED.
- `docs/DATABASE_SCHEMA.md` §1: PostgreSQL lokal dev dicatat.
- `docs/SECURITY.md` §3: tracking mechanism ditandai disetujui owner.
- `docs/evidence/2026-10-28-011-backend-database-readiness/decision-matrix.md`: baris Status tiket, COMPLETED vs READY_FOR_PICKUP, Public tracking mechanism, Database provider diperbarui ke CONFIRMED (sesuai).
- `docs/decisions/ADR-001-owner-decisions-ticket-tracking-database.md` dibuat (status Accepted).

## Hasil pemeriksaan
- Tidak ditemukan PROPOSED lama yang bertentangan dengan keputusan owner pada topik yang diputuskan (status tiket final, tracking mechanism, database lokal dev).
- Detail implementasi yang belum diputuskan tetap PROPOSED/TBD (transisi status, detail token, provider production, ORM, permission matrix, dll.).

## Keterbatasan
- Tidak ada perubahan kode aplikasi; tidak ada build/typecheck ulang (tidak ada perubahan kode).
- Belum ada commit/push.
