# Product Requirements Document (PRD)

- Produk: FixPoint IT Solution & Service Center
- Status: Draft baseline — perlu validasi pemilik bisnis
- Versi: 0.1
- Terakhir diperbarui: 2026-10-28

## 1. Ringkasan
FixPoint membutuhkan platform digital untuk memperkenalkan bisnis ke pelanggan B2C dan B2B sekaligus mendukung proses servis perangkat, penjualan/POS, inventaris, membership, procurement perusahaan, kontrak maintenance, dan pencatatan keuangan operasional. Produk direncanakan sebagai aplikasi web modular dengan satu toko dan operasional terpusat.

Dokumen ini adalah kebutuhan yang direncanakan, bukan bukti fitur sudah tersedia.

## 2. Tujuan bisnis
- Memudahkan calon pelanggan menemukan layanan dan menghubungi FixPoint.
- Membuat status dan riwayat servis dapat ditelusuri, khususnya untuk alur servis MVP.
- Mengurangi pencatatan manual yang tersebar untuk proses servis awal.
- Membatasi akses internal berdasarkan role dan permission.
- Menyediakan dokumentasi perubahan dan bukti verifikasi yang konsisten.

**MVP saat ini:** website publik + sistem servis internal (satu lokasi), pengembangan dan pengujian lokal terlebih dahulu. POS, inventaris, membership berbayar, serta proyek dan kontrak B2B **bukan** bagian dari MVP awal.

## 3. Pengguna dan persona
| Persona | Tujuan | Kebutuhan utama |
|---|---|---|
| Pengunjung | Menilai layanan FixPoint | Profil, layanan, katalog, kontak |
| Pelanggan B2C | Mengajukan dan melacak servis | Form request, nomor tiket, status |
| Pelanggan membership | Menggunakan benefit | Registrasi, status membership, benefit yang disetujui |
| PIC perusahaan | Mengelola permintaan perusahaan | Pengajuan, penawaran, pesanan, riwayat |
| Owner | Mengelola bisnis dan kontrol sistem | Akses penuh, laporan, konfigurasi permission |
| Admin | Menjalankan operasional sesuai izin | Servis, stok, pelanggan, B2B, verifikasi transfer |
| Cashier | Melakukan transaksi yang diizinkan | POS, pembayaran, struk, riwayat transaksi terbatas |

## 4. Scope produk

### 4.1 Public website (MVP)
- Profil perusahaan/toko.
- Daftar layanan.
- Informasi kontak dan integrasi WhatsApp.
- Halaman pelacakan status tiket servis tanpa login.
- **Catatan MVP:** Katalog produk **tidak** termasuk dalam MVP awal.

### 4.2 Customer service tracking (MVP) — CONFIRMED (mekanisme)
- Pelacakan berdasarkan kode tiket + token/verifikasi terpisah tanpa login (mekanisme **disetujui owner** pada Change 012; detail implementasi token tetap PROPOSED/TBD).
- Nomor/kode tiket harus cukup sulit ditebak dan tidak boleh menjadi akses ke data pelanggan lain.
- Informasi publik yang ditampilkan harus dibatasi. Detail sensitif dan data pribadi tidak boleh ditampilkan tanpa verifikasi tambahan.
- Detail informasi yang ditampilkan pada halaman tracking (MVP): status tiket (dari daftar status di bawah), nama pelanggan (hanya inisial atau nama singkas sesuai kebijakan), perangkat (tipe/brand dasar), deskripsi keluhan ringkas, tanggal masuk/terakhir diperbarui. **Detail lengkap (diagnosis, estimasi biaya detail, suku cadang, catatan internal) tidak ditampilkan publik**.
- Mekanisme: kode tiket + token/kode verifikasi acak terpisah. Perlindungan anti-enumerasi, pembatasan percobaan, respons kegagalan yang tidak mengungkap keberadaan tiket, rotasi/pemulihan token, dan pembatasan data ditampilkan wajib. Detail token (format, panjang, rotasi) **PROPOSED/TBD** menunggu keputusan implementasi.

