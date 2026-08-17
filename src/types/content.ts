/**
 * Enhanced type definitions for content and configuration.
 *
 * These types provide stronger type safety and better documentation
 * for the content structure used throughout the site.
 */

/**
 * Detail page template types.
 * Each template has a different layout and component structure.
 */
export type DetailTemplate = "text" | "text-image" | "text-gallery";

/**
 * Image reference with source path and alt text.
 */
export interface ImageRef {
  /** Image source path (relative to public/) */
  src: string;
  /** Alt text for accessibility */
  alt: string;
}

/**
 * Content section with a heading and paragraphs.
 */
export interface ContentSection {
  /** Section heading (can be empty string for no heading) */
  heading: string;
  /** Array of paragraph text */
  paragraphs: string[];
}

/**
 * Base structure for detail page content.
 */
interface DetailBase {
  /** Page title displayed in the header */
  title: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Array of content sections, each with a heading and paragraphs */
  sections: ContentSection[];
}

/**
 * Text-only detail page.
 * Single column layout with prose sections.
 */
export interface DetailText extends DetailBase {
  template: "text";
}

/**
 * Text + single static image detail page.
 * Two-column layout with text on left, static image on right.
 */
export interface DetailTextImage extends DetailBase {
  template: "text-image";
  /** Static image displayed alongside text */
  image: ImageRef;
}

/**
 * Text + auto-scrolling gallery detail page.
 * Two-column layout with text on left, scrolling gallery on right.
 */
export interface DetailTextGallery extends DetailBase {
  template: "text-gallery";
  /** Array of images for the scrolling gallery */
  images: ImageRef[];
}

/**
 * Union type for all detail page templates.
 */
export type Detail = DetailText | DetailTextImage | DetailTextGallery;

/**
 * Legacy type alias for backward compatibility.
 * @deprecated Use Detail instead
 */
export type FieldDetail = Detail;

/**
 * Metadata displayed in the carousel for a field.
 */
export interface FieldMetadata {
  /** Array of metadata lines (e.g., ["Category", "Design", "Year", "2023"]) */
  lines: string[];
}

/**
 * Field entry for the homepage carousel.
 */
export interface Field {
  /** Unique identifier (used for routing) */
  id: string;
  /** Display title in carousel */
  title: string;
  /** Thumbnail image path for carousel (relative to public/) */
  image: string;
  /** Alt text for thumbnail image */
  imageAlt: string;
  /** Metadata displayed in carousel */
  metadata: FieldMetadata;
  /** Detail page content */
  detail: Detail;
}

/**
 * Site-wide configuration.
 */
export interface SiteConfig {
  /** Site owner name */
  name: string;
  /** Array of identity lines (affiliation, location, etc.) */
  identity: string[];
  /** Contact information */
  contact: {
    /** Contact link label */
    label: string;
    /** Contact URL (mailto:, tel:, etc.) */
    href: string;
  };
  /** Meta information for HTML head */
  meta: {
    /** Page title (used in <title> tag) */
    title: string;
    /** Meta description */
    description: string;
    /** Language code (e.g., "en", "zh") */
    lang: string;
  };
}

/**
 * Type guard to check if a detail is text-only.
 */
export function isDetailText(detail: Detail): detail is DetailText {
  return detail.template === "text";
}

/**
 * Type guard to check if a detail has a static image.
 */
export function isDetailTextImage(detail: Detail): detail is DetailTextImage {
  return detail.template === "text-image";
}

/**
 * Type guard to check if a detail has a gallery.
 */
export function isDetailTextGallery(detail: Detail): detail is DetailTextGallery {
  return detail.template === "text-gallery";
}
