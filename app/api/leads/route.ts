import { NextRequest, NextResponse } from "next/server";
import { notifyLead, storeLead, type LeadInput } from "@/lib/lead-store";
import { isValidIndonesianWhatsapp, validateProjectBrief, type ProjectBriefData } from "@/lib/project-brief-validation";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const attempts = new Map<string, { count: number; resetAt: number }>();
const deviceSubmissionCookie = "aruna_brief_submitted_at";
const deviceCooldownMs = 24 * 60 * 60 * 1000;
function clean(value: unknown, max: number) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }

function projectBriefFromLead(lead: LeadInput): ProjectBriefData {
  const payload = lead.payload || {};
  return {
    name: lead.name,
    business: lead.business,
    whatsapp: lead.whatsapp,
    email: lead.email,
    industry: payload.industry || "",
    description: payload.description || "",
    type: lead.need || payload.type || "",
    features: payload.features || "",
    goal: lead.message || payload.goal || "",
    style: payload.style || "",
    color: payload.color || "",
    references: payload.references || "",
    budget: payload.budget || "",
    timeline: payload.timeline || "",
    notes: payload.notes || "",
  };
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now(); const current = attempts.get(ip);
    if (current && current.resetAt > now && current.count >= 8) return NextResponse.json({ error: "Terlalu banyak percobaan. Coba lagi beberapa menit." }, { status: 429 });
    attempts.set(ip, !current || current.resetAt <= now ? { count: 1, resetAt: now + 600_000 } : { ...current, count: current.count + 1 });
    const raw = await request.json() as Record<string, unknown>;
    if (raw.website) return NextResponse.json({ ok: true });
    const lead: LeadInput = { kind: raw.kind === "project_brief" ? "project_brief" : "contact", name: clean(raw.name, 100), business: clean(raw.business, 120), whatsapp: clean(raw.whatsapp, 30), email: clean(raw.email, 160), need: clean(raw.need, 120), message: clean(raw.message, 4000), source: clean(raw.source, 80), payload: typeof raw.payload === "object" && raw.payload ? Object.fromEntries(Object.entries(raw.payload as Record<string, unknown>).slice(0, 30).map(([key, value]) => [key.slice(0, 80), clean(value, 1000)])) : undefined };
    if (lead.kind === "project_brief") {
      const submittedAt = Number(request.cookies.get(deviceSubmissionCookie)?.value || 0);
      const availableAt = submittedAt + deviceCooldownMs;
      if (submittedAt > 0 && availableAt > now) {
        return NextResponse.json({ error: "Perangkat ini sudah mengirim Project Brief dalam 24 jam terakhir.", code: "device_cooldown", availableAt }, { status: 429 });
      }
    }
    if (!lead.name || !lead.business || !isValidIndonesianWhatsapp(lead.whatsapp) || !emailPattern.test(lead.email)) return NextResponse.json({ error: "Lengkapi nama, bisnis, nomor WhatsApp Indonesia, dan email yang valid." }, { status: 400 });
    if (lead.kind === "project_brief") {
      const validationErrors = validateProjectBrief(projectBriefFromLead(lead));
      const firstError = Object.values(validationErrors)[0];
      if (firstError) return NextResponse.json({ error: firstError }, { status: 400 });
    }
    const id = `ARUNA-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    await storeLead(id, lead);
    notifyLead(id, lead).catch(() => undefined);
    const response = NextResponse.json({ ok: true, submissionId: id }, { status: 201 });
    if (lead.kind === "project_brief") {
      response.cookies.set(deviceSubmissionCookie, String(now), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: deviceCooldownMs / 1000, path: "/" });
    }
    return response;
  } catch (error) {
    const cause = error instanceof Error ? error.message : "storage_failed";
    const code = cause === "storage_not_configured" ? cause : cause.startsWith("storage_failed_") ? cause : "storage_failed";
    const errorMessage = code === "storage_not_configured"
      ? "Penyimpanan lead belum dikonfigurasi di deployment ini."
      : code === "storage_failed_401" || code === "storage_failed_403"
        ? "Kunci Supabase ditolak. Periksa API key yang dipasang di Vercel."
        : code === "storage_failed_404"
          ? "Tabel leads atau URL Supabase tidak ditemukan."
          : "Supabase belum dapat menyimpan lead. Periksa tabel dan log deployment.";
    return NextResponse.json({ error: errorMessage, code }, { status: 503 });
  }
}
