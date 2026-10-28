# Role-Based Access Control (RBAC)

- Status: Disetujui Owner (ADR-002) — implementasi backend TBD.
- Prinsip: default deny untuk operasi sensitif; server-side authorization wajib; least privilege; anti-privilege escalation.
- **Role resmi sistem (disetujui owner): hanya Owner, Admin, dan Kasir.** Role "Teknisi" bukan role sistem dan tidak boleh dimasukkan. Tugas pengerjaan teknis (diagnosis, catatan teknis, pembaruan progres) memerlukan role pelaksana yang belum ditetapkan owner; ditandai TBD hingga owner menentukan (lihat Change 014).
- **Aturan Role MVP:** 1 user = 1 role (single role per user). Owner dan Admin masuk scope MVP; Kasir resmi sistem tetapi fitur POS ditunda ke fase berikutnya.

## 1. Role
- **Owner:** akses penuh termasuk pengelolaan akun internal, konfigurasi role/permission, pengaturan bisnis, dan akses penuh ke audit log.
- **Admin:** dapat membuat, melihat, dan mengelola tiket servis; menetapkan pelaksana teknis; menetapkan estimasi biaya; mencatat persetujuan pelanggan; membatalkan tiket; menutup tiket; mengelola operasional sesuai permission yang diberikan Owner. Admin dilarang mengubah role, meningkatkan privilege sendiri, atau memberikan izin di luar wewenangnya. Akses audit log bersifat read-only jika diizinkan Owner.
- **Kasir:** transaksi dan aktivitas terkait sesuai permission yang diberikan Owner. **Role Kasir = keputusan owner; scope fitur POS/kasir ditunda ke fase berikutnya dan tidak termasuk scope MVP saat ini.**
- **Customer/PIC perusahaan:** identitas eksternal terpisah dari role internal; akses hanya ke data milik dirinya/perusahaannya (MVP hanya untuk pelacakan tiket publik tanpa login).

## 2. Matriks akses awal (MVP)
`P` = proposed; `TBD` = perlu keputusan. Matriks final harus ditegakkan oleh backend dan diuji.

| Modul/tindakan | Owner | Admin | Kasir |
|---|---|---|---|
| Melihat dashboard | Allow | Jika diberi izin | **Diluar MVP** |
| Mengelola user internal | Allow | Deny (Owner-only) | Deny |
| Mengubah role/permission | Allow | Deny | Deny |
| Mengelola pelanggan/perangkat | Allow | Jika diberi izin | Deny |
| Membuat tiket servis | Allow | Allow | Deny |
| Melihat tiket servis | Allow | Allow | Deny |
| Mencatat diagnosa/inspeksi pada tiket | Allow | Allow (setelah menugaskan pelaksana) | Deny |
| Memperbarui progres/status tiket | Allow | Allow (per transisi yang diizinkan) | Deny |
| Menetapkan estimasi biaya | Allow | Allow (estimasi; final mengikuti kebijakan) | Deny |
| Mencatat persetujuan pelanggan | Allow | Allow | Deny |
| Membatalkan tiket | Allow | Allow | Deny |
| Menutup tiket | Allow | Allow | Deny |
| Menyetujui estimasi atas nama pelanggan | Tidak menggantikan persetujuan pelanggan | Tidak menggantikan persetujuan pelanggan | Deny |
| Mengelola produk/kategori | Allow | **Diluar MVP** | **Diluar MVP** |
| Mutasi stok/stock opname | Allow | **Diluar MVP** | **Diluar MVP** |
| Membuat transaksi POS | Allow | **Diluar MVP** | **Diluar MVP** |
| Verifikasi transfer membership | Allow | **Diluar MVP** | Deny |
| Mengelola quotation/invoice B2B | Allow | **Diluar MVP** | Deny |
| Melihat laporan finance | Allow | **Diluar MVP** | **Diluar MVP** |
| Melihat audit log | Allow | Read-only jika diberi izin | Deny |
| Mengubah pengaturan sistem | Allow | Hanya izin spesifik | Deny |

**Catatan:** Baris tiket servis di atas adalah nilai **PROPOSED** untuk MVP dan menunggu persetujuan Owner sebelum ditetapkan sebagai keputusan final. Nilai `Allow`/`Deny` pada baris tiket adalah usulan awal; nilai final harus ditegakkan di server dan diuji. Baris dengan `TBD` mewakili keputusan yang belum disetujui. Tugas pengerjaan teknis (diagnosis, catatan teknis, pembaruan progres) yang sebelumnya direferensikan ke role "Teknisi" kini **TBD — role pelaksana teknis belum ditetapkan owner**.

## 3. Aturan implementasi
1. Pisahkan authentication (siapa pengguna) dari authorization (apa yang boleh dilakukan).
2. Periksa permission pada server untuk setiap route/action/query sensitif.
3. Gunakan permission granular, misalnya `service.ticket.read`, `service.ticket.update`, `inventory.stock.adjust`, `pos.sale.create`, `finance.report.read`.
4. Hindari pemeriksaan berdasarkan nama role saja jika permission per tindakan dibutuhkan.
5. Terapkan company/customer ownership checks untuk portal.
6. Gunakan default deny jika tidak ada izin yang sesuai untuk tindakan sensitif.
7. Jangan izinkan Admin memberi dirinya sendiri permission yang tidak dimilikinya.
8. Perubahan permission harus mencatat actor, waktu, nilai sebelum/sesudah yang aman, dan target.
9. Permission sensitif tidak boleh dimodifikasi hanya melalui client-side state.
10. Hindari privilege escalation melalui IDOR, mass assignment, atau manipulasi request.

## 4. Permission model
Model yang diusulkan:
- Role berisi permission.
- User memiliki satu atau beberapa role hanya jika kebutuhan telah disetujui.
- Override per-user hanya jika ada kebutuhan nyata dan aturan konflik didefinisikan.
- Owner tetap dilindungi autentikasi kuat dan audit.
- Nama permission final harus konsisten antara backend, test, dan dokumentasi.

## 5. Skenario wajib dites
- Cashier mencoba membuka endpoint laporan finance.
- Admin mencoba mengubah permission.
- Pengguna tanpa izin mencoba memanggil API langsung.
- PIC perusahaan A mencoba membaca tiket/invoice perusahaan B.
- Customer menebak nomor tiket lain.
- Permission dicabut ketika sesi masih aktif.
- User tidak aktif mencoba melakukan transaksi.
- Aksi sensitif dilakukan berulang karena retry.

## 6. TBD
- Permission granular untuk pelaksana teknis (daftar tiket relevan, field yang boleh diupdate, status yang boleh diubah) — **role pelaksana teknis belum ditetapkan owner**.
- Batas diskon, refund, dan approval. **(tidak relevan untuk MVP, bisa dipertimbangkan nanti)**
- Detail metode teknis MFA (TOTP/backup codes) dan alur pemulihan akun untuk Owner/Admin saat pendaftaran/kehilangan akses.
- Detail implementasi dual timeout (absolut 8 jam + idle 30 menit) pada session hook / middleware Better Auth.
- Apakah dibutuhkan maker-checker untuk pengeluaran, refund, dan verifikasi transfer. **(tidak relevan untuk MVP)**
- Role pelaksana teknis (pengganti "Teknisi") — menunggu keputusan owner.
