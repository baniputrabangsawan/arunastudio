import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin-auth";
import { PUBLIC_CACHE_TAGS } from "@/lib/content-data";
import { PORTFOLIO_CACHE_TAG } from "@/lib/portfolio-data";

const supported = ["leads", "portfolio", "services", "pricing", "faq", "blog", "availability", "settings"] as const;
type Resource = (typeof supported)[number];

function validResource(value: string): value is Resource { return supported.includes(value as Resource); }
function revalidatePublicData(resource: Resource) {
  const tag = resource === "portfolio" ? PORTFOLIO_CACHE_TAG
    : resource === "services" ? PUBLIC_CACHE_TAGS.services
    : resource === "pricing" ? PUBLIC_CACHE_TAGS.pricing
    : resource === "faq" ? PUBLIC_CACHE_TAGS.faqs
    : resource === "blog" ? PUBLIC_CACHE_TAGS.posts
    : resource === "availability" ? PUBLIC_CACHE_TAGS.availability
    : resource === "settings" ? PUBLIC_CACHE_TAGS.settings
    : null;
  if (tag) revalidateTag(tag, "max");
}
function unavailable() { return NextResponse.json({ items: [], configured: false, message: "DATABASE_URL belum dikonfigurasi." }); }
function databaseMessage(error: unknown) {
  const value = error as { code?: string; errorCode?: string };
  const code = value?.code ?? value?.errorCode;
  if (code === "P1000") return "Kredensial database ditolak. Periksa password pada DATABASE_URL.";
  if (code === "P1001") return "Database Supabase tidak dapat dijangkau. Periksa host, port, dan status project.";
  if (code === "P2021" || code === "P2022") return "Schema database belum sinkron. Jalankan pnpm db:push.";
  return "Database belum dapat dihubungi. Periksa DATABASE_URL lalu coba lagi.";
}

