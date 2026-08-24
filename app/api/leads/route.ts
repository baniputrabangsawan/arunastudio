import { NextResponse } from "next/server";
import { notifyLead, storeLead, type LeadInput } from "@/lib/lead-store";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const attempts = new Map<string, { count: number; resetAt: number }>();
function clean(value: unknown, max: number) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now(); const current = attempts.get(ip);
    if (current && current.resetAt > now && current.count >= 8) return NextResponse.json({ error: "Terlalu banyak percobaan. Coba lagi beberapa menit." }, { status: 429 });
    attempts.set(ip, !current || current.resetAt <= now ? { count: 1, resetAt: now + 600_000 } : { ...current, count: current.count + 1 });
    const raw = await request.json() as Record<string, unknown>;
    if (raw.website) return NextResponse.json({ ok: true });
    const lead: LeadInput = { kind: raw.kind === "project_brief" ? "project_brief" : "contact", name: clean(raw.name, 100), business: clean(raw.business, 120), whatsapp: clean(raw.whatsapp, 30), email: clean(raw.email, 160), need: clean(raw.need, 120), message: clean(raw.message, 4000), source: clean(raw.source, 80), payload: typeof raw.payload === "object" && raw.payload ? Object.fromEntries(Object.entries(raw.payload as Record<string, unknown>).slice(0, 30).map(([key, value]) => [key.slice(0, 80), clean(value, 1000)])) : undefined };
    if (!lead.name || !lead.business || !lead.whatsapp || !emailPattern.test(lead.email)) return NextResponse.json({ error: "Lengkapi nama, bisnis, WhatsApp, dan email yang valid." }, { status: 400 });
    const id = `ARUNA-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    await storeLead(id, lead);
    notifyLead(id, lead).catch(() => undefined);
    return NextResponse.json({ ok: true, submissionId: id }, { status: 201 });
  } catch (error) {
    const code = error instanceof Error && error.message === "storage_not_configured" ? "storage_not_configured" : "storage_failed";
    return NextResponse.json({ error: code === "storage_not_configured" ? "Penyimpanan lead belum dikonfigurasi." : "Lead belum dapat disimpan.", code }, { status: 503 });
  }
}
