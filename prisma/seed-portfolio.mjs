import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const legacyProjects = [
  {
    slug: "elevatestudio",
    name: "Elevate Studio",
    category: "Usaha",
    type: "Landing Page",
    description: "Elevate Studio adalah photographer yang menyediakan jasa foto untuk berbagai acara.",
    problem: "Calon pelanggan kesulitan melihat karakter visual, pilihan layanan, dan cara memesan dalam satu tempat.",
    solution: "Portfolio foto, layanan, dan jalur pemesanan disusun menjadi landing page yang ringkas dan mudah dipercaya.",
    focus: ["Mobile-first", "Portfolio visual", "Pemesanan jelas", "SEO-ready"],
    imageUrl: "/images/project-rasa-nusa.webp",
    imageAlt: "Tampilan website Elevate Studio",
    order: 0,
  },
  {
    slug: "pilah-yuk",
    name: "Pilah Yuk",
    category: "Pendidikan",
    type: "Landing page & booking",
    description: "Program tersusun jelas dan konsultasi bisa dijadwalkan tanpa percakapan berulang.",
    problem: "Informasi edukasi pengelolaan sampah tersebar dan masyarakat belum memiliki panduan tindakan yang sederhana.",
    solution: "Materi, program, dan konsultasi disusun dalam alur yang membantu pengguna memahami dan mulai memilah sampah.",
    focus: ["Mobile-first", "Edukasi", "Konsultasi", "SEO-ready"],
    imageUrl: "/images/aruna-hero-business-owner.webp",
    imageAlt: "Tampilan website Pilah Yuk",
    order: 1,
  },
  {
    slug: "blackyellowbarbershop",
    name: "Blackyellow Barbershop",
    category: "UMKM",
    type: "Website & booking",
    description: "Pelanggan memilih layanan dan memesan jadwal servis dari satu halaman.",
    problem: "Daftar layanan dan jadwal belum dapat diperiksa pelanggan sebelum menghubungi barbershop.",
    solution: "Website menyatukan layanan, identitas brand, dan alur booking agar pemesanan lebih cepat.",
    focus: ["Mobile-first", "Daftar layanan", "Booking", "SEO lokal"],
    imageUrl: "/images/project-bengkel-selaras.webp",
    imageAlt: "Tampilan website Blackyellow Barbershop",
    order: 2,
  },
];

for (const project of legacyProjects) {
  const existing = await prisma.portfolio.findFirst({
    where: { OR: [{ slug: project.slug }, { name: { equals: project.name, mode: "insensitive" } }] },
  });

  if (existing) {
    await prisma.portfolio.update({ where: { id: existing.id }, data: { order: project.order, published: true } });
    console.log(`Dipertahankan dan ditayangkan: ${existing.name}`);
    continue;
  }

  const { imageUrl, imageAlt, ...data } = project;
  await prisma.portfolio.create({
    data: {
      ...data,
      isDemo: true,
      published: true,
      media: { create: { url: imageUrl, alt: imageAlt, type: "image", order: 0 } },
    },
  });
  console.log(`Diimpor: ${project.name}`);
}

await prisma.$disconnect();
