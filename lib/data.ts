export const services = [
  { slug: "website-bisnis", group: "Website", title: "Website Bisnis", description: "Company profile, landing page, dan toko online yang membuat bisnis mudah dipercaya.", items: ["Landing Page", "Company Profile", "Website UMKM", "E-commerce"] },
  { slug: "sistem-bisnis", group: "Sistem", title: "Sistem yang Memudahkan", description: "Alur booking, dashboard, dan aplikasi khusus untuk pekerjaan yang lebih ringkas.", items: ["Booking System", "Dashboard / Admin", "Custom Web App"] },
  { slug: "pertumbuhan", group: "Growth", title: "Tumbuh Lebih Terarah", description: "Fondasi SEO, identitas brand, dan dukungan rutin setelah website tayang.", items: ["SEO", "Branding", "Maintenance"] },
  { slug: "otomasi", group: "Automation", title: "Otomasi yang Relevan", description: "Integrasi AI dan otomatisasi hanya untuk proses yang benar-benar memberi manfaat.", items: ["Automation", "AI Integration", "API Integration"] },
] as const;

export const pricing = [
  { name: "Landing Page", price: "Rp400-800 ribu", note: "Satu halaman yang fokus mengubah perhatian menjadi tindakan.", features: ["Desain custom", "Mobile responsive", "WhatsApp & formulir", "SEO dasar"], featured: false },
  { name: "Company Profile", price: "Rp900 ribu-1,4 juta", note: "Rumah digital lengkap untuk bisnis yang ingin tampil lebih serius.", features: ["Hingga 6 halaman", "CMS konten", "Optimasi performa", "SEO on-page"], featured: true },
  { name: "Custom Website", price: "Mulai Rp2 juta", note: "Untuk alur dan sistem yang disesuaikan dengan cara bisnis Anda bekerja.", features: ["Scope fleksibel", "Booking / e-commerce", "Dashboard", "Integrasi API"], featured: false },
] as const;

export const projects = [
  { slug: "rasa-nusa", name: "Rasa Nusa", category: "Kuliner", type: "Company profile & katalog", summary: "Menu mudah dilihat. Lokasi dan reservasi mudah ditemukan.", color: "#9E4936", surface: "#F7DFCB" },
  { slug: "ruang-tumbuh", name: "Ruang Tumbuh", category: "Pendidikan", type: "Landing page & booking", summary: "Program tersusun jelas dan konsultasi bisa dijadwalkan tanpa percakapan berulang.", color: "#345348", surface: "#DDE7DE" },
  { slug: "bengkel-selaras", name: "Bengkel Selaras", category: "Otomotif", type: "Website & booking", summary: "Pelanggan memilih layanan dan memesan jadwal servis dari satu halaman.", color: "#29343A", surface: "#D9DEE0" },
] as const;

export const faqs = [
  ["Berapa lama website selesai?", "Landing page umumnya 7-14 hari kerja. Company profile sekitar 2-4 minggu. Waktu final bergantung pada kelengkapan materi dan ruang lingkup."],
  ["Apakah sudah termasuk domain dan hosting?", "Domain dan hosting dapat ditambahkan sesuai kebutuhan. Biayanya selalu ditampilkan terpisah sebelum project dimulai."],
  ["Apakah website nyaman dibuka di HP?", "Ya. Setiap website dirancang mobile-first, lalu disesuaikan untuk tablet dan desktop."],
  ["Apakah saya bisa mengubah isi website sendiri?", "Bisa. Kami dapat menyediakan CMS agar teks, foto, layanan, atau artikel dapat Anda perbarui tanpa menyentuh kode."],
  ["Apakah website bisa muncul di Google?", "Kami menyiapkan fondasi teknis SEO dan membantu proses indeksasi. Posisi pencarian tetap dipengaruhi kompetisi, kualitas konten, dan konsistensi optimasi."],
  ["Bagaimana sistem pembayarannya?", "Pembayaran dibagi berdasarkan milestone yang disepakati. Seluruh scope, biaya, dan jadwal dijelaskan sebelum pengerjaan dimulai."],
  ["Apakah ARUNA melayani seluruh Indonesia?", "Ya. Konsultasi, review, dan serah terima dapat dilakukan secara daring dari mana pun di Indonesia."],
] as const;

export const posts = [
  { slug: "website-bukan-sekadar-etalase", title: "Website harus membantu pelanggan bertindak", excerpt: "Susun website berdasarkan pertanyaan dan tindakan pelanggan, bukan daftar informasi bisnis.", category: "Website Bisnis", date: "18 Agustus 2026" },
  { slug: "tanda-bisnis-perlu-website", title: "5 tanda bisnis Anda sudah perlu website", excerpt: "Saat WhatsApp dan media sosial mulai tidak cukup untuk menjawab kebutuhan pelanggan.", category: "UMKM", date: "10 Agustus 2026" },
  { slug: "seo-lokal-sederhana", title: "Fondasi SEO lokal yang sering terlewat", excerpt: "Langkah kecil untuk membantu calon pelanggan menemukan bisnis Anda lewat pencarian.", category: "SEO", date: "2 Agustus 2026" },
] as const;

export const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/layanan", label: "Layanan" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/#proses", label: "Proses" },
  { href: "/harga", label: "Harga" },
  { href: "/#faq", label: "FAQ" },
  { href: "/kontak", label: "Kontak" },
];
