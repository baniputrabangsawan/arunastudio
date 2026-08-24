"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { copyMessage, emailUrl, whatsappUrl } from "@/lib/contact-handoff";

type Brief = {
  name: string;
  business: string;
  whatsapp: string;
  email: string;
  industry: string;
  description: string;
  type: string;
  features: string;
  goal: string;
  style: string;
  color: string;
  references: string;
  budget: string;
  timeline: string;
  notes: string;
};

type ProjectBriefProps = {
  contactEmail: string;
  contactWhatsapp: string;
};

const initial: Brief = { name: "", business: "", whatsapp: "", email: "", industry: "", description: "", type: "Company Profile", features: "", goal: "", style: "Warm & profesional", color: "#E76F51", references: "", budget: "Rp900.000–Rp1.400.000", timeline: "1-2 bulan", notes: "" };
const steps = ["Identitas", "Tentang bisnis", "Kebutuhan", "Gaya & budget"];

function formatBrief(data: Brief) {
  return [
    "Halo ARUNA, saya ingin mendiskusikan project website berikut:",
    "",
    `Nama: ${data.name}`,
    `Bisnis: ${data.business}`,
    `WhatsApp: ${data.whatsapp}`,
    `Email: ${data.email}`,
    `Industri: ${data.industry}`,
    `Tentang bisnis: ${data.description}`,
    `Jenis website: ${data.type}`,
    `Fitur: ${data.features || "Perlu diskusi"}`,
    `Tujuan: ${data.goal}`,
    `Gaya: ${data.style || "Perlu diskusi"}`,
    `Warna: ${data.color}`,
    `Referensi: ${data.references || "Belum ada"}`,
    `Budget: ${data.budget}`,
    `Target launch: ${data.timeline}`,
    `Catatan: ${data.notes || "Tidak ada"}`,
  ].join("\n");
}

