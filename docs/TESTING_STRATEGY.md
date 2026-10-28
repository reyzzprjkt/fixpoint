# Testing Strategy

- Status: Proposed.
- Tooling final ditentukan setelah stack dan dependency dipasang.

## 1. Lapisan test
- **Unit:** aturan bisnis, validasi, kalkulasi harga/diskon, transisi status, permission helper.
- **Integration:** database, transaksi atomik, stock movement, payment records, audit logs.
- **API/server:** validasi input, authorization, error response, rate limiting jika diperlukan.
- **End-to-end:** alur utama pelanggan, service ticket, POS, dan B2B.
- **Visual:** screenshot aktual untuk UI yang berubah; regression visual jika tooling disetujui.
- **Accessibility:** keyboard navigation, focus, labels, contrast, semantic structure.
- **Performance:** profiling berbasis baseline dan route kritis.
- **Security:** IDOR, privilege escalation, input validation, session, secret exposure, company isolation.
- **Recovery:** backup restore dan deployment rollback sebelum production.

## 2. Test prioritas
1. Permission server-side dan default deny.
2. Isolasi data antar perusahaan.
3. Keunikan nomor tiket dan keamanan public tracking.
4. Approval estimasi yang terikat pada versi estimasi.
5. Konsistensi POS, payment, dan inventory movement.
6. Retur/refund dan koreksi stok.
7. Verifikasi transfer membership dan audit actor.
8. Dokumentasi/bukti perubahan dalam Definition of Done.
9. Transisi status tiket usulan (dari `RECEIVED` sampai status terminal) termasuk prasyarat, pembatasan aktor, dan audit actor/waktu.
10. Pelacakan publik: anti-enumerasi, pembatasan percobaan, respons kegagalan, rotasi token, dan pembatasan data yang ditampilkan.

## 3. Aturan pelaporan
Setiap test report mencatat:
- Tanggal dan environment.
- Commit/hash jika tersedia.
- Perintah atau prosedur yang dijalankan.
- Test yang dijalankan dan yang tidak dijalankan.
- Pass/fail/skipped/blocker.
- Log atau screenshot yang aman.
- Known limitations.

Jangan menyatakan test lulus hanya karena file test ada atau perintah tidak dijalankan.

## 4. CI
Pipeline CI yang diusulkan: install reproducible, lint, typecheck, unit/integration test, build, dan pemeriksaan secret/dependency sesuai keputusan tooling. Pipeline belum dianggap aktif sampai file konfigurasi dibuat dan hasil run tersedia.

## 5. TBD
- Framework test unit/integration/E2E.
- Browser matrix dan device matrix.
- Coverage threshold.
- Visual regression tooling.
- CI provider dan gate wajib.
- Data fixture dan strategi sanitasi.
