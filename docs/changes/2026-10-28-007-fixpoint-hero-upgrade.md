# Change Record: 2026-10-28-007 - FixPoint Hero Upgrade

## Metadata
- **ID:** 2026-10-28-007
- **Tanggal:** 2026-10-28
- **Status:** verified
- **Kategori:** UI
- **Penanggung jawab:** Agent Audit
- **Terkait requirement:** FR-WEB-001, NFR-*
- **Risk level:** Low

## Alasan
Meningkat kualitas visual hero slider pada homepage FixPoint sesuai arahan desain owner (Material Design, Liquid Glass, putih cerah, aksen biru, minimalis premium) setelah redesign awal (change 005).

## Scope
### Termasuk
- Menambahkan overlay gradient adaptif di atas background hero agar teks dan CTA selalu terbaca dengan baik.
- Menjaga struktur slider (dot indicator saja, tanpa panah/nomor), transisi, dan `prefers-reduced-motion`.

### Tidak termasuk
- Penggantian gradient placeholder dengan asset fotografi nyata.
- Backend, database, auth, fitur servis, business rules, payment/subscription.

## Perubahan
- File terdampak: `app/components/HeroSlider.tsx` (penambahan overlay gradient adaptif).

## Risiko
- **Rendah** — perubahan styling/overlay saja.

## Pengujian Aktual
| Pemeriksaan | Perintah | Hasil | Status |
|---|---|---|---|
| Typecheck | `npm run typecheck` | Passed | Passed |
| Build | `npm run build` | Passed (Next.js 16.4.3, Turbopack, route `/` static) | Passed |
| Dev server & halaman | `npm run dev` + `GET /` | HTTP 200; overlay + slider terkonfirmasi di HTML | Passed |

## Evidence
- **Lokasi:** `docs/evidence/2026-10-28-007-fixpoint-hero-upgrade/design-verification.md`
- **Tipe:** Verifikasi build/dev lokal + render halaman + screenshot Playwright

## Tindak Lanjut
- Mengganti gradient placeholder hero dengan asset fotografi nyata (opsional pada tahap ini; asset belum tersedia).
- Implementasi backend tracking, membership aktif, auth, database.

## Catatan
- Hero saat ini memakai gradient placeholder (`blue-400 → blue-600 → indigo-700`) dengan overlay gradient gelap adaptif.
- Indikator slider, transisi, dan reduced motion berada pada state sebelumnya (change 005) dan tetap berlaku.

## Screenshot
- Desktop (viewport 1440x900): `docs/evidence/2026-10-28-007-fixpoint-hero-upgrade/screenshot-desktop-full.png`
- Mobile (viewport 390x844): `docs/evidence/2026-10-28-007-fixpoint-hero-upgrade/screenshot-mobile-full.png`
- Catatan: visual inspection langsung belum dilakukan oleh agent (keterbatasan model); capture file berhasil dibuat via Playwright.
- Asset fotografi hero nyata masih TBD (placeholder gradient masih berlaku).
