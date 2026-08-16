import { useState } from "react";
import { asset } from "../../lib/assets";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Load eagerly (homepage hero images); others lazy-load by default. */
  eager?: boolean;
  /** Optional fallback image to show on error */
  fallbackSrc?: string;
}

/**
 * Image component with error handling and lazy loading support.
 * Automatically shows a fallback when the primary image fails to load.
 */
export function Image({ src, alt, eager = false, loading, className, fallbackSrc, ...rest }: ImageProps) {
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(asset(src));

  const handleError = () => {
    if (!error && fallbackSrc) {
      // Try fallback image
      setError(true);
      setCurrentSrc(asset(fallbackSrc));
    } else if (!error) {
      // No fallback available, just mark as error to prevent retry loops
      setError(true);
      console.warn(`Failed to load image: ${src}`);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={eager ? "eager" : loading ?? "lazy"}
      className={className}
      onError={handleError}
      {...rest}
    />
  );
}
