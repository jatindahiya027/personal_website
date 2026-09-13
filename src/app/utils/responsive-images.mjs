export const RESPONSIVE_IMAGE_WIDTHS = [480, 768, 1280, 1920, 2560, 3200];

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const LOCAL_RASTER_IMAGE = /\.(?:avif|jpe?g|png|webp)(?:[?#].*)?$/i;

function hashPath(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function imageKey(src) {
  const clean = decodeURIComponent(src.split(/[?#]/, 1)[0]).replace(/^\/+/, "");
  const stem = clean
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return `${stem || "image"}-${hashPath(clean)}`;
}

export function withBasePath(src) {
  if (!src?.startsWith("/") || src.startsWith("//")) return src;
  if (basePath && (src === basePath || src.startsWith(`${basePath}/`))) {
    return src;
  }
  return `${basePath}${src}`;
}

export function isResponsiveLocalImage(src) {
  return Boolean(src?.startsWith("/") && !src.startsWith("//") && LOCAL_RASTER_IMAGE.test(src));
}

export function getResponsiveVariantPath(src, width) {
  return `/responsive/${imageKey(src)}-${width}.webp`;
}

export function getResponsiveImageProps(
  src,
  { sizes, defaultWidth = 1280 } = {},
) {
  if (!isResponsiveLocalImage(src)) return { src };

  return {
    src: withBasePath(getResponsiveVariantPath(src, defaultWidth)),
    srcSet: RESPONSIVE_IMAGE_WIDTHS.map(
      (width) => `${withBasePath(getResponsiveVariantPath(src, width))} ${width}w`,
    ).join(", "),
    sizes,
  };
}
