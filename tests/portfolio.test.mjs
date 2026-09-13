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
const { PROJECTS, getProjectImages, getNextProject } = await import(
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
  assert.match(greetingSource, /setTimeout\(leave, 1750\)/);
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
