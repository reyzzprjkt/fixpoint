# Change Record: 2026-10-28-014 - RBAC Role Correction (Teknisi Removed)

## Metadata
- **ID:** 2026-10-28-014
- **Tanggal:** 2026-10-28
- **Status:** verified
- **Kategori:** Dokumentasi / Koreksi
- **Penanggung jawab:** Agent Audit
- **Terkait requirement:** FR-SEC-*, NFR-SEC-*
- **Risk level:** Low

## Alasan
Koreksi dokumentasi berdasarkan keputusan owner terbaru: role resmi sistem hanya Owner, Admin, dan Kasir. Role "Teknisi" bukan role sistem dan tidak boleh dimasukkan sebagai role RBAC. Referensi "Teknisi" yang sebelumnya muncul sebagai usulan/asumsi (Change 002, Change 011, Change 013, dan dokumen terkait) dikoreksi.

## Scope
### Termasuk
- Penghapusan/penyesuaian seluruh penyebutan "Teknisi" sebagai role RBAC di `docs/RBAC.md`, `docs/PRD.md`, `docs/ROADMAP.md`, `docs/DATABASE_SCHEMA.md`, `docs/changes/2026-10-28-002-...`, `docs/changes/2026-10-28-013-...`, `docs/evidence/2026-10-28-011-...`, `docs/evidence/2026-10-28-013-...`.
- Penyesuaian permission matrix (Owner/Admin/Kasir).
- Catatan pada Change 013 bahwa role Teknisi sebelumnya usulan/asumsi, bukan keputusan owner.
- Penjelasan bahwa role Kasir = keputusan owner, tetapi scope fitur POS/kasir tetap mengikuti keputusan scope MVP (tidak diperluas tanpa approval).

### Tidak termasuk
- Implementasi authentication, authorization, database, package, migration, atau kode aplikasi.
- Penambahan role baru.
- Perubahan keputusan owner yang sudah tercatat (ADR-001).

## Perubahan
- `docs/RBAC.md` — ditulis ulang: role resmi Owner/Admin/Kasir; Teknisi dihapus; tugas pengerjaan teknis ditandai TBD (role pelaksana belum ditetapkan owner).
- `docs/PRD.md` — penghapusan referensi role Teknisi; tugas pengerjaan teknis ditandai TBD.
- `docs/ROADMAP.md` — penghapusan referensi role Teknisi.
- `docs/DATABASE_SCHEMA.md` — "Penugasan teknisi" → "Penugasan pelaksana (role TBD)".
- `docs/changes/2026-10-28-002-mvp-scope-alignment.md` — penyesuaian referensi Teknisi.
- `docs/changes/2026-10-28-013-auth-rbac-decision-audit.md` — catatan koreksi.
- `docs/evidence/2026-10-28-011-backend-database-readiness/audit-report.md` & `decision-matrix.md` — penyesuaian.
- `docs/evidence/2026-10-28-013-auth-rbac-decision-audit/auth-rbac-evaluation.md` — matriks Owner/Admin/Kasir.
- `CHANGELOG.md` — entri Change 014.

## Risiko
- **Rendah** — hanya dokumentasi.

## Pengujian Aktual
- Pencarian string "Teknisi"/"technician" dilakukan; referensi yang tersisa hanya pada deskripsi foto (stock-research.md) dan kata "teknisi" dalam konteks non-role (mis. "teknisi wanita" di alt text hero), bukan role RBAC.
- `npm run typecheck`: Passed.
- `npm run build`: Passed.

## Evidence
- **Lokasi:** `docs/evidence/2026-10-28-014-rbac-role-correction/`
- **File:** `role-correction-audit.md`
- **Tipe:** Audit koreksi role

## Catatan
- Role Teknisi tidak pernah menjadi keputusan owner; muncul sebagai usulan/asumsi dalam audit sebelumnya.
- Tidak ada implementasi authentication, authorization, database, package, migration, atau kode aplikasi.
- Tidak ada commit/push.
