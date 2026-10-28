# Evidence: 2026-10-28-009 - Visual QA & Hydration Audit

- **Change ID:** 2026-10-28-009
- **Tanggal:** 2026-10-28
- **Jenis:** Audit visual + hydration + verifikasi

## 1. Audit awal (Stage 1)
- Repository state: tanpa commit (semua file untracked); tidak ada perubahan pengguna yang ditimpa.
- Screenshot Change 008 tersedia dan non-kosong:
  - `docs/evidence/2026-10-28-008-hero-photo-integration/screenshot-desktop-after.png` (1,003,689 bytes)
  - `docs/evidence/2026-10-28-008-hero-photo-integration/screenshot-mobile-after.png` (376,550 bytes)
- Warning hydration yang bisa direproduksi (dari log dev server sebelumnya dan run saat ini): `A tree hydrated but some attributes of the server rendered HTML didn't match the client properties` pada `<input>` komponen tracking, atribut `style={{caret-color:"transparent"}}`.

## 2. Visual QA (Stage 2)
- **Kemampuan inspeksi visual langsung:** TIDAK tersedia (model tidak mendukung input gambar). Screenshot tidak dapat ditinjau secara visual oleh agent.
- **Bukti visual yang disediakan (untuk review owner):**
  - `docs/evidence/2026-10-28-009-visual-qa-hydration-audit/screenshot-desktop.png` (1,004,665 bytes) — viewport 1440×900, full page.
  - `docs/evidence/2026-10-28-009-visual-qa-hydration-audit/screenshot-mobile.png` (376,555 bytes) — viewport 390×844, full page.
- **Checklist evaluasi (tidak dapat diverifikasi secara visual oleh agent; dicatat sebagai TBD/owner review):**
  - Komposisi foto & posisi subjek: TBD (owner review).
  - Crop & object-position desktop/mobile: TBD (owner review).
  - Keterbacaan heading/deskripsi/CTA di atas overlay: TBD (owner review).
  - Header Liquid Glass (transparansi, highlight, refleksi, border, shadow): TBD (owner review).
  - Rounded corners & keselarasan layout: TBD (owner review).
  - Dot indicators & perilaku slider: TBD (owner review).
  - Overflow horizontal mobile: TBD (owner review, screenshot tersedia).
  - Console errors & hydration warnings: direproduksi (lihat bagian 3).

## 3. Audit hydration mismatch (Stage 3)
- **Komponen:** `app/components/OrderTracking.tsx` — input tracking (`type="text"`, controlled `value={ticket}`).
- **Gejala:** warning React hydration mismatch; atribut yang berbeda: `style={{caret-color:"transparent"}}` ada di client, tidak ada di server.
- **Pemeriksaan kode:** `grep` "caret" di `app/` → **0 hasil**. Tidak ada kode proyek yang menetapkan `caret-color`.
- **Reproduksi:** warning muncul di log dev server saat Playwright memuat halaman (`GET /` 200), pada dua request (initial + reload).
- **Penyebab:** **eksternal/unresolved** — tidak berasal dari kode proyek. Kemungkinan sumber: injeksi browser/autofill/password manager atau perilaku dev environment. React sendiri menyarankan kemungkinan browser extension.
- **Keputusan:** tidak ada perubahan kode aplikasi. Tidak menerapkan workaround spekulatif. Status: **unresolved (external)**.
- **Opsi (jika owner setuju, di luar scope saat ini):** tambahkan `suppressHydrationWarning` pada input, atau tetapkan `style={{ caretColor: "auto" }}` agar SSR/client konsisten. Belum diimplementasikan.

## 4. Verifikasi (Stage 4)
- Typecheck: Passed (`npm run typecheck`).
- Build: Passed (`npm run build`, Next.js 16.4.3, Turbopack, route `/` static).
- Dev server & HTTP check: `npm run dev` + `GET /` → HTTP 200; path gambar muncul di HTML.
- Muat gambar lokal: `GET /images/hero/woman-repairing-laptop.jpg` → HTTP 200 (3,073,274 bytes).
- Console/hydration: warning direproduksi (lihat bagian 3).
- Screenshot terbaru: desktop 1,004,665 bytes; mobile 376,555 bytes.

## 5. Keterbatasan
- Visual inspection langsung tidak dapat dilakukan (model tidak mendukung input gambar); keterbatasan didokumentasikan dengan jelas.
- Penyebab hydration warning tidak dapat dipastikan secara definitif; status **unresolved** disertai bukti (grep source, log reproduksi).
- Lint: script tidak tersedia.
- Atribusi fotografer tidak diwajibkan lisensi (dicatat di `docs/ASSETS.md`).

## 6. Kesimpulan
- Audit visual + hydration selesai didokumentasikan. Visual inspection langsung tidak dapat dilakukan; screenshot disediakan untuk review owner.
- Hydration warning status: **unresolved (external)**, tidak memengaruhi fungsi (HTTP 200, input tetap berfungsi).
- Tidak ada perubahan kode aplikasi pada checkpoint ini.
- Status Change 008 tetap `verified` (tidak ditemukan bukti yang mengharuskan koreksi).
- Status Change 009: **in-progress** (keterbatasan didokumentasikan).