export function ProjectBrief({ contactEmail, contactWhatsapp }: ProjectBriefProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Brief>(initial);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ message: string; id?: string; whatsapp?: string } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const handle = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem("aruna-brief");
        const stored = saved ? { ...initial, ...JSON.parse(saved) } : initial;
        const params = new URLSearchParams(location.search);
        setData({
          ...stored,
          type: params.get("type") || stored.type,
          business: params.get("business") || stored.business,
          industry: params.get("industry") || stored.industry,
          whatsapp: params.get("whatsapp") || stored.whatsapp,
          color: params.get("color") || stored.color,
          features: params.get("features") || stored.features,
          notes: [params.get("headline") ? `Headline simulator: ${params.get("headline")}` : "", params.get("estimate") ? `Estimasi kalkulator: Rp${Number(params.get("estimate")).toLocaleString("id-ID")}` : "", stored.notes].filter(Boolean).join("\n"),
        });
      } catch {
        // Abaikan draft yang tidak valid dan gunakan nilai awal.
      }
    }, 0);
    return () => window.clearTimeout(handle);
  }, []);

  function update<K extends keyof Brief>(key: K, value: Brief[K]) {
    setData((current) => {
      const next = { ...current, [key]: value };
      localStorage.setItem("aruna-brief", JSON.stringify(next));
      return next;
    });
  }

  function nextStep() {
    const required = step === 0 ? [data.name, data.business, data.whatsapp, data.email] : step === 1 ? [data.industry, data.description] : [data.goal];
    if (required.some((value) => !value.trim())) {
      setError("Lengkapi field wajib pada langkah ini sebelum melanjutkan.");
      return;
    }
    setError("");
    setStep((current) => current + 1);
  }

  const field = (key: keyof Brief, label: string, required = false, type = "text") => (
    <label className="label">
      {label}{required && <span className="sr-only"> wajib</span>}
      <input className="field" type={type} value={data[key]} required={required} onChange={(event) => update(key, event.target.value)} />
    </label>
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const message = formatBrief(data);
    const whatsappTarget = whatsappUrl(contactWhatsapp, message);
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: "project_brief", name: data.name, business: data.business, whatsapp: data.whatsapp, email: data.email, need: data.type, message: data.goal, payload: data, source: "project_brief" }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      const withId = `${message}\n\nID submission: ${result.submissionId}`;
      localStorage.removeItem("aruna-brief");
      setDone({ message: "Brief tersimpan dan siap ditindaklanjuti.", id: result.submissionId, whatsapp: whatsappUrl(contactWhatsapp, withId) });
    } catch (cause) {
      if (whatsappTarget) setDone({ message: `${cause instanceof Error ? cause.message : "Brief belum dapat disimpan."} Jawaban Anda tetap tersimpan. Kirim ringkasannya melalui WhatsApp sebagai alternatif.`, whatsapp: whatsappTarget });
      else {
        const emailTarget = emailUrl(contactEmail, `Project brief ${data.business}`, message);
        if (emailTarget) window.location.href = emailTarget; else await copyMessage(message);
        setError("Penyimpanan server belum tersedia. Draft tetap tersimpan di perangkat ini.");
      }
    } finally {
      setBusy(false);
    }
  }

  if (done) return (
    <div className="border border-[#345348]/30 bg-white p-8 text-center md:p-14" role="status">
      <CheckCircle2 className="mx-auto text-[#345348]" size={52} />
      <h2 className="mt-5 text-4xl font-black">Brief siap ditindaklanjuti.</h2>
      <p className="mt-3 text-[var(--muted)]">{done.message}</p>
      {done.id && <p className="mt-3">ID submission: <strong>{done.id}</strong></p>}
      {done.whatsapp && <a className="button mt-6" href={done.whatsapp} target="_blank" rel="noreferrer">Lanjutkan di WhatsApp <ArrowRight size={17}/></a>}
    </div>
  );

  return (
    <form onSubmit={submit} className="border border-black/15 bg-[var(--paper)] p-5 shadow-[0_30px_80px_rgba(76,47,31,.1)] md:p-10">
      <div className="mb-10">
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#817a74]"><span>Langkah {step + 1} dari {steps.length}</span><span>{steps[step]}</span></div>
        <div className="mt-3 h-1 bg-black/10"><div className="h-full bg-[var(--accent)] transition-transform duration-200" style={{ transform: `scaleX(${(step + 1) / steps.length})`, transformOrigin: "left" }} /></div>
      </div>
      {step === 0 && <div className="grid gap-5 md:grid-cols-2">{field("name", "Nama lengkap", true)}{field("business", "Nama bisnis", true)}{field("whatsapp", "Nomor WhatsApp", true, "tel")}{field("email", "Email", true, "email")}</div>}
      {step === 1 && <div className="grid gap-5">{field("industry", "Bidang / industri", true)}<label className="label">Ceritakan bisnis Anda<textarea className="field min-h-36 resize-y" value={data.description} required onChange={(event) => update("description", event.target.value)} /></label></div>}
      {step === 2 && <div className="grid gap-5"><label className="label">Jenis website<select className="field" value={data.type} onChange={(event) => update("type", event.target.value)}>{["Landing Page", "Company Profile", "E-commerce", "Booking", "Custom Website"].map((item) => <option key={item}>{item}</option>)}</select></label>{field("features", "Fitur yang dibutuhkan")}{field("goal", "Tujuan utama website", true)}</div>}
      {step === 3 && <div className="grid gap-5 md:grid-cols-2">{field("style", "Preferensi gaya")}{field("color", "Warna utama", false, "color")}{field("references", "Website referensi")}<label className="label">Budget<select className="field" value={data.budget} onChange={(event) => update("budget", event.target.value)}>{["Rp400.000–Rp800.000", "Rp900.000–Rp1.400.000", "Mulai Rp2.000.000", "Perlu diskusi"].map((item) => <option key={item}>{item}</option>)}</select></label><label className="label">Target launch<select className="field" value={data.timeline} onChange={(event) => update("timeline", event.target.value)}>{["Secepatnya", "1-2 bulan", "2-3 bulan", "Fleksibel"].map((item) => <option key={item}>{item}</option>)}</select></label><label className="label md:col-span-2">Catatan tambahan<textarea className="field min-h-28 resize-y" value={data.notes} onChange={(event) => update("notes", event.target.value)} /></label></div>}
      {error && <p role="alert" className="mt-5 border-l-2 border-red-600 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <div className="mt-9 flex items-center justify-between gap-3">
        <button type="button" className="button secondary disabled:opacity-30" disabled={step === 0} onClick={() => { setError(""); setStep((current) => current - 1); }}><ArrowLeft size={17} /> Kembali</button>
        {step < 3 ? <button type="button" className="button" onClick={nextStep}>Lanjut <ArrowRight size={17} /></button> : <button className="button" disabled={busy}>{busy ? <LoaderCircle className="animate-spin" size={17} /> : null}Siapkan Brief</button>}
      </div>
      <p className="mb-0 mt-5 text-xs text-[var(--muted)]">Draft tersimpan di perangkat ini sampai berhasil dikirim. Submission final disimpan di server jika layanan database telah dikonfigurasi.</p>
    </form>
  );
}
