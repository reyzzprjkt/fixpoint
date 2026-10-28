# Change Record: 2026-10-28-010 - Accent Restore

## Metadata
- **ID:** 2026-10-28-010
- **Tanggal:** 2026-10-28
- **Status:** verified
- **Kategori:** UI
- **Penanggung jawab:** Agent Audit
- **Terkait requirement:** FR-WEB-001, NFR-*
- **Risk level:** Low

## Alasan
Mengembalikan identitas visual aksen biru cerah (blue-600, #2563eb) pada CTA header "Track Order" yang sebelumnya menggunakan `bg-ink` (abu-abu gelap), agar konsisten dengan aksen biru yang digunakan pada OrderTracking, ServiceSection, Membership, dan Alur Servis.

## Scope
### Termasuk
- Perubahan warna tombol "Track Order" di header dari `bg-ink` menjadi `bg-blue-600` (hover `bg-blue-700`).
- Dokumentasi perubahan dan verifikasi.

### Tidak termasuk
- Perubahan backend, database, autentikasi, tracking, membership.
- Perubahan desain lain di luar aksen CTA header.

## Perubahan
- `app/components/Header.tsx` — CTA "Track Order": `bg-ink ... hover:bg-ink/90` → `bg-blue-600 ... hover:bg-blue-700`.

## Sumber penentuan warna
- Token aksen asli: `app/globals.css` → `--color-accent: #2563eb` (blue-600) yang sudah ada sejak redesign (Change 005) dan digunakan konsisten di seluruh komponen (OrderTracking button, service icons, membership, alur servis, focus ring blue-500).
- Sumber asli: Tailwind utility `blue-600` (#2563eb) yang sudah digunakan di `app/components/OrderTracking.tsx`, `ServiceSection.tsx`, `Membership.tsx`, `page.tsx`.

## Risiko
- **Rendah** — perubahan warna CTA saja.

## Pengujian Aktual
| Pemeriksaan | Perintah | Hasil | Status |
|---|---|---|---|
| Typecheck | `npm run typecheck` | Passed | ✅ |
| Build | `npm run build` | Passed (Next.js 16.4.3, Turbopack, `/` static) | ✅ |
| Dev server & halaman | `npm run dev` + `GET /` | HTTP 200; HTML memuat `bg-blue-600` pada tombol Track Order | ✅ |
| Screenshot | `npx playwright screenshot` (desktop & mobile) | File PNG terhasil (desktop 1,003,708 B; mobile 376,083 B) | ✅ (capture) |
| Visual inspection langsung | — | Tidak dapat dilakukan (model tidak mendukung input gambar) | ❌ not run (keterbatasan) |
| Lint | — | Script tidak tersedia | ⏭ skipped |

## Evidence
- **Lokasi:** `docs/evidence/2026-10-28-010-accent-restore/`
- **File:** `screenshot-desktop.png`, `screenshot-mobile.png`
- **Tipe:** Verifikasi build/dev + screenshot

## Catatan
- Foto hero lokal dan overlay tetap dipertahankan.
- Header Liquid Glass tetap; hanya warna CTA yang dikembalikan ke aksen biru cerah.
- Visual inspection langsung tidak dapat dilakukan; screenshot disediakan untuk review owner.
- Hydration warning (caret-color) dari Change 009 tetap unresolved (eksternal); tidak terkait dengan perubahan ini.
