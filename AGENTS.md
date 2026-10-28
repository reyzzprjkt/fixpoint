# Instruksi Agent dan Kontributor

## Tujuan
Instruksi ini berlaku untuk seluruh agent dan kontributor yang bekerja pada repository FixPoint. Dokumen ini adalah aturan proyek, bukan bukti bahwa aplikasi sudah diimplementasikan.

## Sebelum bekerja
1. Baca dokumen relevan di `docs/`; minimal `docs/PRD.md`, `docs/ROADMAP.md`, dan `docs/DOCUMENTATION_POLICY.md` untuk pekerjaan fitur.
2. Periksa kondisi repository dan perubahan yang sudah ada sebelum mengedit.
3. Hubungkan pekerjaan dengan ID requirement `FR-*` atau `NFR-*`. Jika tidak ada requirement yang cocok, usulkan requirement terlebih dahulu.
4. Tulis rencana singkat, file yang akan terdampak, cara pengujian, dan bukti yang diharapkan.
5. Jangan mengasumsikan keputusan yang belum disetujui. Gunakan `TBD` atau minta keputusan.

## Saat mengerjakan
- Kerjakan hanya scope yang disetujui; hindari refactor yang tidak diperlukan.
- Jangan menambahkan dependency, layanan eksternal, atau perubahan arsitektur tanpa alasan dan dokumentasi.
- Validasi input dan terapkan otorisasi di sisi server untuk setiap operasi yang dilindungi.
- Jangan menganggap penyembunyian elemen UI sebagai kontrol keamanan.
- Jangan memasukkan secret, token, kredensial, atau data pribadi pelanggan ke source control, log, screenshot, maupun dokumentasi.
- Jangan melakukan commit, push, deploy, penghapusan data, atau operasi destruktif kecuali diminta secara eksplisit.
- Gunakan skill yang relevan saja. Jangan memuat semua skill untuk setiap tugas.
- Panggil subagent hanya jika manfaatnya jelas; jangan membuat rantai agent yang tidak diperlukan.

## Setelah mengubah sesuatu
1. Perbarui dokumentasi yang terdampak.
2. Buat atau perbarui satu catatan pekerjaan di `docs/changes/` untuk setiap unit perubahan yang dapat diverifikasi.
3. Jalankan pengujian relevan dan catat perintah, hasil aktual, serta keterbatasannya.
4. Untuk perubahan UI, simpan screenshot aktual sebelum/sesudah jika kondisi sebelum tersedia, serta tampilan desktop/mobile yang relevan.
5. Untuk backend/database/security, simpan bukti pengujian yang sesuai dan sudah disamarkan.
6. Periksa `git diff`, tautan dokumentasi, dan status file.
7. Jangan menyebut `verified` atau `passed` jika belum menjalankan verifikasi terkait. Jika terhalang, tandai `blocked` atau `not run` dan jelaskan alasannya.

## Definition of Done
Pekerjaan hanya boleh dinyatakan selesai jika:
- Acceptance criteria yang disetujui terpenuhi.
- Dokumentasi terkait diperbarui.
- Catatan perubahan tersedia dan statusnya akurat.
- Pengujian relevan dijalankan atau alasan tidak dijalankan dijelaskan.
- Bukti sesuai jenis perubahan tersedia, atau ketiadaannya dan alasannya tercatat.
- Tidak ada secret/data sensitif yang bocor.
- Review perubahan selesai sesuai risiko.

## Batasan
- Dokumen ini tidak memberikan izin otomatis untuk mengubah konfigurasi global OpenCode.
- Agent tidak boleh mengklaim aplikasi, database, integrasi, atau deployment tersedia sebelum ada bukti aktual.
- Jika instruksi saling bertentangan, hentikan perubahan berisiko dan minta klarifikasi.
