# Portfolio links and writing guide

This is the content contract for this website. You or an AI can follow it without changing the page components. Edit the JavaScript data files; this Markdown document is a guide, not a file the website renders.

## 1. Project buttons: websites, GitHub, Dribbble, downloads

Open `src/app/data/portfolio.js` and find the project in `PROJECTS`. The same links appear on the homepage and its project detail page.

Two optional shortcuts exist:

| Field    | Button label  |
| -------- | ------------- |
| `github` | View GitHub   |
| `url`    | Visit project |

For exact wording such as **View website**, or any number of links, use `links` instead:

```js
// Inside an existing project object:
github: "",
url: "",
links: [
  {
    label: "View website",
    href: "https://your-project.com",
    icon: "globe",
  },
  {
    label: "View GitHub",
    href: "https://github.com/your-name/your-project",
    icon: "github",
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/your-name",
    icon: "arrow-up-right",
  },
  {
    label: "Download",
    href: "/downloads/my-project.zip",
    icon: "arrow-down",
  },
],
```

Replace the example URLs. Place that ZIP at `public/downloads/my-project.zip`. Omit any links you do not need. Keep each destination unique.

- Links appear in this order: `url`, `github`, then the `links` array. Leave the shortcuts empty or remove them when you include the same destinations in `links`, to avoid duplicate buttons.
- `label` is the visible text; `href` is the destination; `icon` is optional and defaults to `arrow-up-right`.
- Useful icons: `globe`, `github`, `arrow-up-right`, `arrow-right`, `arrow-down`, `play`, `mail`. There is no dedicated Dribbble icon.
- Project links open in a new tab. A file link follows the browser/server's normal download behavior: a PDF may open a preview, while a ZIP will normally download. Project links do not currently support a forced `download` flag. You can link directly to a release asset or to a release page.
- There is no fixed limit on links; keep labels short so they wrap comfortably on smaller screens.

### Use your own PNG or WebP icon

Put the file in `public/icons/`, then use `iconSrc` on a custom project link:

```js
links: [
  {
    label: "Dribbble",
    href: "https://dribbble.com/your-name",
    iconSrc: "/icons/dribbble.webp",
  },
  {
    label: "Download",
    href: "/downloads/my-project.zip",
    iconSrc: "/icons/download.png",
  },
],
```

For example, `/icons/dribbble.webp` refers to `public/icons/dribbble.webp`. Add these entries to the project's existing `links` array.

- `icon` selects a built-in icon by name. `iconSrc` supplies your own image URL and takes priority if both are supplied.
- Custom icons work on both the homepage and project detail page, retain their original colors, and fit inside a 17 × 17 CSS-pixel box without stretching.
- Use a tightly cropped transparent image, ideally at least 34 × 34 pixels for sharpness on high-density screens. Check that it remains visible on both light and dark backgrounds.
- No extra alt-text field is needed: the adjacent link label describes the action, so the icon is decorative for screen readers.

## 2. Where writing and assets live

```text
src/app/data/
├── blogs.js                         # Article registry
└── blog-posts/
    └── my-article.js                 # One default-exported object per article

public/writing/my-article/
├── cover.webp                       # Optional cover
├── overview.webp                    # Article illustration
├── demo.mp4                         # Optional playable video
├── demo-poster.webp                 # Optional still before playback
├── demo.en.vtt                      # Optional closed captions
└── notes.pdf                        # Optional download
```

Create folders as needed. Assets in `public/` are served from the site root:

- Disk: `public/writing/my-article/overview.webp`
- Article data: `/writing/my-article/overview.webp`

Never put `public/`, a local computer path, or a relative `./image.webp` path into an article asset URL. Use lowercase filenames with hyphens. Match capitalization exactly; deployed hosts may be case-sensitive. Files placed in `public/` are publicly accessible after deployment.

## 3. Copyable article template

Create `src/app/data/blog-posts/my-article.js`. This template works without any media files. Replace the example text with your own facts, and set the date and reading time before publishing.

```js
export default {
  slug: "my-article",
  title: "What I learned building a better search experience",
  excerpt:
    "The decisions, tradeoffs, and lessons behind a project’s search workflow.",
  date: "2026-09-13",
  readTime: "5 min read",
  tags: ["Engineering", "Product design"],
  // Optional: add this only after creating the actual image.
  // coverImage: "/writing/my-article/cover.webp",
  content: [
    {
      type: "p",
      text: "Start with the situation: who needed this, what was difficult, and why it mattered.",
    },
    { type: "h2", text: "The problem" },
    {
      type: "p",
      text: "Describe the original experience and the specific constraints you faced.",
    },
    { type: "h2", text: "What I changed" },
    {
      type: "ul",
      items: [
        "Explain one concrete decision and the reason behind it.",
        "Describe a tradeoff, including what you chose to leave out.",
      ],
    },
    { type: "h3", text: "One implementation detail" },
    {
      type: "p",
      text: "Explain the detail that helps a reader understand the result. Add a screenshot or code block here if it helps.",
    },
    { type: "h2", text: "What I learned" },
    {
      type: "p",
      text: "Describe what you observed and what you would do differently. Use numbers only when you have evidence for them.",
    },
  ],
};
```

