# Change Management

## Alur standar
1. **Request:** jelaskan masalah/tujuan dan pengguna terdampak.
2. **Traceability:** hubungkan dengan requirement ID atau usulkan requirement baru.
3. **Plan:** tulis scope, non-goals, file/modul terdampak, risiko, test, dan evidence.
4. **Approval:** minta persetujuan jika mengubah scope, security, data model, biaya, dependency, atau keputusan TBD.
5. **Implement:** kerjakan perubahan sekecil mungkin.
6. **Document:** buat/perbarui change record dan dokumen domain.
7. **Verify:** jalankan test, pemeriksaan statis, dan pemeriksaan manual yang relevan.
8. **Evidence:** simpan screenshot atau bukti lain yang benar-benar dihasilkan.
9. **Review:** periksa diff, security, regresi, dan konsistensi dokumentasi.
10. **Close:** tandai `verified` hanya setelah kriteria selesai terpenuhi. Update changelog saat perubahan layak masuk ringkasan rilis.

## Perubahan berisiko tinggi
Perlu persetujuan eksplisit sebelum:
- Migration destructive atau perubahan yang berisiko kehilangan data.
- Penghapusan data production.
- Perubahan autentikasi, permission, payment, refund, atau audit.
- Perubahan secret, domain, DNS, deployment, atau production infrastructure.
- Menambah dependency/provider yang mengubah biaya atau data sharing.
- Commit/push/deploy jika belum diminta.

## Rollback
Setiap perubahan berisiko harus menjelaskan rollback atau forward-fix. Untuk migration, pertimbangkan kompatibilitas versi aplikasi sebelum dan sesudah migration. Jangan menjanjikan rollback aman tanpa menguji kondisi aktual.

## Penutupan
Change record harus mencantumkan status, test aktual, bukti, known limitations, dan referensi commit jika ada. Pekerjaan blocked tidak boleh ditandai verified.
