"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { copyMessage, emailUrl, whatsappUrl } from "@/lib/contact-handoff";
import { validateProjectBrief, validateProjectBriefStep, type ProjectBriefData, type ProjectBriefErrors } from "@/lib/project-brief-validation";

type ProjectBriefProps = {
  contactEmail: string;
  contactWhatsapp: string;
};

const initial: ProjectBriefData = { name: "", business: "", whatsapp: "", email: "", industry: "", description: "", type: "Company Profile", features: "", goal: "", style: "Warm & profesional", color: "#FF2334", references: "", budget: "Rp900.000–Rp1.400.000", timeline: "1-2 bulan", notes: "" };
const steps = ["Identitas", "Tentang bisnis", "Kebutuhan", "Gaya & budget", "Periksa brief"];
const maximumLengths: Partial<Record<keyof ProjectBriefData, number>> = { name: 100, business: 120, whatsapp: 20, email: 160, industry: 120, description: 1000, features: 500, goal: 500, style: 120, references: 300, notes: 1000 };

function formatBrief(data: ProjectBriefData) {
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
  const [data, setData] = useState<ProjectBriefData>(initial);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ message: string; id?: string; whatsapp?: string } | null>(null);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ProjectBriefErrors>({});

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

  function update<K extends keyof ProjectBriefData>(key: K, value: ProjectBriefData[K]) {
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
    setData((current) => {
      const next = { ...current, [key]: value };
      localStorage.setItem("aruna-brief", JSON.stringify(next));
      return next;
    });
  }

  function nextStep() {
    const errors = validateProjectBriefStep(data, step);
    const firstError = Object.values(errors)[0];
    if (firstError) {
      setFieldErrors(errors);
      setError(firstError);
      return;
    }
    setFieldErrors({});
    setError("");
    setStep((current) => current + 1);
  }

  const field = (key: keyof ProjectBriefData, label: string, required = false, type = "text", autoComplete = "off") => (
    <label className="label">
      {label}{required && <span className="sr-only"> wajib</span>}
      <input
        className="field"
        type={type}
        value={data[key]}
        required={required}
        autoComplete={autoComplete}
        inputMode={type === "tel" ? "tel" : type === "email" ? "email" : undefined}
        spellCheck={type === "email" ? false : undefined}
        maxLength={maximumLengths[key]}
        aria-invalid={fieldErrors[key] ? "true" : undefined}
        aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
        onChange={(event) => update(key, event.target.value)}
      />
      {fieldErrors[key] && <span id={`${key}-error`} className="text-sm font-medium text-red-700" role="alert">{fieldErrors[key]}</span>}
    </label>
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < steps.length - 1) {
      nextStep();
      return;
    }
    const errors = validateProjectBrief(data);
    const firstInvalidStep = errors.name || errors.business || errors.whatsapp || errors.email ? 0 : errors.industry || errors.description ? 1 : errors.goal ? 2 : -1;
    if (firstInvalidStep >= 0) {
      setFieldErrors(errors);
      setError(Object.values(errors)[0] || "Periksa kembali brief Anda.");
      setStep(firstInvalidStep);
      return;
    }
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
        setError(`${cause instanceof Error ? cause.message : "Penyimpanan server belum tersedia."} Draft tetap tersimpan di perangkat ini.`);
      }
    } finally {
      setBusy(false);
    }
  }

  const reviewSections = [
    { title: "Identitas", targetStep: 0, items: [["Nama", data.name], ["Bisnis", data.business], ["WhatsApp", data.whatsapp], ["Email", data.email]] },
    { title: "Tentang bisnis", targetStep: 1, items: [["Industri", data.industry], ["Cerita bisnis", data.description]] },
    { title: "Kebutuhan", targetStep: 2, items: [["Jenis website", data.type], ["Fitur", data.features || "Perlu diskusi"], ["Tujuan", data.goal]] },
    { title: "Gaya & budget", targetStep: 3, items: [["Gaya", data.style || "Perlu diskusi"], ["Referensi", data.references || "Belum ada"], ["Budget", data.budget], ["Target launch", data.timeline], ["Catatan", data.notes || "Tidak ada"]] },
  ];

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
      {step === 0 && <div className="grid gap-5 md:grid-cols-2">{field("name", "Nama lengkap", true, "text", "name")}{field("business", "Nama bisnis", true, "text", "organization")}{field("whatsapp", "Nomor WhatsApp", true, "tel", "tel")}{field("email", "Email", true, "email", "email")}</div>}
      {step === 1 && <div className="grid gap-5">{field("industry", "Bidang / industri", true)}<label className="label">Ceritakan bisnis Anda<textarea className="field min-h-36 resize-y" value={data.description} required minLength={20} maxLength={maximumLengths.description} aria-invalid={fieldErrors.description ? "true" : undefined} aria-describedby={fieldErrors.description ? "description-error" : undefined} onChange={(event) => update("description", event.target.value)} />{fieldErrors.description && <span id="description-error" className="text-sm font-medium text-red-700" role="alert">{fieldErrors.description}</span>}</label></div>}
      {step === 2 && <div className="grid gap-5"><label className="label">Jenis website<select className="field" value={data.type} onChange={(event) => update("type", event.target.value)}>{["Landing Page", "Company Profile", "E-commerce", "Booking", "Custom Website"].map((item) => <option key={item}>{item}</option>)}</select></label>{field("features", "Fitur yang dibutuhkan")}{field("goal", "Tujuan utama website", true)}</div>}
      {step === 3 && <div className="grid gap-5 md:grid-cols-2">{field("style", "Preferensi gaya")}{field("color", "Warna utama", false, "color")}{field("references", "Website referensi", false, "url")}<label className="label">Budget<select className="field" value={data.budget} onChange={(event) => update("budget", event.target.value)}>{["Rp400.000–Rp600.000", "Rp900.000–Rp1.400.000", "Mulai Rp2.000.000", "Perlu diskusi"].map((item) => <option key={item}>{item}</option>)}</select></label><label className="label">Target launch<select className="field" value={data.timeline} onChange={(event) => update("timeline", event.target.value)}>{["Secepatnya", "1-2 bulan", "2-3 bulan", "Fleksibel"].map((item) => <option key={item}>{item}</option>)}</select></label><label className="label md:col-span-2">Catatan tambahan<textarea className="field min-h-28 resize-y" value={data.notes} maxLength={maximumLengths.notes} onChange={(event) => update("notes", event.target.value)} /></label></div>}
      {step === 4 && <div><div className="mb-7"><h2 className="text-3xl font-black tracking-[-.04em]">Periksa sebelum dikirim</h2><p className="mb-0 mt-3 text-[var(--muted)]">Pastikan kontak dan kebutuhan project sudah benar. Data baru dikirim setelah Anda menekan tombol Kirim Brief.</p></div><div className="grid gap-px overflow-hidden border border-black/15 bg-black/15">{reviewSections.map((section) => <section className="bg-[var(--paper)] p-5 md:p-6" key={section.title}><div className="mb-5 flex items-center justify-between gap-4"><h3 className="text-lg font-black">{section.title}</h3><button type="button" className="text-sm font-bold underline underline-offset-4" onClick={() => { setError(""); setStep(section.targetStep); }}>Ubah</button></div><dl className="grid gap-4 sm:grid-cols-2">{section.items.map(([label, value]) => <div className={label === "Cerita bisnis" || label === "Tujuan" || label === "Catatan" ? "sm:col-span-2" : undefined} key={label}><dt className="text-xs font-bold uppercase tracking-[.08em] text-[var(--muted)]">{label}</dt><dd className="mb-0 mt-1 whitespace-pre-wrap break-words font-semibold">{value}</dd></div>)}</dl></section>)}</div></div>}
      {error && <p role="alert" className="mt-5 border-l-2 border-red-600 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <div className="mt-9 flex items-center justify-between gap-3">
        <button type="button" className="button secondary disabled:opacity-30" disabled={step === 0} onClick={() => { setError(""); setStep((current) => current - 1); }}><ArrowLeft size={17} /> Kembali</button>
        {step < steps.length - 1 ? <button type="button" className="button" onClick={nextStep}>{step === 3 ? "Periksa Brief" : "Lanjut"} <ArrowRight size={17} /></button> : <button className="button" disabled={busy}>{busy ? <LoaderCircle className="animate-spin" size={17} /> : null}Kirim Brief</button>}
      </div>
      <p className="mb-0 mt-5 text-xs text-[var(--muted)]">Draft tersimpan di perangkat ini sampai berhasil dikirim. Submission final disimpan di server jika layanan database telah dikonfigurasi.</p>
    </form>
  );
}
