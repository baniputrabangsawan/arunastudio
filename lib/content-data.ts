import { siteConfig } from "@/lib/site-config";

export type ServiceFaq = { question: string; answer: string };
export type PublicService = {
  slug: string;
  title: string;
  group: string;
  description: string;
  audience: string;
  problem: string;
  deliverables: string[];
  features: string[];
  startingPrice: string;
  timeline: string;
  exampleProject: string;
  faqs: ServiceFaq[];
};
export type PublicPricingPlan = { slug: string; name: string; price: string; note: string; revision: string; featured: boolean; features: string[] };
export type PublicFaq = { question: string; answer: string };
export type PublicPostSummary = { slug: string; title: string; excerpt: string; category: string; date: string; coverUrl: string };
export type PublicPost = PublicPostSummary & { content: string };
export type PublicSettings = { email: string; location: string; whatsapp: string; githubUrl: string; linkedinUrl: string; instagramUrl: string; threadsUrl: string };
export type PublicAvailability = { status: string; slots: number | null; message: string };

const services: PublicService[] = [
  {
    slug: "website-bisnis",
    group: "Website",
    title: "Website Bisnis",
    description: "Landing page dan company profile yang membantu pelanggan memahami layanan, harga, dan cara menghubungi bisnis Anda.",
    audience: "UMKM, usaha lokal, profesional, dan tim kecil yang masih mengandalkan Instagram atau WhatsApp sebagai pusat informasi.",
    problem: "Informasi bisnis tersebar, pelanggan mengulang pertanyaan yang sama, dan tampilan online belum cukup meyakinkan saat mereka membandingkan pilihan.",
    deliverables: ["Struktur halaman dan alur konten", "Desain desktop, tablet, dan mobile", "Development Next.js", "Form dan integrasi WhatsApp", "SEO dasar dan panduan serah terima"],
    features: ["Landing Page", "Company Profile", "Katalog layanan", "Contact form", "Google Maps", "Analytics dasar"],
    startingPrice: "Mulai Rp400.000",
    timeline: "7 hari kerja hingga 4 minggu, tergantung jumlah halaman dan kesiapan materi.",
    exampleProject: "Konsep Elevate Studio menunjukkan bagaimana usaha jasa dapat memperjelas positioning, layanan, karya, dan jalur memulai project.",
    faqs: [
      { question: "Apakah saya harus sudah memiliki semua konten?", answer: "Tidak. ARUNA membantu menyusun urutan konten dan memberi daftar materi yang perlu disiapkan sebelum development dimulai." },
      { question: "Apakah website bisa dikelola sendiri?", answer: "Bisa jika scope mencakup CMS. Kebutuhan ini ditentukan sejak awal agar biaya dan cara pengelolaannya jelas." },
    ],
  },
  {
    slug: "sistem-bisnis",
    group: "Sistem",
    title: "Sistem yang Memudahkan",
    description: "Booking, dashboard, dan alur kerja khusus untuk mengurangi pencatatan manual dan percakapan berulang.",
    audience: "Bengkel, barbershop, klinik, studio, travel, penyewaan, dan bisnis jasa yang mengatur jadwal atau data pelanggan setiap hari.",
    problem: "Booking masuk dari banyak kanal, jadwal mudah bentrok, dan tim menghabiskan waktu menyalin data yang sama ke beberapa tempat.",
    deliverables: ["Pemetaan alur kerja", "Prototype alur utama", "Dashboard sesuai peran", "Validasi data dan status", "Dokumentasi penggunaan"],
    features: ["Booking System", "Dashboard / Admin", "Notifikasi", "Manajemen status", "Ekspor data", "Integrasi API"],
    startingPrice: "Mulai Rp2.000.000",
    timeline: "Mulai 3–8 minggu setelah alur dan integrasi disepakati.",
    exampleProject: "Pola ini dapat diterapkan pada bengkel atau barbershop: layanan, jadwal, dan booking disusun agar mudah dibuka dari ponsel.",
    faqs: [
      { question: "Apakah sistem bisa mengikuti proses bisnis yang sudah berjalan?", answer: "Ya. ARUNA memetakan proses yang ada terlebih dahulu, lalu menyederhanakan bagian yang memang perlu diperbaiki." },
      { question: "Apakah biaya integrasi sudah termasuk?", answer: "Belum tentu. Biaya layanan pihak ketiga dan kompleksitas API ditampilkan terpisah di breakdown penawaran." },
    ],
  },
  {
    slug: "pertumbuhan",
    group: "Growth",
    title: "Tumbuh Lebih Terarah",
    description: "Fondasi SEO, struktur konten, dan perawatan website agar bisnis tetap mudah ditemukan dan informasinya terjaga.",
    audience: "Bisnis yang sudah memiliki website tetapi halaman pentingnya sulit ditemukan, lambat, atau jarang diperbarui.",
    problem: "Website sudah tayang, tetapi judul halaman tidak jelas, konten tidak menjawab pencarian pelanggan, dan perubahan kecil menumpuk.",
    deliverables: ["Audit teknis dan konten", "Perbaikan metadata dan internal link", "Rencana halaman prioritas", "Optimasi performa dasar", "Catatan pekerjaan dan rekomendasi lanjutan"],
    features: ["SEO on-page", "SEO lokal", "Content structure", "Performance audit", "Maintenance", "Analytics review"],
    startingPrice: "Mulai Rp300.000",
    timeline: "Audit awal 3–5 hari kerja. Implementasi mengikuti jumlah halaman dan temuan.",
    exampleProject: "Untuk bisnis lokal, fokus awal biasanya halaman layanan, lokasi, FAQ, dan jalur WhatsApp yang dapat ditemukan dari pencarian.",
    faqs: [
      { question: "Apakah SEO menjamin peringkat pertama?", answer: "Tidak. ARUNA menyiapkan fondasi teknis dan konten yang sehat; posisi tetap dipengaruhi kompetisi, kualitas informasi, dan konsistensi." },
      { question: "Bisakah hanya memperbaiki website yang sudah ada?", answer: "Bisa setelah audit singkat memastikan struktur dan teknologi yang digunakan masih layak diteruskan." },
    ],
  },
  {
    slug: "otomasi",
    group: "Automation",
    title: "Otomasi yang Relevan",
    description: "Integrasi dan otomatisasi untuk pekerjaan berulang yang sudah jelas, bukan fitur tambahan yang belum tentu dipakai.",
    audience: "Bisnis yang sudah memiliki proses digital dan ingin menghubungkan formulir, spreadsheet, notifikasi, atau layanan pihak ketiga.",
    problem: "Tim menyalin data antar-aplikasi, follow-up terlambat, atau status pesanan dan lead tidak tercatat konsisten.",
    deliverables: ["Audit proses berulang", "Peta data dan integrasi", "Implementasi workflow", "Penanganan error dasar", "Dokumentasi dan uji serah terima"],
    features: ["Form automation", "Webhook", "API Integration", "Email notification", "Data sync", "AI integration jika memang diperlukan"],
    startingPrice: "Mulai Rp600.000",
    timeline: "Mulai 1–4 minggu, bergantung akses API dan jumlah sistem yang dihubungkan.",
    exampleProject: "Contoh sederhana: lead dari website masuk ke database, pemilik bisnis menerima email, lalu calon pelanggan mendapat jalur WhatsApp yang sudah berisi ringkasan.",
    faqs: [
      { question: "Apakah semua proses perlu diotomatisasi?", answer: "Tidak. Prioritas diberikan pada pekerjaan yang sering berulang, rawan salah, dan punya aturan yang cukup jelas." },
      { question: "Apakah ARUNA memakai AI?", answer: "Hanya jika AI memberi manfaat yang dapat dijelaskan. Banyak kebutuhan cukup diselesaikan dengan aturan, integrasi, dan notifikasi biasa." },
    ],
  },
];

