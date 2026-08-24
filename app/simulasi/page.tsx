import { PageHero } from "@/components/page-hero";
import { InteractiveStudio } from "@/components/interactive-studio";
import { getPublicAvailability } from "@/lib/content-data";
export default async function SimulationPage(){const availability=await getPublicAvailability();return <main><PageHero eyebrow="Simulasi website" title="Lihat kemungkinan website bisnis Anda." description="Masukkan identitas sederhana dan lihat arahnya secara realtime. Ini bukan desain final, tetapi awal untuk membuat ide terasa nyata."/><InteractiveStudio initialAvailability={availability}/></main>}
