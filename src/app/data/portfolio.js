/**
 * ╔══════════════════════════════════════════════════════╗
 * ║  PORTFOLIO DATA — edit this file to update content  ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * All personal content lives here. Components read from
 * this file so you never need to touch component code.
 */

// ── Personal info ────────────────────────────────────────
export const PERSONAL = {
  name: "Jatin Dahiya",
  website: "https://jatindahiya.com",
  email: "jatindahiya027@gmail.com",
  location: "Delhi NCR",
  role: "Software & systems engineer",
  heroLines: ["Software.", "Thoughtfully built."],
  heroDescription:
    "I’m Jatin, a software engineer turning complex problems into thoughtful digital experiences.",
  bio: "Oracle Siebel CRM Developer at Upsource GCC by day. Turning ideas into useful products after hours.",
  heroImageDesktop: "/portrait.webp",
  photo: "/me2.webp",
  resume: "/resume.pdf", // place your PDF in /public/resume.pdf
};

// ── Page sections ────────────────────────────────────────
// Add or rename a section here to update desktop navigation,
// mobile navigation, and the active-section indicator together.
export const SECTIONS = [
  { id: "work", label: "Work", indicatorLabel: "Selected work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience", inNav: false },
  { id: "capabilities", label: "Capabilities", inNav: false },
  { id: "contact", label: "Contact" },
];

// All section copy is editable here, alongside your personal details.
export const COPY = {
  greeting: "Hello.",
  greetingNote: "Good to have you here.",
  workHeading: "Selected work",
  workIntro:
    "Independent projects, built from the first idea to the final detail.",
  aboutHeading: "An engineer’s mind.\nA maker’s instinct.",
  aboutBody:
    "I work across web, desktop, and applied AI, following an idea wherever it takes me. I care about the **systems underneath**, the **details on the surface**, and how it all feels to use.",
  aboutNote:
    "Outside my day job, you’ll find me building local-first tools, experimenting with interfaces, and learning by making.",
  experienceHeading: "Where I’ve been",
  capabilitiesHeading: "Tools of the trade",
  writingHeading: "Notes along the way",
  writingIntro: "On software, side projects, and things learned by doing.",
  contactHeading: "Let’s make it happen.",
};

// ── First-visit greeting sequence ───────────────────────
// Keep these in left-to-right scripts so the intro remains visually stable.
// The complete sequence fits inside the existing greeting hold time.
export const GREETINGS = [
  { language: "English", code: "en", text: "Hello." },
  { language: "Spanish", code: "es", text: "Hola." },
  { language: "Hindi", code: "hi-Latn", text: "Namaste." },
  { language: "Japanese", code: "ja-Latn", text: "Konnichiwa." },
];

// ── Profile — education rows ─────────────────────────────
export const EDUCATION = [
  {
    institution: "LNM Institute of Information Technology",
    location: "Jaipur, India",
    period: "2019 – 2023",
    degree: "B.Tech, Computer Science & Technology",
  },
];

// ── Profile — languages ──────────────────────────────────
export const LANGUAGES = [
  { name: "Hindi", level: "Native" },
  { name: "English", level: "Professional" },
];

// ── Profile — work experience ────────────────────────────
export const EXPERIENCE = [
  {
    title: "Developer",
    company: "Upsource GCC",
    location: "Remote, India",
    period: "Dec 2025 – Present",
  },
  {
    title: "Systems Engineer",
    company: "TCS",
    location: "Hyderabad, India",
    period: "Dec 2023 – Nov 2025",
  },
  {
    title: "Systems Developer Intern",
    company: "Atthah Info Media Pvt. Ltd.",
    location: "Gurugram",
    period: "Jun 2022 – Aug 2022",
  },
];

// ── Capabilities ─────────────────────────────────────────
// Add/remove groups or items here. The tabs and panels resize automatically.
export const CAPABILITIES = [
  {
    name: "Professional",
    items: ["Oracle Siebel CRM", "Oracle SQL", "JavaScript"],
  },
  {
    name: "Interfaces",
    items: ["React", "Next.js", "JavaScript", "HTML", "CSS"],
  },
  { name: "Systems", items: ["Java", "Electron.js", "Node.js", "SQLite"] },
  {
    name: "Applied AI",
    items: ["Python", "PyTorch", "Ollama", "AI embeddings"],
  },
  {
    name: "Exploration",
    items: ["Unity 3D", "Local-first software", "Data visualization"],
  },
];

