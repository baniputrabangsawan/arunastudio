import { siteConfig } from "@/lib/site-config";

export type PublicService = { slug: string; title: string; group: string; description: string; items: string[] };
export type PublicPricingPlan = { slug: string; name: string; price: string; note: string; featured: boolean; features: string[] };
export type PublicFaq = { question: string; answer: string };
export type PublicPostSummary = { slug: string; title: string; excerpt: string; category: string; date: string; coverUrl: string };
export type PublicPost = PublicPostSummary & { content: string };
export type PublicSettings = {
  email: string;
  location: string;
  whatsapp: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  threadsUrl: string;
};
export type PublicAvailability = { status: string; slots: number | null; message: string };

const services: PublicService[] = [
  { slug: "website-bisnis", group: "Website", title: "Website Bisnis", description: "Company profile, landing page, dan toko online yang membuat bisnis mudah dipercaya.", items: ["Landing Page", "Company Profile", "Website UMKM", "E-commerce"] },
  { slug: "sistem-bisnis", group: "Sistem", title: "Sistem yang Memudahkan", description: "Alur booking, dashboard, dan aplikasi khusus untuk pekerjaan yang lebih ringkas.", items: ["Booking System", "Dashboard / Admin", "Custom Web App"] },
  { slug: "pertumbuhan", group: "Growth", title: "Tumbuh Lebih Terarah", description: "Fondasi SEO, identitas brand, dan dukungan rutin setelah website tayang.", items: ["SEO", "Branding", "Maintenance"] },
  { slug: "otomasi", group: "Automation", title: "Otomasi yang Relevan", description: "Integrasi AI dan otomatisasi hanya untuk proses yang benar-benar memberi manfaat.", items: ["Automation", "AI Integration", "API Integration"] },
];

const pricing: PublicPricingPlan[] = [
  { slug: "landing-page", name: "Landing Page", price: "Rp400-800 ribu", note: "Satu halaman yang fokus mengubah perhatian menjadi tindakan.", features: ["Desain custom", "Mobile responsive", "WhatsApp & formulir", "SEO dasar"], featured: false },
  { slug: "company-profile", name: "Company Profile", price: "Rp900 ribu-1,4 juta", note: "Rumah digital lengkap untuk bisnis yang ingin tampil lebih serius.", features: ["Hingga 6 halaman", "CMS konten", "Optimasi performa", "SEO on-page"], featured: true },
  { slug: "custom-website", name: "Custom Website", price: "Mulai Rp2 juta", note: "Untuk alur dan sistem yang disesuaikan dengan cara bisnis Anda bekerja.", features: ["Scope fleksibel", "Booking / e-commerce", "Dashboard", "Integrasi API"], featured: false },
];

const faqs: PublicFaq[] = [
  { question: "Berapa lama website selesai?", answer: "Landing page umumnya 7-14 hari kerja. Company profile sekitar 2-4 minggu. Waktu final bergantung pada kelengkapan materi dan ruang lingkup." },
  { question: "Apakah sudah termasuk domain dan hosting?", answer: "Domain dan hosting dapat ditambahkan sesuai kebutuhan. Biayanya selalu ditampilkan terpisah sebelum project dimulai." },
  { question: "Apakah website nyaman dibuka di HP?", answer: "Ya. Setiap website dirancang mobile-first, lalu disesuaikan untuk tablet dan desktop." },
  { question: "Apakah saya bisa mengubah isi website sendiri?", answer: "Bisa. Kami dapat menyediakan CMS agar teks, foto, layanan, atau artikel dapat Anda perbarui tanpa menyentuh kode." },
  { question: "Apakah website bisa muncul di Google?", answer: "Kami menyiapkan fondasi teknis SEO dan membantu proses indeksasi. Posisi pencarian tetap dipengaruhi kompetisi, kualitas konten, dan konsistensi optimasi." },
  { question: "Bagaimana sistem pembayarannya?", answer: "Pembayaran dibagi berdasarkan milestone yang disepakati. Seluruh scope, biaya, dan jadwal dijelaskan sebelum pengerjaan dimulai." },
  { question: "Apakah ARUNA melayani seluruh Indonesia?", answer: "Ya. Konsultasi, review, dan serah terima dapat dilakukan secara daring dari mana pun di Indonesia." },
];

const articleContent = `Website yang baik membantu pelanggan memahami bisnis, menemukan jawaban, dan mengambil tindakan tanpa kebingungan. Desain harus dimulai dari perjalanan pelanggan, bukan dari daftar efek visual.

## Mulai dari pertanyaan pelanggan

Susun informasi berdasarkan hal yang paling ingin diketahui calon pelanggan: apa yang ditawarkan, untuk siapa, berapa kisaran biayanya, dan bagaimana cara memulai. Struktur yang jelas sering memberi dampak lebih besar daripada fitur yang banyak.

## Tunjukkan alasan untuk percaya

Tampilkan proses, scope, harga, dan karya secara jujur. Pengalaman digital perlu konsisten dengan cara bisnis berkomunikasi.`;

const posts: PublicPost[] = [
  { slug: "website-bukan-sekadar-etalase", title: "Website harus membantu pelanggan bertindak", excerpt: "Susun website berdasarkan pertanyaan dan tindakan pelanggan, bukan daftar informasi bisnis.", category: "Website Bisnis", date: "18 Agustus 2026", coverUrl: "/images/project-rasa-nusa.webp", content: articleContent },
  { slug: "tanda-bisnis-perlu-website", title: "5 tanda bisnis Anda sudah perlu website", excerpt: "Saat WhatsApp dan media sosial mulai tidak cukup untuk menjawab kebutuhan pelanggan.", category: "UMKM", date: "10 Agustus 2026", coverUrl: "/images/aruna-hero-business-owner.webp", content: articleContent },
  { slug: "seo-lokal-sederhana", title: "Fondasi SEO lokal yang sering terlewat", excerpt: "Langkah kecil untuk membantu calon pelanggan menemukan bisnis Anda lewat pencarian.", category: "SEO", date: "2 Agustus 2026", coverUrl: "/images/project-bengkel-selaras.webp", content: articleContent },
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

export async function getPublishedServices(): Promise<PublicService[]> {
  return services;
}

export async function getPublishedService(slug: string): Promise<PublicService | null> {
  return services.find((service) => service.slug === slug) ?? null;
}

export async function getPublishedPricing(): Promise<PublicPricingPlan[]> {
  return pricing;
}

export async function getPublishedFaqs(): Promise<PublicFaq[]> {
  return faqs;
}

export async function getPublishedPosts(): Promise<PublicPostSummary[]> {
  return posts;
}

export async function getPublishedPost(slug: string): Promise<PublicPost | null> {
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPublicSettings(): Promise<PublicSettings> {
  return settings;
}

export async function getPublicAvailability(): Promise<PublicAvailability> {
  return siteConfig.availability;
}