export async function GET(_: Request, { params }: { params: Promise<{ resource: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { resource } = await params;
  if (!validResource(resource)) return NextResponse.json({ message: "Resource tidak dikenal" }, { status: 404 });
  if (!process.env.DATABASE_URL) return unavailable();
  try {
    const items = resource === "leads" ? await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, include: { projectBrief: true } })
      : resource === "portfolio" ? (await prisma.portfolio.findMany({ orderBy: { order: "asc" }, include: { media: { orderBy: { order: "asc" }, take: 1 } } })).map((item) => ({ ...item, focus: item.focus.join(", "), imageUrl: item.media[0]?.url ?? "", imageAlt: item.media[0]?.alt ?? "" }))
      : resource === "services" ? (await prisma.service.findMany({ orderBy: { order: "asc" } })).map((item) => ({ ...item, items: item.items.join(", ") }))
      : resource === "pricing" ? (await prisma.pricingPlan.findMany({ include: { features: { orderBy: { order: "asc" } } }, orderBy: { order: "asc" } })).map((item) => ({ ...item, features: item.features.map((feature) => feature.label).join(", ") }))
      : resource === "faq" ? await prisma.fAQ.findMany({ orderBy: { order: "asc" } })
      : resource === "blog" ? (await prisma.blogPost.findMany({ include: { category: true }, orderBy: { order: "asc" } })).map((item) => ({ ...item, category: item.category.name, published: Boolean(item.publishedAt) }))
      : resource === "availability" ? (await prisma.availability.findMany()).map((item) => ({ ...item, estimatedStart: item.estimatedStart?.toISOString().slice(0, 10) ?? null }))
      : await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });
    return NextResponse.json({ items, configured: true });
  } catch (error) {
    return NextResponse.json({ items: [], configured: false, message: databaseMessage(error) }, { status: 503 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { resource } = await params;
  if (!validResource(resource)) return NextResponse.json({ message: "Resource tidak dikenal" }, { status: 404 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ message: "DATABASE_URL belum dikonfigurasi." }, { status: 503 });
  const body: unknown = await request.json().catch(() => null);

  try {
    if (resource === "services") {
      const data = z.object({ id: z.string().optional(), slug: z.string().min(2), title: z.string().min(2), group: z.string().min(2), description: z.string().min(5), items: z.string().min(2), order: z.number().int().nonnegative(), published: z.boolean().default(true) }).parse(body);
      const { id, items, ...values } = data;
      const serviceValues = { ...values, items: items.split(",").map((item) => item.trim()).filter(Boolean) };
      const item = id ? await prisma.service.update({ where: { id }, data: serviceValues }) : await prisma.service.create({ data: serviceValues });
      revalidatePublicData(resource);
      revalidatePath("/"); revalidatePath("/layanan"); revalidatePath(`/layanan/${item.slug}`);
      return NextResponse.json({ item });
    }
    if (resource === "faq") {
      const data = z.object({ id: z.string().optional(), question: z.string().min(5), answer: z.string().min(5), category: z.string().optional(), order: z.number().int().nonnegative(), published: z.boolean().default(true) }).parse(body);
      const { id, ...values } = data;
      const item = id ? await prisma.fAQ.update({ where: { id }, data: values }) : await prisma.fAQ.create({ data: values });
      revalidatePublicData(resource);
      revalidatePath("/");
      return NextResponse.json({ item });
    }
    if (resource === "portfolio") {
      const data = z.object({
        id: z.string().optional(),
        slug: z.string().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
        name: z.string().min(2),
        category: z.string().min(2),
        type: z.string().min(2),
        description: z.string().min(5),
        problem: z.string().min(5),
        solution: z.string().min(5),
        focus: z.string().min(2),
        imageUrl: z.string().min(1).refine((value) => value.startsWith("/") || value.startsWith("https://")),
        imageAlt: z.string().min(3),
        order: z.number().int().nonnegative(),
        isDemo: z.boolean().default(false),
        published: z.boolean().default(false),
      }).parse(body);
      const { id, imageUrl, imageAlt, ...values } = data;
      const media = { url: imageUrl, alt: imageAlt, type: "image", order: 0 };
      const portfolioValues = { ...values, focus: values.focus.split(",").map((item) => item.trim()).filter(Boolean) };
      const item = id
        ? await prisma.portfolio.update({ where: { id }, data: { ...portfolioValues, media: { deleteMany: {}, create: media } }, include: { media: true } })
        : await prisma.portfolio.create({ data: { ...portfolioValues, media: { create: media } }, include: { media: true } });
      revalidatePublicData(resource);
      revalidatePath("/");
      revalidatePath("/portfolio");
      revalidatePath(`/portfolio/${item.slug}`);
      return NextResponse.json({ item });
    }
    if (resource === "pricing") {
      const data = z.object({ id: z.string().optional(), slug: z.string().min(2), name: z.string().min(2), priceMin: z.number().int().nonnegative(), priceMax: z.number().int().nonnegative().nullable(), description: z.string().min(5), features: z.string().min(2), order: z.number().int().nonnegative(), featured: z.boolean().default(false), published: z.boolean().default(true) }).parse(body);
      const { id, features, ...values } = data;
      const featureValues = features.split(",").map((label, order) => ({ label: label.trim(), order })).filter((feature) => feature.label);
      const item = id
        ? await prisma.pricingPlan.update({ where: { id }, data: { ...values, features: { deleteMany: {}, create: featureValues } }, include: { features: true } })
        : await prisma.pricingPlan.create({ data: { ...values, features: { create: featureValues } }, include: { features: true } });
      revalidatePublicData(resource);
      revalidatePath("/"); revalidatePath("/harga");
      return NextResponse.json({ item });
    }
    if (resource === "blog") {
      const data = z.object({ id: z.string().optional(), slug: z.string().min(2), title: z.string().min(3), excerpt: z.string().min(5), content: z.string().min(20), category: z.string().min(2), coverUrl: z.string().min(1).refine((value) => value.startsWith("/") || value.startsWith("https://")), order: z.number().int().nonnegative(), published: z.boolean().default(false) }).parse(body);
      const categorySlug = data.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const category = await prisma.blogCategory.upsert({ where: { slug: categorySlug }, update: { name: data.category }, create: { slug: categorySlug, name: data.category } });
      const existing = data.id ? await prisma.blogPost.findUnique({ where: { id: data.id }, select: { publishedAt: true } }) : null;
      const values = { slug: data.slug, title: data.title, excerpt: data.excerpt, content: data.content, coverUrl: data.coverUrl, order: data.order, categoryId: category.id, publishedAt: data.published ? existing?.publishedAt ?? new Date() : null };
      const item = data.id ? await prisma.blogPost.update({ where: { id: data.id }, data: values }) : await prisma.blogPost.create({ data: values });
      revalidatePublicData(resource);
      revalidatePath("/blog"); revalidatePath(`/blog/${item.slug}`); revalidatePath("/");
      return NextResponse.json({ item });
    }
    if (resource === "availability") {
      const data = z.object({ id: z.string().optional(), status: z.enum(["Available", "Limited", "Fully booked"]), slots: z.number().int().nonnegative(), estimatedStart: z.string().nullable() }).parse(body);
      const values = { status: data.status, slots: data.slots, estimatedStart: data.estimatedStart ? new Date(data.estimatedStart) : null };
      const item = data.id ? await prisma.availability.update({ where: { id: data.id }, data: values }) : await prisma.availability.create({ data: values });
      revalidatePublicData(resource);
      return NextResponse.json({ item });
    }
    if (resource === "settings") {
      const data = z.object({ key: z.string().min(2), value: z.string() }).parse(body);
      const item = await prisma.siteSetting.upsert({ where: { key: data.key }, update: { value: data.value }, create: data });
      revalidatePublicData(resource);
      revalidatePath("/"); revalidatePath("/kontak");
      return NextResponse.json({ item });
    }
    const data = z.object({ id: z.string(), status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"]), notes: z.string().optional() }).parse(body);
    const item = await prisma.lead.update({ where: { id: data.id }, data: { status: data.status, notes: data.notes } });
    return NextResponse.json({ item });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: "Data belum valid", issues: error.flatten().fieldErrors }, { status: 400 });
    return NextResponse.json({ message: databaseMessage(error) }, { status: 503 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { resource } = await params;
  const id = new URL(request.url).searchParams.get("id");
  if (!id || !validResource(resource) || ["leads", "availability", "settings"].includes(resource)) return NextResponse.json({ message: "Permintaan tidak valid" }, { status: 400 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ message: "DATABASE_URL belum dikonfigurasi." }, { status: 503 });
  try {
    if (resource === "portfolio") {
      const item = await prisma.portfolio.delete({ where: { id } });
      revalidatePublicData(resource);
      revalidatePath("/");
      revalidatePath("/portfolio");
      revalidatePath(`/portfolio/${item.slug}`);
    }
    else if (resource === "services") { await prisma.service.delete({ where: { id } }); revalidatePublicData(resource); revalidatePath("/"); revalidatePath("/layanan"); }
    else if (resource === "pricing") { await prisma.pricingPlan.delete({ where: { id } }); revalidatePublicData(resource); revalidatePath("/"); revalidatePath("/harga"); }
    else if (resource === "faq") { await prisma.fAQ.delete({ where: { id } }); revalidatePublicData(resource); revalidatePath("/"); }
    else if (resource === "blog") { await prisma.blogPost.delete({ where: { id } }); revalidatePublicData(resource); revalidatePath("/blog"); }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ message: databaseMessage(error) }, { status: 503 });
  }
}
