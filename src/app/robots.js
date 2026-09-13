import { PERSONAL } from "./data/portfolio";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", PERSONAL.website).href,
    host: PERSONAL.website,
  };
}
