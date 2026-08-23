import { Hero } from "@/components/hero";
import { FaqSection, PortfolioSection, PricingSection, ProcessSection, ServicesSection, TrustStrip, WhySection } from "@/components/home-sections";
import { InteractiveStudio } from "@/components/interactive-studio";

export default function HomePage() {
  const schema = { "@context":"https://schema.org", "@type":"ProfessionalService", name:"ARUNA", description:"Jasa pembuatan website untuk bisnis kecil dan UMKM Indonesia", areaServed:"Indonesia" };
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}/><Hero/><TrustStrip/><ServicesSection/><WhySection/><PortfolioSection/><ProcessSection/><PricingSection/><InteractiveStudio/><FaqSection/></main>;
}