const pricing: PublicPricingPlan[] = [
  {
    slug: "landing-page",
    name: "Landing Page",
    price: "Rp400.000–Rp600.000",
    note: "Satu halaman ringkas untuk menjelaskan penawaran dan mengarahkan pelanggan ke tindakan utama.",
    features: ["Desain sesuai identitas bisnis", "Mobile responsive", "Hingga 5 section utama", "WhatsApp + contact form", "Google Maps & social media", "SEO dasar + optimasi performa", "Domain + hosting 1 tahun"],
    revision: "1× revisi minor",
    featured: false,
  },
  {
    slug: "company-profile",
    name: "Company Profile",
    price: "Rp900.000–Rp1.400.000",
    note: "Website beberapa halaman untuk bisnis yang membutuhkan profil, layanan, portfolio, dan kontak yang rapi.",
    features: ["Desain UI sesuai identitas bisnis", "Mobile responsive", "Hingga 6 halaman", "WhatsApp + contact form", "Google Maps & social media", "Galeri / portfolio", "Blog / berita", "CMS sederhana", "SEO on-page", "Google Analytics", "Optimasi performa", "Domain + hosting 1 tahun"],
    revision: "2× revisi",
    featured: true,
  },
  {
    slug: "custom-website",
    name: "Custom Website",
    price: "Mulai Rp2.000.000",
    note: "Website dengan booking, dashboard, katalog, atau alur khusus yang mengikuti proses bisnis.",
    features: ["Desain UI custom", "Mobile responsive", "Hingga 8 halaman", "CMS", "Admin dashboard", "WhatsApp integration", "Contact form", "Booking atau katalog", "Database integration", "Login pengguna bila diperlukan", "Integrasi API sederhana", "SEO on-page", "Google Analytics", "Domain + hosting 1 tahun", "Support setelah launching"],
    revision: "3× revisi",
    featured: false,
  },
];

