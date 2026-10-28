# Evidence: 2026-10-28-008 - Hero Photo Integration

- **Change ID:** 2026-10-28-008
- **Tanggal:** 2026-10-28
- **Jenis:** Verifikasi integrasi foto hero

## Hasil verifikasi

1. **Typecheck**
   - Perintah: `npm run typecheck`
   - Hasil: Passed.

2. **Build**
   - Perintah: `npm run build`
   - Hasil: Passed (Next.js 16.4.3, Turbopack; route `/` static).

3. **Muat gambar lokal**
   - URL: `http://localhost:3000/images/hero/woman-repairing-laptop.jpg`
   - Hasil: HTTP 200 (3,073,274 bytes).

4. **Render halaman**
   - Perintah: `npm run dev` + `GET /`
   - Hasil: HTTP 200; HTML memuat path gambar.

5. **Screenshot (Playwright)**
   - Desktop (1440×900, full page): `docs/evidence/2026-10-28-008-hero-photo-integration/screenshot-desktop-after.png` (1,003,689 bytes).
   - Mobile (390×844, full page): `docs/evidence/2026-10-28-008-hero-photo-integration/screenshot-mobile-after.png` (376,550 bytes).

## Catatan desain pada checkpoint ini

- Hero: foto Pexels (woman repairing laptop), object-cover/object-center, rounded-3xl, overlay slate gelap adaptif, text putih, CTA pill, dot indicator.
- Floating Liquid Glass header tetap; rounded corners konsisten; indikator titik tanpa panah/nomor; transisi dan reduced motion tetap.

## Keterbatasan

- Visual inspection langsung oleh agent tidak dilakukan (model tidak mendukung input gambar); verifikasi berbasis capture file + render HTTP 200.
- Dev server menulis warning React hydration mismatch pada komponen input tracking (`caret-color`); tidak menghalangi render HTTP 200 dan tidak terkait dengan foto.

## Kesimpulan

- Integrasi foto hero: **build lolos**, gambar **terverifikasi muat lokal**, halaman **HTTP 200**, screenshot **berhasil diambil**.
