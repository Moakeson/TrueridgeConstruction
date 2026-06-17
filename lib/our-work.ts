import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUR_WORK_PUBLIC_DIR = "/our-work";
const OUR_WORK_FS_DIR = path.join(process.cwd(), "public", "our-work");

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
]);

export interface OurWorkImage {
  id: string;
  /** Path under public/, e.g. /our-work/photo.webp */
  src: string;
  width: number;
  height: number;
}

function toId(filename: string): string {
  return path
    .basename(filename, path.extname(filename))
    .replace(/_/g, "-")
    .toLowerCase();
}

async function readImageSize(filePath: string): Promise<{
  width: number;
  height: number;
}> {
  const metadata = await sharp(filePath).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`Could not read image dimensions: ${filePath}`);
  }
  return { width: metadata.width, height: metadata.height };
}

async function getOurWorkImages(): Promise<OurWorkImage[]> {
  if (!fs.existsSync(OUR_WORK_FS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(OUR_WORK_FS_DIR)
    .filter((file) =>
      IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()),
    )
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return Promise.all(
    files.map(async (file) => {
      const filePath = path.join(OUR_WORK_FS_DIR, file);
      const { width, height } = await readImageSize(filePath);

      return {
        id: toId(file),
        src: `${OUR_WORK_PUBLIC_DIR}/${file}`,
        width,
        height,
      };
    }),
  );
}

/** All images in public/our-work — discovered at build time. */
export const ourWorkImages = await getOurWorkImages();

/** Homepage project carousel — same images as our-work gallery. */
export const projects = ourWorkImages;
