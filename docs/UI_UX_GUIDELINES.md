# UI/UX Guidelines

- Status: proposed design baseline.
- Skill lokal yang relevan: `frontend-design`, `web-design-guidelines`, `microinteractions`, `vercel-react-best-practices`.

## 1. Prinsip visual
- Buat identitas visual konsisten dan spesifik untuk bisnis FixPoint; hindari tampilan template generik.
- Tentukan warna, tipografi, spacing, radius, elevasi, dan icon style sebagai design tokens sebelum banyak halaman dibangun.
- Gunakan hierarki yang jelas dan prioritaskan keterbacaan.
- Jangan mengarang logo, testimoni, rating, sertifikasi, atau klaim layanan.
- Konten bisnis dan identitas visual resmi masih TBD.

## 2. Responsive dan aksesibilitas
- Prioritaskan layout mobile-friendly dan uji breakpoint utama.
- Gunakan elemen semantik, label form yang jelas, keyboard navigation, focus indicator, dan contrast memadai.
- Jangan menyampaikan status hanya dengan warna.
- Error harus menjelaskan cara memperbaiki input.
- Target konformansi aksesibilitas formal: TBD.

## 3. State UI
Komponen interaktif yang relevan harus menangani:
- Loading/pending.
- Empty.
- Success.
- Validation error.
- Server/network error.
- Disabled dan permission-denied state.
- Confirmation untuk aksi destruktif atau berdampak finansial.

## 4. Microinteractions
- Feedback harus membantu pengguna memahami hasil tindakan.
- Animasi tidak boleh memperlambat alur kerja atau menghalangi aksesibilitas.
- Hormati reduced-motion preference.
- Hindari animasi dekoratif berlebihan pada dashboard operasional.
- Setiap interaksi penting harus memiliki feedback yang jelas dan state yang konsisten.

## 5. Dashboard operasional
- Optimalkan alur kerja yang sering dilakukan: mencari tiket, memperbarui status, transaksi POS, cek stok.
- Tabel harus mudah dipindai dan mendukung empty/error/loading state.
- Aksi berisiko seperti refund, penghapusan, atau koreksi stok perlu konfirmasi dan audit.
- Jangan menampilkan data atau tindakan yang tidak diizinkan oleh role; tetap tegakkan izin di server.

## 6. Bukti visual
Untuk setiap perubahan UI yang dapat dijalankan, dokumentasikan screenshot aktual pada desktop dan mobile bila relevan. Simpan bukti di `docs/evidence/<change-id>/`. Jangan membuat screenshot palsu atau mengklaim mockup sebagai aplikasi berjalan.

## 7. Performance
- Utamakan komponen yang tepat, data fetching efisien, dan minimalkan JavaScript client yang tidak diperlukan.
- Gunakan `vercel-react-best-practices` saat melakukan review React/Next.js yang relevan.
- Catat pengukuran nyata sebelum menyatakan peningkatan performa.

## 8. TBD
Logo, palette, typography, brand tone, imagery policy, breakpoint resmi, accessibility target, browser/device support.
