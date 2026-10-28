# Evidence: 2026-10-28-007 - FixPoint Hero Upgrade

- **Change ID:** 2026-10-28-007
- **Tanggal:** 2026-10-28
- **Jenis:** Verifikasi build/dev lokal + render halaman

## Hasil verifikasi

1. **Typecheck**
   - Perintah: `npm run typecheck`
   - Hasil: Passed.

2. **Build**
   - Perintah: `npm run build`
   - Hasil: Passed (Next.js 16.4.3, Turbopack; route `/` static).

3. **Halaman setelah perubahan hero**
   - Perintah: `npm run dev` + `GET /`
   - Hasil: Passed (HTTP 200), server dihentikan setelah verifikasi, port 3000 kembali bebas.

4. **Overlay hero**
   - Perubahan: penambahan `div[aria-hidden="true"]` dengan `bg-gradient-to-b from-blue-950/60 via-blue-900/25 to-indigo-800/55` di atas background gradient hero.
   - Status: terverifikasi tersedia dalam output HTML render (`GET /` 200).

5. **Screenshot (Playwright)**
   - Perintah: `npx playwright screenshot --viewport-size=1440,900 --full-page http://localhost:3000 .../screenshot-desktop-full.png`
   - Perintah: `npx playwright screenshot --viewport-size=390,844 --full-page http://localhost:3000 .../screenshot-mobile-full.png`
   - Hasil: File PNG berhasil dibuat (desktop: 531,956 bytes; mobile: 280,983 bytes) di folder `docs/evidence/2026-10-28-007-fixpoint-hero-upgrade/`.
   - Keterbatasan: visual inspection langsung oleh agent tidak dilakukan (model tidak mendukung input gambar); verifikasi berbasis capture file + render HTTP 200.
   - Catatan dev server: muncul warning React hydration mismatch pada komponen input tracking (kemungkinan penyebab browser extension / caret-color); tidak menghalangi render HTTP 200.


## Catatan desain pada checkpoint ini

- Hero: gradient placeholder (blue/indigo), rounded corners, overlay gelap adaptif, text putih, CTA pill, dot indicator.
- Overlay ditambahkan untuk menjaga keterbacaan teks/CTA di atas background.
- Indikator slider, transisi 700ms, dan `prefers-reduced-motion` (dari change 005) tetap aktif.

## Keterbatasan

- Screenshot browser belum dilakukan (tooling browser tidak tersedia pada checkpoint ini).
- Asset fotografi hero belum tersedia → gradient placeholder tetap digunakan.

## Kesimpulan

- Perbaikan/upgrade visual hero (overlay adaptif): **build lolos** dan halaman **terverifikasi render via HTTP 200**.
