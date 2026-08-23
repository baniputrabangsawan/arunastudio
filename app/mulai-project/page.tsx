import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProjectBrief } from "@/components/project-brief";
export const metadata:Metadata={title:"Mulai Project",description:"Ceritakan kebutuhan website bisnis Anda kepada ARUNA."};
export default function StartProject(){return <main><PageHero eyebrow="Project brief" title="Mari mulai dari cerita bisnis Anda." description="Isi yang Anda ketahui sekarang. Brief tersimpan sementara di perangkat ini, jadi Anda bisa kembali tanpa kehilangan jawaban."/><section className="section surface pt-0"><div className="container max-w-4xl"><ProjectBrief/></div></section></main>}
