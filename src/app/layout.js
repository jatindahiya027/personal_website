import "./globals.css";

export const metadata = {
  title: "Jatin Dahiya",
  description:
    "Explore the personal portfolio of Jatin Dahiya, an engineer at TCS and alumnus of LNMIIT, showcasing projects, skills, and achievements.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Jatin Dahiya" />
        <meta name="keywords" content="Jatin Dahiya, Engineer, TCS, LNMIIT, Portfolio, Software Engineer, Technology" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/final3.webp" />
        <meta property="og:url" content="https://jatindahiya.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/final3.webp" />
        <link rel="icon" href="/me.ico" type="image/x-icon" />
        {/* Self-host via next/font or use Google Fonts with preconnect for fast loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
