import { Hero } from "@/components/hero";
import { FaqSection, PortfolioSection, PricingSection, ProcessSection, ServicesSection, TrustStrip, WhySection } from "@/components/home-sections";
import { InteractiveStudio } from "@/components/interactive-studio";
import { getPublishedProjects } from "@/lib/portfolio-data";
import { getPublishedFaqs, getPublishedPricing, getPublishedServices } from "@/lib/content-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, services, pricing, faqs] = await Promise.all([getPublishedProjects(), getPublishedServices(), getPublishedPricing(), getPublishedFaqs()]);
  const schema = { "@context":"https://schema.org", "@type":"ProfessionalService", name:"ARUNA", description:"Jasa pembuatan website untuk bisnis kecil dan UMKM Indonesia", areaServed:"Indonesia" };
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}/><Hero/><TrustStrip/><ServicesSection services={services}/><WhySection/><PortfolioSection projects={projects}/><ProcessSection/><PricingSection pricing={pricing}/><InteractiveStudio/><FaqSection faqs={faqs}/></main>;
}
