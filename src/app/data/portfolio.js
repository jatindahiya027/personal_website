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
  name:        "Jatin Dahiya",
  email:       "jatindahiya027@gmail.com",
  location:    "Hyderabad",
  tagline:     "Software",                  // shown above the typing cycle
  bio:         "A results-oriented software developer always eager to learn and grow.",
  heroImageDesktop: "/final3.webp",
  heroImageMobile:  "/final4.webp",
  photo:            "/me2.webp",
  resume:           "/resume.pdf",          // place your PDF in /public/resume.pdf
};

// ── Hero typing cycle — roles that cycle in the hero ────
export const HERO_ROLES = [
  "Designer & Developer",
  "Problem Solver",
  "Creative Thinker",
  "Full-Stack Engineer",
];

// ── Navigation links ─────────────────────────────────────
export const NAV_ITEMS = [
  { key: "profile",  label: "Profile"  },
  { key: "skills",   label: "Skills"   },
  { key: "projects", label: "Projects" },
  { key: "contact",  label: "Contact"  },
];

// ── Profile — education rows ─────────────────────────────
export const EDUCATION = [
  {
    institution: "LNM Institute of Information Technology",
    location:    "Jaipur, India",
    period:      "2019 – 2023",
    degree:      "B.Tech — Computer Science & Technology",
  },
];

// ── Profile — languages ──────────────────────────────────
export const LANGUAGES = [
  { name: "Hindi",   level: "Native"       },
  { name: "English", level: "Professional" },
];

// ── Profile — work experience ────────────────────────────
export const EXPERIENCE = [
  {
    title:    "Systems Engineer",
    company:  "TCS",
    location: "Hyderabad, India",
    period:   "Dec 2023 – Present",
  },
  {
    title:    "Systems Developer Intern",
    company:  "Atthah Info Media Pvt. Ltd.",
    location: "Gurugram",
    period:   "Jun 2022 – Aug 2022",
  },
];

// ── Skills ───────────────────────────────────────────────
// Add/remove objects to add/remove skill cards
export const SKILLS = [
  { label: "Java",        src: "/java.webp"    },
  { label: "JavaScript",  src: "/js.webp"      },
  { label: "HTML",        src: "/html.png"     },
  { label: "CSS",         src: "/css.webp"     },
  { label: "React",       src: "/react.webp"   },
  { label: "Next.js",     src: "/next.webp"    },
  { label: "Unity 3D",    src: "/unity.webp"   },
  { label: "Python",      src: "/python.webp"  },
  { label: "PyTorch",     src: "/pytorch.webp" },
];

// ── Projects ─────────────────────────────────────────────
// Add/remove objects to add/remove projects.
// Each project needs:
//   id        — unique string (used as scroll anchor)
//   num       — display number e.g. "01"
//   name      — project title
//   icon      — logo shown in header banner (in /public)
//   thumbnail — pill image shown in projects grid (in /public)
//   raised    — true makes the grid pill float higher (visual stagger)
//   github    — GitHub URL
//   stack     — array of tech tag strings
//   images    — exactly 4 screenshot paths (landscape 16:9 recommended)
//   description — paragraph text
//   features  — array of { title, detail } objects
export const PROJECTS = [
  {
    id:          "stag",
    num:         "01",
    name:        "Stag",
    icon:        "/icon.webp",
    thumbnail:   "/Stag.webp",
    raised:      false,
    github:      "https://github.com/jatindahiya027/Stag",
    stack:       ["Electron.js", "JavaScript", "Node.js", "CSS", "HTML"],
    images:      [
      "/stagimg (1).webp",
      "/stagimg (4).webp",
      "/stagimg (2).webp",
      "/stagimg (3).webp",
    ],
    description: "Stag is a desktop application built with Electron.js to help you organize all your reference images in one place. Whether you're a designer, artist, or creative professional, Stag streamlines your workflow with powerful tools for managing and analyzing images.",
    features: [
      { title: "Organized Image Library",    detail: "Store, view, and manage references centrally." },
      { title: "Drag & Drop Download",       detail: "Import directly from web via the Chrome Extension." },
      { title: "Color Palette Extraction",   detail: "Auto-generate palettes from any image." },
      { title: "EXIF Data Display",          detail: "View camera metadata for each image." },
    ],
  },
  {
    id:          "mycart",
    num:         "02",
    name:        "MyCart",
    icon:        "/mycart1.webp",
    thumbnail:   "/mycart.webp",
    raised:      true,
    github:      "https://github.com/jatindahiya027/MyCart",
    stack:       ["Next.js", "React", "JavaScript", "Shadcn", "SQLite", "CSS"],
    images:      [
      "/mycart (1).webp",
      "/mycart (3).webp",
      "/mycart (4).webp",
      "/mycart (2).webp",
    ],
    description: "MyCart is a Next.js application that tracks pricing data across Flipkart, Amazon, Zara, Converse, TataCliq, Ajio, Myntra, and Adidas. Get email alerts when your saved items hit their lowest price.",
    features: [
      { title: "Multi-platform Scraping", detail: "Live prices from 8 major e-commerce sites." },
      { title: "Price Trend Charts",      detail: "Compare highs and lows over time." },
      { title: "Email Alerts",            detail: "Notified when items hit their lowest price." },
      { title: "Sort & Filter",           detail: "By relevance, price, or date added." },
    ],
  },
  {
    id:          "moneypot",
    num:         "03",
    name:        "MoneyPot",
    icon:        "/moneypot1.webp",
    thumbnail:   "/moneypot.webp",
    raised:      false,
    github:      "https://github.com/jatindahiya027/MoneyPot",
    stack:       ["Next.js", "React", "JavaScript", "Shadcn", "SQLite", "JWT", "GROQ API"],
    images:      [
      "/img (1).webp",
      "/img (3).webp",
      "/img (4).webp",
      "/img (5).webp",
    ],
    description: "MoneyPot is a sleek personal finance tracker built with Next.js. Manage expenses, track transactions, and analyse spending patterns — with AI-powered insights via the GROQ API.",
    features: [
      { title: "Dashboard",              detail: "At-a-glance credits, debits, and savings." },
      { title: "Transaction Tracking",   detail: "Record, edit, and delete across categories." },
      { title: "Spending Analysis",      detail: "Visual charts for spending trends." },
      { title: "AI Insights",            detail: "Actionable summaries from GROQ API." },
      { title: "Dark Theme",             detail: "Minimalistic dark UI." },
    ],
  },
];

// ── Footer social links ───────────────────────────────────
export const SOCIALS = [
  { label: "GitHub",    href: "https://github.com/jatindahiya027",             icon: "/github.webp"    },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/jatin-dahiya-027/", icon: "/linkedin.webp"  },
  { label: "Twitter",   href: "https://twitter.com/jatindahiya027",            icon: "/twitter.webp"   },
  { label: "Instagram", href: "https://www.instagram.com/jatin.dahiya027/",    icon: "/instagram.webp" },
];
