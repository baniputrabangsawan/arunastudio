import { PageHero } from "@/components/page-hero";
import type { Metadata } from "next";
import { ProjectEstimator } from "@/components/interactive-studio";
export const metadata:Metadata={title:"Estimator Project Website",description:"Ceritakan kebutuhan bisnis untuk mendapat rekomendasi paket, fitur, kompleksitas, dan estimasi harga website.",alternates:{canonical:"/estimasi"}};
export default function EstimatePage(){return <main><PageHero eyebrow="Estimator Project" title="Ceritakan kebutuhan dengan bahasa sehari-hari." description="Dapatkan rekomendasi jenis website, fitur, kompleksitas, paket, dan kisaran investasi awal."/><section className="section pt-0"><div className="container"><ProjectEstimator/></div></section></main>}
