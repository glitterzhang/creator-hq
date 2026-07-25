import { copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const src = fileURLToPath(new URL("../web/creator-tracker-app.html", import.meta.url));
const dest = fileURLToPath(new URL("../app/index.html", import.meta.url));

copyFileSync(src, dest);
console.log(`Synced ${src} -> ${dest}`);
