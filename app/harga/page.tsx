import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PricingSection } from "@/components/home-sections";
import { InteractiveStudio } from "@/components/interactive-studio";
export const metadata:Metadata={title:"Harga",description:"Paket dan estimasi harga jasa pembuatan website ARUNA."};
export default function PricePage(){return <main><PageHero eyebrow="Harga transparan" title="Investasi yang bisa diperkirakan sejak awal." description="Pilih titik awal yang paling dekat dengan kebutuhan. Tidak ada biaya tersembunyi; perubahan scope selalu dibicarakan terlebih dahulu."/><PricingSection/><InteractiveStudio/></main>}