const faqs: PublicFaq[] = [
  { question: "Berapa lama website selesai?", answer: "Landing page umumnya 7–14 hari kerja. Company profile sekitar 2–4 minggu. Waktu final bergantung pada kelengkapan materi dan ruang lingkup." },
  { question: "Apakah sudah termasuk domain dan hosting?", answer: "Paket Landing Page, Company Profile, dan Custom Website sudah termasuk domain serta hosting selama 1 tahun." },
  { question: "Apakah website nyaman dibuka di HP?", answer: "Ya. Setiap website dirancang mobile-first, lalu diperiksa kembali pada tablet dan desktop." },
  { question: "Apakah saya bisa mengubah isi website sendiri?", answer: "Bisa jika project mencakup CMS. ARUNA akan menjelaskan bagian yang dapat Anda ubah dan cara mengelolanya." },
  { question: "Apakah website bisa muncul di Google?", answer: "ARUNA menyiapkan metadata, struktur halaman, sitemap, dan fondasi teknis SEO. Peringkat tetap dipengaruhi kompetisi dan kualitas konten." },
  { question: "Bagaimana sistem pembayarannya?", answer: "Pembayaran dibagi berdasarkan milestone yang disepakati. Scope, biaya, revisi, dan jadwal ditulis sebelum pengerjaan dimulai." },
  { question: "Apakah ARUNA melayani seluruh Indonesia?", answer: "Ya. Konsultasi, review, dan serah terima dapat dilakukan secara daring dari mana pun di Indonesia." },
];

