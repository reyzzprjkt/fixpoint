# ADR-001: Keputusan Owner yang Dikonfirmasi — Alur Tiket, Pelacakan Publik, dan Database Lokal

- Status: Accepted
- Tanggal: 2026-10-28
- Pemilik keputusan: Owner FixPoint
- Requirement terkait: FR-SRV-001..010, FR-SRV-003, NFR-SEC-*, NFR-*

## Konteks
Sebelum implementasi backend, beberapa keputusan bisnis/teknis yang sebelumnya PROPOSED/TBD perlu dikonfirmasi agar perencanaan dapat dilanjutkan tanpa mengarang aturan.

## Keputusan
1. **Alur tiket:** Pertahankan 9 status yang diusulkan (RECEIVED, INSPECTING, WAITING_APPROVAL, WAITING_PARTS, IN_PROGRESS, COMPLETED, READY_FOR_PICKUP, CLOSED, CANCELLED). `COMPLETED` dan `READY_FOR_PICKUP` tetap terpisah. `CANCELLED` tersedia sebagai jalur pembatalan. Aturan transisi per PRD §6.2 tetap PROPOSED sampai disepakati lebih lanjut (tidak diarang).
2. **Pelacakan publik:** Gunakan kombinasi nomor tiket + token rahasia terpisah. Nomor tiket saja tidak cukup. Terapkan prinsip minimisasi data, validasi server, rate limiting, dan perlindungan enumerasi. Detail token (format, panjang, rotasi) tetap PROPOSED/TBD.
3. **Database:** PostgreSQL lokal untuk development. Provider production belum dipilih dan harus ditentukan sebelum deployment. Prisma tetap PROPOSED sampai keputusan ORM dikonfirmasi.

## Alternatif
- Tidak melakukan perubahan: perencanaan backend tetap tertunda; status PROPOSED/TBD tetap ambigu.

## Konsekuensi
- Positif: kejelasan status final, mekanisme tracking, dan database dev; memungkinkan perencanaan implementasi.
- Trade-off: detail token, transisi status, provider production, ORM masih TBD; implementasi tidak boleh dimulai untuk bagian yang belum diputuskan.
- Risiko: jika detail token/transisi tidak disepakati, implementasi tracking & ticket service tertunda.

## Keamanan dan data
- Tracking publik wajib minimisasi data, validasi server, rate limiting, anti-enumerasi.
- PostgreSQL lokal dev; secret tidak di-commit; provider production TBD.
- Tidak ada perubahan kode aplikasi pada checkpoint ini.

## Verifikasi
- Konsistensi antar dokumen (PRD, SYSTEM_DESIGN, DATABASE_SCHEMA, SECURITY, matriks keputusan Change 011) diverifikasi.
- Change record 012 dan evidence dibuat.

## Referensi
- `docs/PRD.md` (§4.2, §6.1, §10)
- `docs/SYSTEM_DESIGN.md` (§2)
- `docs/DATABASE_SCHEMA.md` (§1, §7)
- `docs/SECURITY.md` (§3)
- `docs/evidence/2026-10-28-011-backend-database-readiness/decision-matrix.md`
- `docs/changes/2026-10-28-012-record-owner-decisions.md`