### 4.3 Service Management (MVP)
- Data pelanggan dan perangkat.
- Keluhan, kondisi awal, penerimaan, penugasan, diagnosis, estimasi biaya, persetujuan pelanggan, status, riwayat status, catatan pengerjaan, penyelesaian/serah terima.
- Antrean serta status servis.
- Riwayat pengerjaan terdokumentasi.
- Admin dapat membuat, melihat, dan mengelola tiket servis; menetapkan pelaksana teknis; menetapkan estimasi biaya; mencatat persetujuan pelanggan; membatalkan tiket; menutup tiket.
- Pengerjaan teknis (pemeriksaan/diagnosis/catatan teknis/pembaruan progres) dilakukan oleh pelaksana yang ditugaskan; role pelaksana teknis **TBD** (belum ditetapkan owner) — lihat Change 014.
- Pembayaran, garansi, dan notifikasi status: **TBD** untuk detail implementasi.
- Tidak termasuk assignment otomatis, komisi, atau analitik performa pelaksana teknis dalam scope MVP awal.
- **Tidak termasuk** penggunaan suku cadang terintegrasi penuh dengan inventaris dalam MVP awal. Foto perangkat **bukan** dependensi MVP awal (kandidat fitur berikutnya).

### 4.4 Sales & Inventory
**DI LUAR MVP AWAL** — POS, inventaris, pembelian, stok opname, retur, dll. Bukan bagian dari scope MVP.

### 4.5 B2B
**DI LUAR MVP AWAL** — Penawaran, invoice, proyek instalasi, kontrak maintenance, portal B2B. Bukan bagian dari scope MVP.

### 4.6 Membership
**DI LUAR MVP AWAL** — Membership berbayar, verifikasi transfer admin untuk membership. Bukan bagian dari scope MVP.

### 4.7 Finance
**DI LUAR MVP AWAL** — Laporan keuangan lengkap. Hanya pencatatan pembayaran dasar terkait tiket servis jika diperlukan, detail TBD.

## 5. Functional requirements

### Public website & customer (MVP)
- **FR-WEB-001**: Pengunjung dapat melihat profil FixPoint, jam operasional, lokasi, dan kanal kontak setelah konten bisnis disetujui.
- **FR-WEB-002**: Pengunjung dapat melihat daftar layanan.
- **FR-WEB-004**: Pengunjung dapat membuka kanal WhatsApp resmi yang dikonfigurasi.
- **FR-SRV-001**: Pelanggan dapat mengirim permintaan servis melalui form online (dapat dikonfigurasi, detail validasi TBD).
- **FR-SRV-002**: Sistem menghasilkan nomor tiket unik untuk permintaan servis yang berhasil dibuat.
- **FR-SRV-003**: Pelanggan dapat memeriksa status menggunakan nomor tiket tanpa login dengan respons yang tidak membocorkan data sensitif.
- **FR-SRV-004**: Sistem menyimpan persetujuan estimasi pelanggan beserta waktu dan kanal persetujuan (jika alur estimasi digunakan).
- **FR-SRV-005**: Riwayat status tiket harus dapat ditelusuri oleh pengguna internal yang berwenang (Admin/pelaksana teknis (role TBD) sesuai hak akses).

### Service Management (MVP)
- **FR-SRV-006**: Admin dapat mencatat/membuat, melihat, dan mengelola tiket servis; menetapkan pelaksana teknis; menetapkan estimasi biaya; mencatat persetujuan pelanggan; membatalkan tiket; menutup tiket. Pengerjaan teknis (pemeriksaan/diagnosis/catatan teknis/pembaruan progres) dilakukan oleh pelaksana yang ditugaskan; role pelaksana teknis **TBD** (belum ditetapkan owner).
- **FR-SRV-007**: Perubahan status servis mengikuti alur status yang disetujui dan mencatat aktor serta waktu perubahan. Transisi divalidasi di server.
- **FR-SRV-008**: Pencatatan pembayaran dan status pelunasan: **TBD** untuk detail, namun struktur harus mendukung audit.
- **FR-SRV-009**: Pencatatan garansi servis: **TBD**.
- **FR-SRV-010**: Notifikasi perubahan status: **TBD** (provider/kanal). Fokus MVP pada pelacakan publik dan manajemen internal.

