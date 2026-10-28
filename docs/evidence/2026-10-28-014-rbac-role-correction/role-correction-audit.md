# Evidence: 2026-10-28-014 - RBAC Role Correction

- **Change ID:** 2026-10-28-014
- **Tanggal:** 2026-10-28
- **Jenis:** Audit koreksi role

## Verifikasi pencarian string

Pencarian "Teknisi"/"technician" di seluruh repository (file .md/.tsx/.ts/.css/.json) menunjukkan sisa referensi hanya pada:
- Deskripsi foto di `docs/evidence/.../stock-research.md` (judul foto Pexels, bukan role RBAC).
- Alt text hero di `app/components/HeroSlider.tsx` ("Teknisi wanita memperbaiki laptop...") — deskripsi foto, bukan role.
- Tidak ada lagi role "Teknisi" di `docs/RBAC.md`.

## Hasil pemeriksaan

- `docs/RBAC.md`: role resmi Owner, Admin, Kasir; role Teknisi dihapus; tugas pengerjaan teknis ditandai TBD.
- `docs/PRD.md`: referensi role Teknisi dihapus; tugas pengerjaan teknis TBD.
- `docs/ROADMAP.md`: referensi role Teknisi dihapus.
- `docs/DATABASE_SCHEMA.md`: "Penugasan teknisi" → "Penugasan pelaksana (role TBD)".
- `docs/changes/2026-10-28-002-...`: referensi disesuaikan.
- `docs/changes/2026-10-28-013-...`: catatan koreksi ditambahkan.
- `docs/evidence/2026-10-28-011-...`: audit-report dan decision-matrix disesuaikan.
- `docs/evidence/2026-10-28-013-.../auth-rbac-evaluation.md`: matriks Owner/Admin/Kasir.

## Typecheck & build
- `npm run typecheck`: Passed.
- `npm run build`: Passed (Next.js 16.4.3, Turbopack, route `/` static).

## Keterbatasan
- Tidak ada perubahan kode aplikasi.
- Visual inspection langsung tidak dapat dilakukan (model tidak mendukung input gambar).
- Tidak ada commit/push.
