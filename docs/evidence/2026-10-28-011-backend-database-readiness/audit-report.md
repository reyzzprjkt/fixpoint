# Audit Report — Backend & Database Readiness (Change 011)

- **Change ID:** 2026-10-28-011
- **Tanggal:** 2026-10-28
- **Jenis:** Audit & perencanaan (tanpa implementasi)

## 1. Dokumen yang diperiksa
- `AGENTS.md`
- `docs/PRD.md`
- `docs/ROADMAP.md`
- `docs/SYSTEM_DESIGN.md`
- `docs/DATABASE_SCHEMA.md`
- `docs/RBAC.md`
- `docs/SECURITY.md`
- `docs/TESTING_STRATEGY.md`
- `docs/DEPLOYMENT.md`
- `docs/DOCUMENTATION_POLICY.md`
- `docs/CHANGE_MANAGEMENT.md`
- `CHANGELOG.md`
- Kode aplikasi: `app/` (scaffold + homepage; tidak ada backend/database/auth).
- Change records sebelumnya: `docs/changes/2026-10-28-000` … `2026-10-28-010`.

## 2. Entitas & relasi MVP yang didukung dokumentasi (Service Management)
Dari PRD 4.3, DATABASE_SCHEMA §2, SYSTEM_DESIGN §4:

- `customers` ↔ `customer_devices` (1:N)
- `customers` ↔ `service_tickets` (1:N)
- `customer_devices` ↔ `service_tickets` (1:N)
- `service_tickets` ↔ `service_diagnostics` (1:N, riwayat/revisi)
- `service_tickets` ↔ `service_approvals` (1:N, persetujuan estimasi)
- `service_tickets` ↔ `service_status_history` (1:N, append-only)
- `service_tickets` ↔ `service_parts` (1:N, opsional; hubungkan ke stok)
- `products` ↔ `service_parts` (referensi)
- `users` (internal) ↔ `audit_logs` (1:N)
- `users` ↔ `service_tickets` (assignment pelaksana teknis — role TBD)

Field minimum tiket (DATABASE_SCHEMA §6): nomor tiket + mekanisme verifikasi tracking (wajib), referensi pelanggan (wajib), identitas perangkat (opsional), keluhan ringkas (wajib), kondisi awal (opsional), waktu penerimaan (wajib), penugasan pelaksana (role TBD) (opsional), diagnosis (opsional), estimasi biaya (conditional), persetujuan pelanggan (conditional), status (wajib), riwayat status (wajib), catatan pengerjaan (opsional), penyelesaian/serah terima (opsional).

Catatan: foto perangkat bukan dependensi MVP awal (kandidat fitur berikutnya).

## 3. Alur tiket & status (PRD §6)
Status yang diusulkan (PROPOSED, bukan final): RECEIVED, INSPECTING, WAITING_APPROVAL, WAITING_PARTS, IN_PROGRESS, COMPLETED, READY_FOR_PICKUP, CLOSED, CANCELLED.

Transisi valid (usulan) tercatat di PRD §6.2, termasuk aktor yang diizinkan dan prasyarat. Riwayat status append-only (aktor, waktu, status asal/tujuan, alasan).

Keputusan pending: persetujuan estimasi wajib sebelum IN_PROGRESS; pemisahan COMPLETED vs READY_FOR_PICKUP TBD (dapat digabung jika tidak ada layanan ambil-jemput).

## 4. RBAC & keamanan
- RBAC (`docs/RBAC.md`): Owner (full), Admin (operasional sesuai izin), Kasir (POS — di luar MVP sesuai scope; role Kasir = keputusan owner). Role "Teknisi" bukan role sistem (dikoreksi Change 014). Permission granular TBD.
- SECURITY: default deny, validasi server, company/customer scoping, rate-limit endpoint publik, no secret di repo, audit log, no PII di log/screenshot.
- Persyaratan yang sudah ditetapkan vs rekomendasi tambahan dibedakan di matriks keputusan.

## 5. Pelacakan publik
- Mekanisme usulan: kode tiket + token/verifikasi terpisah (PROPOSED, belum disetujui).
- Informasi publik yang boleh ditampilkan: status, nama singkat/inisial, tipe/brand dasar perangkat, keluhan ringkas, tanggal masuk/terakhir diperbarui.
- Informasi internal yang dirahasiakan: diagnosis, estimasi biaya detail, suku cadang, catatan internal.
- Risiko: enumerasi nomor tiket, brute force, kebocoran data. Mitigasi: anti-enumerasi, pembatasan percobaan, respons kegagalan yang tidak mengungkap keberadaan tiket, rotasi/pemulihan token, pembatasan field.

## 6. Evaluasi teknologi
- PostgreSQL: direncanakan (SYSTEM_DESIGN §2, status Proposed). Alasan: relational, transaksi, integritas FK. Konsekuensi: butuh hosting/managed DB, backup, migration workflow. Keputusan pending: provider, lokal vs managed.
- Prisma ORM: direncanakan (status Proposed). Alasan: type-safe, migration workflow. Konsekuensi: dependency baru, schema/migration discipline. Keputusan pending: versi, naming convention, ID strategy.
- Better Auth vs Auth.js: belum diputuskan (SYSTEM_DESIGN §2 "Belum diputuskan"). Evaluasi awal disebutkan di change 003 (TBD resolution). Keputusan pending: provider, MFA, session duration, MFA owner.

## 7. Konflik antardokumen / asumsi
- Status tiket dan transisi masih PROPOSED (PRD §6) — bukan final.
- COMPLETED vs READY_FOR_PICKUP dapat digabung jika tidak ada layanan ambil-jemput (TBD).
- RBAC granularitas final TBD; permission matrix awal TBD.
- Tidak ada konflik langsung antar dokumen; sebagian besar keputusan teknis masih TBD/PROPOSED.

## 8. Status backend saat ini
- Tidak ada backend/database/auth implementasi di repository (scaffold Next.js + homepage saja). `app/` hanya frontend.
- Tidak ada dependency database/ORM/auth.
- Audit ini hanya perencanaan; tidak ada perubahan kode.
