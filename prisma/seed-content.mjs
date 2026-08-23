import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const services = [
  { slug: "website-bisnis", group: "Website", title: "Website Bisnis", description: "Company profile, landing page, dan toko online yang membuat bisnis mudah dipercaya.", items: ["Landing Page", "Company Profile", "Website UMKM", "E-commerce"], order: 0 },
  { slug: "sistem-bisnis", group: "Sistem", title: "Sistem yang Memudahkan", description: "Alur booking, dashboard, dan aplikasi khusus untuk pekerjaan yang lebih ringkas.", items: ["Booking System", "Dashboard / Admin", "Custom Web App"], order: 1 },
  { slug: "pertumbuhan", group: "Growth", title: "Tumbuh Lebih Terarah", description: "Fondasi SEO, identitas brand, dan dukungan rutin setelah website tayang.", items: ["SEO", "Branding", "Maintenance"], order: 2 },
  { slug: "otomasi", group: "Automation", title: "Otomasi yang Relevan", description: "Integrasi AI dan otomatisasi hanya untuk proses yang benar-benar memberi manfaat.", items: ["Automation", "AI Integration", "API Integration"], order: 3 },
];

const pricing = [
  { slug: "landing-page", name: "Landing Page", priceMin: 400000, priceMax: 800000, description: "Satu halaman yang fokus mengubah perhatian menjadi tindakan.", features: ["Desain custom", "Mobile responsive", "WhatsApp & formulir", "SEO dasar"], featured: false, order: 0 },
  { slug: "company-profile", name: "Company Profile", priceMin: 900000, priceMax: 1400000, description: "Rumah digital lengkap untuk bisnis yang ingin tampil lebih serius.", features: ["Hingga 6 halaman", "CMS konten", "Optimasi performa", "SEO on-page"], featured: true, order: 1 },
  { slug: "custom-website", name: "Custom Website", priceMin: 2000000, priceMax: null, description: "Untuk alur dan sistem yang disesuaikan dengan cara bisnis Anda bekerja.", features: ["Scope fleksibel", "Booking / e-commerce", "Dashboard", "Integrasi API"], featured: false, order: 2 },
];

const faqs = [
  ["Berapa lama website selesai?", "Landing page umumnya 7-14 hari kerja. Company profile sekitar 2-4 minggu. Waktu final bergantung pada kelengkapan materi dan ruang lingkup."],
  ["Apakah sudah termasuk domain dan hosting?", "Domain dan hosting dapat ditambahkan sesuai kebutuhan. Biayanya selalu ditampilkan terpisah sebelum project dimulai."],
  ["Apakah website nyaman dibuka di HP?", "Ya. Setiap website dirancang mobile-first, lalu disesuaikan untuk tablet dan desktop."],
  ["Apakah saya bisa mengubah isi website sendiri?", "Bisa. Kami dapat menyediakan CMS agar teks, foto, layanan, atau artikel dapat Anda perbarui tanpa menyentuh kode."],
  ["Apakah website bisa muncul di Google?", "Kami menyiapkan fondasi teknis SEO dan membantu proses indeksasi. Posisi pencarian tetap dipengaruhi kompetisi, kualitas konten, dan konsistensi optimasi."],
  ["Bagaimana sistem pembayarannya?", "Pembayaran dibagi berdasarkan milestone yang disepakati. Seluruh scope, biaya, dan jadwal dijelaskan sebelum pengerjaan dimulai."],
  ["Apakah ARUNA melayani seluruh Indonesia?", "Ya. Konsultasi, review, dan serah terima dapat dilakukan secara daring dari mana pun di Indonesia."],
];

const articleContent = `Website yang baik membantu pelanggan memahami bisnis, menemukan jawaban, dan mengambil tindakan tanpa kebingungan. Desain harus dimulai dari perjalanan pelanggan, bukan dari daftar efek visual.

## Mulai dari pertanyaan pelanggan

Susun informasi berdasarkan hal yang paling ingin diketahui calon pelanggan: apa yang ditawarkan, untuk siapa, berapa kisaran biayanya, dan bagaimana cara memulai. Struktur yang jelas sering memberi dampak lebih besar daripada fitur yang banyak.

## Tunjukkan alasan untuk percaya

Tampilkan proses, scope, harga, dan karya secara jujur. Pengalaman digital perlu konsisten dengan cara bisnis berkomunikasi.`;