// ── Projects ─────────────────────────────────────────────
// Add/remove objects to add/remove projects.
// To add a project, add one object here. The homepage, project route,
// sitemap, numbering, next-project link, and image gallery update automatically.
// All projects use the same reusable artboard. Supply any number of images.
// Each image can be a path or { src, alt, caption }.
// Optional links: github, url (live site), and links: [{ label, href }].
export const PROJECTS = [
  {
    id: "stag",
    name: "Stag",
    discipline: "Desktop / Local-first / AI search",
    statement: "A private reference library that stays on your machine.",
    icon: "/icon.webp",
    thumbnail: "/Stag.webp",
    url: "", // Optional live project URL
    github: "https://github.com/jatindahiya027/Stag",
    stack: [
      "ELECTRON.JS",
      "TYPESCRIPT",
      "REACT",
      "NODE.JS",
      "VITE",
      "ZUSTAND",
      "SQLITE",
      "FTS5",
      "OLLAMA",
      "PYTHON",
      "PYTORCH",
      "TRANSFORMERS",
      "FAISS",
      "HUGGING FACE",
      "TIPSV2",
      "DINOV3",
      "THREE.JS",
      "SHARP",
      "FFMPEG",
      "PDF.JS",
      "EPUB.JS",
      "CODEMIRROR",
      "CSS MODULES",
      "WEBASSEMBLY",
      "WEBGL",
    ],
    images: [
      "/stagimg (1).webp",
      "/stagimg (2).webp",
      "/stagimg (3).webp",
      "/stagimg (4).webp",
      "/stagimg (5).webp",
      "/stagimg (6).webp",
    ],
    description:
      "Stag is a local-first desktop application for organizing creative reference files, inspiration, and media assets in one searchable workspace. Built with Electron, Stag helps designers, artists, collectors, and creative teams manage images, videos, documents, design files, and web downloads without depending on cloud storage. It combines fast local browsing, rich metadata, thumbnail previews, tagging, folders, AI-assisted search, and automation tools to make large reference libraries easier to explore and maintain.",
    features: [
      {
        title: "Smart Organization",
        detail:
          " Import and manage images, videos, audio, documents, fonts, 3D files, URL links, and design assets in one place.",
      },
      {
        title: "Web Download Capture",
        detail:
          " Use Browser Extensions to capture web downloads directly into your library.",
      },
      {
        title: "Automatic Previews",
        detail:
          " Generate thumbnails for images, videos, PDFs, EPUBs, 3D files, and other supported formats.",
      },
      {
        title: "AI Search & Tagging",
        detail:
          " Find assets with natural language, visual search and generate local AI-powered tags and descriptions.",
      },
      //{ title: "Web Capture & Copy Workflow",    detail: "Import web downloads automatically and optionally copy files into a managed local library folder." },
      {
        title: "Local-First Control",
        detail:
          "Store metadata, thumbnails, AI indexes, settings, and logs locally, with sensitive content filtering built in.",
      },
    ],
  },
  {
    id: "mycart",
    name: "MyCart",
    discipline: "Web / Scraping / Price intelligence",
    statement: "One place to watch prices across the stores you already use.",
    icon: "/mycart1.webp",
    thumbnail: "/mycart.webp",
    url: "", // Optional live project URL
    github: "https://github.com/jatindahiya027/MyCart",
    stack: [
      "Next.js",
      "React",
      "JavaScript",
      "Shadcn",
      "SQLite",
      "Redis",
      "Puppeteer",
      "Python Selenium",
      "CSS",
    ],
    images: [
      "/mycart-1.webp",
      "/mycart-2.webp",
      "/mycart-3.webp",
      "/mycart-4.webp",
      "/mycart-5.webp",
    ],
    description:
      "MyCart is a Next.js application that tracks product prices across Flipkart, Amazon, Zara, Converse, TataCliq, Ajio, Myntra, Adidas, and other supported stores. It stores price history locally, highlights lowest/highest/dropped prices, and can send email alerts when saved items hit their lowest price.",
    features: [
      {
        title: "Multi-platform Price Tracking",
        detail:
          "Scrapes products from Amazon, Flipkart, Ajio, Myntra, Zara, TataCliq, Adidas, Converse, and more.",
      },
      {
        title: "Smart Price Insights",
        detail:
          "Shows current, highest, lowest, same-price, dropped-price, and high-price indicators with trend charts.",
      },
      {
        title: "Fast Search & Sorting",
        detail:
          "Search by name, store, or URL using local fallback; sort by relevance, price, or date.",
      },
      {
        title: "Manual & Cron Updates",
        detail:
          "Refresh one item or all items, track progress live, stop running updates, and get success/failure counts.",
      },
      {
        title: "Local Storage & Alerts",
        detail:
          "Stores data in SQLite, compresses repeated price history, and sends email alerts when items hit lowest prices.",
      },
    ],
  },
  {
    id: "moneypot",
    name: "MoneyPot",
    discipline: "Desktop / Finance / AI insights",
    statement:
      "A clearer read on transactions, spending patterns, and savings.",
    icon: "/moneypot1.webp",
    thumbnail: "/moneypot.webp",
    url: "", // Optional live project URL
    github: "https://github.com/jatindahiya027/MoneyPot",
    stack: [
      "Electron.js",
      "Vite",
      "JavaScript",
      "Shadcn",
      "SQLite",
      "JWT",
      "Ollama API",
    ],
    images: [
      "/moneypot-2.webp",
      "/moneypot-1.webp",
      "/moneypot-3.webp",
      "/moneypot-4.webp",
      "/moneypot-5.webp",
      "/moneypot-6.webp",
    ],
    description:
      "MoneyPot is a personal finance tracker built with Next.js. Manage expenses, track transactions, and analyse spending patterns with AI-powered insights via the GROQ API.",
    features: [
      {
        title: "Dashboard",
        detail: "At-a-glance credits, debits, Investments and savings.",
      },
      {
        title: "Transaction Tracking",
        detail: "Record, edit, and delete across categories.",
      },
      {
        title: "Spending Analysis",
        detail: "Visual charts for spending trends.",
      },
      {
        title: "AI Insights",
        detail: "Actionable summaries from Local OLLAMA API.",
      },
      { title: "Dark Theme", detail: "Minimalistic dark UI." },
    ],
  },
];

