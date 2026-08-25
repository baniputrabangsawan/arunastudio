export type PortfolioProject = {
  slug: string;
  name: string;
  category: string;
  type: string;
  status: "concept" | "client";
  summary: string;
  challenge: string;
  strategy: string;
  design: string;
  features: string[];
  imageUrl: string;
  imageAlt: string;
  liveUrl?: string;
};

const projects: PortfolioProject[] = [
  {
    slug: "elevate-studio",
    name: "Elevate Studio",
    category: "Studio digital",
    type: "Company profile",
    status: "concept",
    summary: "Konsep website studio digital dengan positioning singkat, layanan yang mudah dipindai, dan jalur memulai project yang tegas.",
    challenge: "Calon pelanggan perlu memahami kualitas, jenis layanan, dan cara bekerja studio sebelum bersedia menceritakan projectnya.",
    strategy: "Positioning ditempatkan sebagai fokus utama, lalu pengguna diarahkan ke karya, layanan, proses, dan satu CTA konsultasi.",
    design: "Komposisi gelap dan tipografi besar memberi karakter tegas, sementara aksen ungu dipakai terbatas untuk tindakan utama.",
    features: ["Positioning layanan", "Portfolio terpilih", "Alur proses", "Project brief", "Tampilan responsif"],
    imageUrl: "/images/elevate (1).png",
    imageAlt: "Preview konsep website Elevate Studio",
  },
  {
    slug: "blackyellowbarbershop",
    name: "Black Yellow Barbershop",
    category: "Barber Shop",
    type: "Company profile",
    status: "concept",
    summary: "Konsep web app yang membantu pengguna mengenali jenis sampah dan memahami tindakan lanjut dengan batas penggunaan yang jelas.",
    challenge: "Klasifikasi perlu terasa sederhana bagi pengguna umum tanpa menyamarkan keterbatasan hasil dan pentingnya aturan pengelolaan setempat.",
    strategy: "Alur dibagi menjadi unggah, preview, hasil, dan panduan. Penjelasan batas hasil ditempatkan dekat dengan keputusan pengguna.",
    design: "Palet hijau lembut, label langkah, dan panel instruksi menjaga pengalaman edukatif tetap tenang dan mudah diikuti.",
    features: ["Unggah atau kamera", "Preview gambar", "Hasil klasifikasi", "Panduan tindakan", "Penjelasan batas hasil"],
    imageUrl: "/images/blackyellowprofile.png",
    imageAlt: "Preview konsep website Black Yellow Barbershop",
  },
   {
    slug: "pilah-yuk",
    name: "Pilah Yuk",
    category: "Edukasi lingkungan",
    type: "Web app klasifikasi",
    status: "concept",  
    summary: "Konsep web app yang membantu pengguna mengenali jenis sampah dan memahami tindakan lanjut dengan batas penggunaan yang jelas.",
    challenge: "Klasifikasi perlu terasa sederhana bagi pengguna umum tanpa menyamarkan keterbatasan hasil dan pentingnya aturan pengelolaan setempat.",
    strategy: "Alur dibagi menjadi unggah, preview, hasil, dan panduan. Penjelasan batas hasil ditempatkan dekat dengan keputusan pengguna.",
    design: "Palet hijau lembut, label langkah, dan panel instruksi menjaga pengalaman edukatif tetap tenang dan mudah diikuti.",
    features: ["Unggah atau kamera", "Preview gambar", "Hasil klasifikasi", "Panduan tindakan", "Penjelasan batas hasil"],
    imageUrl: "/images/pilahyuk (1).png",
    imageAlt: "Preview konsep web app Pilah Yuk",
  },
];

export async function getPublishedProjects(): Promise<PortfolioProject[]> { return projects; }
export async function getPublishedProject(slug: string): Promise<PortfolioProject | null> { return projects.find((project) => project.slug === slug) ?? null; }
