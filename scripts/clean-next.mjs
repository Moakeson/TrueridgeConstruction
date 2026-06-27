import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const nextDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", ".next");

if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log("Removed .next cache");
}
