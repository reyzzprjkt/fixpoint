# Change Record: 2026-10-28-009 - Visual QA & Hydration Audit

## Metadata
- **ID:** 2026-10-28-009
- **Tanggal:** 2026-10-28
- **Status:** in-progress
- **Kategori:** UI / QA
- **Penanggung jawab:** Agent Audit
- **Terkait requirement:** FR-WEB-001, NFR-*
- **Risk level:** Low

## Alasan
Pemeriksaan visual hero (desktop/mobile) dan audit hydration mismatch yang dilaporkan pada Change 008.

## Scope
### Termasuk
- Pemeriksaan visual hero pada desktop 1440×900 dan mobile 390×844 (screenshot Playwright terbaru).
- Audit hydration mismatch pada komponen input tracking (`caret-color`).
- Dokumentasi bukti.

### Tidak termasuk
- Perubahan backend, database, autentikasi, API, atau perilaku bisnis tracking.
- Perubahan desain lain yang tidak terkait.
- Dependency baru.

## Perubahan
- **Tidak ada perubahan kode aplikasi** pada checkpoint ini.
- Penyebab hydration mismatch teridentifikasi sebagai **eksternal/unresolved** (bukan dari kode proyek); tidak ada fix aman yang diperlukan.
- Bukti: `docs/evidence/2026-10-28-009-visual-qa-hydration-audit/` (screenshot desktop/mobile, audit findings).

## Risiko
- **Rendah** — tidak ada perubahan aplikasi yang diklaim.

## Pengujian Aktual
| Pemeriksaan | Perintah | Hasil | Status |
|---|---|---|---|
| Typecheck | `npm run typecheck` | Passed | ✅ |
| Build | `npm run build` | Passed (Next.js 16.4.3, Turbopack, route `/` static) | ✅ |
| Dev server & halaman | `npm run dev` + `GET /` | HTTP 200; path gambar muncul di HTML | ✅ |
| Muat gambar lokal | `GET /images/hero/woman-repairing-laptop.jpg` | HTTP 200 (3,073,274 bytes) | ✅ |
| Screenshot (Playwright) | `npx playwright screenshot` (desktop & mobile) | File PNG terhasil (desktop 1,004,665 bytes; mobile 376,555 bytes) | ✅ (capture) |
| Console/hydration | Log dev server (Playwright) | Warning hydration mismatch (caret-color: transparent) direproduksi; penyebab eksternal/unresolved | ⚠️ unresolved |
| Visual inspection langsung | — | Tidak dapat dilakukan (model tidak mendukung input gambar) | ❌ not run (keterbatasan) |
| Lint | — | Script tidak tersedia | ⏭ skipped |

## Evidence
- **Lokasi:** `docs/evidence/2026-10-28-009-visual-qa-hydration-audit/`
- **File:** `audit-findings.md`, `screenshot-desktop.png`, `screenshot-mobile.png`
- **Tipe:** Audit visual + hydration + verifikasi

## Tindak Lanjut
- Owner meninjau screenshot desktop/mobile (karena visual inspection langsung tidak dapat dilakukan oleh agent).
- Hydration warning status **unresolved** (penyebab eksternal); opsi penanganan (jika owner setuju): tambahkan `suppressHydrationWarning` pada input tracking, atau biarkan karena tidak memengaruhi fungsi.

## Catatan
- Penyebab hydration mismatch: tidak ada `caret-color` di kode proyek (`grep` menemukan 0 hasil di `app/`); warning hanya pada atribut `style` input tracking (`caret-color: transparent`); reproduksi terjadi di Playwright (browser bersih) maupun log sebelumnya.
- Pemeriksaan visual langsung tidak dapat dilakukan karena model tidak mendukung input gambar; keterbatasan didokumentasikan.
- Status Change 008 tidak diubah (tetap `verified`); tidak ditemukan bukti bahwa statusnya perlu dikoreksi.
