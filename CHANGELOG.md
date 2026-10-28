# Changelog

Semua perubahan produk yang bermakna diringkas di sini. Catatan rinci per pekerjaan disimpan di `docs/changes/`.

Format kategori:
- **Added** — kemampuan baru.
- **Changed** — perubahan perilaku yang sudah ada.
- **Fixed** — perbaikan bug.
- **Security** — perubahan keamanan.
- **Removed** — penghapusan yang disengaja.

## Unreleased

### Added
- Paket dokumentasi fondasi FixPoint.
- Kebijakan dokumentasi perubahan, bukti, dan Definition of Done.
- Template catatan perubahan, fitur, bugfix, laporan tes, dan rilis.
- Konfigurasi custom agents OpenCode (orchestrator, ui-auditor, react-perf-reviewer, ui-polish-advisor) dan 4 skill lokal terverifikasi (frontend-design, web-design-guidelines, microinteractions, vercel-react-best-practices).
- Penyesuaian scope MVP: website publik + sistem servis internal (satu lokasi), Admin dapat mengelola tiket, Teknisi dapat memperbarui progres, pelacakan tiket tanpa login. POS/inventaris/membership/B2B dikeluarkan dari MVP awal.
- Rencana penyelesaian lima TBD kritis untuk persiapan Phase 3: status/tren tiket servis usulan, matriks izin Admin/Tekniste MVP, mekanisme pelacakan publik + mitigasi, field minimum tiket servis, dan evaluasi autentikasi (Better Auth/Auth.js) dengan catatan batasan verifikasi.
- Scaffold aplikasi dasar Phase 1: Next.js App Router + TypeScript, Tailwind CSS v4, halaman awal FixPoint, `.gitignore`, dan `.env.example` aman; typecheck dan build lokal lolos, dev server terverifikasi berjalan.
- Redesign visual homepage FixPoint: floating pill Liquid Glass, hero slider dengan gradient placeholder, order tracking UI, service section, membership UI, alur servis, kontak, dan footer.
- Refinement material visual floating header Liquid Glass pada proyek FixPoint (background transparan kebiruan, border halus, refleksi cahaya lembut); typecheck dan build lolos.
- Install dev dependency `@playwright/test` dan browser Chromium untuk verifikasi visual (screenshot) pada tahap pengembangan; screenshot hero FixPoint berhasil diambil (desktop & mobile).
- Riset stock photography berlisensi untuk hero homepage FixPoint (Pexels, lisensi Free — komersial diizinkan, atribusi tidak wajib); 5 kandidat dan rekomendasi didokumentasikan, integrasi menunggu persetujuan owner.
- Integrasi fotografi hero homepage FixPoint (Pexels, fotografer Mediahooch Pixels) menggantikan gradient placeholder; aset disimpan lokal, HeroSlider diperbarui, typecheck, build, muat gambar lokal, dan screenshot (desktop & mobile) lolos.
- Audit visual & hydration (Change 009): screenshot desktop/mobile terbaru diambil; hydration mismatch pada input tracking diidentifikasi eksternal/unresolved (tidak ada `caret-color` di kode proyek); typecheck & build lolos; keterbatasan visual inspection dicatat.
- Pemulihan aksen biru cerah (Change 010): tombol "Track Order" header dikembalikan ke `bg-blue-600` (hover `bg-blue-700`) sesuai token aksen asli; typecheck, build, render HTTP 200, dan screenshot (desktop & mobile) lolos.
- Audit kesiapan backend & database (Change 011): audit dokumentasi PRD/ROADMAP/SYSTEM_DESIGN/DATABASE_SCHEMA/RBAC/SECURITY/TESTING/DEPLOYMENT; entitas/relasi MVP, alur tiket, RBAC, tracking publik, evaluasi PostgreSQL/Prisma/auth; matriks keputusan owner; tidak ada implementasi backend.
- Pencatatan keputusan owner (Change 012): alur tiket (9 status final, COMPLETED/READY_FOR_PICKUP terpisah, CANCELLED tersedia), tracking publik (kode tiket + token terpisah), database (PostgreSQL lokal dev); PRD/SYSTEM_DESIGN/DATABASE_SCHEMA/SECURITY/matriks keputusan diperbarui, ADR-001 dibuat; detail implementasi tetap PROPOSED/TBD.
- Audit autentikasi & RBAC (Change 013): evaluasi Better Auth vs Auth.js (Auth.js bergabung ke Better Auth), permission matrix MVP (Owner/Admin/Teknisi), daftar pertanyaan owner; SYSTEM_DESIGN diperbarui; tidak ada implementasi atau dependency.
- Koreksi RBAC role (Change 014): role resmi hanya Owner, Admin, Kasir; role "Teknisi" dihapus dari dokumentasi (PRD, ROADMAP, RBAC, DATABASE_SCHEMA, change records, evidence); tugas pengerjaan teknis ditandai TBD; typecheck & build lolos; tidak ada perubahan kode.
- Keputusan scope role MVP (Change 015): Owner dan Admin masuk MVP; Kasir role resmi tetapi fitur POS/kasir ditunda ke fase berikutnya (di luar scope MVP saat ini); PRD/CHANGELOG diperbarui; tidak ada perubahan kode.
- Keputusan autentikasi & RBAC (Change 016): ADR-002 mencatat keputusan owner: Better Auth sebagai auth provider, MFA wajib bagi Owner & Admin, session limits (absolut 8 jam, idle 30 mnt), pengelolaan akun oleh Owner, audit log rules, single role per user MVP (Owner & Admin; Kasir ditunda ke fase berikutnya), anti-privilege escalation; audit teknis Better Auth terdokumentasi; tidak ada implementasi kode/dependency.
- Audit kesiapan backend & rencana implementasi (Change 017): evaluasi teknis Prisma ORM vs alternatif; desain model entitas konseptual MVP; roadmap implementasi 10 tahap; tinjauan keamanan & strategi pengujian; tidak ada perubahan kode aplikasi, dependency, atau migrasi database.
- Adopsi Prisma ORM & urutan pengerjaan backend (Change 018): ADR-003 mencatat keputusan owner menyetujui Prisma ORM untuk PostgreSQL lokal (production provider tetap TBD); urutan pengerjaan backend menetapkan penyelesaian keputusan desain tertunda sebelum implementasi bertahap; daftar blocker keputusan terdokumentasi; tidak ada perubahan kode atau dependency.

### Changed
- Perbaikan visual hero slider FixPoint (penambahan overlay gradient adaptif untuk keterbacaan teks/CTA); typecheck dan build lolos.
- Belum ada perubahan aplikasi yang dicatat.

### Fixed
- Belum ada perbaikan aplikasi yang dicatat.

### Security
- Prinsip awal keamanan dan RBAC didokumentasikan.

### Removed
- Tidak ada.

> Entri di atas mendeskripsikan file dokumentasi dalam paket ini, bukan fitur aplikasi yang sudah berjalan.