### Sales & Inventory
- **FR-INV-001**: Pengguna berwenang dapat mengelola produk, kategori, barcode, harga modal, dan harga jual.
- **FR-INV-002**: Sistem mencatat pergerakan stok dengan alasan, jumlah, aktor, dan waktu.
- **FR-INV-003**: Pengguna berwenang dapat melakukan stock opname dan mencatat selisih.
- **FR-INV-004**: Sistem memberi peringatan ketika stok melewati ambang minimum yang dikonfigurasi.
- **FR-INV-005**: Sistem mencatat supplier dan pembelian barang.
- **FR-POS-001**: Cashier yang memiliki izin dapat membuat transaksi POS.
- **FR-POS-002**: Sistem mencatat item, kuantitas, harga, diskon, pembayaran, dan total transaksi.
- **FR-POS-003**: Sistem menyediakan bukti transaksi/struk yang dapat dicetak.
- **FR-POS-004**: Pengguna berwenang dapat melihat riwayat transaksi dan memproses retur sesuai kebijakan.
- **FR-POS-005**: Sistem menghitung laba kotor berdasarkan data biaya yang tersedia; metode valuasi stok dan perlakuan diskon: **TBD**.

### B2B
- **FR-B2B-001**: Pengguna berwenang dapat mengelola perusahaan dan PIC.
- **FR-B2B-002**: Pengguna berwenang dapat membuat penawaran harga dan invoice.
- **FR-B2B-003**: Sistem mencatat pengadaan, proyek instalasi, dan kontrak maintenance.
- **FR-B2B-004**: PIC perusahaan dapat mengajukan permintaan dan melihat status permintaan yang menjadi hak perusahaannya.
- **FR-B2B-005**: Akses perusahaan harus terisolasi sehingga PIC tidak dapat membaca data perusahaan lain.

### Membership & finance
- **FR-MEM-001**: Pelanggan dapat mengajukan membership sesuai tier yang aktif.
- **FR-MEM-002**: Admin berwenang dapat mencatat pendaftaran dan verifikasi pembayaran membership.
- **FR-MEM-003**: Sistem menyimpan tier, periode berlaku, status pembayaran, dan riwayat perubahan membership.
- **FR-FIN-001**: Sistem mencatat pembayaran yang terkait dengan servis, POS, invoice B2B, dan membership sesuai modul yang diaktifkan.
- **FR-FIN-002**: Sistem dapat mencatat pengeluaran operasional dengan kategori dan bukti jika diperlukan.
- **FR-FIN-003**: Laporan keuangan hanya tersedia untuk role dan permission yang berwenang.

### Access control & audit (MVP)
- **FR-SEC-001**: Setiap endpoint/operasi terlindungi memeriksa permission di server.
- **FR-SEC-002**: Owner dapat mengatur permission Admin dan pelaksana teknis (role TBD) sesuai kebijakan yang disetujui. Role Kasir resmi (keputusan owner) tetapi fitur POS/kasir ditunda ke fase berikutnya dan tidak termasuk scope MVP saat ini.
- **FR-SEC-003**: Perubahan permission dan aksi sensitif dicatat di audit log.
- **FR-SEC-004**: Sistem menolak akses ke data yang bukan milik/ruang lingkup pengguna.
- **FR-DOC-001**: Setiap unit perubahan memiliki catatan perubahan dan hasil verifikasi sesuai `DOCUMENTATION_POLICY.md`.

## 6. Status Tiket dan Alur Servis (MVP)

### 6.1 Daftar status

Status berikut **disetujui owner (Change 012)** sebagai daftar final MVP; `COMPLETED` dan `READY_FOR_PICKUP` tetap terpisah; `CANCELLED` tersedia sebagai jalur pembatalan.

| Kode | Nama | Deskripsi | Status awal | Aktif akhir |
|---|---|---|---|---|
| `RECEIVED` | Diterima | Permintaan servis masuk dan dicatat. | Ya | Ya |
| `INSPECTING` | Memeriksa | Admin/pelaksana teknis (role TBD) mulai inspeksi/periksaan teknis. | Tidak | Ya |
| `WAITING_APPROVAL` | Menunggu Persetujuan | Estimasi/approval dari pemilik perangkat/pelanggan. | Tidak | Ya |
| `WAITING_PARTS` | Menunggu Suku Cadang | Menunggu suku cadang/pengadaan sebelum lanjut. | Tidak | Ya |
| `IN_PROGRESS` | Sedang Dikerjakan | Pekerjaan sedang dijalankan. | Tidak | Ya |
| `COMPLETED` | Selesai (Perbaikan) | Perbaikan teknisi telah selesai; menunggu serah terima/pengambilan. | Tidak | Ya |
| `READY_FOR_PICKUP` | Siap Diambil | Perbaikan selesai dan siap diambil/diambil pelanggan (jika ada layanan ambil-jemput/pengambilan). | Tidak | Ya |
| `CLOSED` | Ditutup | Tiket ditutup setelah serah terima atau alasan penutupan. | Tidak | Ya |
| `CANCELLED` | Dibatalkan | Tiket dibatalkan oleh Admin/pelanggan (jika diizinkan). | Tidak | Ya |

