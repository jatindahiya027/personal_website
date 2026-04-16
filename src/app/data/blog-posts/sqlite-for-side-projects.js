const post = {
  slug:        "sqlite-for-side-projects",
  title:       "SQLite Is Enough For Your Side Project",
  excerpt:     "Stop reaching for Postgres, Redis, and a cloud database provider on day one. SQLite is fast, serverless, and will handle more load than your side project will ever see.",
  date:        "2024-07-14",
  readTime:    "5 min read",
  tags:        ["SQLite", "Backend", "Databases", "Side Projects"],
  coverColor:  "linear-gradient(135deg, #003a6e 0%, #0060a8 100%)",
  content: [
    { type: "p", text: "When I built MoneyPot, my first instinct was to spin up a Postgres container. It's what I knew. It's what tutorials use. It has a fancy GUI. But for a personal finance tracker that I'd be the sole user of, it was laughably over-engineered." },
    { type: "p", text: "I switched to SQLite. The database is a single file on disk. There's nothing to configure, nothing to maintain, and nothing to pay for. And it's fast — SQLite's read performance would embarrass many production Postgres deployments." },
    { type: "h2", text: "The Numbers" },
    { type: "p", text: "SQLite is the most deployed database in the world. Every iPhone and Android phone has dozens of SQLite databases. Chrome uses it. Firefox uses it. It handles millions of reads per day without breaking a sweat." },
    { type: "quote", text: "SQLite does not compete with client/server databases. It competes with fopen().", author: "SQLite documentation" },
    { type: "h2", text: "When SQLite Is Not Enough" },
    { type: "ul", items: [
      "Single user? SQLite is perfect.",
      "Small team (< 20 users) with low write frequency? SQLite is fine.",
      "High-concurrency writes from many users? Time for Postgres.",
      "Multiple servers sharing a database? SQLite won't work (no network access).",
    ]},
    { type: "h2", text: "Using SQLite with Next.js" },
    { type: "code", lang: "js", text: `const Database = require('better-sqlite3');
const db = new Database('./data.db');

db.exec(\`
  CREATE TABLE IF NOT EXISTS transactions (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    amount  REAL    NOT NULL,
    note    TEXT,
    date    TEXT    NOT NULL
  )
\`);

const transactions = db
  .prepare('SELECT * FROM transactions ORDER BY date DESC LIMIT ?')
  .all(50);` },
    { type: "h2", text: "The Bottom Line" },
    { type: "p", text: "For your next side project, default to SQLite. If you outgrow it, migrating to Postgres is a well-documented process. But you probably won't outgrow it — most side projects never get enough traffic to need anything more." },
  ],
};

export default post;
