import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jatin Dahiya",
  description: "Explore the personal portfolio of Jatin Dahiya, an engineer at TCS and alumnus of LNMIIT, showcasing projects, skills, and achievements.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="author" content="Jatin Dahiya" />
        <meta name="keywords" content="Jatin Dahiya, Engineer, TCS, LNMIIT, Portfolio, Software Engineer, Technology" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="/final3.png" // Replace with your actual image URL
        />
        <meta property="og:url" content="https://jatindahiya.com/" /> {/* Replace with your actual website URL */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta
          name="twitter:image"
          content="/final3.png" // Replace with your actual image URL
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
        />
        <link
          rel="icon"
          href="/me.ico"
          type="image/x-icon"
        />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
