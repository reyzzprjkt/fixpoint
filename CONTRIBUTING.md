# Contributing

## Workflow perubahan
1. Baca `AGENTS.md` dan dokumentasi domain yang relevan.
2. Tentukan requirement ID dan acceptance criteria.
3. Periksa `git status` dan diff sebelum mulai.
4. Buat rencana scope dan strategi pengujian.
5. Implementasikan perubahan sekecil mungkin.
6. Perbarui dokumentasi dan catatan perubahan.
7. Jalankan test/lint/typecheck/build yang relevan dan catat hasil aktual.
8. Ambil screenshot aktual untuk perubahan UI jika aplikasi dapat dijalankan.
9. Periksa diff, secret, dan file yang tidak sengaja ikut berubah.
10. Minta review sesuai risiko.

## Konvensi
- Requirement: `FR-<modul>-<nomor>` atau `NFR-<kategori>-<nomor>`.
- Catatan perubahan: `YYYY-MM-DD-NNN-slug.md`.
- ADR: `ADR-NNN-slug.md`.
- Bukti: `docs/evidence/<change-id>/`.
- Tanggal menggunakan format ISO `YYYY-MM-DD`.
- Gunakan bahasa yang jelas; dokumen utama dapat ditulis dalam Bahasa Indonesia.

## Git
- Jangan commit atau push tanpa instruksi eksplisit dari pemilik proyek.
- Jangan mengubah riwayat commit.
- Jangan menghapus file yang tidak dibuat oleh pekerjaan saat ini tanpa konfirmasi.
- Sebelum commit yang diminta, pastikan catatan perubahan dan pengujian sudah diperbarui.

## Review
Reviewer melaporkan temuan berdasarkan prioritas, lokasi file/baris, dampak, dan langkah reproduksi. Review tidak otomatis berarti temuan sudah diperbaiki.
