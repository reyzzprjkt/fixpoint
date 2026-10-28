# Change Record: 2026-10-28-003 - Phase 3 Critical TBD Resolution

## Metadata
- **ID:** 2026-10-28-003
- **Tanggal:** 2026-10-28
- **Status:** implemented
- **Kategori:** Dokumentasi
- **Penanggung jawab:** Agent Audit
- **Terkait requirement:** FR-SRV-001 s/d FR-SRV-010, FR-SEC-001 s/d FR-SEC-004, NFR-*
- **Risk level:** Low

## Alasan
Menyelesaikan lima TBD kritis yang menjadi dasar persiapan implementasi Phase 3, dengan ketegasan bahwa keputusan yang belum dikunci pemilik bisnis ditandai PROPOSED/TBD, bukan keputusan final.

## Scope
### Termasuk
- Merumuskan status tiket servis dan transisi valid usulan.
- Merumuskan matriks izin Admin/Tekniste untuk MVP.
- Merumuskan mekanisme dan mitigasi pelacakan publik.
- Merumuskan field minimum tiket servis.
- Menyelesaikan evaluasi awal autentikasi (Better Auth/Auth.js) dengan catatan batasan verifikasi.

### Tidak termasuk
- Implementasi aplikasi, database production, dependency baru, atau perubahan konfigurasi global.
- Persetujuan final pemilik bisnis untuk keputusan yang masih menunggu.

## Perubahan
- **File terdampak:**
  - `docs/PRD.md`
  - `docs/RBAC.md`
  - `docs/DATABASE_SCHEMA.md`
  - `docs/SECURITY.md`
  - `docs/TESTING_STRATEGY.md`
  - `CHANGELOG.md`
- **Ringkasan:**
  - PRD: status tiket 9 kode + transisi valid + alur utama + pembatalan + riwayat + keputusan pending; tracking publik ditandai PROPOSED; FR-SRV-006 diperluas; FR-SRV-007 memperjelas validasi transisi di server.
  - RBAC: matriks tiket MVP diperluas menjadi baris terpisah (buat, lihat, diagnosa, progres/status, estimasi, approval, batal, tutup) dengan nilai PROPOSED dan catatan persetujuan Owner.
  - DATABASE_SCHEMA: field minimum tiket MVP dengan klasifikasi wajib/opsional/kondisional.
  - SECURITY: mitigasi mekanisme public tracking (anti-enumerasi, rate limit, respons kegagalan, rotasi token, pembatasan field).
  - TESTING_STRATEGY: prioritas test 9 dan 10 (transisi status tiket, pelacakan publik).

## Risiko
- **Rendah** - Hanya perubahan dokumentasi. Tidak mengubah kode aplikasi, dependency, atau konfigurasi global.

## Pengujian Aktual
| Pemeriksaan | Perintah/prosedur | Hasil aktual | Status |
|---|---|---|---|
| Struktur heading PRD | `findstr /n "^## " docs/PRD.md` | Berhasil; urutan heading konsisten 1-11 | Passed (manual) |
| Referensi status `ANY_OPEN` | `Select-String docs/PRD.md -Pattern "ANY_OPEN"` | Tidak ada keberadaan | Passed (manual) |
| Ketersediaan kode status tiket | `Select-String docs/PRD.md -Pattern "<status>"` | Semua kode status terreferens | Passed (manual) |
| Konsistensi tautan dokumen | Pemeriksaan bagian Referensi pada `docs/PRD.md` | File yang dirujuk tersedia | Passed (manual) |
| Verifikasi aplikasi/testing | Belum dijalankan | Implementasi belum dimulai | Not run |

## Evidence
- **Lokasi:** `docs/evidence/2026-10-28-003-phase3-tbd-resolution/`
- **Tipe:** Verifikasi konsistensi dokumentasi

## Tindak Lanjut
- Kunci keputusan Owner untuk: status final/tren tiket, RBAC final, mekanisme tracking final, field minimum final, provider autentikasi, MFA, sesi Owner.
- Evaluasi kompatibilitas library auth (Better Auth/Auth.js) setelah dependency aktual dan source resmi dapat diperiksa.

## Catatan
Tidak ada coding fitur aplikasi, tidak ada perubahan dependency/config global. Semua keputusan baru yang ditulis dalam change ini bersifat PROPOSED/TBD dan memerlukan persetujuan pemilik.
