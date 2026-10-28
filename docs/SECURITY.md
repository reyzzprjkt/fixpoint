# Security Baseline

- Status: baseline awal; perlu review sebelum production.
- Ini bukan sertifikasi keamanan atau bukti bahwa kontrol sudah diterapkan.

## 1. Identity dan access
- Authentication provider: **Better Auth** (keputusan owner — ADR-002).
- **MFA wajib bagi Owner dan Admin** (metode teknis TOTP & alur recovery akun TBD).
- **Session policy:** Batas absolut 8 jam, idle timeout 30 menit (mekanisme enforcement server-side TBD saat coding backend).
- Single role per user untuk MVP (Owner dan Admin masuk MVP; Kasir role resmi, fitur POS ditunda ke fase berikutnya).
- Pengelolaan akun dan role: eksklusif hak Owner. Admin dilarang mengubah role atau hak akses di luar wewenangnya.
- Anti-privilege escalation: Admin dilarang menaikkan akses sendiri atau memberikan permission yang tidak dimilikinya. Least privilege dan authorization check wajib di server.
- Audit log: Owner akses penuh, Admin hanya read-only jika diizinkan Owner. Mutasi/penghapusan audit log dilarang keras dan diaudit.
- Terapkan company/customer scoping untuk semua akses portal.
- Default deny untuk operasi sensitif yang tidak memiliki permission eksplisit.

## 2. Input dan aplikasi web
- Validasi input di server dengan schema yang konsisten.
- Encode output dan cegah injection sesuai konteks.
- Lindungi operasi perubahan state dari CSRF bila relevan dengan mekanisme auth.
- Rate-limit endpoint publik yang rentan abuse, termasuk tracking dan login.
- Hindari IDOR dan mass assignment.
- Jangan bocorkan stack trace atau detail internal pada response production.

## 3. Data dan privacy
- Kumpulkan data pribadi seminimal mungkin.
- Tentukan retensi, akses, export, koreksi, dan penghapusan sesuai kewajiban yang berlaku.
- Samarkan data pelanggan pada test, log, screenshot, dan laporan.
- Batasi data yang ditampilkan pada public ticket tracking.
- Mekanisme public tracking MVP: **disetujui owner (Change 012)** — kode tiket + token/verifikasi terpisah; nomor tiket saja tidak cukup. Detail token (format, panjang, rotasi) dan pembatasan field final tetap PROPOSED/TBD.
- Jangan menyimpan data kartu pembayaran; gunakan provider sesuai kebutuhan bila kelak ada payment gateway.

## 4. Secret dan supply chain
- Tidak ada secret dalam repository.
- Review dependency baru dan sumbernya.
- Jangan menjalankan installer/script pihak ketiga tanpa inspeksi dan kebutuhan jelas.
- Pin/lock dependency sesuai workflow yang dipilih.
- Lindungi workflow CI/CD dan production credentials.

## 5. Audit
Catat aksi sensitif seperti perubahan permission, verifikasi transfer, refund, koreksi stok, perubahan invoice, dan perubahan status penting. Audit log tidak boleh menjadi tempat menyimpan secret atau payload pribadi berlebihan.

## 6. Incident handling
Sebelum production, tentukan:
- Cara melaporkan insiden.
- Penanggung jawab dan eskalasi.
- Rotasi/revoke credential.
- Backup/restore dan komunikasi dampak.
- Pencatatan kronologi dan corrective actions.

## 7. Release security checklist
- [ ] Authentication dan session review.
- [ ] Authorization dan company isolation tests.
- [ ] Validasi input dan output.
- [ ] Secret/dependency scan.
- [ ] Rate limiting pada endpoint yang relevan.
- [ ] Error/logging review.
- [ ] Backup/restore plan.
- [ ] Privacy/retention decision.
- [ ] Change record dan evidence lengkap.

## 8. TBD
Detail teknis implementasi MFA (TOTP/backup codes flow), mekanisme dual timeout sesi (absolut vs idle) di Better Auth server hook, rate-limit thresholds, retention, incident owner, security scanning tools, applicable legal/privacy obligations.
