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
    id: "about-me",
    title: "About Me",
    image: "assets/fields/about-me.jpg",
    imageAlt: "About Me introduction",
    metadata: {
      lines: ["Student", "Fudan University", "Major", "Mathematics", "Based in", "Shanghai"],
    },
    detail: {
      template: "text",
      title: "About Me",
      subtitle: "Mathematics student, explorer of patterns.",
      sections: [
        {
          heading: "Background",
          paragraphs: [
            "I am an undergraduate mathematics student at Fudan University in Shanghai, currently exploring the intersections of pure mathematics, computational methods, and practical applications.",
            "My interests span from rigorous mathematical theory to hands-on implementation, from quantitative research to creative pursuits like music and games.",
          ],
        },
        {
          heading: "Current Focus",
          paragraphs: [
            "I am particularly interested in probability theory, optimization, and their applications in machine learning and quantitative research. I am also exploring how mathematical structures can inform better computational systems.",
          ],
        },
        {
          heading: "Beyond Mathematics",
          paragraphs: [
            "Outside of academics, I spend time with rock music, video games, and various other interests that keep life interesting — from computer graphics to card manipulation techniques.",
          ],
        },
      ],
    },
  },
  {
    id: "mathematics",
    title: "Mathematics",
    image: "assets/fields/mathematics.png",
    imageAlt: "Mathematics field",
    metadata: {
      lines: ["Major", "Mathematics", "Interest", "Probability", "Optimization"],
    },
    detail: {
      template: "text",
      title: "Mathematics",
      subtitle: "Structure, chance, and the machinery of proof.",
      sections: [
        {
          heading: "Probability & Statistics",
          paragraphs: [
            "Most of the mathematics I care about lives where measure theory meets intuition — random variables, martingales, and the long-run behaviour of processes that never quite settle.",
            "The appeal is that a small set of axioms produces a remarkably rich language for describing uncertainty without ever pretending the uncertainty is under control.",
          ],
        },
        {
          heading: "Optimization Theory",
          paragraphs: [
            "Convexity, duality, and the geometry of gradient methods. I am interested in why simple iterative schemes converge at all, and where their guarantees break down in practice.",
            "Optimization sits at the core of both machine learning training procedures and quantitative trading strategies — a unifying mathematical framework across domains.",
          ],
        },
        {
          heading: "Current Reading",
          paragraphs: [
            "Stochastic processes, Markov chains, and the theory of probability measures on metric spaces. Also exploring connections to information theory and statistical inference.",
          ],
        },
      ],
    },
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    image: "assets/fields/deep-learning.png",
    imageAlt: "Deep Learning field",
    metadata: {
      lines: ["Focus", "Deep Learning", "Architecture", "Transformers", "Interest", "Theory"],
    },
    detail: {
      template: "text",
      title: "Deep Learning",
      subtitle: "Representations learned from data.",
      sections: [
        {
          heading: "On Representation",
          paragraphs: [
            "A neural network is, before anything else, a machine for choosing coordinates. The interesting question is rarely whether a model can fit a dataset — it is which structure the optimization surface quietly rewards.",
            "I am particularly interested in the mathematical foundations: why do overparameterized networks generalize? What implicit biases do gradient-based optimizers introduce?",
          ],
        },
        {
          heading: "Current Work",
          paragraphs: [
            "Exploring transformer architectures, attention mechanisms, and their applications beyond natural language. Also studying optimization dynamics and the theory of neural network training.",
          ],
        },
        {
          heading: "Practical Applications",
          paragraphs: [
            "Working on projects that bridge theory and practice — from implementing custom architectures to analyzing model behavior and performance in real-world settings.",
          ],
        },
      ],
    },
  },
  {
    id: "quantitative-research",
    title: "Quantitative Research",
    image: "assets/fields/quantitative-research.jpg",
    imageAlt: "Quantitative Research field",
    metadata: {
      lines: ["Interest", "Quantitative", "Focus", "Statistical Arbitrage", "Tools", "Python"],
    },
    detail: {
      template: "text",
      title: "Quantitative Research",
      subtitle: "Markets, models, and statistical edge.",
      sections: [
        {
          heading: "Systematic Trading",
          paragraphs: [
            "Quantitative research sits at the intersection of probability theory, optimization, and real-world market dynamics. The challenge is not just building models that work in theory, but ones that survive actual trading conditions.",
            "I am exploring statistical arbitrage strategies, market microstructure, and the application of machine learning to alpha generation and risk management.",
          ],
        },
        {
          heading: "Technical Stack",
          paragraphs: [
            "Python for research and backtesting, with a focus on pandas, numpy, and custom implementations of statistical models. Currently learning more about production trading systems and infrastructure.",
          ],
        },
        {
          heading: "Current Projects",
          paragraphs: [
            "Building and testing mean-reversion strategies, studying volatility forecasting, and exploring factor models. Placeholder for specific project details and results.",
          ],
        },
      ],
    },
  },
  {
    id: "video-games",
    title: "Video Games",
    image: "assets/fields/video-games.jpg",
    imageAlt: "Video Games field",
    metadata: {
      lines: ["Playing", "Indie Games", "Genre", "Roguelikes", "Interest", "Game Design"],
    },
    detail: {
      template: "text-gallery",
      title: "Video Games",
      subtitle: "Interactive systems, emergent complexity.",
      sections: [
        {
          heading: "What I Play",
          paragraphs: [
            "I am drawn to games that are systems-first — roguelikes, strategy games, and anything with emergent complexity arising from simple rules. The kind of games where mastery comes from understanding structure, not memorizing sequences.",
            "Current favorites include Hades, Slay the Spire, Into the Breach, and various indie titles that prioritize mechanical depth over production value.",
          ],
        },
        {
          heading: "On Game Design",
          paragraphs: [
            "What makes a game system interesting is often the same thing that makes a mathematical structure interesting: constraints that force creativity, feedback loops that reward understanding, and emergent patterns that surprise even the designer.",
          ],
        },
      ],
      images: [
        { src: "assets/detail/video-games-01.png", alt: "Game screenshot placeholder one" },
        { src: "assets/detail/video-games-02.png", alt: "Game screenshot placeholder two" },
        { src: "assets/detail/video-games-03.png", alt: "Game screenshot placeholder three" },
      ],
    },
  },
  {
    id: "rock-music",
    title: "Rock Music",
    image: "assets/fields/rock-music.png",
    imageAlt: "Rock Music field",
    metadata: {
      lines: ["Listening", "Rock & Metal", "Playing", "Electric Guitar", "Favorites", "Progressive"],
    },
    detail: {
      template: "text-gallery",
      title: "Rock Music",
      subtitle: "Loud guitars, tight riffs, deliberate chaos.",
      sections: [
        {
          heading: "Listening",
          paragraphs: [
            "An ongoing collection of albums — mostly rock and metal, mostly loud, mostly featuring guitar work that rewards repeated listening. Progressive rock, math rock, and anything that treats time signatures as suggestions.",
            "Current rotation includes Tool, Dream Theater, Opeth, and a mix of modern progressive metal bands. The column on the right scrolls quietly; it is a shelf, not a grid.",
          ],
        },
        {
          heading: "Playing",
          paragraphs: [
            "I play electric guitar, currently working through challenging technical pieces and trying to understand what makes certain riffs memorable beyond their difficulty. The intersection of technique and taste.",
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
  {
    id: "other-interests",
    title: "Other Interests",
    image: "assets/fields/other-interests.jpg",
    imageAlt: "Other Interests field",
    metadata: {
      lines: ["Topics", "Computer Graphics", "AI Agents", "Hobbies", "Card Magic", "Speedcubing"],
    },
    detail: {
      template: "text",
      title: "Other Interests",
      subtitle: "A collection of pursuits outside the main tracks.",
      sections: [
        {
          heading: "Computer Graphics",
          paragraphs: [
            "The mathematics of rendering — ray tracing, shader programming, and the geometry of transformations. I am fascinated by how mathematical abstractions translate into visual results, and how real-time constraints shape algorithm design.",
            "Currently exploring WebGL and learning about modern graphics pipelines. This website itself is a small exercise in controlled visual states and transitions.",
          ],
        },
        {
          heading: "AI Agents & Systems",
          paragraphs: [
            "Interested in agent-based systems, multi-agent coordination, and the practical challenges of building AI systems that interact with real environments. Less about the hype, more about what actually works.",
          ],
        },
        {
          heading: "Card Manipulation & Magic",
          paragraphs: [
            "Practicing sleight-of-hand and card manipulation techniques. There is something meditative about perfecting a single move through hundreds of repetitions — precision as its own reward.",
          ],
        },
        {
          heading: "Speedcubing",
          paragraphs: [
            "Solving Rubik's cubes and similar puzzles. The combination of pattern recognition, muscle memory, and algorithmic thinking. Not competitive-level fast, but fast enough to appreciate the elegance of optimal solutions.",
          ],
        },
        {
          heading: "Cinema",
          paragraphs: [
            "Regular moviegoer with a preference for films that take structure seriously — whether that is narrative structure, visual composition, or sound design. The theater experience matters.",
          ],
        },
      ],
    },
  },
];

export function getFieldById(id: string): Field | undefined {
  return fields.find((field) => field.id === id);
}
