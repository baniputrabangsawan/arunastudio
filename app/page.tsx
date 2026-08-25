import { Hero } from "@/components/hero";
import { BeforeAfterSection, PracticalValueSection, PricingSection, ProcessSection, TrustStrip, ValueIncludedSection } from "@/components/home-sections";
import { AvailabilitySection } from "@/components/interactive-studio";
import { siteUrl } from "@/lib/utils";
import { getPublicAvailability, getPublishedPricing } from "@/lib/content-data";

export default async function HomePage() {
  const [pricing, availability] = await Promise.all([getPublishedPricing(), getPublicAvailability()]);
  const schema = { "@context":"https://schema.org", "@type":"ProfessionalService", name:"ARUNA", url: siteUrl(), description:"Jasa pembuatan website untuk bisnis kecil dan UMKM Indonesia", areaServed:{"@type":"Country",name:"Indonesia"}, priceRange:"Rp400.000–Rp2.000.000+", serviceType:["Jasa pembuatan website","Jasa website UMKM"] };
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}/><Hero/><TrustStrip/><PracticalValueSection/><ValueIncludedSection/><BeforeAfterSection/><ProcessSection/><PricingSection pricing={pricing}/><AvailabilitySection availability={availability}/></main>;
}
