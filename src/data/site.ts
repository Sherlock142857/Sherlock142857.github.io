import type { SiteConfig } from "../types/content";

/**
 * Global site identity and contact information.
 * Everything rendered in the header corners comes from this object.
 */
export const site: SiteConfig = {
  name: "Zening Xuan",
  identity: ["Fudan University", "Mathematics Undergraduate", "Shanghai, China"],
  contact: {
    label: "Contact",
    href: "mailto:xuanzening@126.com",
  },
  meta: {
    title: "Zening Xuan — Personal Index",
    description:
      "A personal index of interests — mathematics, deep learning, rock music, and more.",
    lang: "en",
  },
};
