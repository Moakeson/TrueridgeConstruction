import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const manifestPath = path.join(root, "lib", "image-variants.json");

const HERO_PATH = "/hero.webp";
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

function removeStaleVariants(sourcePath) {
  const dir = path.dirname(sourcePath);
  const base = path.basename(sourcePath, ".webp");
  const pattern = new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-\\d+w\\.webp$`);

  for (const entry of fs.readdirSync(dir)) {
    if (pattern.test(entry)) {
      fs.unlinkSync(path.join(dir, entry));
    }
  }
}

async function optimizeHero(sourcePath) {
  const metadata = await sharp(sourcePath).metadata();
  const originalWidth = metadata.width ?? MAX_SOURCE_WIDTH;
  const originalHeight = metadata.height ?? Math.round(originalWidth * 0.75);
  const maxWidth = Math.min(originalWidth, MAX_SOURCE_WIDTH);

  const targetWidths = [
    ...VARIANT_WIDTHS.filter((width) => width < maxWidth),
    maxWidth,
  ].filter((width, index, list) => list.indexOf(width) === index);

  removeStaleVariants(sourcePath);

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

async function optimizeBaseImage(sourcePath) {
  removeStaleVariants(sourcePath);

  const metadata = await sharp(sourcePath).metadata();
  const originalWidth = metadata.width ?? MAX_SOURCE_WIDTH;
  const originalHeight = metadata.height ?? Math.round(originalWidth * 0.75);
  const maxWidth = Math.min(originalWidth, MAX_SOURCE_WIDTH);

  if (maxWidth < originalWidth) {
    const tmpPath = `${sourcePath}.tmp.webp`;
    await sharp(sourcePath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(tmpPath);
    fs.renameSync(tmpPath, sourcePath);
  } else {
    await sharp(sourcePath)
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(`${sourcePath}.tmp.webp`);
    fs.renameSync(`${sourcePath}.tmp.webp`, sourcePath);
  }
}

const heroSourcePath = path.join(publicDir, "hero.webp");
const manifest = {};

if (fs.existsSync(heroSourcePath)) {
  console.log("Optimizing hero variants:", HERO_PATH);
  manifest[HERO_PATH] = await optimizeHero(heroSourcePath);
}

const files = walkWebpFiles(publicDir).filter(
  (filePath) => toPublicPath(filePath) !== HERO_PATH,
);

for (const filePath of files) {
  const key = toPublicPath(filePath);
  console.log("Optimizing base image:", key);
  await optimizeBaseImage(filePath);
}

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${Object.keys(manifest).length} entries to lib/image-variants.json`);
