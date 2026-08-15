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

export interface Field {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  metadata?: {
    lines: string[];
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
