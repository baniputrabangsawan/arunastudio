import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2).max(100),
  business: z.string().min(2).max(120),
  whatsapp: z.string().min(8).max(25),
  email: z.email(),
  industry: z.string().min(2).max(100),
  description: z.string().min(10).max(3000),
  type: z.string().min(2).max(100),
  features: z.string().max(1000),
  goal: z.string().min(3).max(1000),
  style: z.string().max(200),
  color: z.string().max(20),
  references: z.string().max(1000),
  budget: z.string().max(100),
  timeline: z.string().max(100),
  notes: z.string().max(3000),
});

const attempts = new Map<string, { count: number; resetAt: number }>();

function rateLimited(request: Request) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > 5;
}

export async function POST(request: Request) {
  if (rateLimited(request)) return NextResponse.json({ message: "Terlalu banyak percobaan. Coba lagi dalam satu menit." }, { status: 429 });

  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ message: "Periksa kembali data yang wajib diisi.", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const submissionId = `ARU-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
    if (process.env.DATABASE_URL) {
      const data = parsed.data;
      await prisma.lead.create({
        data: {
          name: data.name,
          business: data.business,
          email: data.email,
          whatsapp: data.whatsapp,
          source: "project-brief",
          projectBrief: {
            create: {
              submissionId,
              industry: data.industry,
              description: data.description,
              websiteType: data.type,
              goal: data.goal,
              features: data.features.split(",").map((item) => item.trim()).filter(Boolean),
              style: data.style,
              color: data.color,
              references: data.references.split(",").map((item) => item.trim()).filter(Boolean),
              budget: data.budget,
              timeline: data.timeline,
              notes: data.notes || null,
            },
          },
        },
      });
    }

    return NextResponse.json({ submissionId, status: process.env.DATABASE_URL ? "stored" : "accepted-demo" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Brief belum dapat disimpan. Periksa koneksi lalu coba lagi." }, { status: 503 });
  }
}
