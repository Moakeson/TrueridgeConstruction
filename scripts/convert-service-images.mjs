import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const conversions = [
  { dir: "fireplace", from: "Elegant Custom Shiplap Fireplace .jpg", to: "custom-shiplap-fireplace.webp" },
  { dir: "fireplace", from: "IMG_0441.JPG", to: "modern-electric-fireplace.webp" },
  { dir: "fireplace", from: "Shiplap Bench Fireplace .jpg", to: "green-shiplap-fireplace.webp" },
  { dir: "bathroom", from: "IMG_1391.jpg", to: "white-bathroom-remodel.webp" },
  { dir: "bathroom", from: "IMG_3815.JPG", to: "walk-in-shower.webp" },
  { dir: "bathroom", from: "IMG_3813.JPG", to: "grey-marble-vanity.webp" },
  { dir: "bathroom", from: "_ After Clean sleek new shower_tub.JPG", to: "tub-shower-combo.webp" },
  { dir: "basement", from: "C65A7C8E-FC83-4F05-9A37-8B7A25B02E0E.JPG", to: "finished-basement-room.webp" },
  { dir: "basement", from: "IMG_1364.JPG", to: "basement-closet.webp" },
  { dir: "basement", from: "New basement Closet buildout.JPG", to: "basement-hallway.webp" },
  { dir: "kitchen", from: "IMG_3205.JPG", to: "picket-tile-backsplash.webp" },
  { dir: "kitchen", from: "D797138C-7B37-41F1-8790-749B6DA991DE.PNG", to: "white-shaker-kitchen.webp" },
];

for (const { dir, from, to } of conversions) {
  const input = path.join(root, "public", dir, from);
  const output = path.join(root, "public", dir, to);
  if (!fs.existsSync(input)) {
    console.error("Missing:", input);
    continue;
  }
  await sharp(input).webp({ quality: 85 }).toFile(output);
  fs.unlinkSync(input);
  console.log("Converted:", from, "->", to);
}
