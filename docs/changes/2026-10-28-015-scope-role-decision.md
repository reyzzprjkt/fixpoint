# Change Record: 2026-10-28-015 - Scope & Role Decision

## Metadata
- **ID:** 2026-10-28-015
- **Tanggal:** 2026-10-28
- **Status:** verified
- **Kategori:** Dokumentasi / Keputusan
- **Penanggung jawab:** Agent Audit
- **Terkait requirement:** FR-SEC-002, NFR-*
- **Risk level:** Low

## Alasan
Mencatat keputusan owner: Owner dan Admin masuk MVP; Kasir merupakan role resmi sistem, tetapi fitur Kasir/POS ditunda ke fase berikutnya dan tidak termasuk scope MVP saat ini.

## Scope
### Termasuk
- Pembaruan PRD FR-SEC-002 (role Kasir resmi, fitur POS ditunda).
- Konfirmasi konsistensi RBAC/ROADMAP/PRD.
- Change record dan evidence Change 015.

### Tidak termasuk
- Perubahan kode aplikasi, dependency, database, konfigurasi runtime.
- Implementasi autentikasi/backend.

## Perubahan
- `docs/PRD.md` (FR-SEC-002).
- `docs/changes/2026-10-28-015-scope-role-decision.md` (baru).
- `docs/evidence/2026-10-28-015-scope-role-decision/decision-verification.md` (baru).
- `CHANGELOG.md` (entri Change 015).

## Risiko
- **Rendah** — hanya dokumentasi.

## Pengujian Aktual
- Tidak ada pengujian aplikasi (tidak ada perubahan kode).
- Verifikasi: konsistensi dokumen diperiksa (RBAC/PRD/ROADMAP konsisten: Kasir role resmi, POS di luar MVP).

## Evidence
- **Lokasi:** `docs/evidence/2026-10-28-015-scope-role-decision/`
- **File:** `decision-verification.md`
- **Tipe:** Verifikasi konsistensi dokumentasi

## Catatan
- Role Kasir tetap model role jangka panjang; fitur POS/kasir ditunda ke fase berikutnya.
- Tidak ada commit/push.
- Keputusan yang masih TBD/PROPOSED tetap berlaku.
