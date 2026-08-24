import "server-only";

export type LeadInput = { kind: "contact" | "project_brief"; name: string; business: string; whatsapp: string; email: string; need?: string; message?: string; payload?: Record<string, string>; source?: string };

export async function storeLead(id: string, lead: LeadInput) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("storage_not_configured");
  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/leads`, { method: "POST", headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify({ id, kind: lead.kind, name: lead.name, business: lead.business, whatsapp: lead.whatsapp, email: lead.email, need: lead.need || null, message: lead.message || null, payload: lead.payload || {}, source: lead.source || "website" }), cache: "no-store" });
  if (!response.ok) throw new Error(`storage_failed_${response.status}`);
}

export async function notifyLead(id: string, lead: LeadInput) {
  const apiKey = process.env.RESEND_API_KEY; const to = process.env.LEAD_NOTIFICATION_EMAIL; const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !to || !from) return;
  await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [to], subject: `Lead ARUNA ${id} — ${lead.business}`, text: JSON.stringify(lead, null, 2) }), cache: "no-store" });
}
