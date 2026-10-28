# Roadmap Pengembangan

- Status: Proposed; tanggal dan estimasi durasi belum ditetapkan.
- Urutan fase dapat disesuaikan berdasarkan dependency dan keputusan bisnis.

## Fase 0 — Discovery dan fondasi
**Tujuan:** keputusan dasar disepakati sebelum implementasi besar. **Fokus MVP: Opsi B — website publik + sistem servis internal (satu lokasi).**

Pekerjaan:
- Validasi PRD dan TBD bisnis untuk MVP.
- Putuskan autentikasi untuk Admin/pelaksana teknis (role TBD), hosting, database lokal/managed, storage untuk foto (jika diperlukan), notifikasi.
- Tetapkan coding standards, dokumentasi, environment lokal, dan secret policy.
- Tentukan permission matrix awal untuk Admin/pelaksana teknis (role TBD) dan kebijakan data servis.

Selesai jika:
- Scope MVP (website publik + servis internal) disetujui.
- Risiko utama dan keputusan arsitektur dicatat sebagai ADR (jika ada keputusan penting).
- Struktur repository dan strategi test disepakati.
- Tidak ada TBD kritis yang menghalangi fondasi MVP.
- **Bukti:** ADR (jika dibuat), permission matrix ter-update, dan persetujuan scope tercatat di change record.

## Fase 1 — Application foundation
- Setup Next.js/TypeScript/Tailwind sesuai keputusan final.
- Setup database (lokal terlebih dahulu) dan migration workflow.
- Authentication untuk Admin/pelaksana teknis (role TBD), session, server-side authorization, audit log.
- Layout dasar public/internal dan error handling.
- Rekomendasi kebutuhan: autentikasi, penyimpanan foto, database lokal (lihat rekomendasi teknis).

Selesai jika:
- Build/lint/typecheck berjalan (lokal).
- Test auth dan permission utama untuk Admin/pelaksana teknis (role TBD) lulus.
- Secret tidak berada di repository.
- Dokumentasi setup lokal dan environment tersedia.
- **Bukti:** Log build/lint/typecheck, test auth/permission, verifikasi secret check, dokumentasi setup lokal.

## Fase 2 — Public website
- Profil, layanan, kontak.
- Responsive design dan accessibility baseline.
- WhatsApp CTA sesuai kontak resmi.
- Form permintaan servis dasar.
- Halaman pelacakan tiket servis tanpa login.

Selesai jika:
- Konten bisnis disetujui.
- Screenshot desktop/mobile aktual tersedia (jika UI dapat dijalankan secara lokal).
- Form permintaan servis tervalidasi dan error state diuji.
- Halaman tracking tidak membocorkan data sensitif (pengujian).
- Catatan perubahan dan test report tersedia.
- **Bukti:** Screenshot (jika tersedia), test tracking publik, verifikasi pembatasan data.

## Fase 3 — Service Management (MVP)
- Customer/device, tiket servis.
- Admin dapat membuat, melihat, mengelola tiket.
- pelaksana teknis (role TBD) dapat melihat pekerjaan relevan dan memperbarui progres.
- Diagnosis, estimasi, approval (jika digunakan), status history.
- Nomor tiket dan tracking publik yang aman.
- Alur status awal dan audit actor/waktu.

Selesai jika:
- Alur tiket dari request publik sampai update oleh Admin/pelaksana teknis (role TBD) diuji.
- Tracking publik tidak membocorkan PII.
- Status transition dan approval (jika ada) dapat diaudit.
- Permission Admin/pelaksana teknis (role TBD) diuji di server.
- **Bukti:** Test alur tiket, test tracking publik, test permission, audit log untuk perubahan status.

## Fase 4 — Product, Inventory, POS
- Catalog internal, stock movement, supplier, purchase, stocktake.
- POS, payment record, receipt, discount, returns.
- Gross profit baseline.

Selesai jika:
- Stock movement dan sale transaction konsisten.
- Permission cashier diuji.
- Retur dan koreksi stok punya audit trail.
- Kebijakan valuasi stok disetujui.

## Fase 5 — B2B operations
- Company/PIC, quotation, invoice, procurement.
- Installation project dan maintenance contracts.
- Portal B2B.

Selesai jika:
- Company data isolation diuji.
- Lifecycle quotation/invoice disepakati dan dites.
- Riwayat kontrak dan proyek dapat ditelusuri.

## Fase 6 — Membership
- Tier dan benefit yang sudah disetujui.
- Pendaftaran mandiri/Admin.
- Pembayaran dan verifikasi manual.
- Periode aktif dan status membership.

Selesai jika:
- Aturan harga, benefit, expiry, renewal, cancellation, refund disetujui.
- Bukti transfer ditangani secara aman.
- Audit verifier dan riwayat status tersedia.

## Fase 7 — Finance and reporting
- Expenses, laporan pendapatan/pengeluaran, ringkasan transaksi.
- Rekonsiliasi operasional sesuai scope yang disetujui.

Selesai jika:
- Definisi metrik dan periode laporan disepakati.
- Akses laporan diuji.
- Nilai laporan cocok dengan data transaksi pada test fixtures.

## Fase 8 — Hardening dan release
- Security review, regression, accessibility, performance.
- Backup/restore drill, deployment/rollback.
- UAT dan dokumentasi operasional.

Selesai jika:
- Blocker keamanan dan bug kritis ditutup.
- Restore dan rollback diverifikasi.
- UAT disetujui.
- Bukti release dan changelog lengkap.

## Dependency
- Auth/RBAC mendahului dashboard internal.
- Inventory mendahului service spare parts dan POS.
- Customer/company data mendahului ticketing dan B2B portal.
- Membership tidak boleh final sebelum benefit/payment rules disetujui.
- Finance reporting tidak boleh dianggap akurat sebelum definisi metrik dan sumber data ditetapkan.
