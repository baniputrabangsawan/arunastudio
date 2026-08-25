"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { PublicFaq } from "@/lib/content-data";
import styles from "./aruna-ai-assistant.module.css";

type KnowledgeItem = PublicFaq & { keywords?: string[] };
type Message = { role: "assistant" | "user"; text: string };

const quickQuestions = [
  "Apa itu ARUNA?",
  "ARUNA cocok untuk siapa?",
  "Kenapa memilih ARUNA?",
  "Bagaimana cara kerja ARUNA?",
  "Di mana lokasi ARUNA?",
  "Apakah ARUNA memakai template?",
  "Apakah ARUNA hanya membuat website?",
  "Berapa harga website?",
  "Berapa lama prosesnya?",
  "Apakah mobile-friendly?",
  "Layanan apa saja?",
  "Apakah domain dan hosting termasuk?",
  "Bisakah isi website diubah sendiri?",
  "Apakah website bisa muncul di Google?",
  "Bagaimana sistem pembayarannya?",
  "Apakah bisa membuat sistem booking?",
  "Apakah tersedia maintenance?",
  "Apakah bisa memperbaiki website lama?",
  "Apakah melayani seluruh Indonesia?",
];

const coreKnowledge: KnowledgeItem[] = [
  {
    question: "Apa itu ARUNA?",
    answer: "ARUNA adalah studio digital di Makassar yang membantu UMKM, usaha lokal, profesional, dan tim kecil membangun website serta sistem bisnis yang jelas, cepat, dan mudah digunakan.",
    keywords: ["apa itu aruna", "tentang aruna", "aruna adalah", "siapa aruna"],
  },
  {
    question: "ARUNA cocok untuk siapa?",
    answer: "ARUNA cocok untuk UMKM, usaha lokal, profesional, dan tim kecil yang membutuhkan website bisnis, company profile, sistem booking, dashboard, SEO, maintenance, atau otomasi.",
    keywords: ["cocok untuk siapa", "target aruna", "pelanggan aruna", "umkm"],
  },
  {
    question: "Kenapa memilih ARUNA?",
    answer: "ARUNA mengutamakan desain custom, pengalaman mobile-first, performa, fondasi SEO, harga dan scope yang transparan, serta pendampingan setelah website diluncurkan.",
    keywords: ["kenapa memilih", "mengapa memilih", "keunggulan", "kelebihan aruna"],
  },
  {
    question: "Bagaimana cara kerja ARUNA?",
    answer: "Proses ARUNA dimulai dari memahami bisnis Anda, menentukan scope dan biaya, meninjau progres pada tahap yang disepakati, lalu meluncurkan serta menyerahkan website.",
    keywords: ["cara kerja", "proses aruna", "alur kerja", "tahapan"],
  },
  {
    question: "Di mana lokasi ARUNA?",
    answer: "ARUNA berbasis di Makassar, Indonesia. Konsultasi, review, dan serah terima project dapat dilakukan secara daring untuk pelanggan di seluruh Indonesia.",
    keywords: ["lokasi", "alamat", "kantor", "makassar", "berada dimana", "berada di mana"],
  },
  {
    question: "Apakah ARUNA memakai template?",
    answer: "Desain website ARUNA dibuat mengikuti karakter dan kebutuhan bisnis, bukan sekadar template yang diganti warna. Komponen teknis yang teruji tetap digunakan ketika membantu kualitas dan efisiensi project.",
    keywords: ["template", "desain custom", "dibuat dari nol"],
  },
  {
    question: "Apakah ARUNA hanya membuat website?",
    answer: "Tidak. Selain website bisnis, ARUNA juga mengerjakan sistem booking, dashboard, integrasi API, SEO dan maintenance, serta otomasi untuk pekerjaan yang berulang.",
    keywords: ["hanya website", "selain website", "sistem bisnis", "otomasi"],
  },
  {
    question: "Berapa harga pembuatan website?",
    answer: "Landing page mulai Rp400.000–Rp600.000, company profile Rp900.000–Rp1.400.000, dan website custom mulai Rp2.000.000. Biaya final mengikuti scope yang disepakati.",
    keywords: ["harga", "biaya", "budget", "tarif", "investasi"],
  },
  {
    question: "Layanan apa yang tersedia?",
    answer: "ARUNA menyediakan website bisnis, sistem booking atau dashboard, fondasi SEO dan maintenance, serta otomasi yang mengikuti kebutuhan bisnis.",
    keywords: ["layanan", "jasa", "buat apa", "bisa buat"],
  },
  {
    question: "Apakah website nyaman dibuka di HP?",
    answer: "Ya. Setiap website ARUNA dirancang mobile-first, kemudian diperiksa kembali pada ukuran tablet dan desktop.",
    keywords: ["mobile", "hp", "ponsel", "responsive", "responsif"],
  },
  {
    question: "Apakah ARUNA membuat sistem booking dan dashboard?",
    answer: "Ya. ARUNA dapat membuat sistem booking, dashboard, pengelolaan status, notifikasi, dan integrasi API sesuai alur bisnis yang disepakati.",
    keywords: ["booking", "dashboard", "reservasi", "jadwal"],
  },
  {
    question: "Apakah tersedia maintenance website?",
    answer: "Ya. ARUNA menyediakan maintenance, audit performa, pembaruan informasi, dan perbaikan fondasi SEO sesuai kebutuhan website.",
    keywords: ["maintenance", "perawatan", "pemeliharaan", "update"],
  },
  {
    question: "Bagaimana cara memulai project?",
    answer: "Mulai dengan mengisi project brief. ARUNA kemudian membantu merapikan kebutuhan, scope, jadwal, dan kisaran biayanya sebelum pengerjaan dimulai.",
    keywords: ["mulai", "pesan", "order", "project", "proyek"],
  },
];

