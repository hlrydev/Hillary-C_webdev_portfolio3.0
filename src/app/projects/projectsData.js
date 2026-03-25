export const PROJECTS = [
  {
    slug: "scribeverse",
    title: "Scribeverse",
    description: "A web app designed to be an all-in-one writing HQ.",
    fullDescription: `Designed to have the clean writing experience of Google docs (without fearing 
    losing your work or it being used to train AI) while remaining lightweight and easy to use, and 
    with the added bonus of being able to dive into community writing challenges and prompts comparable to the now extinct NaNoWriMo, organize 
    projects and books, Scribeverse is a web app designed to be an all-in-one writing HQ. 

    It has a simple and intuitive interface that allows writers to focus on their writing while also keeping 
    everything organized in one place. The web app includes features such as a built-in word count tracker, and 
    the ability to create and organize notes, chapters, books, and projects elements, as well as export in .docx, .epub, .rtf, 
    and .pdf formats, and separate fanfiction from original writing.

    With Scribeverse, writers can easily manage their projects, joing challenges, and stay motivated to achieve their writing goals.`,
    skills: ["Typescript", "Next.js", "Tailwind", "Supabase"],
    github: "https://github.com/hlrydev/scribeverse",
    website: "https://scribeverse.vercel.app/",
    images: [
      "/img/scribeverse/challenges_features.png",
      "/img/scribeverse/dashboard_feature_img.png",
      "/img/scribeverse/export_button.png",
      "/img/scribeverse/text_editor_feature.png",
      "/img/scribeverse/projects_books_dashboard_feature_img.png",
    ],
  },
  {
    slug: "kcahub",
    title: "KCAHub",
    description: "A web app designed for the K-Pop cover community.",
    fullDescription: `With over 100 sign ups in the first week of launch, KCAHub is a web app designed for the K-Pop cover community. Designed to be similar to K-Profiles but more interactive, KCAHub is a curated platform where you can discover KCAs filtered by gen and groups, with future features including a 1v1 KCA battle system and profile claiming.`,
    skills: ["Typescript", "Next.js", "Tailwind"],
    github: "",
    website: "https://kcahub.vercel.app/",
    images: ["/img/kcahub/signup.png"],
  },
  {
    slug: "request-a-fanfic",
    title: "requestafanfic.com",
    description: "The first ever fanfiction request platform.",
    fullDescription: `One of my many side quests is being a writer. And something 
    I've noticed is that there is no specific platform or website for a reader to 
    request a fanfiction from a writer. We have been using Tumblr mainly alongside other platforms, but it was about time we had a platform 
    dedicated to this since fanfiction culture is so big.

    This project is still in its early stages, but the idea is to have a simple and easy-to-use 
    platform where readers can post a request to a pool of writers for their fanfics to be written. 
    Multiple writers can take the requests, and return with an ao3 link of the fanfic once completed.`,
    skills: ["Typescript", "Next.js", "Tailwind", "Supabase"],
    github: null,
    website: null,
    images: [],
  },
  {
    slug: "gpa-calculator",
    title: "GPA Calculator",
    description: "A simple GPA calculator for students.",
    fullDescription: `A simple GPA calculator built with HTML, CSS, and JavaScript. It allows students 
    to calculate their current GPA based on their grades, and to calculate what grades they need to reach their 
    GPA goal based on how many courses they are taking in their next term.`,
    skills: ["CSS", "JavaScript", "HTML"],
    github: "https://github.com/hlrydev/gpa-calculator",
    website: "https://hlrydev.github.io/UoPeople_GPA_Calculator/",
    images: ["/img/gpa-calc/gpacalc.png"],
  },
  {
    slug: "ag-websites",
    title: "AG Brothers/AG Interpreters",
    description:
      "Websites and social media creation/managment for Canadian-based companies.",
    fullDescription: `Complete digital presence for a pair of Winnipeg companies: 
    built the landing pages (currently unavailable), created and managed their socal media 
    accounts, optimized their websites for search engines, and set up their 
    Google Business profiles. `,
    skills: [
      "WordPress",
      "Brizy",
      "CSS",
      "Meta Business Suite",
      "Google Business",
      "SEO",
    ],
    github: null,
    website: null,
    images: ["/img/ag/agbrothers.png", "/img/ag/aginterpreters.png"],
  },
  {
    slug: "agua-cuscatleca",
    title: "Agua Cuscatleca",
    description: "Landing page for a Salvadoran water distribution company.",
    fullDescription: `Responsive landing page for a Salvadoran water distribution company. The site features a clean, modern design with intuitive navigation and optimized performance for all devices.`,
    skills: ["HTML", "CSS", "JavaScript"],
    github: null,
    website: "https://aguacuscatleca.netlify.app/",
    images: ["/img/aguacuscatleca/website.png"],
  },
  {
    slug: "make-a-wish",
    title: "Make A Wish",
    description:
      "Interactive web page where a user clicks the screen to create a star.",
    fullDescription: `Another of my side quests is being a music artist. I made this as a small, fun, side project for my fans. 
    The page features an interactive starfield that responds to user clicks, creating a magical 
    experience. I did not end up sharing it with my fans due to the lagging performance after 
    a certain amount of stars.`,
    skills: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/hlrydev/Make_A_Wish",
    website: "https://hlrydev.github.io/Make_A_Wish/",
    images: ["/img/makeawish/makeawish.png"],
  },
  {
    slug: "discord-bots",
    title: "Discord Bots",
    description:
      "Quokkabot, Llamabot, Chickbot: A trio of fun Discord bots based on the boygroup Stray Kids.",
    fullDescription: `Trio of Stray Kids-themed, Python-based Discord bots capable of engaging with
    users through interactive commands, games like Magic 8-ball, and music streaming
    features. These bots respond to user inputs in real time and even interact with each other.
    
    Note: While I'm not actively using Python at the moment and this project is dated back to 2021,
    I'm able to explain some of the project's logic and am open to revisiting or refreshing my knowledge if needed.`, // add this
    skills: ["Python", "Discord.py"],
    github: "https://github.com/hlrydev/Discord-Skz-bots",
    website: null,
    images: ["/img/discordbots/discordbots.png"],
  },
];
