# Change Record: 2026-10-28-002 - MVP Scope Alignment

## Metadata
- **ID:** 2026-10-28-002
- **Tanggal:** 2026-10-28
- **Status:** implemented
- **Kategori:** Dokumentasi
- **Penanggung jawab:** Agent Audit
- **Terkait requirement:** FR-WEB-001/002/004, FR-SRV-001/002/003/005/006/007
- **Risk level:** Low

## Alasan
Menyesuaikan dokumentasi dengan keputusan MVP yang disetujui:
- Cakupan: Opsi B — website publik + sistem servis internal
- Operasi awal: satu lokasi
- Pengembangan dan pengujian: lokal terlebih dahulu
- Website publik: profil, layanan, kontak
- Pelanggan: dapat melacak status tiket servis tanpa login
- Admin: dapat membuat, melihat, dan mengelola tiket servis
- Teknisi: dapat melihat pekerjaan yang relevan dan memperbarui progres sesuai hak akses (catatan: role "Teknisi" dihapus pada Change 014; tugas pengerjaan teknis kini TBD)
- POS, inventaris, membership berbayar, serta proyek dan kontrak B2B bukan bagian MVP awal

## Scope
Perbarui PRD, RBAC, ROADMAP agar konsisten dengan scope MVP. Definisikan alur servis MVP, status tiket awal, kebutuhan data tiket, pembagian hak akses, mekanisme pelacakan publik.

## File Terdampak
- `docs/PRD.md`
- `docs/RBAC.md`
- `docs/ROADMAP.md`
- `CHANGELOG.md`
- `docs/changes/2026-10-28-002-mvp-scope-alignment.md` (baru)

## Ringkasan Perubahan
- **PRD.md:** Menegaskan MVP scope, memperjelas website publik + tracking tanpa login, membatasi scope servis untuk Admin/Teknisi, menandai POS/inventaris/membership/B2B sebagai di luar MVP, memperbarui FR terkait.
- **RBAC.md:** Menambahkan role pelaksana teknis (kemudian dihapus pada Change 014 — role resmi hanya Owner, Admin, Kasir); memperbarui matriks akses untuk MVP (menghilangkan Cashier sebagai kebutuhan MVP), menambahkan TBD terkait permission pelaksana teknis.
- **ROADMAP.md:** Menyesuaikan Fase 0-3 dengan fokus MVP, menambahkan kriteria penerimaan dan bukti verifikasi untuk setiap fase relevan.

## Risiko
- **Rendah** - Hanya perubahan dokumentasi. Tidak mengubah kode, konfigurasi global, atau dependency.

## Pengujian Aktual
| Perintah | Hasil | Keterangan |
|----------|-------|------------|
| Baca PRD/RBAC/ROADMAP | Berhasil | Diverifikasi konsistensi setelah perubahan |
| Verifikasi referensi dokumen | Berhasil | Link relatif tetap valid |

## Evidence
- **Lokasi:** `docs/evidence/2026-10-28-002-mvp-scope-alignment/`
- **Tipe:** Verifikasi konsistensi dokumentasi

## Tindak Lanjut
- Putuskan detail TBD: autentikasi, penyimpanan foto, database lokal, alur status tiket awal, mekanisme tracking publik, permission granular pelaksana teknis (role pelaksana teknis TBD — lihat Change 014).
- Evaluasi rekomendasi teknis (lihat laporan) sebelum implementasi Phase 1.

## Catatan
Tidak ada coding fitur aplikasi, tidak ada perubahan dependency/config global.
