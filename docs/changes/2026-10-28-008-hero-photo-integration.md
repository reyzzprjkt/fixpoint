# Change Record: 2026-10-28-008 - Hero Photo Integration

## Metadata
- **ID:** 2026-10-28-008
- **Tanggal:** 2026-10-28
- **Status:** verified
- **Kategori:** UI / aset
- **Penanggung jawab:** Agent Audit
- **Terkait requirement:** FR-WEB-001, NFR-*
- **Risk level:** Low

## Alasan
Owner menyetujui kandidat No. 1 (foto "Woman repairing a laptop at desk with tools" dari Pexels, fotografer Mediahooch Pixels). Implementasi: aset diunduh dari sumber resmi, disimpan lokal, dan diintegrasikan ke hero `app/components/HeroSlider.tsx` tanpa merombak desain yang sudah ada.

## Scope
### Termasuk
- Verifikasi ulang ketersediaan foto dan lisensi via halaman Pexels.
- Unduhan file gambar asli ke `public/images/hero/`.
- Integrasi foto ke hero (object-cover, object-center, overlay untuk keterbacaan).
- Dokumentasi aset di `docs/ASSETS.md`.

### Tidak termasuk
- Perubahan desain hero selain penggantian media latar.
- Backend, database, auth, tracking, membership.

## Perubahan
- Aset: `public/images/hero/woman-repairing-laptop.jpg` (3,073,274 bytes, 6240×4160).
- Kode: `app/components/HeroSlider.tsx` — penggantian background gradient dengan `<img>` (object-cover, object-center, eager loading) + overlay `from-slate-950/70 via-slate-900/35 to-slate-900/55`.
- Dokumentasi: `docs/ASSETS.md` (catatan aset + sumber + lisensi).

## Hasil riset (checkpoint ini)

- Sumber stock photography: Pexels (https://www.pexels.com/).
- Ketentuan lisensi resmi: https://www.pexels.com/license/ (Free; komersial diizinkan; atribusi tidak wajib).
- Kandidat penelusuran (maksimal 5) dan hasilnya: `docs/evidence/2026-10-28-008-hero-photo-integration/stock-research.md`.
- Kandidat terbaik dari segi orientasi hero lebar: No. 1 (woman repairing laptop, 3:2 landscape).

## Risiko
- **Rendah** — tidak ada perubahan aplikasi yang diklaim.

## Pengujian Aktual
| Pemeriksaan | Perintah | Hasil | Status |
|---|---|---|---|
| Typecheck | `npm run typecheck` | Passed | ✅ |
| Build | `npm run build` | Passed (Next.js 16.4.3, Turbopack, route `/` static) | ✅ |
| Muat gambar lokal | `GET /images/hero/woman-repairing-laptop.jpg` | HTTP 200 (3,073,274 bytes) | ✅ |
| Dev server & halaman | `npm run dev` + `GET /` | HTTP 200; HTML memuat path gambar | ✅ |
| Screenshot | `npx playwright screenshot` (desktop & mobile) | File PNG terhasil (desktop 1,003,689 bytes; mobile 376,550 bytes) | ✅ (capture) |
| Lint | — | Script tidak tersedia | ⏭ skipped |

## Evidence
- **Lokasi:** `docs/evidence/2026-10-28-008-hero-photo-integration/`
- **File:** `asset-source-audit.md`, `stock-research.md`, `integration-verification.md`, `screenshot-desktop-after.png`, `screenshot-mobile-after.png`
- **Tipe:** Audit aset + riset + integrasi + verifikasi visual

## Tindak Lanjut
- Tidak ada (integrasi selesai). Opsional: penyesuaian overlay/crop lebih lanjut berdasarkan review owner.

## Catatan
- Audit: tidak ada file gambar (`*.jpg/jpeg/png/webp/gif/svg`) di repository sebelumnya; tidak ada direktori `public/`/`assets`/`images` berbasis brand; kebijakan imagery di `docs/UI_UX_GUIDELINES.md` masih TBD.
- Riset: kandidat dari Pexels; lisensi Free — penggunaan komersial diizinkan, atribusi tidak wajib (diverifikasi di https://www.pexels.com/license/).
- Integrasi selesai: aset disimpan lokal dan diintegrasikan ke hero.
- Catatan verifikasi: dev server menulis warning React hydration mismatch pada komponen input tracking (`caret-color`); tidak menghalangi render HTTP 200 dan tidak terkait dengan foto.
- Visual inspection langsung oleh agent tidak dilakukan (model tidak mendukung input gambar); bukti berbasis capture file + render HTTP 200.
