import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const source = await readFile(
  new URL("../src/app/data/portfolio.js", import.meta.url),
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
