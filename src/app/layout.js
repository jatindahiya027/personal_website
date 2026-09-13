import "./globals.css";
import MotionProvider from "./components/MotionProvider";
import FirstVisitGreeting from "./components/FirstVisitGreeting";
import { PERSONAL, EXPERIENCE, SOCIALS, EDUCATION } from "./data/portfolio";

export const metadata = {
  metadataBase: new URL(PERSONAL.website),
  title: {
    default: `${PERSONAL.name} | ${PERSONAL.role}`,
    template: `%s | ${PERSONAL.name}`,
  },
  description: PERSONAL.heroDescription,
  authors: [{ name: PERSONAL.name, url: PERSONAL.website }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: PERSONAL.website,
    siteName: PERSONAL.name,
    title: `${PERSONAL.name} | ${PERSONAL.role}`,
    description: PERSONAL.heroDescription,
    images: [{ url: PERSONAL.heroImageDesktop, alt: PERSONAL.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL.name} | ${PERSONAL.role}`,
    description: PERSONAL.heroDescription,
    images: [PERSONAL.heroImageDesktop],
  },
  icons: { icon: "/me.ico", shortcut: "/me.ico", apple: "/me.ico" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSONAL.name,
  url: PERSONAL.website,
  image: new URL(PERSONAL.photo, PERSONAL.website).href,
  jobTitle: PERSONAL.role,
  worksFor: { "@type": "Organization", name: EXPERIENCE[0]?.company },
  alumniOf: { "@type": "CollegeOrUniversity", name: EDUCATION[0]?.institution },
  sameAs: SOCIALS.map((social) => social.href),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#f7f7f7" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var quiet=matchMedia('(prefers-reduced-motion: reduce)').matches||localStorage.getItem('portfolio-motion')==='paused';document.documentElement.dataset.intro=!quiet&&!sessionStorage.getItem('portfolio-welcomed-v2')?'pending':'done';document.documentElement.dataset.motion=quiet?'quiet':'full';}catch(e){document.documentElement.dataset.intro='done';}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <MotionProvider>
          <FirstVisitGreeting />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
