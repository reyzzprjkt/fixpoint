# Change Record: 2026-10-28-005 - FixPoint Home Redesign

## Metadata
- **ID:** 2026-10-28-005
- **Tanggal:** 2026-10-28
- **Status:** verified
- **Kategori:** UI
- **Penanggung jawab:** Agent Audit
- **Terkait requirement:** FR-WEB-001, NFR-*
- **Risk level:** Low

## Alasan
Menerapkan arahan desain owner untuk homepage FixPoint: Material Design dengan rounded corners, Liquid Glass, latar putih cerah, aksen biru terang, minimalis premium.

## Scope
### Termasuk
- Redesign header menjadi floating pill navigation (Liquid Glass).
- Redesign hero menjadi slider dengan background gradient placeholder.
- Menambahkan komponen order tracking UI (tanpa backend).
- Menambahkan service section, membership UI, alur servis, kontak, footer pada halaman utama.

### Tidak termasuk
- Backend, database, auth, fitur servis, business rules, payment/subscription.

## Perubahan
- File terdampak: `app/globals.css`, `app/page.tsx`, `app/components/Header.tsx`, `app/components/HeroSlider.tsx`, `app/components/OrderTracking.tsx`, `app/components/ServiceSection.tsx`, `app/components/Membership.tsx`.

## Risiko
- **Rendah** — perubahan UI/halaman awal saja.

## Pengujian Aktual
| Pemeriksaan | Perintah | Hasil | Status |
|---|---|---|---|
| Typecheck | `npm run typecheck` | Passed | Passed |
| Build | `npm run build` | Passed (Next 16.4.3, Turbopack) | Passed |
| Dev server & halaman | `npm run dev` + `GET /` | Perlu dikonfirmasi setelah redesign | Pending |

## Evidence
- **Lokasi:** `docs/evidence/2026-10-28-005-fixpoint-home-redesign/`
- **Tipe:** Verifikasi build/dev lokal

## Tindak Lanjut
- Mengganti gradient placeholder hero dengan asset fotografi nyata.
- Implementasi backend tracking, membership, auth, database.

## Catatan
- Hero saat ini memakai gradient placeholder (asset fotografi belum tersedia).
- Order tracking adalah UI form tanpa backend (pernyataan jelas).
- Membership menampilkan harga/benefit TBD.
