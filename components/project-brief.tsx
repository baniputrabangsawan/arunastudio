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

const initial: Brief = { name: "", business: "", whatsapp: "", email: "", industry: "", description: "", type: "Company Profile", features: "", goal: "", style: "Warm & profesional", color: "#f05237", references: "", budget: "Rp900 ribu-1,5 juta", timeline: "1-2 bulan", notes: "" };
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
  const [done, setDone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handle = window.setTimeout(() => {
      try {
        const saved = sessionStorage.getItem("aruna-brief");
        const stored = saved ? { ...initial, ...JSON.parse(saved) } : initial;
        const params = new URLSearchParams(location.search);
        setData({
          ...stored,
          type: params.get("type") || stored.type,
          features: params.get("features") || stored.features,
          notes: params.get("estimate") ? `Estimasi kalkulator: Rp${Number(params.get("estimate")).toLocaleString("id-ID")}` : stored.notes,
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
      sessionStorage.setItem("aruna-brief", JSON.stringify(next));
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
    const emailTarget = emailUrl(contactEmail, `Project brief ${data.business}`, message);

    try {
      if (whatsappTarget) {
        window.open(whatsappTarget, "_blank", "noopener,noreferrer");
        setDone("Brief sudah disiapkan di WhatsApp. Periksa lalu kirim untuk memulai percakapan.");
      } else if (emailTarget) {
        window.location.href = emailTarget;
        setDone("Brief sudah disiapkan di aplikasi email. Periksa lalu kirim untuk memulai percakapan.");
      } else {
        await copyMessage(message);
        setDone("Brief sudah disalin. Kirimkan melalui kanal kontak ARUNA yang tersedia.");
      }
      sessionStorage.removeItem("aruna-brief");
    } catch {
      setError("Brief belum dapat disiapkan. Jawaban Anda tetap tersimpan di perangkat ini.");
    } finally {
      setBusy(false);
    }
  }

  if (done) return (
    <div className="border border-[#345348]/30 bg-white p-8 text-center md:p-14" role="status">
      <CheckCircle2 className="mx-auto text-[#345348]" size={52} />
      <h2 className="mt-5 font-display text-4xl">Brief siap dikirim.</h2>
      <p className="mt-3 text-[var(--muted)]">{done}</p>
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
      {step === 3 && <div className="grid gap-5 md:grid-cols-2">{field("style", "Preferensi gaya")}{field("color", "Warna utama", false, "color")}{field("references", "Website referensi")}<label className="label">Budget<select className="field" value={data.budget} onChange={(event) => update("budget", event.target.value)}>{["Rp400-900 ribu", "Rp900 ribu-1,5 juta", "Rp1,5-3 juta", "Di atas Rp3 juta", "Perlu diskusi"].map((item) => <option key={item}>{item}</option>)}</select></label><label className="label">Target launch<select className="field" value={data.timeline} onChange={(event) => update("timeline", event.target.value)}>{["Secepatnya", "1-2 bulan", "2-3 bulan", "Fleksibel"].map((item) => <option key={item}>{item}</option>)}</select></label><label className="label md:col-span-2">Catatan tambahan<textarea className="field min-h-28 resize-y" value={data.notes} onChange={(event) => update("notes", event.target.value)} /></label></div>}
      {error && <p role="alert" className="mt-5 border-l-2 border-red-600 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <div className="mt-9 flex items-center justify-between gap-3">
        <button type="button" className="button secondary disabled:opacity-30" disabled={step === 0} onClick={() => { setError(""); setStep((current) => current - 1); }}><ArrowLeft size={17} /> Kembali</button>
        {step < 3 ? <button type="button" className="button" onClick={nextStep}>Lanjut <ArrowRight size={17} /></button> : <button className="button" disabled={busy}>{busy ? <LoaderCircle className="animate-spin" size={17} /> : null}Siapkan Brief</button>}
      </div>
      <p className="mb-0 mt-5 text-xs text-[var(--muted)]">Draft hanya tersimpan sementara di perangkat ini. Website tidak menyimpan data brief di server.</p>
    </form>
  );
}
