# Evidence: 2026-10-29-018 - Prisma Adoption & Backend Design Decisions Preparation

- **Change ID:** 2026-10-29-018
- **Tanggal:** 2026-10-29
- **Jenis:** Audit Keputusan Owner & Persiapan Keputusan Desain Backend

---

## 1. Verifikasi Keputusan Owner

| Item | Status Sebelumnya | Keputusan Owner (Change 018 / ADR-003) | Referensi Dokumen |
|---|---|---|---|
| ORM | PROPOSED | **Disetujui: Prisma ORM** | ADR-003 §2.1 |
| DB Dev Lokal | Disetujui (PostgreSQL) | **PostgreSQL** (tetap) | ADR-001, ADR-003 |
| DB Prod | TBD | **Tetap TBD** | ADR-001, ADR-003 |
| Auth Provider | Disetujui (Better Auth) | **Better Auth via Prisma Adapter** (tetap) | ADR-002, ADR-003 |
| Urutan Kerja | Rencana 10 Tahap (Change 017) | **Tuntaskan keputusan desain tertunda -> implementasi bertahap** | ADR-003 §2.2 |
| Scope Role | Owner, Admin, Kasir | **Owner & Admin di MVP; Kasir ditunda** | ADR-002, Change 015 |

---

## 2. Daftar Terurut Keputusan Desain yang Harus Diselesaikan Sebelum Coding

Berikut daftar keputusan teknis & operasional yang wajib diputuskan owner/arsitek sebelum pengerjaan kode backend dimulai:

### Item 1: Aturan Transisi Antar 9 Status Tiket (State Machine)
- **Keputusan yang diperlukan:** Matriks transisi eksplisit dari status awal ke status berikutnya (misal: apakah boleh dari `RECEIVED` langsung ke `CANCELLED`? Apakah `WAITING_PARTS` hanya bisa dicapai dari `IN_PROGRESS` atau juga dari `INSPECTING`? Apakah pembatalan di `IN_PROGRESS` memerlukan persetujuan khusus?).
- **Rekomendasi teknis (PROPOSED):**
  - `RECEIVED` -> `INSPECTING` | `CANCELLED`
  - `INSPECTING` -> `WAITING_APPROVAL` | `WAITING_PARTS` | `IN_PROGRESS` | `CANCELLED`
  - `WAITING_APPROVAL` -> `IN_PROGRESS` | `WAITING_PARTS` | `CANCELLED`
  - `WAITING_PARTS` -> `IN_PROGRESS` | `CANCELLED`
  - `IN_PROGRESS` -> `COMPLETED` | `WAITING_PARTS` | `CANCELLED`
  - `COMPLETED` -> `READY_FOR_PICKUP`
  - `READY_FOR_PICKUP` -> `CLOSED`
  - `CLOSED` -> Final (no further transitions)
  - `CANCELLED` -> Final (no further transitions)
- **Kapan menjadi blocker implementasi:** **Tahap 8 (Ticket Lifecycle & Status History).** Tanpa aturan ini, validasi transisi di API route / server action tidak dapat dikodekan dengan benar.

### Item 2: Parameter Secret Token Public Tracking
- **Keputusan yang diperlukan:** Format panjang, karakter generator (alfanumerik ramah manusia vs hex/base64), masa berlaku token, metode penyimpanan (hashing algorithm: SHA-256 vs scrypt), dan alur rotasi/regenerasi token bila pelanggan kehilangan struk.
- **Rekomendasi teknis (PROPOSED):**
  - Panjang token: 8 karakter alfanumerik huruf besar tanpa karakter membingungkan (misal: `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`, tanpa `0`, `O`, `1`, `I`).
  - Hashing: SHA-256 dengan salt unik di DB (disimpan sebagai `token_hash`).
  - Masa berlaku: Berlaku selama tiket belum `CLOSED`/`CANCELLED` + grace period 30 hari setelah ditutup.
  - Rotasi: Tombol "Regenerate Token" hanya dapat diakses Admin/Owner di panel servis jika pelanggan meminta. Token lama langsung invalid.
