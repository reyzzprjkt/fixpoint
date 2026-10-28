# Change Record: 2026-10-28-016 - Auth & RBAC Decisions Documentation

## Metadata
- **ID:** 2026-10-28-016
- **Tanggal:** 2026-10-28
- **Status:** verified
- **Kategori:** Dokumentasi / Keputusan Arsitektur
- **Penanggung jawab:** Orchestrator FixPoint
- **Terkait requirement:** FR-SEC-*, NFR-SEC-*
- **Risk level:** Low

## Alasan
Mendokumentasikan keputusan final owner terkait tata kelola autentikasi dan RBAC untuk MVP servis FixPoint, mencakup penetapan provider Better Auth, kebijakan MFA wajib Owner & Admin, dual session timeout (absolut 8 jam, idle 30 menit), pembatasan pengelolaan akun/role oleh Owner, hak akses audit log, aturan single role per user, dan pencegahan privilege escalation.

## Scope
### Termasuk
- Pencatatan keputusan owner dalam ADR-002 (`docs/decisions/ADR-002-better-auth-and-rbac-policy.md`).
- Audit dokumentasi resmi Better Auth (Next.js App Router, MFA/2FA, Session dual-limit, PostgreSQL).
- Pembaruan `docs/RBAC.md`, `docs/SECURITY.md`, `docs/SYSTEM_DESIGN.md`, dan `CHANGELOG.md`.
- Pembuatan evidence audit di `docs/evidence/2026-10-28-016-auth-rbac-decisions/auth-rbac-audit.md`.

### Tidak termasuk
- Implementasi kode autentikasi, API route, middleware, atau authorization guards.
- Penambahan package npm/dependency (`better-auth`, `pg`, `prisma`).
- Pembuatan schema database atau migrasi database.
- Perubahan cakupan role atau penambahan fitur di luar MVP.
- Operasi git commit atau git push.

## Perubahan Dokumen
- `docs/decisions/ADR-002-better-auth-and-rbac-policy.md`: ADR resmi keputusan autentikasi dan RBAC.
- `docs/RBAC.md`: pembaruan status keputusan owner (single role, owner-only account management, audit log boundaries).
- `docs/SECURITY.md`: pembaruan kebijakan MFA, session limits (8 jam absolut / 30 mnt idle), dan kontrol hak akses.
- `docs/SYSTEM_DESIGN.md`: konfirmasi Better Auth sebagai komponen auth resmi.
- `CHANGELOG.md`: penambahan entri Change 016.

## Risiko & Mitigasi
- **Risiko:** Asumsi bahwa Better Auth langsung mendukung dual session timeout secara *out-of-the-box*.
- **Mitigasi:** Dicatat secara eksplisit dalam audit bahwa dual timeout memerlukan implementasi custom hook / session metadata check sebelum coding.

## Pengujian Aktual
- Verifikasi konsistensi 7 keputusan owner di seluruh dokumen.
- Verifikasi bahwa role resmi tetap hanya Owner, Admin, dan Kasir (dengan Kasir di luar scope MVP).
- Tidak ada file kode yang diubah; verifikasi sintaks dokumentasi valid.

## Evidence
- **Lokasi:** `docs/evidence/2026-10-28-016-auth-rbac-decisions/auth-rbac-audit.md`
