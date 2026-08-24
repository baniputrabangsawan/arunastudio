import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PricingSection } from "@/components/home-sections";
import { InteractiveStudio } from "@/components/interactive-studio";
import { getPublicAvailability, getPublishedPricing } from "@/lib/content-data";
export const metadata:Metadata={title:"Harga",description:"Paket dan estimasi harga jasa pembuatan website ARUNA."};
export const revalidate=300;
export default async function PricePage(){const [pricing,availability]=await Promise.all([getPublishedPricing(),getPublicAvailability()]);return <main><PageHero eyebrow="Harga transparan" title="Investasi yang bisa diperkirakan sejak awal." description="Pilih titik awal yang paling dekat dengan kebutuhan. Tidak ada biaya tersembunyi; perubahan scope selalu dibicarakan terlebih dahulu."/><PricingSection pricing={pricing}/><InteractiveStudio initialAvailability={availability}/></main>}
