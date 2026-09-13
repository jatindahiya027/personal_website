# Updating your portfolio

All portfolio content is in `src/app/data/portfolio.js`. Edit the data, then run `npm run build` to regenerate the static website. No component changes are needed to add projects or screenshots.

## Personal details and page copy

Edit `PERSONAL` for your name, website URL, role, email, location, résumé file, portrait, headline lines, and introduction. `COPY` contains the greeting and section copy. The about paragraph supports `**bold words**`.

- Place a résumé in `public/` and set `PERSONAL.resume` to its path, such as `/resume.pdf`. Both header and about links update.
- Set `heroLines` to an array of strings. Each line gets its own text mask. Keep the heading short enough to read on a phone.
- `heroImageDesktop` is the about portrait and social preview. `photo` is the small article author image.
- `website` supplies the metadata, sitemap, and robots origin.
- `SECTIONS` supplies navigation labels. `inNav: false` keeps a section out of the compact header. IDs must match the existing sections.
- `EXPERIENCE`, `EDUCATION`, `LANGUAGES`, `CAPABILITIES`, and `SOCIALS` accept any number of entries.

## Add a project

Add an object to `PROJECTS`, in the order you want it displayed:

```js
{
  id: "my-project", // Unique, lowercase, hyphenated URL slug
  name: "My project",
  discipline: "Web / Creative tool",
  statement: "A short, specific description of what this project does.",
  description: "The context, purpose, and implementation of your project.",
  github: "https://github.com/your-name/your-project", // Optional
  url: "https://your-project.com",                    // Optional live site
  links: [                                          // Optional extra links
    { label: "Read documentation", href: "https://your-project.com/docs" },
  ],
  stack: ["React", "Next.js"],
  images: [
    "/my-project/overview.webp",
    {
      src: "/my-project/detail.webp",
      alt: "Search results grouped by project",
      caption: "A closer look at the search workflow.",
    },
    // Add as many images as you want. There is no four- or five-image cap.
  ],
  features: [
    { title: "Search", detail: "What visitors can do with the feature." },
  ],
}
```

The homepage, project detail route, project total, next-project link, and sitemap update automatically. Both GitHub and the live project link can be shown, or either can be omitted. Empty links produce no button. For exact button labels such as “View website,” Dribbble links, or downloads, see [the project links template](AUTHORING_GUIDE.md#1-project-buttons-websites-github-dribbble-downloads).

## The artboard

Every project uses the same component and layout. Do not prepare a separate collage or add project-specific styling.

- Add images to `images`. Local `/example.webp` paths refer to `public/example.webp`.
- Strings and `{ src, alt, caption }` objects can be mixed.
- All images appear in the thumbnail strip; the selected image is shown at its natural aspect ratio.
- Click a thumbnail or use previous/next buttons. Left/right arrow keys work when the artboard has focus.
- Click the large screenshot or expand icon for the image viewer. Escape closes it and returns focus to the trigger.
- The detail page's “View all screens” button opens an overview containing every image.
- A `thumbnail` can act as the fallback when no image array exists. A project with no imagery displays an honest empty state.
- Prefer compressed WebP images. Roughly 1600–2400px wide is usually enough for full-screen product screenshots. Very large arrays are supported, but thoughtful image selection still improves reading and load time.

## Writing

Each article lives in `src/app/data/blog-posts/`. Register it in `src/app/data/blogs.js`. Paragraph, heading, list, quote, code, image, video, link/download, and divider blocks are supported. The article list builds its topic filters from the supplied tags.

See [AUTHORING_GUIDE.md](AUTHORING_GUIDE.md) for the complete copyable article template, registration steps, image/video folders, captions, block reference, publishing checklist, and an AI writing prompt.

## Motion

The greeting runs once per browser session. Open a fresh tab/session to see it again. The header's pause button persists your preference locally; your operating system's reduced-motion preference also takes priority.

The motion timings, colors, and spacing are documented in `DESIGN.md` and defined in `src/app/globals.css`. The full section transitions are in `StoryScene.js`; greeting timing is in `FirstVisitGreeting.js`. The landing light field is in `LandingShader.js`, and the automatic card slideshow is in `HeroCarousel.js`. Every project image is included in that slideshow automatically.

## Check your changes

```sh
npm test
npm run lint
npm run build
npm start
```

`npm start` serves the production export at `http://127.0.0.1:3000`. During development, use `npm run dev`. After changing data for a published static site, rebuild and publish the new `out/` folder.
