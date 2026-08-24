import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const PORTFOLIO_CACHE_TAG = "public-portfolio";
const PUBLIC_REVALIDATE_SECONDS = 300;

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

type PortfolioWithMedia = {
  slug: string;
  name: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  type?: string;
  focus?: string[];
  isDemo?: boolean;
  media: Array<{ url: string; alt: string }>;
};

function mapPortfolio(project: PortfolioWithMedia): PortfolioProject {
  const image = project.media[0];
  return {
    slug: project.slug,
    name: project.name,
    category: project.category,
    type: project.type ?? "Website",
    summary: project.description,
    problem: project.problem,
    solution: project.solution,
    focus: project.focus ?? [],
    imageUrl: image?.url || "/images/aruna-hero-business-owner.webp",
    imageAlt: image?.alt || `Tampilan website ${project.name}`,
    isDemo: project.isDemo ?? false,
  };
}

const projectSelect = {
  slug: true,
  name: true,
  category: true,
  description: true,
  problem: true,
  solution: true,
  type: true,
  focus: true,
  isDemo: true,
  media: { orderBy: { order: "asc" as const }, take: 1, select: { url: true, alt: true } },
};

const queryPublishedProjects = unstable_cache(
  async () => (await prisma.portfolio.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    select: projectSelect,
  })).map(mapPortfolio),
  [PORTFOLIO_CACHE_TAG],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: [PORTFOLIO_CACHE_TAG] },
);

const queryPublishedProject = unstable_cache(
  async (slug: string) => {
    const project = await prisma.portfolio.findFirst({ where: { slug, published: true }, select: projectSelect });
    return project ? mapPortfolio(project) : null;
  },
  ["public-portfolio-detail"],
  { revalidate: PUBLIC_REVALIDATE_SECONDS, tags: [PORTFOLIO_CACHE_TAG] },
);

export const getPublishedProjects = cache(async (): Promise<PortfolioProject[]> => {
  if (!process.env.DATABASE_URL) return [];
  try { return await queryPublishedProjects(); } catch { return []; }
});

export const getPublishedProject = cache(async (slug: string): Promise<PortfolioProject | null> => {
  if (!process.env.DATABASE_URL) return null;
  try { return await queryPublishedProject(slug); } catch { return null; }
});
