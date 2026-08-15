import { asset } from "../../lib/assets";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Load eagerly (homepage hero images); others lazy-load by default. */
  eager?: boolean;
}

export function Image({ src, alt, eager = false, loading, className, ...rest }: ImageProps) {
  return (
    <img
      src={asset(src)}
      alt={alt}
      loading={eager ? "eager" : loading ?? "lazy"}
      className={className}
      {...rest}
    />
  );
}
