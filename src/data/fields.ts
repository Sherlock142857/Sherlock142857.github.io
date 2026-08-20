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
    id: "video-games",
    title: "Video Games",
    image: "assets/fields/video-games.jpg",
    imageAlt: "Video Games field",
    metadata: {
      lines: [
        "More than Relaxation",
        "FromSoftware",
        "Death Stranding",
        "Other Favorites",
        "Physical Collecting",
      ],
    },
    detail: {
      template: "text-gallery",
      title: "Video Games",
      subtitle: "Interactive systems, emergent complexity.",
      sections: [
        {
          heading: "More than Relaxation",
          paragraphs: [
            "For me, playing games is about much more than just relaxing. More often than not, it is a way to experience entirely different worlds in the most comprehensive way possible, allowing me to live out countless different lives within our limited time.",
          ],
        },
        {
          heading: "FromSoftware",
          paragraphs: [
            "FromSoftware’s games are always fascinating yet dangerous. What captivates me the most is their incredible environmental design and how meticulously they polish the exploration experience.",
            "Their artists have a deeply imaginative way of expressing architectural structures. They often break the laws of physics to create breathtaking, monumental buildings, pushing medieval darkness, decay, and grotesque beauty as far as their imagination allows.",
            "When it comes to exploration, they are masters at guiding you through subtle environmental details. Yet, at the same time, the game constantly reminds you that you are in a harsh and cruel world. You have to observe, get lost, fail, and eventually learn to survive, making every discovery feel incredibly rewarding.",
          ],
        },
        {
          heading: "Death Stranding",
          paragraphs: [
            "Hideo Kojima’s Death Stranding offers a completely different kind of experience, but I love it just as much.",
            "Instead of just using \"connection\" as a narrative theme, Kojima turns it into something you actually experience. Through asynchronous multiplayer, shared structures, and small acts of kindness like leaving a ladder or giving a \"like,\" strangers can help each other without ever meeting face-to-face. You don’t just hear that people are connected—you truly feel it.",
            "That is what makes the game so special to me. It takes an abstract idea about human connection and turns it into a real, rewarding mechanic, making the simple act of helping a stranger feel incredibly meaningful.",
          ],
        },
        {
          heading: "Other Favorites",
          paragraphs: [
            "I also love The Last of Us Part I, Gran Turismo, Stellar Blade, and a number of smaller independent games such as Balatro and What Remains of Edith Finch. They are very different games, but they all carry a strong authorial vision. Whether it’s through unique gameplay mechanics, striking art styles, gripping narratives, or beautiful music, each of them offers me a truly unique and memorable experience.",
          ],
        },
        {
          heading: "Physical Collecting",
          paragraphs: [
            "The more abstract and digital my academic life becomes, the more I find myself drawn to tangible things in everyday life. To explain why I start collecting physical games and CDs, I want to borrow a quote from Hideo Kojima that resonates deeply with me.",
            "\"Eventually, even digital data itself will become something that individuals can no longer own independently. If some major change or accident were to occur in the world—whether involving nations, governments, ideologies, or social trends—it could suddenly become impossible to access that data. I would no longer be free to access the many films, books, and pieces of music I have loved. I would become one of those who possess nothing. That frightens me. This isn’t about materialism or the desire to own things.\"",
          ],
        },
      ],
      images: [
        {
          src: "assets/detail/video-games-01.png",
          alt: "Game screenshot placeholder one",
        },
        {
          src: "assets/detail/video-games-02.png",
          alt: "Game screenshot placeholder two",
        },
        {
          src: "assets/detail/video-games-03.png",
          alt: "Game screenshot placeholder three",
        },
      ],
    },
  },

  {
    id: "rock-music",
    title: "Rock Music",
    image: "assets/fields/rock-music.png",
    imageAlt: "Rock Music field",
    metadata: {
      lines: [
        "What I Listen For",
        "Favorite Band & Album",
        "The Artist's Signature",
      ],
    },
    detail: {
      template: "text-gallery",
      title: "Rock Music",
      subtitle: "Attitude, atmosphere, and a unique way of seeing the world.",
      sections: [
        {
          heading: "What I Listen For",
          paragraphs: [
            "Rock music is another way for me to encounter worlds created by other people.",
            "To me, rock is not only about heavy guitars, distortion, or turning up the volume. What truly draws me in is the attitude behind it—the willingness to speak up about society, alienation, politics, memory, love, or simply the beautiful, strange feeling of just being alive.",
          ],
        },
        {
          heading: "Favorite Band & Album",
          paragraphs: [
            "My favorite band is undoubtedly Pink Floyd, and Wish You Were Here is the album I find myself returning to the most.",
            "What I love so much about Pink Floyd is that their music rarely feels like just a collection of songs. Instead, it feels like an atmosphere, a conversation, or even a vast landscape. The sound is completely inseparable from the ideas behind it.",
          ],
        },
        {
          heading: "The Artist's Signature",
          paragraphs: [
            "I think my taste in music is ultimately very similar to what I look for in video games and films.",
            "A piece of music becomes so much more interesting to me when I can truly feel the person behind it—a very personal, specific way of seeing the world, expressed entirely through sound.",
          ],
        },
      ],
      images: [
        {
          src: "assets/detail/wishyouwerehere.jpg",
          alt: "Album cover placeholder one",
        },
        {
          src: "assets/detail/okcomputer.jpg",
          alt: "Album cover placeholder two",
        },
        {
          src: "assets/detail/thewall.jpg",
          alt: "Album cover placeholder three",
        },
        {
          src: "assets/detail/gunsnroses.jpg",
          alt: "Album cover placeholder three",
        },
      ],
    },
  },

  {
    id: "other-interests",
    title: "Other Interests",
    image: "assets/fields/other-interests.png",
    imageAlt: "Other Interests field",
    metadata: {
      lines: [
        "Computer Graphics",
        "AI Agents",
        "Cinema",
        "Fingertip Hobbies",
      ],
    },
    detail: {
      template: "text",
      title: "Other Interests",
      subtitle: "A collection of pursuits outside the main tracks.",
      sections: [
        {
          heading: "",
          paragraphs: [
            "This is probably the most 'work-in-progress' part of my website. Some of these interests have stuck with me for years, while others are recent fascinations that might fade away in a few months.",
          ],
        },
        {
          heading: "Computer Graphics",
          paragraphs: [
            "My fascination with computer graphics grew naturally out of my love for video games. I found myself wondering how the worlds I spent so much time exploring were actually built beneath the surface. It is amazing to dive into the geometry, rendering, simulation, and all the underlying math that magically turns lines of code into breathtaking visuals.",
          ],
        },
        {
          heading: "AI Agents",
          paragraphs: [
            "I have also been really curious about AI agents lately, particularly the idea of building an RPG system driven entirely by Large Language Models (LLMs). For me, the exciting question isn't just whether an AI can roleplay a character, but whether a network of these language-driven systems can actually simulate a world that feels persistent, truly responsive, and alive.",
          ],
        },
        {
          heading: "Cinema",
          paragraphs: [
            "Cinema is another form of immersion I deeply enjoy. There is something incredibly special about sitting in a dark theater, putting away my phone, and giving a film my undivided attention for a few hours. That sense of isolation is a beautiful part of the experience.",
            "To get the ultimate immersive experience, I even made the trip to authentic IMAX GT screens three times: watching Dune: Part Two at the China National Film Museum in Beijing, F1 at the Shenyang Science Center, and Avatar 3 at the AMC Metreon 16 in San Francisco.",
          ],
        },
        {
          heading: "Fingertip Hobbies",
          paragraphs: [
            "I have always enjoyed keeping my hands busy. I have been playing with Rubik's cubes since I was a kid, but more recently, I've fallen down the rabbit hole of card magic and sleight of hand. There is something deeply satisfying about understanding and manipulating these tiny, intricate systems right at my fingertips.",
          ],
        },
        {
          heading: "",
          paragraphs: [
            "Who knows? Some of these curiosities might eventually grow into serious projects, and some probably won't.",
            "And that is completely fine. Not everything we do in life has to be 'useful'.",
          ],
        },
      ],
    },
  },

  {
        id: "mathematics",

    title: "Mathematics",

    image: "assets/fields/mathematics.jpg",

    imageAlt: "Mathematics field",

    metadata: {
      lines: ["Beginnings", "At University", "Favourite Theorem & Course", "Full Circle"],
    },

    detail: {

      template: "text",

      title: "Mathematics",

      subtitle: "The language of the universe.",

      sections: [

        {

          heading: "Beginnings",

          paragraphs: [

            "My relationship with mathematics began in high school, when I started taking part in mathematical olympiad competitions. What drew me in at first was simply problem solving. I liked the feeling of being given a problem that seemed difficult or unfamiliar, and then gradually finding a way through it. Over time, that interest in solving problems grew into something deeper: I began to appreciate the beauty of mathematics itself, and the way a simple idea could lead to something unexpectedly rich.",

            "I eventually failed to achieve the results I had hoped for in those competitions. But that experience did not make me lose interest in mathematics. The competitions ended, but my curiosity about mathematics remained. In retrospect, the failure mattered much less than the fact that I had found something I genuinely enjoyed learning.",

          ],

        },

        {

          heading: "At University",

          paragraphs: [

            "At Fudan, mathematics gradually opened up into a much more fascinating world. It was no longer just a collection of problems to solve, but a language built from structures, definitions, and relationships. I came to see that this very ability—to unify diverse ideas through a handful of elegant principles—is what makes mathematics so profoundly beautiful.",

            "This is probably why I care so much about mathematical beauty. Mathematics is, in a sense, the language of the universe. What fascinates me is not only its ability to describe the world, it is also that mathematics can develop structures that are beautiful in their own right, sometimes long before we know what they might be useful for.",

          ],

        },

        {

          heading: "Favourite Theorem & Course",

          paragraphs: [

            "My favourite theorem is the Prime Number Theorem. Prime numbers arise from some of the most elementary questions about integers and divisibility, yet they lead to a remarkably deep question: how are the primes distributed among all integers? What I find astonishing is that this discrete and seemingly simple question eventually leads to a precise law of density, expressed through the natural logarithm. There is something deeply appealing about how a simple object can conceal such a rich pattern.",

            "My favourite course has been topology, which gave me a different way of thinking about structure. I liked the process of gradually setting aside what is superficial and asking what actually remains. The most striking moment for me was the introduction of the fundamental group. It showed me how a geometric object can have an algebraic structure hidden inside it, and how geometry and algebra can illuminate each other in a very natural way.",

          ],

        },

        {

          heading: "Full Circle",

          paragraphs: [

            "There is also a small piece of symmetry in my mathematical life that I find interesting. Years after my unsuccessful experience with mathematical competitions in high school, I went to UC Berkeley as an exchange student and found myself sitting in another competition room, this time for the Putnam. I ended up in the top 100, and Berkeley's team received an Honorable Mention, ranked 6–10.",

            "The result itself is not particularly important to me. What stayed with me was the realization that mathematics had never really been about winning or losing a competition. The competitions were only where the story began. What remained was a lasting interest in mathematics as a way of seeing patterns, uncovering structure, and understanding the world through its own language.",

          ],

        },

      ],

    },

  },

  {
    id: "deep-learning",

    title: "Deep Learning",

    image: "assets/fields/deep-learning.jpg",

    imageAlt: "Deep Learning field",

    metadata: {
      lines: ["Curiosity about LLMs", "Mathematical Structures", "Skepticism", "Research"],
    },

    detail: {

      template: "text",

      title: "Deep Learning",

      subtitle: "Learning the underlying structure of data.",

      sections: [

        {

          heading: "Curiosity about LLMs",

          paragraphs: [

            "I first started learning deep learning because I was curious about how large language models actually work. The idea that a model could learn to understand and generate language from large amounts of data felt very different from the algorithms I had encountered before.",

            "My first experiment was much simpler: training a small neural network on MNIST to recognize handwritten digits. It was a simple project, but it gave me an important first impression of deep learning. Instead of writing down the rules for how a problem should be solved, I was giving the model data and letting it discover the useful patterns on its own. It felt like a completely different way of thinking about algorithms.",

          ],

        },

        {

          heading: "Mathematical Structures",

          paragraphs: [

            "LLMs were what initially brought me much deeper into deep learning, but they were not what made me stay. As I learned more, I became increasingly interested in the mathematical structures underneath these models: probability, geometry, continuous dynamics, and the ways complicated transformations can be described through relatively simple ideas.",

            "I became especially interested in diffusion models and flow matching. I like the connection between generative modeling and stochastic or ordinary differential equations, where a complicated generation process can be viewed as a trajectory in a data space. There is something satisfying about seeing a distribution gradually transform into another through a process that can be described so cleanly.",

          ],

        },

        {

          heading: "Skepticism",

          paragraphs: [

            "That interest also comes with some skepticism. More complicated models do not necessarily mean better understanding. A model can perform extremely well while still being difficult to interpret, and performance alone does not tell us exactly what structure it has learned.",

            "This is part of what keeps me interested in deep learning. I care about what these models can do, but I am also curious about why they work, what they are really learning, and how much of that we can understand.",

          ],

        },

        {

          heading: "Research",

          paragraphs: [

            "My research experience has given me the chance to look at deep learning from several different angles. In one project, I explored using discrete diffusion models to solve the Quadratic Assignment Problem. In another project, I worked on using flow matching models to generate fast neural network adversarial attacks. I also had an internship working on quantitative deep learning models.",

            "Across these projects, I became more familiar with different parts of the deep learning pipeline, from model design and training to optimization and evaluation. More importantly, they helped me see deep learning as a broad field with many different ways to approach many different questions.",

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
      lines: ["Why Quant", "Experience & Lessons", "Interpretability", "Current Work"],
    },

    detail: {

      template: "text",

      title: "Quant Research",

      subtitle: "Turning ideas into testable signals.",

      sections: [

        {

          heading: "Why Quant",

          paragraphs: [

            "Quantitative research is one of the places where my interests in mathematics, statistics, and machine learning come together with a very unforgiving environment.",

            "A financial market does not care whether an idea is elegant. It does not care whether a model is fashionable, theoretically interesting, or technically sophisticated. It gives you noisy observations and asks a much simpler question: is there actually something there?",

            "That is part of what attracts me to the field. I like the idea that a hypothesis can be turned into something concrete, tested against data, and ultimately judged by evidence.",

          ],

        },

        {

          heading: "Experience & Lessons",

          paragraphs: [

            "I previously had an internship in quantitative research, where I worked on using deep learning to build stock-selection models from alpha signals. It was a useful experience, but perhaps more importantly, it made me more cautious about machine learning rather than less.",

            "In a research environment, it is easy to become fascinated by a sophisticated model and gradually let complexity stand in for evidence. In finance, that can become a problem very quickly.",

            "I have become increasingly interested in questions such as: What exactly is a model learning? Which information is actually driving its predictions? How much of its apparent performance is robust, and how much is an artifact of the data or the research process?",

            "I have not fully answered these questions yet, but I have come to believe that they matter more than simply designing a fancier model.",

          ],

        },

        {

          heading: "Interpretability",

          paragraphs: [

            "This is why I care about interpretability. Not because every model needs to be simple, but because I want to have some idea of what I am trusting. For me, quant research is more about building a process through which ideas can be tested, questioned, rejected, and improved.",

            "I am also exploring statistical and machine learning methods that often seem much simpler, rather than trying to solve every problem by putting it into a neural network.",

          ],

        },

        {

          heading: "Current Work",

          paragraphs: [

            "I am currently building my own quantitative research system. It is still very much a work in progress, which is probably the most honest description of it.",

            "But there is one requirement I am quite certain about: I need to understand what I am actually doing.",

          ],

        },

      ],

    },

  },

];

export function getFieldById(id: string): Field | undefined {
  return fields.find((field) => field.id === id);
}
