# Evidence: 2026-10-28-015 - Scope & Role Decision

- **Change ID:** 2026-10-28-015
- **Tanggal:** 2026-10-28
- **Jenis:** Verifikasi konsistensi dokumentasi

## Keputusan owner yang dicatat
1. Owner masuk MVP.
2. Admin masuk MVP.
3. Kasir merupakan role resmi sistem, tetapi fitur Kasir/POS ditunda ke fase berikutnya dan tidak termasuk scope MVP saat ini.

## Verifikasi konsistensi
- `docs/RBAC.md`: role resmi Owner, Admin, Kasir; catatan "Role Kasir = keputusan owner; scope fitur POS/kasir tetap mengikuti keputusan scope MVP yang sudah ada dan tidak diperluas tanpa approval owner."
- `docs/PRD.md` §4.4: POS di luar MVP awal (sudah ada).
- `docs/PRD.md` FR-SEC-002: role Kasir resmi, fitur POS/kasir ditunda ke fase berikutnya.
- `docs/ROADMAP.md` Fase 4: POS, payment record, receipt, discount, returns (fase berikutnya).
- `docs/RBAC.md` matriks: baris POS "Diluar MVP" untuk semua role.

## Hasil pemeriksaan
- Konsisten: Kasir role resmi; fitur POS/kasir ditunda ke fase berikutnya; tidak ada perubahan kode.

## Keterbatasan
- Tidak ada perubahan kode aplikasi; tidak ada build/typecheck ulang (tidak ada perubahan kode).
- Tidak ada commit/push.
- Keputusan yang masih TBD/PROPOSED tetap berlaku.
