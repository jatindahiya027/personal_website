const post = {
  slug:        "css-tricks-i-wish-i-knew-earlier",
  title:       "CSS Tricks I Wish I Knew Three Years Ago",
  excerpt:     "A collection of modern CSS techniques — from logical properties to container queries — that would have saved me hundreds of hours of hacky workarounds.",
  date:        "2024-09-20",
  readTime:    "6 min read",
  tags:        ["CSS", "Frontend", "Web Development"],
  coverColor:  "linear-gradient(135deg, #264de4 0%, #1a9bd6 100%)",
  content: [
    { type: "p", text: "I've been writing CSS for about five years. For the first two, I fought the language constantly. Centering things, managing z-index stacking contexts, making layouts work on mobile — all felt harder than they should be. Then I realised: I wasn't using modern CSS. I was writing 2015 CSS in 2022." },
    { type: "h2", text: "1. CSS Custom Properties Are Not Just Variables" },
    { type: "p", text: "Yes, you can use --color-brand: #ff5722 as a variable. But custom properties are more powerful than that — they inherit through the DOM, which means you can scope them to components and override them contextually." },
    { type: "code", lang: "css", text: `.card {
  --card-bg: #ffffff;
  --card-radius: 12px;
  background: var(--card-bg);
  border-radius: var(--card-radius);
}

[data-theme="dark"] .card {
  --card-bg: #1e1e1e;
}` },
    { type: "h2", text: "2. Clamp() Replaces Most Media Queries for Typography" },
    { type: "p", text: "clamp(min, preferred, max) lets font sizes scale fluidly between viewport sizes. I removed about 40% of my media query blocks by using it for typography and spacing." },
    { type: "code", lang: "css", text: `/* Before */
h1 { font-size: 2rem; }
@media (min-width: 768px) { h1 { font-size: 3rem; } }
@media (min-width: 1200px) { h1 { font-size: 4rem; } }

/* After */
h1 { font-size: clamp(2rem, 5vw, 4rem); }` },
    { type: "h2", text: "3. Grid Is Not Just For Page Layouts" },
    { type: "p", text: "I used to reach for Flexbox by default and only use Grid for big page-level layouts. That was backwards. Grid is excellent for component-level layouts too — especially when you need both rows and columns to align." },
    { type: "quote", text: "Use Flexbox when content dictates layout. Use Grid when layout dictates content." },
    { type: "h2", text: "4. :is() and :where() Clean Up Selector Soup" },
    { type: "code", lang: "css", text: `/* Before */
h1 a, h2 a, h3 a, h4 a { color: inherit; }

/* After */
:is(h1, h2, h3, h4) a { color: inherit; }` },
    { type: "h2", text: "5. Container Queries Are Finally Here" },
    { type: "p", text: "Media queries respond to the viewport. Container queries respond to the element's parent. This is a game-changer for truly reusable components." },
    { type: "code", lang: "css", text: `.card-wrapper {
  container-type: inline-size;
}
.card { display: flex; flex-direction: column; }

@container (min-width: 500px) {
  .card { flex-direction: row; }
}` },
    { type: "h2", text: "6. The gap Property Works in Flexbox Now" },
    { type: "p", text: "For years I used margin hacks to space flex items. gap now works in Flexbox across all modern browsers. Just write gap: 16px and you're done." },
    { type: "divider" },
    { type: "p", text: "Modern CSS is genuinely enjoyable to write. If you learned CSS a few years ago and haven't revisited the spec lately, you're in for a treat." },
  ],
};

export default post;