**Catatan:** `COMPLETED` dan `READY_FOR_PICKUP` **dipisahkan** pada desain usulan ini: `COMPLETED` berarti proses perbaikan selesai; `READY_FOR_PICKUP` menandai kondisi siap penyerahan. Apabila MVP tidak memiliki layanan ambil-jemput/kirim, keduanya dapat digabung setelah keputusan pemilik.

### 6.2 Transisi valid (usulan)
| Dari | Ke | Aktor yang diizinkan | Prasyarat / Catatan |
|---|---|---|---|
| `RECEIVED` | `INSPECTING` | Admin (dari permintaan awal) atau pelaksana teknis (role TBD) (dibagikan). | Admin mampu membagikan/mentugaskan. |
| `RECEIVED` | `CANCELLED` | Admin (dengan alasan), atau aturan penolakan. | Pembatalan dicatat. |
| `INSPECTING` | `WAITING_APPROVAL` | Admin/pelaksana teknis (role TBD). | Estimasi biaya disusun; persetujuan pelanggan dipersyaratkan sebelum kerja berlanjut. |
| `INSPECTING` | `IN_PROGRESS` | pelaksana teknis (role TBD). | Sudah ada estimasi dan persetujuan (atau aturan wajar sesuai kebijakan). |
| `INSPECTING` | `WAITING_PARTS` | Admin/pelaksana teknis (role TBD). | Perlu suku cadang/pengadaan. |
| `INSPECTING` | `COMPLETED` | pelaksana teknis (role TBD). | Perbaikan selesai. |
| `WAITING_APPROVAL` | `IN_PROGRESS` | pelaksana teknis (role TBD) (setelah persetujuan) atau Admin (jika approval internal). | Persetujuan pelanggan tercatat (`FR-SRV-004`). |
| `WAITING_APPROVAL` | `CANCELLED` | Admin. | Jika penolakan/pembatalan. |
| `WAITING_PARTS` | `IN_PROGRESS` | pelaksana teknis (role TBD)/Admin. | Suku cadang tersedia. |
| `IN_PROGRESS` | `COMPLETED` | pelaksana teknis (role TBD). | Pekerjaan selesai. |
| `IN_PROGRESS` | `WAITING_PARTS` | pelaksana teknis (role TBD)/Admin. | Perlu suku cadang tambahan. |
| `COMPLETED` | `READY_FOR_PICKUP` | Admin (opsional, sesuai layanan) / sistem. | Serah terima. |
| `COMPLETED` | `CLOSED` | Admin. | Jika layanan tanpa pickup. |
| `READY_FOR_PICKUP` | `CLOSED` | Admin. | Pelanggan sudah mengambil/serahkan bukti serah terima. |
| `INSPECTING` | `CANCELLED` | Admin (dengan alasan). | Pembatalan pada tiket yang masih open. |
| `WAITING_PARTS` | `CANCELLED` | Admin (dengan alasan). | Pembatalan pada tiket yang masih open. |
| `IN_PROGRESS` | `CANCELLED` | Admin (dengan alasan). | Pembatalan paksa pada tiket yang sedang dikerjakan; dicatat sebagai pembatalan/penutupan dengan alasan. |

### 6.3 Alur utama usulan
`RECEIVED → INSPECTING → WAITING_APPROVAL → IN_PROGRESS → COMPLETED → READY_FOR_PICKUP → CLOSED`
(dengan varian: `INSPECTING → WAITING_PARTS → IN_PROGRESS`, atau `INSPECTING → WAITING_APPROVAL → CANCELLED`).

### 6.4 Pembatalan
- Pembatalan dilakukan oleh Admin (paling dulu). Kemungkinan pembatalan oleh pelanggan hanya bila alur mengizinkan, tergantung kebijakan.

