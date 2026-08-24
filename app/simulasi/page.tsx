import { PageHero } from "@/components/page-hero";
import type { Metadata } from "next";
import { SimulatorSection } from "@/components/interactive-studio";
export const metadata:Metadata={title:"Website Simulator",description:"Lihat preview website bisnis Anda secara realtime sebelum order dan teruskan hasilnya ke project brief.",alternates:{canonical:"/simulasi"}};
export default function SimulationPage(){return <main><PageHero eyebrow="Website Simulator" title="Lihat seperti apa website bisnis Anda sebelum order." description="Masukkan identitas sederhana dan lihat arahnya secara realtime. Data dapat diteruskan langsung ke project brief."/><SimulatorSection/></main>}