const posts: PublicPost[] = [
  {
    slug: "website-bukan-sekadar-etalase",
    title: "Website harus membantu pelanggan bertindak",
    excerpt: "Susun halaman berdasarkan keputusan pelanggan, bukan berdasarkan daftar informasi internal bisnis.",
    category: "Website Bisnis",
    date: "18 Agustus 2026",
    coverUrl: "/images/elevate (1).png",
    content: `Website bisnis punya pekerjaan yang lebih penting daripada sekadar terlihat rapi. Halamannya harus membantu calon pelanggan memahami apa yang dijual, menentukan apakah layanan itu cocok, lalu mengambil langkah berikutnya tanpa perlu menebak.

## Mulai dari keputusan pelanggan

Pemilik bisnis biasanya ingin menampilkan sejarah, visi, seluruh layanan, dan banyak foto sekaligus. Pelanggan datang dengan urutan berbeda. Mereka ingin tahu apa yang bisa dibeli, berapa kisaran biayanya, apakah bisnis ini dapat dipercaya, dan bagaimana cara memulai.

Susun halaman mengikuti urutan tersebut. Letakkan penawaran utama lebih awal. Jelaskan siapa yang paling terbantu. Tampilkan harga awal atau cara biaya dihitung. Tutup dengan tindakan yang jelas seperti melihat menu, memilih jadwal, atau mengirim brief.

## Jawab pertanyaan sebelum WhatsApp dibuka

WhatsApp sebaiknya dipakai untuk percakapan yang membutuhkan konteks, bukan untuk menjawab alamat, jam buka, daftar layanan, dan harga dasar berulang kali. Informasi yang konsisten di website mengurangi percakapan pembuka dan membantu pelanggan datang dengan pertanyaan yang lebih spesifik.

## Gunakan satu tindakan utama

Setiap halaman perlu satu tujuan yang paling penting. Halaman jasa dapat mengarah ke konsultasi. Halaman restoran dapat mengarah ke reservasi atau menu. Halaman portfolio dapat mengarah ke case study. Tautan lain tetap boleh ada, tetapi jangan membuat lima tombol terlihat sama penting.

## Periksa dengan tugas sederhana

Buka halaman dari ponsel dan beri diri Anda tiga puluh detik. Bisakah Anda menyebutkan layanan, kisaran biaya, alasan untuk percaya, dan langkah berikutnya? Jika salah satunya tidak jelas, perbaiki urutan informasi sebelum menambah fitur baru.`,
  },
  {
    slug: "tanda-bisnis-perlu-website",
    title: "5 tanda bisnis Anda sudah perlu website",
    excerpt: "Instagram dan WhatsApp tetap berguna, tetapi keduanya mulai membatasi bisnis saat informasi dan permintaan pelanggan bertambah.",
    category: "UMKM",
    date: "10 Agustus 2026",
    coverUrl: "/images/pilahyuk (1).png",
    content: `Website belum tentu menjadi prioritas untuk setiap usaha yang baru mulai. Namun ada titik ketika mengandalkan media sosial dan chat membuat pelanggan kesulitan mencari informasi, sementara pemilik bisnis mengulang pekerjaan yang sama setiap hari.

## 1. Pertanyaan yang sama terus berulang

Jika pelanggan selalu menanyakan harga, alamat, jam buka, daftar layanan, atau cara memesan, website dapat menjadi sumber jawaban yang konsisten. WhatsApp tetap tersedia untuk kebutuhan khusus setelah informasi dasar dibaca.

## 2. Informasi penting tenggelam di feed

Unggahan lama sulit ditemukan dan sorotan Instagram punya ruang terbatas. Website memberi alamat tetap untuk menu, layanan, kebijakan, portfolio, dan kontak. Anda dapat memperbarui informasi tanpa mengandalkan urutan posting.

## 3. Pelanggan membandingkan beberapa pilihan

Saat harga atau risikonya lebih tinggi, pelanggan biasanya ingin melihat proses, hasil kerja, dan batas layanan sebelum menghubungi. Halaman yang terstruktur membantu mereka menilai bisnis Anda dengan informasi yang sama.

## 4. Booking manual mulai merepotkan

Jadwal yang dicatat melalui banyak chat mudah terlewat. Website dapat mengarahkan pelanggan ke form atau sistem booking yang meminta data penting sejak awal. Mulailah dari alur sederhana sebelum membangun dashboard yang kompleks.

## 5. Bisnis perlu ditemukan lewat pencarian

Profil media sosial membantu, tetapi website memberi ruang untuk halaman layanan dan lokasi yang lebih mudah dipahami mesin pencari. SEO tetap membutuhkan konten dan perawatan, namun fondasinya lebih mudah dibangun pada halaman yang Anda kendalikan.

Catat pertanyaan pelanggan selama satu minggu. Jika jawabannya berulang dan memakan waktu, itu bahan pertama untuk struktur website Anda.`,
  },
  {
    slug: "seo-lokal-sederhana",
    title: "Fondasi SEO lokal yang sering terlewat",
    excerpt: "Perjelas layanan, lokasi, identitas bisnis, dan jalur kontak sebelum mengejar banyak artikel.",
    category: "SEO",
    date: "2 Agustus 2026",
    coverUrl: "/images/blackyellow.png",
    content: `SEO lokal dimulai dari informasi bisnis yang jelas. Untuk bengkel, klinik, restoran, kontraktor, dan jasa lain yang melayani area tertentu, pelanggan perlu menemukan jenis layanan, lokasi, jam operasional, dan cara menghubungi dalam beberapa langkah.

## Buat halaman untuk layanan utama

Satu halaman yang menumpuk semua layanan membuat topiknya kabur. Pisahkan layanan yang benar-benar dicari pelanggan jika masing-masing punya proses, harga, atau pertanyaan berbeda. Hindari membuat halaman tipis yang hanya mengganti nama layanan.

## Tulis lokasi secara konsisten

Gunakan nama bisnis, alamat, nomor telepon, dan jam operasional yang sama di website serta profil bisnis lain. Cantumkan area layanan secara wajar di bagian yang membantu pelanggan. Mengulang nama kota di setiap kalimat tidak membuat halaman lebih berguna.

## Lengkapi title dan description

Title perlu menyebut layanan utama dan brand. Meta description menjelaskan apa yang tersedia dan siapa yang dilayani. Keduanya membantu hasil pencarian lebih mudah dipahami, tetapi bukan tempat untuk menjejalkan semua variasi kata kunci.

## Hubungkan halaman yang berkaitan

Artikel tentang perawatan kendaraan dapat mengarah ke halaman servis. Case study restoran dapat mengarah ke layanan website bisnis. Internal link yang relevan membantu pengunjung melanjutkan pencarian dan memberi konteks antarkonten.

## Ukur tindakan yang penting

Pantau halaman yang membawa klik WhatsApp, pengiriman form, booking, atau telepon. Jumlah kunjungan saja tidak menjelaskan apakah website membantu bisnis. Perbaiki halaman yang banyak dibuka tetapi tidak memberi jalur tindakan yang jelas.`,
  },
];

const settings: PublicSettings = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  location: "Makassar, Indonesia",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  githubUrl: "https://github.com/baniputrabangsawan",
  linkedinUrl: "https://www.linkedin.com/in/baniputrabangsawan/",
  instagramUrl: "https://instagram.com/baniputra__",
  threadsUrl: process.env.NEXT_PUBLIC_THREADS_URL || "",
};

export async function getPublishedServices(): Promise<PublicService[]> { return services; }
export async function getPublishedService(slug: string): Promise<PublicService | null> { return services.find((service) => service.slug === slug) ?? null; }
export async function getPublishedPricing(): Promise<PublicPricingPlan[]> { return pricing; }
export async function getPublishedFaqs(): Promise<PublicFaq[]> { return faqs; }
export async function getPublishedPosts(): Promise<PublicPostSummary[]> { return posts; }
export async function getPublishedPost(slug: string): Promise<PublicPost | null> { return posts.find((post) => post.slug === slug) ?? null; }
export async function getPublicSettings(): Promise<PublicSettings> { return settings; }
export async function getPublicAvailability(): Promise<PublicAvailability> { return siteConfig.availability; }
