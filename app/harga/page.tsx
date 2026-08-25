import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PricingSection } from "@/components/home-sections";
import { InteractiveStudio } from "@/components/interactive-studio";
import { getPublicAvailability, getPublishedPricing } from "@/lib/content-data";
export const metadata:Metadata={title:"Harga Jasa Website",description:"Paket transparan ARUNA: landing page Rp400.000–Rp600.000, company profile Rp900.000–Rp1.400.000, dan custom website mulai Rp2.000.000.",alternates:{canonical:"/harga"}};
export default async function PricePage(){const [pricing,availability]=await Promise.all([getPublishedPricing(),getPublicAvailability()]);return <main><PageHero eyebrow="Harga transparan" title="Investasi yang bisa diperkirakan sejak awal." description="Pilih titik awal yang paling dekat dengan kebutuhan. Tidak ada biaya tersembunyi; perubahan scope selalu dibicarakan terlebih dahulu."/><PricingSection pricing={pricing}/><InteractiveStudio initialAvailability={availability}/></main>}
