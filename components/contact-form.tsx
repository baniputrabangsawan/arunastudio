"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { copyMessage, emailUrl, whatsappUrl } from "@/lib/contact-handoff";

type ContactFormProps = {
  contactEmail: string;
  whatsapp: string;
};

export function ContactForm({ contactEmail, whatsapp }: ContactFormProps) {
  const [done, setDone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const message = `Halo ARUNA, saya ${name}.\n\nEmail: ${email}\n\nPesan:\n${String(form.get("message") || "")}`;
    const whatsappTarget = whatsappUrl(whatsapp, message);
    const emailTarget = emailUrl(contactEmail, `Pesan website dari ${name}`, message);

    try {
      if (whatsappTarget) {
        window.open(whatsappTarget, "_blank", "noopener,noreferrer");
        setDone("Pesan sudah disiapkan di WhatsApp. Periksa lalu kirim dari sana.");
      } else if (emailTarget) {
        window.location.href = emailTarget;
        setDone("Pesan sudah disiapkan di aplikasi email. Periksa lalu kirim dari sana.");
      } else {
        await copyMessage(message);
        setDone("Pesan sudah disalin. Kirimkan melalui salah satu kanal kontak ARUNA di halaman ini.");
      }
    } catch {
      setError("Pesan belum dapat disiapkan. Silakan salin isi formulir secara manual.");
    } finally {
      setBusy(false);
    }
  }

  if (done) return (
    <div className="bg-white p-10 text-center" role="status">
      <CheckCircle2 className="mx-auto text-[#345348]" size={44} />
      <h2 className="mt-4 font-display text-3xl">Pesan siap dikirim.</h2>
      <p className="mt-2 text-[var(--muted)]">{done}</p>
      <button className="button secondary mt-6" type="button" onClick={() => setDone("")}>Tulis pesan lain</button>
    </div>
  );

  return (
    <form className="grid gap-5 bg-white p-6 md:p-9" onSubmit={submit}>
      <label className="label">Nama<input required name="name" autoComplete="name" className="field" /></label>
      <label className="label">Email<input required name="email" autoComplete="email" type="email" className="field" /></label>
      <label className="label">Pesan<textarea required name="message" minLength={10} className="field min-h-40 resize-y" /></label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button className="button" disabled={busy}>{busy && <LoaderCircle className="animate-spin" size={17} />}Siapkan Pesan</button>
      <p className="m-0 text-xs text-[var(--muted)]">Pesan diteruskan melalui WhatsApp atau aplikasi email; website ini tidak menyimpan data formulir.</p>
    </form>
  );
}
