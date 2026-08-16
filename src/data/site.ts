import type { SiteConfig } from "../types/content";

/**
 * Global site identity and contact information.
 * Everything rendered in the header corners comes from this object.
 */
export const site: SiteConfig = {
  name: "Zening Xuan",
  identity: ["Mathematics / Computer Science", "Shanghai"],
  contact: {
    label: "Contact",
    href: "mailto:hello@example.com",
  },
  meta: {
    title: "Zening Xuan — Personal Index",
    description:
      "A personal index of interests — mathematics, deep learning, rock music, and more.",
    lang: "en",
  },
};
