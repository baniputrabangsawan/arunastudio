import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { getPublicSettings } from "@/lib/content-data";
export const metadata:Metadata={title:"Kontak",description:"Hubungi ARUNA untuk mendiskusikan website bisnis atau UMKM Anda.",alternates:{canonical:"/kontak"}};
export default async function ContactPage(){const settings=await getPublicSettings();return <main><PageHero eyebrow="Konsultasi singkat" title="Ceritakan kebutuhan bisnis Anda." description="Gunakan form ini untuk pertanyaan awal. Jika kebutuhan sudah cukup jelas, project brief memberi alur yang lebih lengkap."/><section className="section pt-0"><div className="container max-w-4xl"><ContactForm contactWhatsapp={settings.whatsapp}/></div></section></main>}
