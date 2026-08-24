import Image from "next/image";

type PortfolioImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
};

export function PortfolioImage({ src, alt, sizes, className }: PortfolioImageProps) {
  if (src.startsWith("/")) {
    return <Image src={src} alt={alt} fill sizes={sizes} className={className} />;
  }

  // Unknown third-party CMS hosts cannot be safely allowlisted in next/image.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={`absolute inset-0 size-full ${className ?? ""}`} />;
}
