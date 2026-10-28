# Change Records

Setiap unit perubahan yang dapat diverifikasi harus memiliki satu catatan di folder ini.

## Penamaan
`YYYY-MM-DD-NNN-short-slug.md`

- Tanggal menggunakan tanggal pekerjaan sebenarnya, bukan tanggal rencana.
- `NNN` adalah nomor urut yang unik pada tanggal tersebut.
- Jangan menimpa catatan perubahan lama.
- Folder evidence menggunakan ID yang sama tanpa ekstensi `.md`.

## Siklus status
`planned` → `in-progress` → `implemented` → `verified`; atau `blocked`/`reverted` sesuai kondisi nyata.

## Relasi
Setiap catatan harus merujuk requirement, dokumen domain, test report, evidence, dan commit jika tersedia. Untuk format, gunakan `../templates/CHANGE_TEMPLATE.md`.
