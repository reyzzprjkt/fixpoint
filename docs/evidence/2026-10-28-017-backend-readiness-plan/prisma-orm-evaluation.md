# Evaluasi Teknis ORM: Prisma vs Alternatif (PostgreSQL + Next.js App Router)

- **Status:** Evaluasi Teknis / PROPOSED (Menunggu Keputusan Owner)
- **Konteks:** Database development lokal disepakati PostgreSQL (ADR-001). Better Auth disepakati sebagai provider auth (ADR-002). Prisma diusulkan sejak Change 001, namun belum diputuskan secara final oleh owner.

---

## 1. Kriteria Evaluasi

1. **Kompatibilitas Next.js App Router & TypeScript:** Integrasi Server Components, Server Actions, Route Handlers, serta kelancaran koneksi database (pooling / singleton pattern).
2. **Model Relasional & Integritas Referensial:** Foreign keys, cascading rules, enum types, composite keys.
3. **Workflow Migrasi & Rollback:** Kemudahan membuat, meninjau, menguji, dan membatalkan migrasi schema.
4. **Dukungan Transaksi:** Keandalan transaksi multi-tabel (misal pembuatan tiket + log status + audit log).
5. **Seeding Development:** Kemudahan populate dummy data lokal untuk pengujian.
6. **Testing Database:** Kemudahan mocking / integration test dengan test database isolated.
7. **Dampak Pemeliharaan Jangka Panjang:** Dokumentasi, komunitas, kestabilan API, dan dukungan versi Next.js modern.
8. **Integrasi Better Auth:** Ketersediaan adapter resmi (`@better-auth/prisma-adapter` atau bawaan `prismaAdapter`).

---

## 2. Perbandingan Opsi

| Kriteria | Opsi A: Prisma ORM (PROPOSED) | Opsi B: Drizzle ORM | Opsi C: Kysely (Query Builder) |
|---|---|---|---|
| **Paradigma** | Schema DSL (`schema.prisma`) + Generated Client | TypeScript-first Schema + SQL-like syntax | Pure TypeScript Query Builder |
| **Type Safety** | Sangat Kuat (auto-generated dari schema) | Sangat Kuat (inferred dari TS schema) | Kuat (inferred dari DB interface) |
| **Next.js App Router** | Didukung (perlu PrismaClient singleton untuk dev HMR) | Sangat Ringan (native edge/node support tanpa binary engine) | Sangat Ringan (tanpa binary engine) |
| **Migrasi** | `prisma migrate dev` deklaratif & terstruktur; rollback manual via revert migration script | `drizzle-kit generate / push` cepat & transparan; file SQL murni | Perlu tool migrasi terpisah atau bawaan runner |
| **Transaksi** | Interactive Transactions (`prisma.$transaction(async (tx) => ...)`) | Native SQL transactions | Native SQL transactions |
| **Integrasi Better Auth** | Adapter resmi tersedia (`prismaAdapter`) | Adapter resmi tersedia (`drizzleAdapter`) | Didukung langsung (Better Auth Kysely native) |
| **Overhead / Trade-off** | Ukuran engine binary (Rust engine), *cold start overhead* pada serverless jika production nanti memakai Vercel/serverless functions | Perlu pemahaman SQL lebih tinggi, syntax join lebih verbose | Bukan ORM penuh; relasi harus ditulis manual |

---

## 3. Rekomendasi Teknis Berbasis Bukti

### Rekomendasi: **Prisma ORM** (dengan pertimbangan arsitektur)
**Alasan Utama:**
1. **Developer Experience & Kecepatan MVP:** File `schema.prisma` menyajikan single-source-of-truth yang sangat jelas untuk 9 status tiket, relasi User-Ticket, Token tracking, dan Audit log. Ini mempermudah audit review owner.
2. **Kecocokan Tim & Dokumen yang Ada:** Seluruh dokumen awal (`DATABASE_SCHEMA.md`, Change 001, Change 011) telah menyusun tipe relasional yang sangat kompatibel dengan model Prisma.
3. **Dukungan Better Auth Teruji:** Adapter `prismaAdapter` didukung penuh out-of-the-box oleh Better Auth.

### Mitigasi Trade-off Prisma:
- **Koneksi Pool di Next.js:** Wajib menerapkan pola *Prisma Client Singleton* di `lib/prisma.ts` agar tidak terjadi connection exhaustion saat Next.js development HMR (Hot Module Replacement).
- **Rollback:** Prisma tidak memiliki perintah `down migration` otomatis. Setiap pembatalan migrasi wajib dilakukan dengan membuat forward migration baru (`revert`), yang justru selaras dengan audit trail production.

*Catatan: Dokumen ini adalah rekomendasi teknis. Pilihan ORM tetap berstatus PROPOSED sampai disetujui owner.*
