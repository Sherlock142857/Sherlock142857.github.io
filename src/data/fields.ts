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
          heading: "Origins",
          paragraphs: [
            "I am from Wuxi, Jiangsu, China, and currently study Mathematics at Fudan University.",
            "I have always been drawn to things that are difficult to explain in a single sentence: a beautiful proof, a strange landscape, a game world that feels almost physically real, a piece of music that seems to contain an entire era. I care a great deal about aesthetics, but not only in the conventional sense. I like structure, immersion, and things made with a strong sense of authorship. I am also somewhat suspicious of words like *efficient*, *advanced*, and *modern* when they are used as substitutes for understanding.",
          ],
        },
        {
          heading: "Places",
          paragraphs: [
            "I have been fortunate to spend time in places very different from home, from Qinghai Lake and Hangzhou to Kyoto, Kobe, San Francisco, Yosemite, Las Vegas, and New York. They are very different places, but travelling has always been less about collecting destinations for me than about seeing how differently the world can look.",
          ],
        },
        {
          heading: "",
          paragraphs: [
            "The rest of this website is probably a better description of who I am than this page could ever be.",
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
          heading: "Beginnings",
          paragraphs: [
            "My relationship with mathematics began in high school, through mathematical olympiad competitions. At the time, I was fascinated by the feeling that a small set of axioms and a few lines of reasoning could lead somewhere completely unexpected.",
            "I was not particularly good at the competitions, though. In fact, I did quite badly, and the result became one of the more memorable failures of my teenage years. For a while, it felt almost paradoxical: the thing that had made me fall in love with mathematics was also the thing at which I had failed so conspicuously.",
            "What turned out to be more important was that the failure did not make me stop.",
          ],
        },
        {
          heading: "At Fudan",
          paragraphs: [
            "At Fudan, mathematics gradually became something different. It was no longer just about solving problems under time pressure. I began to see it as a world of structures, where definitions accumulate into theories and seemingly unrelated objects turn out to be connected by a surprisingly small number of ideas.",
            "This is probably why I care so much about mathematical beauty. Mathematics is, in a sense, the language of the universe, but what fascinates me is not simply its ability to describe reality. It is that mathematics can contain structures that are beautiful before they are useful, and sometimes before we even know what they are useful for.",
          ],
        },
        {
          heading: "The Prime Number Theorem",
          paragraphs: [
            "My favorite theorem is the Prime Number Theorem. Prime numbers arise almost inevitably from the most elementary questions about counting and divisibility. They are a very particular structure inside the integers, and the ordering of the integers gives us the possibility of asking a statistical question: how densely are the primes distributed?",
            "What I find astonishing is where that question leads. Something as discrete and elementary as prime numbers eventually gives rise to a precise law of density, and that law is expressed through the natural logarithm. There is something almost unreasonable about the fact that such simple objects can hide such a deep pattern.",
          ],
        },
        {
          heading: "Topology",
          paragraphs: [
            "My favorite course has been topology. I liked the feeling of gradually removing everything that was superficial and asking what remained. Objects that look completely different can become the same under the right notion of equivalence. It is one of those subjects where abstraction does not feel like a loss of information, but a way of seeing more clearly.",
          ],
        },
        {
          heading: "Full Circle",
          paragraphs: [
            "There is also one small piece of symmetry in my mathematical life that I find amusing.",
            "Years after that unsuccessful experience with mathematical competitions in high school, I went to UC Berkeley as an exchange student and found myself sitting in another competition room, this time for the Putnam. I somehow ended up in the top 100, and Berkeley's team received an Honorable Mention, ranked 6–10.",
            "The result itself is not particularly important to me. What I remember more vividly is the fact that, after all those years, I had somehow returned to the same place where the story had once seemed to end.",
            "Perhaps mathematics is one of the few things I can stay interested in without needing it to become practical.",
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
          heading: "First Impressions",
          paragraphs: [
            "My first encounter with neural networks was almost comically simple: MNIST, a small neural network, and handwritten digits.",
            "I remember being impressed less by its elegance than by its violence. Give the model enough examples, apply backpropagation, adjust millions of little numbers, and somehow it learns to recognize what looks like a perfectly familiar object to a human being.",
            "It felt strangely brute-force.",
          ],
        },
        {
          heading: "Mathematical Structures",
          paragraphs: [
            "LLMs were what initially brought me much deeper into deep learning, but they were not what made me stay. The part I became most interested in was the mathematics underneath the models: probability, geometry, continuous dynamics, and the way complicated transformations can sometimes be described through surprisingly clean structures.",
            "This is especially true for diffusion models and flow matching. I find the connection between probability and SDEs or ODEs aesthetically pleasing in a way that is difficult to describe purely in terms of performance. There is something satisfying about replacing a complicated generative process with a trajectory through a mathematical space and watching a distribution gradually become another.",
            "In that sense, my interest in deep learning has gradually moved from \"this is an incredibly powerful technology\" toward \"there is something beautiful happening underneath it.\"",
          ],
        },
        {
          heading: "Skepticism",
          paragraphs: [
            "That admiration also comes with some skepticism. I am not particularly convinced that increasingly complicated models automatically give us increasingly meaningful answers. A model can work remarkably well while remaining difficult to understand, and performance alone does not tell us what structure it has actually learned.",
            "I am therefore interested in deep learning both because of what it can do and because I am not entirely convinced that we understand why it works as well as it sometimes does.",
          ],
        },
        {
          heading: "Research",
          paragraphs: [
            "[Research projects to be added]",
          ],
        },
      ],
    },
  },
  {
    id: "quantitative-research",
    title: "Quant Research",
    image: "assets/fields/quantitative-research.jpg",
    imageAlt: "Quant Research field",
    metadata: {
      lines: ["Interest", "Quantitative", "Focus", "Statistical Arbitrage", "Tools", "Python"],
    },
    detail: {
      template: "text",
      title: "Quant Research",
      subtitle: "Markets, models, and statistical edge.",
      sections: [
        {
          heading: "Why Quant",
          paragraphs: [
            "Quantitative research is one of the places where my interests in mathematics, statistics, machine learning, and computation collide with a very unforgiving environment.",
            "A financial market does not care whether an idea is elegant. It does not care whether a model is fashionable, theoretically interesting, or technically sophisticated. It only gives you noisy observations and asks whether there is actually something there.",
            "That is part of what attracts me to the field.",
          ],
        },
        {
          heading: "Experience & Lessons",
          paragraphs: [
            "I previously spent some time working in quantitative research, where I used deep learning to build stock-selection models from alpha signals. It was a useful experience, but perhaps more importantly, it made me more skeptical of machine learning rather than less.",
            "In a research environment, it is easy to become fascinated by a sophisticated model and then quietly let complexity stand in for evidence. In a financial environment, that habit becomes dangerous very quickly.",
            "I have become increasingly interested in questions such as: What exactly is a model learning? Which information is actually responsible for its predictions? How much of its apparent performance is robust, and how much is an artifact of the data or the research process?",
          ],
        },
        {
          heading: "Interpretability",
          paragraphs: [
            "This is why I care about interpretability. Not because every model needs to be simple, but because I want to have some idea of what I am trusting.",
            "For me, quant research is less about finding a magical model and more about building a process through which ideas can be tested, questioned, rejected, and improved.",
          ],
        },
        {
          heading: "Current Work",
          paragraphs: [
            "I am currently building my own quantitative research system. It is still very much a work in progress, which is probably the most honest description of it.",
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
          heading: "Immersion",
          paragraphs: [
            "Games are probably my most important way of resting.",
            "I like them because they allow me to spend a few hours inside a world that someone else imagined in extraordinary detail. A good game does not simply tell me about a place. It makes me inhabit it.",
            "This is one reason I am especially drawn to games with a strong sense of authorship.",
          ],
        },
        {
          heading: "FromSoftware",
          paragraphs: [
            "I love FromSoftware's games, especially *Dark Souls III* and *Elden Ring*. What fascinates me is not simply their difficulty, but how uncompromisingly the entire world is designed around a particular aesthetic.",
            "Their artists seem willing to push medieval darkness, grotesque forms, monumental architecture, decay, beauty, and absurdity as far as their imagination allows. The maps are designed with remarkable precision, and the difficulty is not softened simply to make the experience more convenient.",
            "That lack of compromise matters.",
            "Exploration becomes meaningful precisely because the world does not constantly reassure you. You have to look, remember, get lost, fail, and eventually understand the place you are in. The difficulty is therefore not just a mechanical challenge. It becomes part of the atmosphere of the world itself.",
          ],
        },
        {
          heading: "Death Stranding",
          paragraphs: [
            "Hideo Kojima's *Death Stranding* is almost the opposite kind of experience, but I love it for a related reason.",
            "The central idea of connection could easily have remained a narrative theme. Instead, Kojima turns it into a system that the player actually experiences. Asynchronous multiplayer, shared structures, likes, and small acts of help allow strangers to leave something useful behind for one another without ever directly meeting.",
            "You do not merely hear that people are connected. You feel it.",
            "That is what I find remarkable about *Death Stranding*: it turns an abstract idea about human connection into a concrete game mechanic, and somehow makes the simple act of helping an unknown player feel genuinely rewarding.",
          ],
        },
        {
          heading: "Other Favorites",
          paragraphs: [
            "I also love *The Last of Us Part I*, *Gran Turismo 7*, *Stellar Blade*, and a number of smaller independent games such as *Balatro* and *What Remains of Edith Finch*. They are very different games, but each has something I value: a strong visual identity, elegant mechanics, an unusual perspective, or simply a world that feels deliberately made.",
          ],
        },
        {
          heading: "Physical Collecting",
          paragraphs: [
            "Recently, I have also started collecting physical game copies.",
            "This is not really about nostalgia, nor is it about collecting for the sake of having more things. I increasingly find the idea of physically owning the things I love strangely comforting in a world where almost everything has become a subscription, a service, or a server somewhere.",
            "The more abstract and digital my academic life becomes, the more I find myself drawn to tangible things in everyday life.",
            "Perhaps that is one reason I like both games and music in physical form. Data is convenient. Objects have presence.",
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
          heading: "What I Listen For",
          paragraphs: [
            "Rock music is another way I encounter worlds created by other people.",
            "I do not listen to rock simply for the guitars, distortion, or volume. What interests me more is the attitude behind it: the willingness to say something about society, alienation, politics, memory, or simply the strange feeling of being alive.",
          ],
        },
        {
          heading: "Pink Floyd",
          paragraphs: [
            "My favorite band is Pink Floyd, and *Wish You Were Here* is probably the album I return to most often.",
            "What I love about Pink Floyd is that the music rarely feels like a collection of songs. It feels like an atmosphere, an argument, or sometimes an entire landscape. The sound is inseparable from the ideas behind it.",
          ],
        },
        {
          heading: "The Collection",
          paragraphs: [
            "I have also spent a lot of time with records by The Beatles, Guns N' Roses, Eagles, Led Zeppelin, Radiohead, Oasis, King Crimson, Nirvana, AC/DC, and many others.",
            "My taste is not particularly systematic. Some albums are there because of their musicianship, some because of their atmosphere, and some simply because they stayed with me for no especially rational reason.",
          ],
        },
        {
          heading: "Authorship",
          paragraphs: [
            "I think this is ultimately similar to what I look for in games and films.",
            "A piece of music is more interesting to me when I can feel the person behind it: a particular way of seeing the world, expressed through sound.",
            "I like things with authorship.",
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
          heading: "",
          paragraphs: [
            "This is probably the least finished part of this website.",
            "Some interests have lasted for years; others appeared only recently and may disappear again in a few months. I like that distinction, so I am leaving some things here in an unfinished state.",
          ],
        },
        {
          heading: "Computer Graphics",
          paragraphs: [
            "Computer graphics is one of them. I became interested in it through games and gradually started wondering how the worlds I spend so much time exploring are actually constructed underneath the surface: geometry, rendering, simulation, and all the mathematics that turns code into something visual.",
            "My C++ is not yet good enough to make this as easy as I would like, which is probably a project in itself.",
          ],
        },
        {
          heading: "AI Agents",
          paragraphs: [
            "I am also interested in AI agents, especially the possibility of building an RPG system driven by LLMs. The question that interests me is not simply whether an LLM can play a character, but whether a collection of language-driven systems can create a world that feels persistent, responsive, and alive.",
          ],
        },
        {
          heading: "Cinema",
          paragraphs: [
            "Cinema is another form of immersion I enjoy. I like sitting in a dark theater, putting away everything else, and giving a film my full attention for a couple of hours. The isolation is part of the experience.",
          ],
        },
        {
          heading: "Small Systems",
          paragraphs: [
            "I also occasionally become obsessed with things that are much less serious: card tricks, Rubik's cubes, and similar little systems that are satisfying to understand and manipulate.",
            "And I want to learn electric guitar.",
          ],
        },
        {
          heading: "",
          paragraphs: [
            "Some of these interests may eventually become serious projects. Some probably will not.",
            "That is fine. Not everything needs to become useful.",
          ],
        },
      ],
    },
  },
];

export function getFieldById(id: string): Field | undefined {
  return fields.find((field) => field.id === id);
}
