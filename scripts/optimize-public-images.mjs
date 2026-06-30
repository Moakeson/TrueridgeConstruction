import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const manifestPath = path.join(root, "lib", "image-variants.json");

const VARIANT_WIDTHS = [480, 768, 1024, 1280];
const MAX_SOURCE_WIDTH = 1280;
const WEBP_QUALITY = 80;

const SKIP_PATTERNS = [/-\d+w\.webp$/, /-source\.webp$/, /-tmp\.webp$/];

function shouldSkip(filename) {
  return SKIP_PATTERNS.some((pattern) => pattern.test(filename));
}

function walkWebpFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkWebpFiles(fullPath));
      continue;
    }
    if (entry.name.endsWith(".webp") && !shouldSkip(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

function toPublicPath(filePath) {
  return `/${path.relative(publicDir, filePath).replace(/\\/g, "/")}`;
}

function variantPath(sourcePath, width) {
  const dir = path.dirname(sourcePath);
  const base = path.basename(sourcePath, ".webp");
  return path.join(dir, `${base}-${width}w.webp`);
}

async function optimizeImage(sourcePath) {
  const metadata = await sharp(sourcePath).metadata();
  const originalWidth = metadata.width ?? MAX_SOURCE_WIDTH;
  const originalHeight = metadata.height ?? Math.round(originalWidth * 0.75);
  const maxWidth = Math.min(originalWidth, MAX_SOURCE_WIDTH);

  const targetWidths = [
    ...VARIANT_WIDTHS.filter((width) => width < maxWidth),
    maxWidth,
  ].filter((width, index, list) => list.indexOf(width) === index);

  const variants = [];
  for (const width of targetWidths) {
    const outPath = variantPath(sourcePath, width);
    await sharp(sourcePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(outPath);

    const variantMeta = await sharp(outPath).metadata();
    variants.push({
      width: variantMeta.width ?? width,
      path: toPublicPath(outPath),
    });
  }

  return {
    width: maxWidth,
    height: Math.round(originalHeight * (maxWidth / originalWidth)),
    variants: variants.sort((a, b) => a.width - b.width),
  };
}

const manifest = {};
const files = walkWebpFiles(publicDir);

for (const filePath of files) {
  const key = toPublicPath(filePath);
  console.log("Optimizing:", key);
  manifest[key] = await optimizeImage(filePath);
}

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${Object.keys(manifest).length} entries to lib/image-variants.json`);
