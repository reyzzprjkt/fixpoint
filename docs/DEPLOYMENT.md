# Deployment and Operations

- Status: Proposed; belum ada environment production yang diverifikasi.

## 1. Environment
- Local: pengembangan.
- Test/CI: pemeriksaan otomatis.
- Staging: disarankan untuk UAT dan migrasi rehearsal.
- Production: layanan pelanggan nyata.

Provider, domain, region, dan detail konfigurasi: **TBD**.

## 2. Secret dan konfigurasi
- Simpan secret di environment lokal yang tidak di-commit atau secret manager.
- Sediakan `.env.example` hanya dengan nama variabel dan placeholder non-secret jika nanti diperlukan.
- Jangan memasukkan credential nyata ke Markdown, screenshot, log, issue, atau Git.
- Batasi akses secret sesuai kebutuhan.

## 3. Database
- Perubahan schema harus melalui migration yang direview.
- Backup sebelum migrasi berisiko.
- Uji migrasi pada environment non-production terlebih dahulu.
- Siapkan rollback atau forward-fix plan.
- Jangan menjalankan migration destructive pada production tanpa persetujuan eksplisit dan backup terverifikasi.

## 4. Release workflow
1. Review scope, requirement, dan change record.
2. Jalankan lint/typecheck/test/build yang relevan.
3. Review security dan migration.
4. Deploy ke staging jika tersedia.
5. Lakukan smoke test dan UAT.
6. Ambil bukti aktual dan perbarui release record.
7. Deploy production setelah persetujuan.
8. Monitor error dan siapkan rollback/mitigasi.

## 5. Backup dan recovery
Wajib ditetapkan sebelum production:
- Frekuensi backup.
- Retention period.
- Encryption dan akses backup.
- RPO/RTO.
- Prosedur restore dan person in charge.
- Frekuensi restore drill.

## 6. Observability
Rencanakan log terstruktur, error tracking, health checks, metrik penting, dan alert. Jangan log password, token, payment secret, atau data pribadi yang tidak diperlukan.

## 7. TBD
Hosting, database provider, domain/DNS, TLS, storage, CI/CD, migrations, backup, monitoring, alerting, rollback automation, RPO/RTO.
