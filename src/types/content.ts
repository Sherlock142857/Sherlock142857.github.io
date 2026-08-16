export type DetailTemplate = "text" | "text-image" | "text-gallery";

export interface DetailImage {
  src: string;
  alt: string;
}

export interface DetailSection {
  heading?: string;
  paragraphs: string[];
}

export interface FieldDetail {
  template: DetailTemplate;
  title: string;
  subtitle?: string;
  sections?: DetailSection[];
  image?: DetailImage;
  images?: DetailImage[];
}

/**
 * Metadata key-value pair for displaying field information on the homepage.
 * Keys and values are both displayed as separate lines in the metadata section.
 */
export interface MetadataEntry {
  key: string;
  value: string;
}

export interface Field {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  /**
   * Metadata displayed on the homepage when this field is active.
   * Can be either a flat array of strings (legacy format) or an array of
   * key-value pairs for better semantic structure.
   */
  metadata?: {
    lines: string[];
  } | {
    entries: MetadataEntry[];
  };
  detail: FieldDetail;
}

export interface SiteConfig {
  name: string;
  identity: string[];
  contact: {
    label: string;
    href: string;
  };
  meta: {
    title: string;
    description: string;
    lang: string;
  };
}