const posts = [
  { slug: "website-bukan-sekadar-etalase", title: "Website harus membantu pelanggan bertindak", excerpt: "Susun website berdasarkan pertanyaan dan tindakan pelanggan, bukan daftar informasi bisnis.", category: "Website Bisnis", publishedAt: new Date("2026-08-18T00:00:00.000Z"), coverUrl: "/images/project-rasa-nusa.webp", order: 0 },
  { slug: "tanda-bisnis-perlu-website", title: "5 tanda bisnis Anda sudah perlu website", excerpt: "Saat WhatsApp dan media sosial mulai tidak cukup untuk menjawab kebutuhan pelanggan.", category: "UMKM", publishedAt: new Date("2026-08-10T00:00:00.000Z"), coverUrl: "/images/aruna-hero-business-owner.webp", order: 1 },
  { slug: "seo-lokal-sederhana", title: "Fondasi SEO lokal yang sering terlewat", excerpt: "Langkah kecil untuk membantu calon pelanggan menemukan bisnis Anda lewat pencarian.", category: "SEO", publishedAt: new Date("2026-08-02T00:00:00.000Z"), coverUrl: "/images/project-bengkel-selaras.webp", order: 2 },
];

const settings = [
  ["contact.email", process.env.NEXT_PUBLIC_CONTACT_EMAIL || ""],
  ["contact.location", "Makassar, Indonesia"],
  ["contact.whatsapp", process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""],
  ["social.github", "https://github.com/baniputrabangsawan"],
  ["social.linkedin", "https://www.linkedin.com/in/baniputrabangsawan/"],
  ["social.instagram", "https://instagram.com/baniputra__"],
  ["social.threads", process.env.NEXT_PUBLIC_THREADS_URL || ""],
];

for (const service of services) {
  await prisma.service.upsert({ where: { slug: service.slug }, update: { ...service, published: true }, create: { ...service, published: true } });
}

for (const plan of pricing) {
  const { features, ...data } = plan;
  const saved = await prisma.pricingPlan.upsert({ where: { slug: plan.slug }, update: { ...data, published: true }, create: { ...data, published: true } });
  if (await prisma.pricingFeature.count({ where: { planId: saved.id } }) === 0) {
    await prisma.pricingFeature.createMany({ data: features.map((label, order) => ({ planId: saved.id, label, order, included: true })) });
  }
}

for (const [order, [question, answer]] of faqs.entries()) {
  const existing = await prisma.fAQ.findFirst({ where: { question } });
  if (existing) await prisma.fAQ.update({ where: { id: existing.id }, data: { answer, order, published: true } });
  else await prisma.fAQ.create({ data: { question, answer, order, published: true } });
}

for (const post of posts) {
  const categorySlug = post.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const category = await prisma.blogCategory.upsert({ where: { slug: categorySlug }, update: { name: post.category }, create: { slug: categorySlug, name: post.category } });
  const { category: _category, ...postData } = post;
  await prisma.blogPost.upsert({
    where: { slug: post.slug },
    update: { title: post.title, excerpt: post.excerpt, coverUrl: post.coverUrl, order: post.order, publishedAt: post.publishedAt, categoryId: category.id },
    create: { ...postData, content: articleContent, categoryId: category.id },
  });
}

for (const [key, value] of settings) {
  await prisma.siteSetting.upsert({ where: { key }, update: {}, create: { key, value } });
}

if (await prisma.availability.count() === 0) {
  await prisma.availability.create({ data: { status: "Available", slots: 1 } });
}

console.log("Konten awal layanan, harga, FAQ, blog, ketersediaan, dan pengaturan berhasil disiapkan.");
await prisma.$disconnect();
