import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin-auth";

const supported = ["leads", "portfolio", "services", "pricing", "faq", "blog", "availability", "settings"] as const;
type Resource = (typeof supported)[number];

function validResource(value: string): value is Resource { return supported.includes(value as Resource); }
function unavailable() { return NextResponse.json({ items: [], configured: false, message: "DATABASE_URL belum dikonfigurasi." }); }

export async function GET(_: Request, { params }: { params: Promise<{ resource: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { resource } = await params;
  if (!validResource(resource)) return NextResponse.json({ message: "Resource tidak dikenal" }, { status: 404 });
  if (!process.env.DATABASE_URL) return unavailable();
  const items = resource === "leads" ? await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, include: { projectBrief: true } })
    : resource === "portfolio" ? await prisma.portfolio.findMany({ orderBy: { order: "asc" } })
    : resource === "services" ? await prisma.service.findMany({ orderBy: { order: "asc" } })
    : resource === "pricing" ? await prisma.pricingPlan.findMany({ include: { features: true } })
    : resource === "faq" ? await prisma.fAQ.findMany({ orderBy: { order: "asc" } })
    : resource === "blog" ? await prisma.blogPost.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } })
    : resource === "availability" ? await prisma.availability.findMany()
    : await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json({ items, configured: true });
}

export async function POST(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { resource } = await params;
  if (!validResource(resource)) return NextResponse.json({ message: "Resource tidak dikenal" }, { status: 404 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ message: "DATABASE_URL belum dikonfigurasi." }, { status: 503 });
  const body: unknown = await request.json().catch(() => null);

  try {
    if (resource === "services") {
      const data = z.object({ id: z.string().optional(), slug: z.string().min(2), title: z.string().min(2), group: z.string().min(2), description: z.string().min(5), published: z.boolean().default(true) }).parse(body);
      const item = data.id ? await prisma.service.update({ where: { id: data.id }, data }) : await prisma.service.create({ data });
      return NextResponse.json({ item });
    }
    if (resource === "faq") {
      const data = z.object({ id: z.string().optional(), question: z.string().min(5), answer: z.string().min(5), category: z.string().optional(), published: z.boolean().default(true) }).parse(body);
      const item = data.id ? await prisma.fAQ.update({ where: { id: data.id }, data }) : await prisma.fAQ.create({ data });
      return NextResponse.json({ item });
    }
    if (resource === "portfolio") {
      const data = z.object({ id: z.string().optional(), slug: z.string().min(2), name: z.string().min(2), category: z.string().min(2), description: z.string().min(5), problem: z.string().min(5), solution: z.string().min(5), published: z.boolean().default(false) }).parse(body);
      const item = data.id ? await prisma.portfolio.update({ where: { id: data.id }, data }) : await prisma.portfolio.create({ data });
      return NextResponse.json({ item });
    }
    if (resource === "pricing") {
      const data = z.object({ id: z.string().optional(), slug: z.string().min(2), name: z.string().min(2), priceMin: z.number().int().nonnegative(), priceMax: z.number().int().nonnegative().nullable(), description: z.string().min(5), featured: z.boolean().default(false) }).parse(body);
      const item = data.id ? await prisma.pricingPlan.update({ where: { id: data.id }, data }) : await prisma.pricingPlan.create({ data });
      return NextResponse.json({ item });
    }
    if (resource === "blog") {
      const data = z.object({ id: z.string().optional(), slug: z.string().min(2), title: z.string().min(3), excerpt: z.string().min(5), content: z.string().min(20), category: z.string().min(2), published: z.boolean().default(false) }).parse(body);
      const category = await prisma.blogCategory.upsert({ where: { slug: data.category.toLowerCase().replaceAll(" ", "-") }, update: {}, create: { slug: data.category.toLowerCase().replaceAll(" ", "-"), name: data.category } });
      const values = { slug: data.slug, title: data.title, excerpt: data.excerpt, content: data.content, categoryId: category.id, publishedAt: data.published ? new Date() : null };
      const item = data.id ? await prisma.blogPost.update({ where: { id: data.id }, data: values }) : await prisma.blogPost.create({ data: values });
      return NextResponse.json({ item });
    }
    if (resource === "availability") {
      const data = z.object({ id: z.string().optional(), status: z.enum(["Available", "Limited", "Fully booked"]), slots: z.number().int().nonnegative(), estimatedStart: z.string().nullable() }).parse(body);
      const values = { status: data.status, slots: data.slots, estimatedStart: data.estimatedStart ? new Date(data.estimatedStart) : null };
      const item = data.id ? await prisma.availability.update({ where: { id: data.id }, data: values }) : await prisma.availability.create({ data: values });
      return NextResponse.json({ item });
    }
    if (resource === "settings") {
      const data = z.object({ key: z.string().min(2), value: z.string() }).parse(body);
      const item = await prisma.siteSetting.upsert({ where: { key: data.key }, update: { value: data.value }, create: data });
      return NextResponse.json({ item });
    }
    const data = z.object({ id: z.string(), status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"]), notes: z.string().optional() }).parse(body);
    const item = await prisma.lead.update({ where: { id: data.id }, data: { status: data.status, notes: data.notes } });
    return NextResponse.json({ item });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: "Data belum valid", issues: error.flatten().fieldErrors }, { status: 400 });
    return NextResponse.json({ message: "Operasi database gagal." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { resource } = await params;
  const id = new URL(request.url).searchParams.get("id");
  if (!id || !validResource(resource) || ["leads", "availability", "settings"].includes(resource)) return NextResponse.json({ message: "Permintaan tidak valid" }, { status: 400 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ message: "DATABASE_URL belum dikonfigurasi." }, { status: 503 });
  if (resource === "portfolio") await prisma.portfolio.delete({ where: { id } });
  else if (resource === "services") await prisma.service.delete({ where: { id } });
  else if (resource === "pricing") await prisma.pricingPlan.delete({ where: { id } });
  else if (resource === "faq") await prisma.fAQ.delete({ where: { id } });
  else if (resource === "blog") await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
