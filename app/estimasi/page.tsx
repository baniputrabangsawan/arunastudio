import { PageHero } from "@/components/page-hero";
import { InteractiveStudio } from "@/components/interactive-studio";
import { getPublicAvailability } from "@/lib/content-data";
export default async function EstimatePage(){const availability=await getPublicAvailability();return <main><PageHero eyebrow="Project estimator" title="Ceritakan kebutuhan dengan bahasa sehari-hari." description="Estimator membantu menerjemahkan cerita bisnis menjadi rekomendasi website, fitur, dan kisaran investasi awal."/><InteractiveStudio initialAvailability={availability}/></main>}
