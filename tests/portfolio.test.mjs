import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const source = await readFile(
  new URL("../src/app/data/portfolio.js", import.meta.url),
  "utf8",
);
const layoutSource = await readFile(
  new URL("../src/app/layout.js", import.meta.url),
  "utf8",
);
const chromeSource = await readFile(
  new URL("../src/app/components/SiteChrome.js", import.meta.url),
  "utf8",
);
const homeSource = await readFile(
  new URL("../src/app/components/PortfolioHome.js", import.meta.url),
  "utf8",
);
const choreographySource = await readFile(
  new URL("../src/app/components/ScrollChoreography.js", import.meta.url),
  "utf8",
);
const greetingSource = await readFile(
  new URL("../src/app/components/FirstVisitGreeting.js", import.meta.url),
  "utf8",
);
const globalStyles = await readFile(
  new URL("../src/app/globals.css", import.meta.url),
  "utf8",
);
const packageSource = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);
const workflowSource = await readFile(
  new URL("../.github/workflows/nextjs.yml", import.meta.url),
  "utf8",
);
const artboardSource = await readFile(
  new URL("../src/app/components/ProjectArtboard.js", import.meta.url),
  "utf8",
);
const carouselSource = await readFile(
  new URL("../src/app/components/HeroCarousel.js", import.meta.url),
  "utf8",
);
const generatorSource = await readFile(
  new URL("../scripts/generate-responsive-images.mjs", import.meta.url),
  "utf8",
);
const {
  RESPONSIVE_IMAGE_WIDTHS,
  getResponsiveImageProps,
  getResponsiveVariantPath,
} = await import("../src/app/utils/responsive-images.mjs");
const { PROJECTS, GREETINGS, getProjectImages, getNextProject } = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);

test("the artboard preserves every image, its order and its caption", () => {
  const images = Array.from({ length: 24 }, (_, index) =>
    index % 2
      ? {
          src: `/image-${index}.webp`,
          alt: `Screen ${index}`,
          caption: `A caption for ${index}`,
        }
      : `/image-${index}.webp`,
  );
  const normalized = getProjectImages({ name: "Future project", images });
  assert.equal(normalized.length, 24);
  normalized.forEach((image, index) =>
    assert.equal(image.src, `/image-${index}.webp`),
  );
  assert.equal(normalized[1].caption, "A caption for 1");
  assert.equal(normalized[0].alt, "Future project interface, screen 1");
});

test("empty galleries and thumbnail-only projects remain usable", () => {
  assert.deepEqual(getProjectImages({ name: "No images" }), []);
  assert.equal(
    getProjectImages({ name: "Thumbnail", thumbnail: "/cover.webp" })[0].src,
    "/cover.webp",
  );
  assert.deepEqual(
    getProjectImages({
      name: "Invalid images",
      images: [{ caption: "No source" }],
    }),
    [],
  );
});

test("project routes are unique and the next project wraps to the first", () => {
  assert.equal(
    new Set(PROJECTS.map((project) => project.id)).size,
    PROJECTS.length,
  );
  PROJECTS.forEach((project) =>
    assert.match(project.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  );
  if (PROJECTS.length)
    assert.equal(getNextProject(PROJECTS.at(-1)).id, PROJECTS[0].id);
});

test("every local project screenshot exists", async () => {
  for (const project of PROJECTS) {
    for (const image of getProjectImages(project)) {
      if (image.src.startsWith("/"))
        await access(resolve("public", `.${image.src}`));
    }
  }
});

test("the greeting is selected before paint and never opened after hydration", () => {
  assert.match(layoutSource, /dataset\.intro=.*portfolio-welcomed-v3/);
  assert.match(layoutSource, /<FirstVisitGreeting/);
  assert.doesNotMatch(layoutSource, /portfolio-welcomed-v2/);
  assert.doesNotMatch(greetingSource, /showModal|clipPath/);
  assert.match(greetingSource, /setTimeout\(leave, 5000\)/);
});

test("the first-visit greeting cycles through modular LTR languages", () => {
  assert.deepEqual(
    GREETINGS.map((item) => item.code),
    ["en", "es", "hi-Latn", "ja-Latn"],
  );
  assert.equal(new Set(GREETINGS.map((item) => item.text)).size, GREETINGS.length);
  GREETINGS.forEach((item) => {
    assert.ok(item.language);
    assert.doesNotMatch(item.text, /[\u0590-\u08ff]/);
  });
  assert.match(greetingSource, /GREETINGS\.map/);
  assert.match(globalStyles, /@keyframes greeting-language-cycle/);
  assert.match(globalStyles, /greeting-language-cycle 1600ms/);
  assert.match(globalStyles, /var\(--greeting-index\) \* 1200ms/);
  assert.match(
    globalStyles,
    /translate3d\(0, 0\.18em, 0\) scale\(0\.985\)/,
  );
});

test("the primary typeface is bundled, preloaded and never fetched remotely", () => {
  assert.match(layoutSource, /from "next\/font\/local"/);
  assert.match(layoutSource, /display:\s*"block"/);
  assert.match(layoutSource, /className=\{manrope\.className\}/);
  assert.doesNotMatch(globalStyles, /font-display:\s*swap/);
  assert.doesNotMatch(globalStyles, /fonts\.(?:googleapis|gstatic)\.com/);
});

test("header and hero use the requested labels and expose no motion control", () => {
  assert.match(chromeSource, />\s*Resume\s*</);
  assert.doesNotMatch(chromeSource, /Résumé|motion-toggle|Pause motion|Play motion/);
  assert.match(homeSource, /Meet me/);
  assert.doesNotMatch(homeSource, /Meet Jatin|résumé/);
});

test("project reveals avoid mobile masks and clipped-observer feedback loops", () => {
  assert.match(choreographySource, /const compact = innerWidth < 800/);
  assert.match(choreographySource, /const frameRects = compact\s*\? \[\]/);
  assert.match(
    choreographySource,
    /const measured = compact\s*\? \[\]\s*: targets\.map/,
  );
  assert.doesNotMatch(choreographySource, /\[\.\.\.visible\]/);
});

test("project images receive deterministic responsive sources", () => {
  const props = getResponsiveImageProps("/stagimg (1).webp", {
    sizes: "92vw",
  });
  assert.equal(props.sizes, "92vw");
  assert.equal(
    props.srcSet.split(", ").length,
    RESPONSIVE_IMAGE_WIDTHS.length,
  );
  assert.doesNotMatch(props.srcSet, /stagimg \(1\)/);
  assert.match(getResponsiveVariantPath("/stagimg (1).webp", 1280), /1280\.webp$/);
  assert.match(carouselSource, /getResponsiveImageProps/);
  assert.match(artboardSource, /getResponsiveImageProps/);
});

test("the full-image viewer keeps the untouched original", () => {
  assert.match(artboardSource, /responsive:\s*false/);
  assert.match(artboardSource, /withBasePath\(item\.src\)/);
  assert.match(artboardSource, /fetchPriority:\s*"high"/);
});

test("GitHub Pages generates high-quality variants before the static build", () => {
  assert.equal(
    packageSource.scripts.prebuild,
    "node scripts/generate-responsive-images.mjs",
  );
  assert.match(workflowSource, /id:\s*pages/);
  assert.match(workflowSource, /run:\s*npm run build/);
  assert.match(workflowSource, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(generatorSource, /quality:\s*100/);
  assert.match(generatorSource, /alphaQuality:\s*100/);
  assert.match(generatorSource, /smartSubsample:\s*true/);
  assert.match(generatorSource, /withoutEnlargement:\s*true/);
});