const ignoredWords = new Set(["yang", "dan", "atau", "apa", "apakah", "saya", "untuk", "dengan", "bisa", "website", "aruna"]);

function tokenize(value: string) {
  return value
    .toLocaleLowerCase("id-ID")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !ignoredWords.has(word));
}

function answerQuestion(input: string, knowledge: KnowledgeItem[]) {
  const normalizedInput = input.toLocaleLowerCase("id-ID");
  const inputTokens = new Set(tokenize(input));

  const ranked = knowledge.map((item) => {
    const questionTokens = tokenize(item.question);
    const keywordScore = (item.keywords ?? []).reduce(
      (score, keyword) => score + (normalizedInput.includes(keyword) ? 4 : 0),
      0,
    );
    const questionScore = questionTokens.reduce(
      (score, token) => score + (inputTokens.has(token) ? 2 : 0),
      0,
    );
    return { answer: item.answer, score: keywordScore + questionScore };
  }).sort((a, b) => b.score - a.score);

  if (ranked[0] && ranked[0].score >= 2) return ranked[0].answer;
  return "Saya belum menemukan jawaban yang tepat di informasi ARUNA. Silakan buka halaman FAQ atau lanjutkan melalui WhatsApp untuk jawaban yang lebih spesifik.";
}

export function ArunaAiAssistant({ faqs }: { faqs: PublicFaq[] }) {
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Halo! Saya ARUNA AI. Tanyakan tentang layanan, harga, proses, atau pengelolaan website." },
  ]);
  const knowledge = useMemo(() => [...coreKnowledge, ...faqs], [faqs]);
  const isOpen = openPath === pathname;

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  useEffect(() => {
    const messageList = messagesRef.current;
    if (messageList) messageList.scrollTop = messageList.scrollHeight;
  }, [messages]);

  function ask(value: string) {
    const trimmedQuestion = value.trim();
    if (!trimmedQuestion) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: trimmedQuestion },
      { role: "assistant", text: answerQuestion(trimmedQuestion, knowledge) },
    ]);
    setQuestion("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(question);
  }

  return (
    <div className={styles.root}>
      {isOpen && (
        <section className={styles.panel} role="dialog" aria-label="ARUNA AI customer service" data-lenis-prevent>
          <header className={styles.header}>
            <div className={styles.identity}>
              <span className={styles.avatar}><Bot size={20} aria-hidden="true" /></span>
              <div>
                <p>ARUNA AI</p>
                <span>Jawaban otomatis dari informasi ARUNA</span>
              </div>
            </div>
            <button className={styles.close} type="button" onClick={() => setOpenPath(null)} aria-label="Tutup ARUNA AI">
              <X size={20} aria-hidden="true" />
            </button>
          </header>

          <div className={styles.messages} ref={messagesRef} aria-live="polite" data-lenis-prevent>
            {messages.map((message, index) => (
              <p className={message.role === "user" ? styles.userMessage : styles.assistantMessage} key={`${message.role}-${index}`}>
                {message.text}
              </p>
            ))}
          </div>

          <div className={styles.quickQuestions} aria-label="Pertanyaan cepat" data-lenis-prevent>
            {quickQuestions.map((item) => (
              <button type="button" key={item} onClick={() => ask(item)}>{item}</button>
            ))}
          </div>

          <form className={styles.form} onSubmit={submit}>
            <label className="sr-only" htmlFor="aruna-ai-question">Tulis pertanyaan</label>
            <input
              id="aruna-ai-question"
              ref={inputRef}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Tulis pertanyaan…"
              autoComplete="off"
            />
            <button type="submit" aria-label="Kirim pertanyaan" disabled={!question.trim()}>
              <Send size={18} aria-hidden="true" />
            </button>
          </form>

          <div className={styles.panelLinks}>
            <Link href="/faq" onClick={() => setOpenPath(null)}>Lihat semua FAQ</Link>
            <Link href="/kontak" onClick={() => setOpenPath(null)}>Hubungi ARUNA</Link>
          </div>
        </section>
      )}

      <button
        className={styles.launcher}
        type="button"
        onClick={() => setOpenPath((current) => current === pathname ? null : pathname)}
        aria-label={isOpen ? "Tutup ARUNA AI" : "Buka ARUNA AI"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} aria-hidden="true" /> : <Sparkles size={24} aria-hidden="true" />}
        <span>AI</span>
      </button>
    </div>
  );
}
