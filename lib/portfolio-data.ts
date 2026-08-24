export type PortfolioProject = {
  slug: string;
  name: string;
  category: string;
  type: string;
  summary: string;
  problem: string;
  solution: string;
  focus: string[];
  imageUrl: string;
  imageAlt: string;
  isDemo: boolean;
};

const projects: PortfolioProject[] = [
  {
    slug: "elevatestudio",
    name: "Elevate Studio",
    category: "Usaha",
    type: "Landing Page",
    summary: "Elevate Studio adalah photographer yang menyediakan jasa foto untuk berbagai acara.",
    problem: "Calon pelanggan kesulitan melihat karakter visual, pilihan layanan, dan cara memesan dalam satu tempat.",
    solution: "Portfolio foto, layanan, dan jalur pemesanan disusun menjadi landing page yang ringkas dan mudah dipercaya.",
    focus: ["Mobile-first", "Portfolio visual", "Pemesanan jelas", "SEO-ready"],
    imageUrl: "/images/project-rasa-nusa.webp",
    imageAlt: "Tampilan website Elevate Studio",
    isDemo: true,
  },
  {
    slug: "pilah-yuk",
    name: "Pilah Yuk",
    category: "Pendidikan",
    type: "Landing page & booking",
    summary: "Program tersusun jelas dan konsultasi bisa dijadwalkan tanpa percakapan berulang.",
    problem: "Informasi edukasi pengelolaan sampah tersebar dan masyarakat belum memiliki panduan tindakan yang sederhana.",
    solution: "Materi, program, dan konsultasi disusun dalam alur yang membantu pengguna memahami dan mulai memilah sampah.",
    focus: ["Mobile-first", "Edukasi", "Konsultasi", "SEO-ready"],
    imageUrl: "/images/aruna-hero-business-owner.webp",
    imageAlt: "Tampilan website Pilah Yuk",
    isDemo: true,
  },
  {
    slug: "blackyellowbarbershop",
    name: "Blackyellow Barbershop",
    category: "UMKM",
    type: "Website & booking",
    summary: "Pelanggan memilih layanan dan memesan jadwal servis dari satu halaman.",
    problem: "Daftar layanan dan jadwal belum dapat diperiksa pelanggan sebelum menghubungi barbershop.",
    solution: "Website menyatukan layanan, identitas brand, dan alur booking agar pemesanan lebih cepat.",
    focus: ["Mobile-first", "Daftar layanan", "Booking", "SEO lokal"],
    imageUrl: "/images/project-bengkel-selaras.webp",
    imageAlt: "Tampilan website Blackyellow Barbershop",
    isDemo: true,
  },
];

export async function getPublishedProjects(): Promise<PortfolioProject[]> {
  return projects;
}

export async function getPublishedProject(slug: string): Promise<PortfolioProject | null> {
  return projects.find((project) => project.slug === slug) ?? null;
}
