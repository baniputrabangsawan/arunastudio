import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PricingSection } from "@/components/home-sections";
import { InteractiveStudio } from "@/components/interactive-studio";
import { getPublishedPricing } from "@/lib/content-data";
export const metadata:Metadata={title:"Harga",description:"Paket dan estimasi harga jasa pembuatan website ARUNA."};
export const dynamic="force-dynamic";
export default async function PricePage(){const pricing=await getPublishedPricing();return <main><PageHero eyebrow="Harga transparan" title="Investasi yang bisa diperkirakan sejak awal." description="Pilih titik awal yang paling dekat dengan kebutuhan. Tidak ada biaya tersembunyi; perubahan scope selalu dibicarakan terlebih dahulu."/><PricingSection pricing={pricing}/><InteractiveStudio/></main>}
