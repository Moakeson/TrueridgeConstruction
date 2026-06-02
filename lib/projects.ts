import fs from "fs";
import path from "path";
import projectsData from "@/content/projects.json";

export interface Project {
  id: string;
  /** Path under public/, e.g. /latest_projects/kitchen.JPG */
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  service?: string;
}

interface ProjectMetadata {
  image: string;
  caption: string;
  alt: string;
  service?: string;
}

/** Folder under public/ where project photos live */
const PROJECTS_DIR = "/latest_projects";

function toProjectId(filename: string): string {
  return filename.replace(/\.[^.]+$/, "").replace(/_/g, "-").toLowerCase();
}

function readImageSize(filePath: string): { width: number; height: number } {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".png") {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  let i = 2;
  while (i < buffer.length) {
    if (buffer[i] !== 0xff) {
      i++;
      continue;
    }

    const marker = buffer[i + 1];
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      return {
        width: buffer.readUInt16BE(i + 7),
        height: buffer.readUInt16BE(i + 5),
      };
    }

    i += 2 + buffer.readUInt16BE(i + 2);
  }

  throw new Error(`Could not read image dimensions: ${filePath}`);
}

/** Gallery projects — order and copy from content/projects.json */
export const projects: Project[] = (projectsData as ProjectMetadata[]).map(
  (entry) => {
    const imagePath = path.join(
      process.cwd(),
      "public",
      PROJECTS_DIR.slice(1),
      entry.image,
    );
    const { width, height } = readImageSize(imagePath);

    return {
      id: toProjectId(entry.image),
      src: `${PROJECTS_DIR}/${entry.image}`,
      width,
      height,
      alt: entry.alt,
      caption: entry.caption,
      ...(entry.service ? { service: entry.service } : {}),
    };
  },
);

/** Homepage hero background — public/hero.png */
export const HERO_IMAGE = "/hero.png";