The structure is a suggested story, not a mandatory outline. Tutorials can use a goal, prerequisites, steps, verification, and next steps. A project reflection can use context, decisions, evidence, and lessons. Remove sections that add no useful information.

### Article fields

| Field        | What to supply                                                                                     |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `slug`       | Required unique lowercase URL name with hyphens; match the filename without `.js`.                 |
| `title`      | Required clear article title. The page already renders this as its main heading.                   |
| `excerpt`    | Required short summary for article listings and description metadata.                              |
| `date`       | Required valid date string in `YYYY-MM-DD` format.                                                 |
| `readTime`   | Required manually entered label, such as `5 min read`; it is not calculated.                       |
| `tags`       | Required array with at least one topic. The first tag is used in the homepage listing.             |
| `coverImage` | Optional image URL. Omit it if you do not have a cover. Its alt text comes from the article title. |
| `content`    | Required ordered array of blocks described below.                                                  |

Use consistent tag spelling; `React` and `react` are different labels. Legacy `coverColor` values are not used by the current renderer. There is no `draft` or `published` field and no scheduled publishing: even a future-dated registered article is included in the build.

## 4. Register the article

In `src/app/data/blogs.js`, add an import alongside the existing imports:

```js
import myArticle from "./blog-posts/my-article";
```

Then add `myArticle,` inside the existing `BLOGS` array. Keep the existing entries:

```js
export const BLOGS = [
  myArticle,
  electronPost,
  // Keep all the other existing entries here.
];
```

The array above illustrates the insertion; do not replace the actual registry with this shortened example.

After rebuilding:

- The article has a page at `/blog/my-article/`.
- `/blog/` lists it, sorted by date from newest to oldest.
- The homepage displays the three newest articles.
- Topic filters come from article tags; related articles use shared tags.

For a draft, keep the file unregistered. Registration is what includes it in the site. Unregistering an article removes its route on the next build; existing links to that route will then break.

## 5. Text, lists, quotes, and code

These are **JavaScript objects, not Markdown or MDX**. Paragraphs and list items accept plain strings. Markdown like `**bold**`, `[link](url)`, or HTML is displayed literally, not parsed. Use the standalone `link` block for references. Inline rich text, nested list objects, tables, and iframe blocks are not currently supported. Unknown block types do not render.

Copy individual blocks into `content`, separated by commas:

```js
{ type: "p", text: "One paragraph. Use a separate block for the next paragraph." },
{ type: "h2", text: "A major section" },
{ type: "h3", text: "A subsection" },
{ type: "ul", items: ["First point", "Second point"] },
{ type: "ol", items: ["First step", "Second step"] },
{ type: "quote", text: "An accurately quoted passage.", author: "Author or source" },
{ type: "divider" },
{
  type: "code",
  lang: "JavaScript",
  text: [
    'const message = "Hello";',
    "console.log(message);",
  ].join("\n"),
},
```

`author` on a quote and `lang` on code are optional. Code has a copy button; `lang` labels the block and does not enable syntax highlighting. Add a source link after a quote when appropriate.

For string escaping, use double quotes around text containing apostrophes, and escape an inner double quote as `\"`. Code can use an array of lines joined with `"\n"`, as above. If using JavaScript backtick strings instead, escape embedded backticks and literal `${...}` expressions to prevent accidental interpolation.

## 6. Images

Put an image in `public/writing/my-article/`, then add:

```js
{
  type: "image",
  src: "/writing/my-article/overview.webp",
  alt: "Search results grouped by file type, with a preview of the selected document",
  caption: "The revised search interface after grouping results by file type.",
},
```

`src` is required. Write meaningful `alt` text; `caption` is optional visible text below the image. Images are lazy-loaded and keep their proportions. Compressed WebP or JPEG works well for photos; PNG is useful when transparency or sharp diagrams need it. As a practical starting point, export screenshots around 1600–2000 pixels wide and check that labels remain readable. Use assets you have permission to publish.

For the cover, set `coverImage` at the top level of the article object. Do not use a `cover` block. You can reuse a cover inside `content` if you intentionally want to show it twice.

## 7. Videos, posters, captions, and transcripts

Native video blocks accept a **direct video file**, such as a local MP4 or an HTTPS URL serving the file. Upload your media, then add:

```js
{
  type: "video",
  src: "/writing/my-article/demo.mp4",
  mimeType: "video/mp4",
  poster: "/writing/my-article/demo-poster.webp",
  title: "Search workflow demonstration",
  caption: "A short walkthrough of filtering and opening a result.",
  captions: [
    {
      src: "/writing/my-article/demo.en.vtt",
      srclang: "en",
      label: "English",
      default: true,
    },
  ],
},
```

- `src` is required. `mimeType` defaults to `video/mp4`; for WebM set `video/webm`. Playback also depends on the codecs used to export your video, so test your actual file in the browsers you support.
- `poster`, `title`, `caption`, and `captions` are optional. Remove fields for assets you have not created. Give every video a descriptive title or caption.
- Native controls let readers play, pause, seek, change volume, and use available fullscreen controls. Videos do not autoplay. `preload="none"` avoids requesting the video payload before interaction where the browser honors it.
- Export a compressed web-ready video. Large local files are included in the static deployment. For large videos, use a suitable media host with a direct playback URL, or link to an external video page.
- Caption tracks use WebVTT. Use `srclang` exactly as written above, and set at most one track as default. Same-site `.vtt` files avoid cross-origin caption restrictions.

Example contents of `public/writing/my-article/demo.en.vtt`:

```text
WEBVTT

00:00:00.000 --> 00:00:03.500
Open the search panel and enter a query.

00:00:03.500 --> 00:00:07.000
Filter the results, then open the selected document.
```

Write captions that match the actual audio and timing. Supply a transcript with normal paragraph blocks below the video, or a link to a transcript file. For silent demonstrations, describe the meaningful visual steps in nearby text.

YouTube and Vimeo **watch-page URLs are not video files** and cannot be used as `video.src`. Link to those pages instead:

```js
{
  type: "link",
  text: "Watch the full demonstration on YouTube",
  href: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
},
```

There is no iframe/embed block in the current renderer.

## 8. References and downloads inside articles

```js
{
  type: "link",
  text: "Read the source documentation",
  href: "https://example.com/documentation",
},
{
  type: "link",
  text: "Download the supporting notes (PDF)",
  href: "/writing/my-article/notes.pdf",
  download: "supporting-notes.pdf",
},
```

Article links use `text`, whereas project links use `label`. External HTTP/HTTPS article links open in a new tab, unless marked as downloads. Local links open normally in the current tab. For downloads, `download: true` uses the original filename, or use a string to suggest a filename. Browser download behavior is most reliable for same-site files; external servers control their own delivery and may ignore the requested filename. Do not add `download` to a normal webpage link.

## 9. Preview and publish checklist

From the project root:

```sh
npm run dev
```

Open the URL printed by Next.js. Check the article on a narrow phone viewport and a desktop viewport. Before publishing:

- Replace all template copy, example URLs, and placeholder filenames.
- Confirm that the slug is unique, date is valid, and reading time is realistic.
- Verify the entry in `/blog/` and the direct `/blog/your-slug/` route.
- Read the article in order; check headings, code formatting, and copy buttons.
- Check every image loads, has useful alt text, and is legible on mobile.
- Play each actual video, seek, test sound and captions, and inspect its poster.
- Click references and downloads; verify that downloaded files open correctly.
- Confirm facts, quotations, permissions, and any claimed results.

Then run:

```sh
npm test
npm run lint
npm run build
npm start
```

`npm start` serves the built `out/` folder at `http://127.0.0.1:3000`. Stop a development server using that port first. Editing files does not update an already-built export: rebuild to see changes there. Publishing is a separate step: deploy the rebuilt `out/` folder through your hosting workflow. Keep the source article and assets in the repository for future edits.

## 10. Copyable prompt for an AI author

```text
Read AUTHORING_GUIDE.md and the existing article data before editing.

Write an article for this portfolio using these inputs:
- Topic and intended reader: [fill in]
- Firsthand facts, decisions, examples, and results: [fill in]
- Desired length and tone: [fill in]
- Approved sources and links: [fill in]
- Available image/video files and what each shows: [fill in]
- Slug, date, and tags: [fill in, or propose them]
- Register for publication now, or leave unregistered as a draft: [choose]

Use the site's actual JavaScript article schema, not Markdown or MDX.
Create one default-exported article object under src/app/data/blog-posts/.
Use only supported blocks and fields from the guide. Write plain strings;
use standalone link blocks for sources. Do not invent inline formatting.
Structure the article around useful context, decisions, evidence, and lessons,
or a clear tutorial sequence if that better fits the topic.

Do not invent achievements, metrics, quotes, citations, or media files.
Ask for missing essential facts. Omit optional media if the files are absent
and report what is missing. Write descriptive alt text and accurate captions.
Do not overwrite unrelated articles or remove registry entries.
Register the article only if requested above. Do not deploy without a request.
Validate the JavaScript, run the project's checks, and report changed paths,
preview URL, any missing assets, and anything that still needs review.
```
