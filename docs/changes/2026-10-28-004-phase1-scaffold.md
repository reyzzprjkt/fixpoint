# Change Record: 2026-10-28-004 - Phase 1 Scaffold

## Metadata
- **ID:** 2026-10-28-004
- **Tanggal:** 2026-10-28
- **Status:** verified
- **Kategori:** Feature
- **Penanggung jawab:** Agent Audit
- **Terkait requirement:** FR-WEB-001/002/004, NFR-*
- **Risk level:** Low

## Alasan
Menerapkan fondasi aplikasi dasar pada checkpoint Phase 1 untuk persiapan implementasi MVP (Phase 3).

## Scope
### Termasuk
- Scaffold Next.js App Router + TypeScript.
- Tailwind CSS v4.
- Halaman awal FixPoint (sederhana, responsif, sesuai tujuan bisnis).
- Konfigurasi dasar (`next.config.ts`, `tsconfig.json`, `postcss.config.mjs`).
- `.gitignore` dan `.env.example` aman.

### Tidak termasuk
- Fitur servis, POS, inventaris, membership, B2B.
- Database, migrasi, autentikasi, backend.

## Perubahan
- File terdampak: `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.gitignore`, `.env.example`.
- `tsconfig.json` diperbarui otomatis oleh Next.js saat build (`jsx: react-jsx`, include `.next/dev/types`).

## Risiko
- **Rendah** — install dependency lokal dan scaffold dokumentasi aplikasi. Tidak mengubah konfigurasi global/produksi.

## Pengujian Aktual
| Pemeriksaan | Perintah | Hasil aktual | Status |
|---|---|---|---|
| Typecheck | `npm run typecheck` (tsc --noEmit) | Passed (exit 0) | Passed |
| Build | `npm run build` (Next.js 16.4.3, Turbopack) | Passed; route `/` + `/_not-found` static ter-generate | Passed |
| Dev server & halaman | `npm run dev` + HTTP fetch `GET /` | Ready di :3000; HTTP 200; HTML berisi konten halaman awal; Tailwind CSS ter-load | Passed |

## Evidence
- **Lokasi:** `docs/evidence/2026-10-28-004-phase1-scaffold/`
- **Tipe:** Verifikasi build/dev lokal

## Tindak Lanjut
- Checkpoint berikutnya: setup database lokal + Prisma + migrasi (sesuai keputusan Owner).

## Catatan
- Belum ada auth, database, migrasi, atau fitur servis pada checkpoint ini.
- `next dev` menulis blok otomatis ke `AGENTS.md`; telah dikembalikan ke keadaan semula setelah verifikasi.
- Belum ada screenshot UI (verifikasi HTML via HTTP fetch; browser/screenshot belum tersedia pada checkpoint ini).
