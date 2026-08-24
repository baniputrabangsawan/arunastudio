# ARUNA Website

Website frontend ARUNA untuk jasa pembuatan website UMKM Indonesia. Dibangun dengan Next.js, TypeScript, Tailwind CSS, dan GSAP.

## Menjalankan lokal

1. Jalankan `pnpm install`.
2. Opsional: buat `.env.local` untuk mengatur kanal publik berikut:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_CONTACT_EMAIL`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_THREADS_URL`
3. Jalankan `pnpm dev`.

## Produksi

- Jalankan `pnpm lint`, `pnpm typecheck`, dan `pnpm build`.
- Jalankan hasil produksi dengan `pnpm start` atau deploy ke platform Next.js.
- Jangan memasukkan `.env` atau secret ke repository.

## Arsitektur

Website ini tidak memiliki dashboard admin, API internal, autentikasi, atau database. Konten publik berada di `lib/content-data.ts` dan `lib/portfolio-data.ts`, sehingga semua halaman dapat diprerender saat build.

Formulir kontak dan project brief diproses sepenuhnya di browser. Data diteruskan ke WhatsApp atau aplikasi email sesuai environment variable publik. Jika keduanya belum dikonfigurasi, pesan disalin ke clipboard agar tetap dapat dikirim melalui kanal kontak yang tersedia.
