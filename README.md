# ARUNA Website

Website jasa pembuatan website untuk UMKM Indonesia, dibangun dengan Next.js, TypeScript, Tailwind CSS, Zod, PostgreSQL, dan Prisma.

## Menjalankan lokal

1. Salin `.env.example` menjadi `.env.local` dan isi nilai yang dibutuhkan.
2. Jalankan `pnpm install`.
3. Jika memakai database, jalankan `pnpm prisma migrate dev --name init`.
4. Jalankan `pnpm dev`.

Tanpa `DATABASE_URL`, UI publik tetap dapat dijalankan dan submission project brief memakai mode penerimaan demo. Sebelum produksi, sambungkan penyimpanan di `app/api/project-brief/route.ts` ke model Prisma.

## Produksi

- Jalankan migration dengan `pnpm prisma migrate deploy`.
- Isi `NEXT_PUBLIC_SITE_URL`, kanal kontak, `AUTH_SECRET`, dan provider email/AI sesuai kebutuhan.
- Jalankan `pnpm build`, lalu `pnpm start` pada VPS/container atau gunakan platform Next.js yang kompatibel.
- Jangan memasukkan `.env` atau secret ke repository.

## Konten

Data awal berada di `lib/data.ts`. Portfolio yang tampil saat ini diberi label konsep demonstrasi agar tidak menyerupai klaim klien palsu. Schema Prisma telah menyiapkan model CMS untuk portfolio, layanan, pricing, FAQ, blog, leads, availability, dan site settings.
