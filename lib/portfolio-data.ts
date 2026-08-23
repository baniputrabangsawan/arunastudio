import { prisma } from "@/lib/prisma";

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

function queryPublishedProjects() {
  return prisma.portfolio.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { media: { orderBy: { order: "asc" }, take: 1 } },
  });
}

export async function getPublishedProjects(): Promise<PortfolioProject[]> {
  if (!process.env.DATABASE_URL) return [];

  try {
    return (await queryPublishedProjects()).map(mapPortfolio);
  } catch {
    return [];
  }
}

export async function getPublishedProject(slug: string): Promise<PortfolioProject | null> {
  const projects = await getPublishedProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}
