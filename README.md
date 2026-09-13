# Jatin Dahiya's portfolio

A responsive Next.js portfolio with neutral surfaces, full-color imagery, a layered project carousel, a subtle grayscale landing shader, scroll masks, animated typography, and unlimited project galleries.

## Develop

```sh
npm install
npm run dev
```

## Verify and preview the production site

```sh
npm test
npm run lint
npm run build
npm start
```

The build generates a fully static `out/` directory. `npm start` uses the included local server at `http://127.0.0.1:3000`; it needs no runtime package downloads.

## Edit content

Update `src/app/data/portfolio.js` to change your personal details, résumé, section text, experience, skills, projects, links, or images. Projects accept optional `github`, `url`, and additional `links`. One reusable artboard accepts any number of image paths or image objects with alt text and captions.

See [CONTENT_UPDATE_GUIDE.md](CONTENT_UPDATE_GUIDE.md) for portfolio examples, [AUTHORING_GUIDE.md](AUTHORING_GUIDE.md) for project links and writing templates (including images and videos), and [DESIGN.md](DESIGN.md) for the visual system and motion budget.

## Motion and performance

The site uses CSS, the Web Animations API, native view transitions, and a small landing-only WebGL shader capped at 480px and 20fps. The project carousel, shader, and text motion respect global pause and reduced-motion settings. Automatic motion stops when hidden or offscreen. Fonts are self-hosted; no animation framework is required.

## Deploy

Publish `out/` to static hosting such as GitHub Pages. Rebuild after changing content. The Next configuration uses static export and trailing-slash URLs. Custom domains/root sites work directly; a repository subpath deployment also requires a consistent base path for local assets and navigation.
