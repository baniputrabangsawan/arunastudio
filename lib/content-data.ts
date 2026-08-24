import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site-config";

export const PUBLIC_CACHE_TAGS = {
  services: "public-services",
  pricing: "public-pricing",
  faqs: "public-faqs",
  posts: "public-posts",
  settings: "public-settings",
  availability: "public-availability",
} as const;

const PUBLIC_REVALIDATE_SECONDS = 300;

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

function formatDate(date: Date) {
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function formatRupiah(min: number, max: number | null) {
  const compact = (value: number) => value >= 1_000_000 ? `${Number((value / 1_000_000).toFixed(1))} juta` : `${Math.round(value / 1_000)} ribu`;
  if (!max) return `Mulai Rp${compact(min)}`;
  const minLabel = compact(min);
  const maxLabel = compact(max);
  if (min < 1_000_000 && max < 1_000_000) return `Rp${minLabel.replace(" ribu", "")}-${maxLabel}`;
  return `Rp${minLabel}-${maxLabel}`;
}

const queryPublishedServices = unstable_cache(
  async () => (await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: { slug: true, title: true, group: true, description: true, items: true },
  })).map(mapService),
  [PUBLIC_CACHE_TAGS.services],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: [PUBLIC_CACHE_TAGS.services] },
);

const queryPublishedService = unstable_cache(
  async (slug: string) => {
    const service = await prisma.service.findFirst({
      where: { slug, published: true },
      select: { slug: true, title: true, group: true, description: true, items: true },
    });
    return service ? mapService(service) : null;
  },
  ["public-service-detail"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: [PUBLIC_CACHE_TAGS.services] },
);

const queryPublishedPricing = unstable_cache(
  async () => {
    const plans = await prisma.pricingPlan.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      include: { features: { where: { included: true }, orderBy: { order: "asc" } } },
    });
    return plans.map((plan) => ({
      slug: plan.slug,
      name: plan.name,
      price: formatRupiah(plan.priceMin, plan.priceMax),
      note: plan.description,
      featured: plan.featured,
      features: plan.features.map((feature) => feature.label),
    }));
  },
  [PUBLIC_CACHE_TAGS.pricing],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: [PUBLIC_CACHE_TAGS.pricing] },
);

const queryPublishedFaqs = unstable_cache(
  () => prisma.fAQ.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: { question: true, answer: true },
  }),
  [PUBLIC_CACHE_TAGS.faqs],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: [PUBLIC_CACHE_TAGS.faqs] },
);

const queryPublishedPosts = unstable_cache(
  async (): Promise<PublicPostSummary[]> => {
    const posts = await prisma.blogPost.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { order: "asc" },
      select: { slug: true, title: true, excerpt: true, coverUrl: true, publishedAt: true, category: { select: { name: true } } },
    });
    return posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category.name,
      date: formatDate(post.publishedAt!),
      coverUrl: post.coverUrl || "/images/aruna-hero-business-owner.webp",
    }));
  },
  [PUBLIC_CACHE_TAGS.posts],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: [PUBLIC_CACHE_TAGS.posts] },
);

const queryPublishedPost = unstable_cache(
  async (slug: string): Promise<PublicPost | null> => {
    const post = await prisma.blogPost.findFirst({
      where: { slug, publishedAt: { not: null } },
      select: { slug: true, title: true, excerpt: true, content: true, coverUrl: true, publishedAt: true, category: { select: { name: true } } },
    });
    return post ? {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category.name,
      date: formatDate(post.publishedAt!),
      coverUrl: post.coverUrl || "/images/aruna-hero-business-owner.webp",
    } : null;
  },
  ["public-post-detail"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: [PUBLIC_CACHE_TAGS.posts] },
);

const queryPublicSettings = unstable_cache(
  async (): Promise<PublicSettings> => {
    const rows = await prisma.siteSetting.findMany({
      where: { key: { in: ["contact.email", "contact.location", "contact.whatsapp", "social.github", "social.linkedin", "social.instagram", "social.threads"] } },
    });
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
  },
  [PUBLIC_CACHE_TAGS.settings],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: [PUBLIC_CACHE_TAGS.settings] },
);

const queryPublicAvailability = unstable_cache(
  async (): Promise<PublicAvailability> => {
    const latest = await prisma.availability.findFirst({ orderBy: { updatedAt: "desc" } });
    if (!latest) return siteConfig.availability;
    return {
      status: latest.status,
      slots: latest.slots,
      message: latest.estimatedStart
        ? `Estimasi project berikutnya dimulai ${latest.estimatedStart.toLocaleDateString("id-ID")}.`
        : siteConfig.availability.message,
    };
  },
  [PUBLIC_CACHE_TAGS.availability],
  { revalidate: 60, tags: [PUBLIC_CACHE_TAGS.availability] },
);

export const getPublishedServices = cache(async (): Promise<PublicService[]> => {
  if (!process.env.DATABASE_URL) return [];
  try { return await queryPublishedServices(); } catch { return []; }
});

export const getPublishedService = cache(async (slug: string): Promise<PublicService | null> => {
  if (!process.env.DATABASE_URL) return null;
  try { return await queryPublishedService(slug); } catch { return null; }
});

export const getPublishedPricing = cache(async (): Promise<PublicPricingPlan[]> => {
  if (!process.env.DATABASE_URL) return [];
  try { return await queryPublishedPricing(); } catch { return []; }
});

export const getPublishedFaqs = cache(async (): Promise<PublicFaq[]> => {
  if (!process.env.DATABASE_URL) return [];
  try { return await queryPublishedFaqs(); } catch { return []; }
});

export const getPublishedPosts = cache(async (): Promise<PublicPostSummary[]> => {
  if (!process.env.DATABASE_URL) return [];
  try { return await queryPublishedPosts(); } catch { return []; }
});

export const getPublishedPost = cache(async (slug: string): Promise<PublicPost | null> => {
  if (!process.env.DATABASE_URL) return null;
  try { return await queryPublishedPost(slug); } catch { return null; }
});

export const getPublicSettings = cache(async (): Promise<PublicSettings> => {
  if (!process.env.DATABASE_URL) return defaultSettings;
  try { return await queryPublicSettings(); } catch { return defaultSettings; }
});

export const getPublicAvailability = cache(async (): Promise<PublicAvailability> => {
  if (!process.env.DATABASE_URL) return siteConfig.availability;
  try { return await queryPublicAvailability(); } catch { return siteConfig.availability; }
});
