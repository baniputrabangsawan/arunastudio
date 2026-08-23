import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site-config";

export async function GET() {
  if (process.env.DATABASE_URL) {
    try {
      const latest = await prisma.availability.findFirst({ orderBy: { updatedAt: "desc" } });
      if (latest) return NextResponse.json({ status: latest.status, slots: latest.slots, message: latest.estimatedStart ? `Estimasi project berikutnya dimulai ${latest.estimatedStart.toLocaleDateString("id-ID")}.` : siteConfig.availability.message });
    } catch {}
  }
  return NextResponse.json(siteConfig.availability);
}
