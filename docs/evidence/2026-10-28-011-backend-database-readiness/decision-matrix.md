# Decision Matrix — Backend & Database Readiness (Change 011)

| Topik | Kondisi dokumentasi saat ini | Rekomendasi | Dampak jika belum diputuskan | Keputusan owner yang diperlukan | Status |
|---|---|---|---|---|---|
| Status tiket & transisi | PRD §6 CONFIRMED (Change 012): 9 status final; COMPLETED & READY_FOR_PICKUP tetap terpisah; CANCELLED tersedia | Tetapkan daftar final & transisi yang diizinkan | Implementasi ticket service tertunda | Setujui status final & transisi (transisi tetap PROPOSED) | CONFIRMED (status final) |
| Persetujuan estimasi (WAITING_APPROVAL) | FR-SRV-004/007; PRD §6.2 | Wajib sebelum IN_PROGRESS jika alur estimasi digunakan | Risiko kerja tanpa approval | Putuskan apakah approval wajib | PROPOSED |
| COMPLETED vs READY_FOR_PICKUP | PRD §6.6 CONFIRMED (Change 012): tetap dipisah | Gabung jika tidak ada pickup; pisahkan jika ada | Ambiguitas penutupan tiket | Konfirmasi layanan pickup | CONFIRMED |
| Pembatalan tiket | PRD §6.4; Admin paling dulu | Admin-only cancellation dengan alasan | Risiko pembatalan tak teraudit | Putuskan apakah pelanggan boleh membatalkan | PROPOSED |
| Public tracking mechanism | PRD 4.2 CONFIRMED (Change 012): kode tiket + token terpisah; nomor tiket saja tidak cukup | Terapkan token terpisah + anti-enumerasi + rate limit | Kebocoran data / enumerasi | Setujui detail token (format, panjang, rotasi) | CONFIRMED (mekanisme) |
| Data publik yang ditampilkan | PRD 4.2 (status, nama singkat, perangkat dasar, keluhan ringkas, tanggal) | Batasi sesuai daftar | Kebocoran PII | Konfirmasi field publik final | PROPOSED |
| Database provider | SYSTEM_DESIGN §2 CONFIRMED (Change 012): PostgreSQL lokal untuk development; provider production TBD | PostgreSQL (lokal dulu) | Setup DB tertunda | Pilih provider production | CONFIRMED (dev) / TBD (prod) |
| ORM | SYSTEM_DESIGN §2 Proposed (Prisma) | Prisma | Migration workflow TBD | Setujui Prisma & versi | TBD |
| Authentication | SYSTEM_DESIGN §2 "Belum diputuskan" | Evaluasi Better Auth/Auth.js | Auth tertunda | Pilih provider, MFA, session | TBD |
| Permission matrix Admin/Teknisi | RBAC TBD (Owner/Admin/Kasir; pelaksana teknis TBD) | Granular permission + default deny | Akses tidak terkontrol | Setujui matrix awal | TBD |
| Audit log retention | SECURITY/DB TBD | Tetapkan retention period | Risiko storage/compliance | Putuskan retention | TBD |
| ID strategy (UUID/ULID/sequence) | DATABASE_SCHEMA §7 TBD | Pilih satu strategi | Inkonsistensi PK | Putuskan | TBD |
| Mata uang & timezone | DATABASE_SCHEMA §7 TBD | IDR, UTC | Ambiguitas data | Konfirmasi | TBD |
| Soft delete vs archive | DATABASE_SCHEMA §7 TBD | Tentukan per entitas | Risiko data loss | Putuskan | TBD |
| Object storage (foto) | SYSTEM_DESIGN §2 TBD | Tentukan jika diperlukan | Upload lampiran tertunda | Putuskan provider | TBD |
| Notifikasi (WhatsApp) | SYSTEM_DESIGN §2 TBD | Pilih provider | Notifikasi tertunda | Putuskan provider | TBD |
| Hosting & deployment | DEPLOYMENT TBD | Pilih provider/region | Deploy tertunda | Putuskan | TBD |
| Backup & RPO/RTO | DEPLOYMENT TBD | Tetapkan sebelum production | Risiko kehilangan data | Putuskan | TBD |
| Rate-limit threshold tracking/login | SECURITY TBD | Tetapkan threshold | Risiko brute force | Putuskan | TBD |
| Retensi data & privasi | PRD §10 TBD | Tetapkan sesuai kewajiban | Risiko compliance | Putuskan | TBD |
