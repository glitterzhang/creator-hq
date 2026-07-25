// Copies the shared single-file web app into this Tauri project's frontend dir before every
// `tauri dev`/`tauri build`. This is the ONLY copy step — creator-tracker-app.html stays the
// single source of truth; nothing here should ever be hand-edited in frontend/index.html.
import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, "..", "..", "web", "creator-tracker-app.html");
const destDir = path.join(__dirname, "..", "frontend");
const dest = path.join(destDir, "index.html");

mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);
console.log(`Synced ${src} -> ${dest}`);
