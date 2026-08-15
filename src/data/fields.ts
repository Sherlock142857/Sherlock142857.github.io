import type { Field } from "../types/content";

/**
 * The single source of truth for every content area on the site.
 *
 * Adding a new field (e.g. "Computer Graphics") is a matter of:
 *   1. dropping an image into public/assets/fields/
 *   2. appending one object to this array
 *
 * No component, route, or animation code needs to change.
 *
 * Asset paths are relative to the public directory and are resolved against the
 * configured base URL at runtime via `asset()` (see src/lib/assets.ts), so the
 * same build works on a root domain and on a GitHub Pages sub-path.
 */
export const fields: Field[] = [
  {
    id: "mathematics",
    title: "Mathematics",
    image: "assets/fields/mathematics.png",
    imageAlt: "Grayscale noise placeholder for the Mathematics field",
    metadata: {
      lines: ["Major", "Mathematics", "Interest", "Probability", "Optimization"],
    },
    detail: {
      template: "text",
      title: "Mathematics",
      subtitle: "Structure, chance, and the machinery of proof.",
      sections: [
        {
          heading: "Probability",
          paragraphs: [
            "Most of the mathematics I care about lives where measure theory meets intuition — random variables, martingales, and the long-run behaviour of processes that never quite settle.",
            "The appeal is that a small set of axioms produces a remarkably rich language for describing uncertainty without ever pretending the uncertainty is under control.",
          ],
        },
        {
          heading: "Optimization",
          paragraphs: [
            "Convexity, duality, and the geometry of gradient methods. I am interested in why simple iterative schemes converge at all, and where their guarantees break down in practice.",
          ],
        },
        {
          heading: "Reading now",
          paragraphs: [
            "Stochastic processes and the theory of Markov chains, with a side of probability measures on metric spaces.",
          ],
        },
      ],
    },
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    image: "assets/fields/deep-learning.png",
    imageAlt: "Grayscale noise placeholder for the Deep Learning field",
    metadata: {
      lines: ["Focus", "Deep Learning", "Representation", "Learning", "Currently", "Transformers"],
    },
    detail: {
      template: "text-image",
      title: "Deep Learning",
      subtitle: "Representations learned from data.",
      sections: [
        {
          heading: "On representation",
          paragraphs: [
            "A neural network is, before anything else, a machine for choosing coordinates. The interesting question is rarely whether a model can fit a dataset — it is which structure the optimisation surface quietly rewards.",
            "This site's own interaction model — a small set of states with carefully controlled transitions — is a deliberate counterpoint to the way large models produce a smooth continuum of outputs.",
          ],
        },
        {
          heading: "In practice",
          paragraphs: [
            "Scaling behaviour, attention, and the gap between what a loss curve promises and what a system actually does once it is deployed.",
          ],
        },
      ],
      image: {
        src: "assets/detail/deep-learning-01.png",
        alt: "Grayscale noise placeholder for Deep Learning detail",
      },
    },
  },
  {
    id: "rock-music",
    title: "Rock Music",
    image: "assets/fields/rock-music.png",
    imageAlt: "Grayscale noise placeholder for the Rock Music field",
    metadata: {
      lines: ["Listening", "Rock", "Currently", "Loud", "And", "Guitars"],
    },
    detail: {
      template: "text-gallery",
      title: "Rock Music",
      subtitle: "Loud guitars, collected.",
      sections: [
        {
          heading: "Listening",
          paragraphs: [
            "An ongoing, loosely curated collection of records — mostly electric, mostly deliberate, mostly too loud for a shared office.",
            "The column on the right scrolls quietly on its own. It is not meant to be read as a grid; it is a shelf viewed from the side.",
          ],
        },
        {
          heading: "Notes",
          paragraphs: [
            "Riffs, production, and the particular kind of restraint that makes a band sound enormous without sounding busy.",
          ],
        },
      ],
      images: [
        { src: "assets/detail/rock-music-01.png", alt: "Album cover placeholder one" },
        { src: "assets/detail/rock-music-02.png", alt: "Album cover placeholder two" },
        { src: "assets/detail/rock-music-03.png", alt: "Album cover placeholder three" },
      ],
    },
  },
];

export function getFieldById(id: string): Field | undefined {
  return fields.find((field) => field.id === id);
}
