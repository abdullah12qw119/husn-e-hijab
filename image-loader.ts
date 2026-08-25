import variantsManifest from "./image-variants.generated.json";

interface HusnImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

const manifest = variantsManifest as Record<string, number[]>;

/**
 * Serves pre-generated responsive variants (`<name>-<width>w.webp`)
 * produced by scripts/generate-image-variants.mjs. Falls back to the
 * original asset when no variant fits.
 */
export default function husnImageLoader({
  src,
  width,
}: HusnImageLoaderProps): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const widths = manifest[src];
  if (!widths || widths.length === 0) {
    return `${basePath}${src}`;
  }

  const sorted = [...widths].sort((a, b) => a - b);
  const largest = sorted[sorted.length - 1];

  if (width > largest) {
    return `${basePath}${src}`;
  }

  let chosen = sorted[0];
  for (const w of sorted) {
    if (w <= width) chosen = w;
    else break;
  }

  return `${basePath}${src.replace(/\.webp$/i, `-${chosen}w.webp`)}`;
}
