import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProjectBrief } from "@/components/project-brief";
import { getPublicSettings } from "@/lib/content-data";
export const metadata:Metadata={title:"Mulai Project",description:"Ceritakan kebutuhan website bisnis Anda kepada ARUNA dan dapatkan submission ID serta estimasi langkah berikutnya.",alternates:{canonical:"/mulai-project"}};
export default async function StartProject(){const settings=await getPublicSettings();return <main><PageHero eyebrow="Project brief" title="Mari mulai dari cerita bisnis Anda." description="Isi yang Anda ketahui sekarang. Draft tersimpan di perangkat ini, lalu submission final dikirim ke server."/><section className="section surface pt-0"><div className="container max-w-4xl"><ProjectBrief contactEmail={settings.email} contactWhatsapp={settings.whatsapp}/></div></section></main>}