// ── Footer social links ───────────────────────────────────
export const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/jatindahiya027",
    icon: "/github.webp",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jatin-dahiya-027/",
    icon: "/linkedin.webp",
  },
  //{ label: "Twitter",   href: "https://twitter.com/jatindahiya027",            icon: "/twitter.webp"   },
  //{ label: "Instagram", href: "https://www.instagram.com/jatin.dahiya027/",    icon: "/instagram.webp" },
];

// ── Derived project helpers ──────────────────────────────
// Components and static routes use these helpers so ordering and fallbacks
// stay consistent when projects are added, removed, or rearranged.
export function getProjectById(id) {
  return PROJECTS.find((project) => project.id === id);
}

export function getProjectNumber(projectOrId) {
  const id = typeof projectOrId === "string" ? projectOrId : projectOrId?.id;
  const index = PROJECTS.findIndex((project) => project.id === id);
  return String(Math.max(index, 0) + 1).padStart(2, "0");
}

export function getNextProject(projectOrId) {
  const id = typeof projectOrId === "string" ? projectOrId : projectOrId?.id;
  const index = PROJECTS.findIndex((project) => project.id === id);
  return PROJECTS[(Math.max(index, 0) + 1) % PROJECTS.length];
}

export function getProjectImages(project) {
  const sources = project?.images?.length
    ? project.images
    : [project?.thumbnail].filter(Boolean);
  return sources
    .filter(Boolean)
    .map((image, index) =>
      typeof image === "string"
        ? {
            src: image,
            alt: `${project.name} interface, screen ${index + 1}`,
            caption: "",
          }
        : {
            ...image,
            alt: image.alt || `${project.name} interface, screen ${index + 1}`,
          },
    )
    .filter((image) => image.src);
}
