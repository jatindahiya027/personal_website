const post = {
  slug:        "nextjs-web-scraping-price-tracker",
  title:       "Building a Price Tracker with Next.js and Web Scraping",
  excerpt:     "How I built MyCart — a tool that monitors prices across 8 e-commerce platforms — and the gotchas that come with scraping JavaScript-rendered pages.",
  date:        "2024-11-05",
  readTime:    "10 min read",
  tags:        ["Next.js", "Web Scraping", "Node.js", "SQLite"],
  coverColor:  "linear-gradient(135deg, #0f4c3a 0%, #1a7a5e 100%)",
  content: [
    { type: "p", text: "If you've ever watched a product price fluctuate by hundreds of rupees over a few days, you know the frustration. MyCart started as a personal itch — I wanted to buy a pair of shoes but wasn't sure if the price was good. Six months later it was tracking 400+ products across 8 platforms." },
    { type: "h2", text: "The Architecture" },
    { type: "p", text: "The stack is intentionally boring: Next.js for the frontend and API routes, SQLite for persistence, and Node.js child processes for scraping. Boring stacks ship. Exciting stacks become architecture blog posts that never turn into products." },
    { type: "h3", text: "Data flow" },
    { type: "ol", items: [
      "User adds a product URL via the UI",
      "API route validates the URL and queues a scrape job",
      "Scraper runs on a cron (every 6 hours) and writes price to SQLite",
      "Chart renders historical data from the DB",
      "Email alert fires if current price < lowest recorded price",
    ]},
    { type: "h2", text: "The Scraping Problem" },
    { type: "p", text: "Static HTML scraping (cheerio + fetch) works fine for Flipkart product pages. But platforms like Myntra and AJIO render prices client-side with JavaScript. For those, I had to use Puppeteer — a headless Chrome browser that actually runs the JavaScript." },
    { type: "quote", text: "Puppeteer feels like cheating. You're literally using a real browser, just without a screen." },
    { type: "code", lang: "js", text: `const puppeteer = require('puppeteer');

async function scrapePrice(url) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page    = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', req => {
    if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(url, { waitUntil: 'networkidle2' });
  const price = await page.$eval('.pdp-price', el => el.textContent);
  await browser.close();
  return price;
}` },
    { type: "h2", text: "Anti-Bot Measures" },
    { type: "p", text: "E-commerce sites don't want to be scraped. Rate limiting, IP bans, and bot detection are real. The mitigations I used: random delays between requests (500–3000ms), rotating user-agents, and respecting robots.txt for the most aggressively protected sites." },
    { type: "h2", text: "SQLite Was the Right Call" },
    { type: "p", text: "I nearly reached for PostgreSQL out of habit. But this runs locally, data fits in a single file, and SQLite handles concurrent reads perfectly fine for a personal tool. The entire database is one .db file you can copy and back up." },
    { type: "h2", text: "What I'd Do Differently" },
    { type: "ul", items: [
      "Use a proper job queue (BullMQ) instead of cron for the scraping pipeline",
      "Add a browser extension so users can add products with one click",
      "Cache scrape results to avoid redundant runs when multiple users track the same URL",
    ]},
    { type: "p", text: "The code is on GitHub if you want to run it yourself or contribute improvements." },
  ],
};

export default post;
