# Documentation Policy

## 1. Tujuan
Menjadikan dokumentasi sebagai bagian wajib dari perubahan software sehingga keputusan, implementasi, pengujian, dan bukti dapat ditelusuri.

## 2. Perubahan yang memerlukan catatan
Buat catatan perubahan untuk:
- Feature baru.
- Bugfix.
- Refactor signifikan.
- Perubahan API atau kontrak data.
- Perubahan database/migration.
- Perubahan permission/security.
- Perubahan konfigurasi/infrastruktur/deployment.
- Perubahan UI yang bermakna.
- Perubahan dependency yang berdampak.
Beberapa edit kecil yang merupakan satu pekerjaan dapat dikelompokkan menjadi satu change record.

## 3. Isi minimum change record
Gunakan `templates/CHANGE_TEMPLATE.md`. Wajib mencakup ID, tanggal, status, alasan, scope/requirement, file terdampak, ringkasan, risiko, test aktual, evidence, tindak lanjut, dan commit jika tersedia.

## 4. Bukti sesuai jenis perubahan
- UI: screenshot aktual before/after jika before tersedia; desktop/mobile sesuai perubahan.
- Backend: test report, request/response tersamarkan, atau bukti integrasi yang relevan.
- Database: migration result dan pemeriksaan integritas pada environment yang aman.
- Security: hasil test skenario, scan, atau review dengan keterbatasan dicatat.
- Config/infra: diff konfigurasi, hasil validasi, health check atau deployment evidence.
- Dokumentasi murni: link checker/lint bila tersedia dan pemeriksaan isi/diff.
Tidak semua perubahan memerlukan screenshot. Semua perubahan memerlukan bukti verifikasi yang masuk akal.

## 5. Lokasi bukti
`docs/evidence/<change-id>/`

Gunakan nama file deskriptif, misalnya:
- `before-desktop.png`
- `after-desktop.png`
- `after-mobile.png`
- `test-results.md`
- `migration-check.txt`
- `security-check.md`

Jangan menyimpan secret, token, data pribadi nyata, atau informasi sensitif di bukti. Gunakan data dummy/sanitasi.

## 6. Status
- `planned`: direncanakan, belum dimulai.
- `in-progress`: sedang dikerjakan.
- `implemented`: perubahan dibuat, belum semua verifikasi selesai.
- `verified`: acceptance criteria dan verifikasi relevan telah berhasil.
- `blocked`: terhambat; alasan dicatat.
- `reverted`: perubahan dibatalkan/dikembalikan.

## 7. Definition of Done
Pekerjaan tidak boleh berstatus selesai/verified jika:
- Dokumentasi yang terdampak belum diperbarui.
- Change record belum tersedia.
- Test relevan belum dijalankan atau keterbatasannya tidak dijelaskan.
- Bukti visual untuk UI yang dapat dijalankan belum ada dan tidak ada alasan.
- Klaim tidak sesuai hasil aktual.
- Requirement dan acceptance criteria tidak dapat ditelusuri.

## 8. Changelog dan ADR
- `CHANGELOG.md` merangkum perubahan yang bermakna.
- ADR menyimpan keputusan arsitektur dan konteks mengapa keputusan dibuat.
- Change record menyimpan rincian satu unit pekerjaan.
Ketiganya saling melengkapi dan tidak saling menggantikan.

## 9. Kualitas
Hindari duplikasi; update hanya dokumen yang terdampak. Gunakan link relatif dan ID requirement. Jangan menghapus histori kecuali ada alasan yang disetujui.
