import { Hero } from "@/components/hero";
import { BeforeAfterSection, FaqSection, FinalCtaSection, PortfolioSection, PricingSection, ProcessSection, ServicesSection, TrustStrip, ValueIncludedSection, WhySection } from "@/components/home-sections";
import { AvailabilitySection, CalculatorSection, SimulatorSection } from "@/components/interactive-studio";
import { siteUrl } from "@/lib/utils";
import { getPublishedProjects } from "@/lib/portfolio-data";
import { getPublicAvailability, getPublishedFaqs, getPublishedPricing, getPublishedServices } from "@/lib/content-data";

export default async function HomePage() {
  const [projects, services, pricing, faqs, availability] = await Promise.all([getPublishedProjects(), getPublishedServices(), getPublishedPricing(), getPublishedFaqs(), getPublicAvailability()]);
  const schema = { "@context":"https://schema.org", "@type":"ProfessionalService", name:"ARUNA", url: siteUrl(), description:"Jasa pembuatan website untuk bisnis kecil dan UMKM Indonesia", areaServed:{"@type":"Country",name:"Indonesia"}, priceRange:"Rp400.000–Rp2.000.000+", serviceType:["Jasa pembuatan website","Jasa website UMKM"] };
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}/><Hero/><TrustStrip/><PortfolioSection projects={projects}/><WhySection/><ServicesSection services={services}/><ValueIncludedSection/><BeforeAfterSection/><ProcessSection/><PricingSection pricing={pricing}/><SimulatorSection/><CalculatorSection/><AvailabilitySection availability={availability}/><FaqSection faqs={faqs}/><FinalCtaSection/></main>;
}
