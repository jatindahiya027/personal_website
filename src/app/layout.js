
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jatin Dahiya",
  description: "Personal portfolio of jatin dahiya.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
</head>
      <body className={inter.className} >{children}</body> 
      
    </html>
  );
}