- **Kapan menjadi blocker implementasi:** **Tahap 1 (Skema DB) dan Tahap 9 (Public Tracking API).**

### Item 3: Prosedur Recovery & Orientasi MFA
- **Keputusan yang diperlukan:**
  1. Bagaimana alur aktivasi MFA saat akun Admin baru dibuat oleh Owner (apakah force-setup pada login pertama sebelum masuk dashboard?).
  2. Prosedur pemulihan saat Admin/Owner kehilangan perangkat TOTP dan backup codes (apakah Owner dapat mereset 2FA Admin via panel internal? Siapa yang mereset 2FA Owner jika Owner terkunci?).
- **Rekomendasi teknis (PROPOSED):**
  - Orientasi: Akun baru memiliki status `mfa_pending = true`. Login pertama diarahkan khusus ke halaman QR Code TOTP + download backup codes; route lain di-block.
  - Recovery Admin: Owner memiliki tombol "Reset 2FA" pada tabel staf internal (menghapus secret 2FA & memaksa setup ulang).
  - Recovery Owner: Penyimpanan recovery key fisik / offline master key yang dicatat saat setup awal DB / environment.
- **Kapan menjadi blocker implementasi:** **Tahap 3 (MFA Plugin & Recovery Flow).**

### Item 4: Detail Enforcement Dual Timeout (8 Jam Absolut & 30 Menit Idle)
- **Keputusan yang diperlukan:** Cara verifikasi timestamp aktivitas terakhir dan perlakuan terhadap tab browser yang terbuka di latar belakang (background tabs).
- **Rekomendasi teknis (PROPOSED):**
  - Metadata session di database/cookie memuat `created_at` (titik awal 8 jam) dan `last_active_at` (titik idle 30 menit).
  - Middleware Next.js memeriksa:
    - Jika `now - created_at > 8 jam`: sesi revoked penuh -> redirect ke `/login?reason=expired`.
    - Jika `now - last_active_at > 30 menit`: sesi revoked -> redirect ke `/login?reason=idle`.
    - Jika valid: perbarui `last_active_at` (dengan throttling debounce, misal per 60 detik agar tidak membebani DB).
- **Kapan menjadi blocker implementasi:** **Tahap 4 (Session Timeout Enforcement).**

### Item 5: Strategi Pengujian, Backup, Restore, dan Kegagalan Migrasi
- **Keputusan yang diperlukan:** Standar skenario kegagalan migrasi dan tooling automated backup dev/staging.
- **Rekomendasi teknis (PROPOSED):**
  - Migrasi: Gunakan `prisma migrate dev` di development. Jika migrasi gagal, wajib perbaiki skema atau revert dengan migrasi baru; dilarang `prisma migrate reset` jika ada data testing berharga tanpa backup.
  - Backup: Script shell `backup-dev.ps1` memanfaatkan `pg_dump` format custom (`.dump`).
  - Pengujian: Script test mandiri berbasis `node:test` dan `node:assert` pada database testing terpisah (`fixpoint_test`).
- **Kapan menjadi blocker implementasi:** **Tahap 1 (DB Foundation) dan Tahap 10 (Security & Deployment).**

### Item 6: Provider Database Production
- **Keputusan yang diperlukan:** Pemilihan platform hosting PostgreSQL production (misal: Supabase, Neon, AWS RDS, DigitalOcean Managed Database, atau VPS self-hosted PostgreSQL).
- **Kapan menjadi blocker implementasi:** **Bukan blocker untuk MVP development lokal.** Menjadi blocker saat memasuki Tahap 10 & fase persiapan rilis production.

---

## 3. Scope & Batasan Verifikasi

- **File Kode Aplikasi:** 0 file diubah.
- **Dependencies (`package.json`):** 0 package dipasang.
- **Database / Migration:** 0 migrasi dieksekusi.
- **Status Runtime:** Bersih.
