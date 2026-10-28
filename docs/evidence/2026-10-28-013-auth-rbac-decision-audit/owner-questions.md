# Owner Questions — Auth & RBAC (Change 013)

1. **Pilihan autentikasi:** Better Auth (direkomendasikan, karena Auth.js bergabung ke Better Auth) vs. Auth.js vs. lainnya.
   - Rekomendasi: Better Auth.
   - Konsekuensi jika belum diputuskan: implementasi auth tertunda; adapter Prisma/PostgreSQL belum dapat dikonfigurasi.

2. **Kebijakan MFA:** apakah MFA wajib untuk Owner/Admin? Metode (passkey, TOTP, email)?
   - Rekomendasi: MFA wajib untuk Owner; opsional untuk Admin.
   - Konsekuensi: risiko akun admin tanpa MFA.

3. **Durasi session:** berapa lama session berlaku, idle timeout, dan perilaku "remember me".
   - Rekomendasi: session pendek dengan idle timeout; remember me opsional.
   - Konsekuensi: UX vs keamanan.

4. **Apakah Admin dapat mengelola akun dan izin:** boleh membuat/menonaktifkan user internal, menetapkan role?
   - Rekomendasi: Owner-only untuk perubahan permission; Admin read-only/operasional.
   - Konsekuensi: risiko privilege escalation jika Admin dapat mengubah izin sendiri.

5. **Batas akses Admin terhadap audit log dan tindakan sensitif:** read-only audit log? akses penuh?
   - Rekomendasi: Admin read-only audit log; tindakan sensitif (refund, koreksi stok, perubahan permission) Owner-only.
   - Konsekuensi: akuntabilitas dan keamanan.

6. **Apakah satu user dapat memiliki lebih dari satu role?** (RBAC §6)
   - Rekomendasi: satu role per user untuk MVP (kecuali kebutuhan nyata).
   - Konsekuensi: kompleksitas permission resolution.

7. **Apakah Admin dapat memberi dirinya sendiri permission yang tidak dimilikinya?** (RBAC §3.7)
   - Rekomendasi: tidak (default deny; owner-only).
   - Konsekuensi: privilege escalation.
