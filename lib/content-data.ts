import { prisma } from "@/lib/prisma";

export type PublicService = { slug: string; title: string; group: string; description: string; items: string[] };
export type PublicPricingPlan = { slug: string; name: string; price: string; note: string; featured: boolean; features: string[] };
export type PublicFaq = { question: string; answer: string };
export type PublicPost = { slug: string; title: string; excerpt: string; content: string; category: string; date: string; coverUrl: string };
export type PublicSettings = {
  email: string;
  location: string;
  whatsapp: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  threadsUrl: string;
};

type ServiceRow = Omit<PublicService, "items"> & { items?: unknown };

function mapService(service: ServiceRow): PublicService {
  return {
    slug: service.slug,
    title: service.title,
    group: service.group,
    description: service.description,
    items: Array.isArray(service.items) ? service.items.filter((item): item is string => typeof item === "string") : [],
  };
}

const defaultSettings: PublicSettings = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  location: "Makassar, Indonesia",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  githubUrl: "https://github.com/baniputrabangsawan",
  linkedinUrl: "https://www.linkedin.com/in/baniputrabangsawan/",
  instagramUrl: "https://instagram.com/baniputra__",
  threadsUrl: process.env.NEXT_PUBLIC_THREADS_URL || "",
};

function formatRupiah(min: number, max: number | null) {
  const compact = (value: number) => value >= 1_000_000 ? `${Number((value / 1_000_000).toFixed(1))} juta` : `${Math.round(value / 1_000)} ribu`;
  if (!max) return `Mulai Rp${compact(min)}`;
  const minLabel = compact(min);
  const maxLabel = compact(max);
  if (min < 1_000_000 && max < 1_000_000) return `Rp${minLabel.replace(" ribu", "")}-${maxLabel}`;
  return `Rp${minLabel}-${maxLabel}`;
}

export async function getPublishedServices(): Promise<PublicService[]> {
  if (!process.env.DATABASE_URL) return [];
  try { return (await prisma.service.findMany({ where: { published: true }, orderBy: { order: "asc" }, select: { slug: true, title: true, group: true, description: true, items: true } })).map(mapService); }
  catch { return []; }
}

export async function getPublishedService(slug: string): Promise<PublicService | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const service = await prisma.service.findFirst({ where: { slug, published: true }, select: { slug: true, title: true, group: true, description: true, items: true } });
    return service ? mapService(service) : null;
  }
  catch { return null; }
}

export async function getPublishedPricing(): Promise<PublicPricingPlan[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const plans = await prisma.pricingPlan.findMany({ where: { published: true }, orderBy: { order: "asc" }, include: { features: { where: { included: true }, orderBy: { order: "asc" } } } });
    return plans.map((plan) => ({ slug: plan.slug, name: plan.name, price: formatRupiah(plan.priceMin, plan.priceMax), note: plan.description, featured: plan.featured, features: plan.features.map((feature) => feature.label) }));
  } catch { return []; }
}

export async function getPublishedFaqs(): Promise<PublicFaq[]> {
  if (!process.env.DATABASE_URL) return [];
  try { return await prisma.fAQ.findMany({ where: { published: true }, orderBy: { order: "asc" }, select: { question: true, answer: true } }); }
  catch { return []; }
}

export async function getPublishedPosts(): Promise<PublicPost[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const posts = await prisma.blogPost.findMany({ where: { publishedAt: { not: null } }, include: { category: true }, orderBy: { order: "asc" } });
    return posts.map((post) => ({ slug: post.slug, title: post.title, excerpt: post.excerpt, content: post.content, category: post.category.name, date: post.publishedAt!.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }), coverUrl: post.coverUrl || "/images/aruna-hero-business-owner.webp" }));
  } catch { return []; }
}

export async function getPublishedPost(slug: string): Promise<PublicPost | null> {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPublicSettings(): Promise<PublicSettings> {
  if (!process.env.DATABASE_URL) return defaultSettings;
  try {
    const rows = await prisma.siteSetting.findMany({ where: { key: { in: ["contact.email", "contact.location", "contact.whatsapp", "social.github", "social.linkedin", "social.instagram", "social.threads"] } } });
    const values = Object.fromEntries(rows.map((row) => [row.key, row.value]));
    return {
      email: values["contact.email"] ?? defaultSettings.email,
      location: values["contact.location"] ?? defaultSettings.location,
      whatsapp: values["contact.whatsapp"] ?? defaultSettings.whatsapp,
      githubUrl: values["social.github"] ?? defaultSettings.githubUrl,
      linkedinUrl: values["social.linkedin"] ?? defaultSettings.linkedinUrl,
      instagramUrl: values["social.instagram"] ?? defaultSettings.instagramUrl,
      threadsUrl: values["social.threads"] ?? defaultSettings.threadsUrl,
    };
  } catch { return defaultSettings; }
}
