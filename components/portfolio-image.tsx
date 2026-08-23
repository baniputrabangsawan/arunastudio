import Image from "next/image";

type PortfolioImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
};

export function PortfolioImage({ src, alt, priority = false, sizes, className }: PortfolioImageProps) {
  if (src.startsWith("/")) {
    return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={className} />;
  }

  return <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} className={`absolute inset-0 size-full ${className ?? ""}`} />;
}
