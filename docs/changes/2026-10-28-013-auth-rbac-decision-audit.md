# Change Record: 2026-10-28-013 - Authentication & RBAC Decision Audit

## Metadata
- **ID:** 2026-10-28-013
- **Tanggal:** 2026-10-28
- **Status:** verified
- **Kategori:** Dokumentasi / Audit
- **Penanggung jawab:** Agent Audit
- **Terkait requirement:** FR-SEC-*, NFR-SEC-*
- **Risk level:** Low

## Alasan
Menyiapkan keputusan autentikasi dan permission matrix untuk MVP FixPoint sebelum implementasi backend. Hanya audit dan perencanaan; tidak ada implementasi.

## Scope
### Termasuk
- Evaluasi Better Auth vs Auth.js berdasarkan dokumentasi resmi (web fetch).
- Penyusunan permission matrix MVP (Owner/Admin/Kasir; role pelaksana teknis TBD — lihat Change 014).
- Daftar pertanyaan owner yang membutuhkan persetujuan.
- Pembaruan SYSTEM_DESIGN §2 (auth row).

### Tidak termasuk
- Implementasi backend, API, autentikasi, migrasi, database.
- Perubahan perilaku aplikasi.
- Penambahan dependency.
- Commit/push.

## Perubahan
- `docs/SYSTEM_DESIGN.md` (auth row → PROPOSED, evaluasi documented).
- `docs/changes/2026-10-28-013-auth-rbac-decision-audit.md` (baru).
- `docs/evidence/2026-10-28-013-auth-rbac-decision-audit/` (auth-rbac-evaluation.md, owner-questions.md).
- `CHANGELOG.md` (entri Change 013).

## Risiko
- **Rendah** — hanya dokumentasi.

## Pengujian Aktual
- Tidak ada pengujian aplikasi (tidak ada perubahan kode).
- Verifikasi: file dokumentasi dibuat sesuai struktur kebijakan proyek; evaluasi berbasis sumber resmi (Better Auth docs, Auth.js docs).

## Evidence
- **Lokasi:** `docs/evidence/2026-10-28-013-auth-rbac-decision-audit/`
- **File:** `auth-rbac-evaluation.md`, `owner-questions.md`
- **Tipe:** Audit autentikasi & RBAC

## Tindak Lanjut
- Tunggu keputusan owner (pilihan autentikasi, MFA, session duration, Admin mengelola akun/izin, batas akses audit log, dll.).
- Setelah keputusan, lanjut ke checkpoint implementasi auth.

## Catatan
- Auth.js bergabung ke Better Auth (sumber: halaman resmi Auth.js). Better Auth direkomendasikan, tetapi pilihan final TBD sampai dikonfirmasi owner.
- Permission matrix bersifat usulan (PROPOSED), bukan keputusan final.
- Tidak ada dependency yang ditambahkan.
- Tidak ada commit/push.
- Koreksi (Change 014): role "Teknisi" sebelumnya muncul sebagai usulan/asumsi dalam audit dan permission matrix Change 013, tetapi bukan keputusan owner. Berdasarkan keputusan owner terbaru, role resmi sistem hanya Owner, Admin, dan Kasir; role "Teknisi" bukan role sistem. Referensi role Teknisi di dokumentasi telah dikoreksi pada Change 014.
