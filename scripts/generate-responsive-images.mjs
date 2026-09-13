import { access, mkdir, readFile, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import {
  RESPONSIVE_IMAGE_WIDTHS,
  getResponsiveVariantPath,
  isResponsiveLocalImage,
} from "../src/app/utils/responsive-images.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = resolve(projectRoot, "public");
const outputRoot = resolve(publicRoot, "responsive");
const portfolioSource = await readFile(
  resolve(projectRoot, "src/app/data/portfolio.js"),
  "utf8",
);
const { PROJECTS, getProjectImages } = await import(
  `data:text/javascript;base64,${Buffer.from(portfolioSource).toString("base64")}`
);

const sources = [
  ...new Set(
    PROJECTS.flatMap((project) =>
      getProjectImages(project).map((image) => image.src),
    ).filter(isResponsiveLocalImage),
  ),
];

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const src of sources) {
  const input = resolve(publicRoot, `.${decodeURIComponent(src)}`);
  await access(input);

  for (const width of RESPONSIVE_IMAGE_WIDTHS) {
    const publicPath = getResponsiveVariantPath(src, width);
    const output = resolve(publicRoot, `.${publicPath}`);
    await mkdir(dirname(output), { recursive: true });
    await sharp(input)
      .rotate()
      .resize({
        width,
        fit: "inside",
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3,
        fastShrinkOnLoad: false,
      })
      .webp({
        quality: 100,
        alphaQuality: 100,
        effort: 6,
        smartSubsample: true,
      })
      .toFile(output);
  }
}

console.log(
  `Generated ${sources.length * RESPONSIVE_IMAGE_WIDTHS.length} high-quality responsive project images.`,
);