### 6.5 Riwayat status
- Setiap transisi mencatat: status asal/tujuan, aktor, timestamp, referensi tiket, alasan jika ada.
- Riwayat disimpan sebagai append-only/history minimal.

### 6.6 Keputusan pending
- Persetujuan estimasi: persetujuan pelanggan wajib sebelum `IN_PROGRESS` (atau sesuai aturan internal).
- `COMPLETED` vs `READY_FOR_PICKUP`: **usulan dipisahkan**; keputusan final TBD.

## 7. Non-functional requirements
- **NFR-SEC-001**: Secret tidak disimpan di repository atau dikirim ke log.
- **NFR-SEC-002**: Data sensitif hanya dapat diakses oleh role yang berwenang dan melalui kanal yang sesuai.
- **NFR-REL-001**: Kegagalan layanan eksternal ditangani tanpa merusak transaksi lokal; perilaku retry dan idempotency perlu dirancang.
- **NFR-PERF-001**: Target Core Web Vitals, waktu respons API, dan beban awal: **TBD** setelah baseline dan kebutuhan trafik diketahui.
- **NFR-ACC-001**: UI mengikuti praktik aksesibilitas web yang relevan; target konformansi formal: **TBD**.
- **NFR-RESP-001**: Halaman publik dan dashboard harus responsif pada desktop dan perangkat mobile.
- **NFR-AUD-001**: Perubahan data penting dapat ditelusuri dengan aktor, waktu, dan referensi transaksi.
- **NFR-BACKUP-001**: Target RPO/RTO, retensi backup, dan prosedur pemulihan: **TBD**.
- **NFR-DOC-001**: Perubahan harus memiliki dokumentasi dan bukti yang sepadan dengan jenis perubahan.

## 8. Kriteria penerimaan lintas modul
- Permission diuji di server, termasuk akses yang ditolak.
- Validasi input dan penanganan error tersedia.
- Alur sukses, gagal, loading, dan empty state ditangani jika relevan.
- Perubahan data kritis tercatat.
- Test yang relevan berjalan dan hasil aktual terdokumentasi.
- Dokumen serta catatan perubahan diperbarui.
- Bukti screenshot/test tersedia atau keterbatasannya dicatat.

## 9. Di luar scope MVP
- Multi-cabang aktif.
- POS, inventaris, pembelian, stok opname, retur.
- Membership berbayar dan verifikasi transfer membership.
- Proyek dan kontrak B2B (penawaran, invoice, procurement, instalasi, maintenance contract).
- Assignment teknisi otomatis, komisi teknisi, dan analitik performa teknisi.
- Aplikasi mobile native.
- Integrasi payment gateway otomatis sebelum provider dipilih.
- Akuntansi penuh, e-faktur, dan integrasi pajak sebelum kebutuhan dikonfirmasi.

## 10. TBD yang perlu keputusan pemilik
1. Identitas visual, logo, alamat, jam operasional, kontak resmi, dan konten publik.
2. Provider autentikasi untuk Admin/pelaksana teknis (role TBD) dan strategi sesi (MFA: TBD).
3. Tier membership, harga, benefit, renewal, refund, dan pembatalan. **(DILUAR MVP)**
4. Kanal notifikasi dan provider email/WhatsApp.
5. Kebijakan nomor tiket dan verifikasi tracking publik: mekanisme **disetujui owner (Change 012)** — kode tiket + token/verifikasi terpisah, nomor tiket saja tidak cukup; detail token (format, panjang, rotasi) dan informasi publik final masih **PROPOSED/TBD**.
6. Metode valuasi stok, retur, diskon, pajak, dan pembulatan. **(DILUAR MVP)**
7. Format invoice/struk dan kebutuhan legal.
8. Definisi laporan finance serta periode akuntansi. **(DILUAR MVP)**
9. Hosting, domain, database (**PostgreSQL lokal untuk development; provider production TBD**), object storage (foto), backup, monitoring.
10. Target trafik, SLA, RPO/RTO, dan retensi data.
11. Bahasa UI dan kebutuhan multi-currency.
12. Kebijakan privasi, masa simpan data, dan proses permintaan penghapusan data.

## 11. Referensi
- [System Design](SYSTEM_DESIGN.md)
- [Database Schema](DATABASE_SCHEMA.md)
- [RBAC](RBAC.md)
- [Roadmap](ROADMAP.md)
- [Change Management](CHANGE_MANAGEMENT.md)
