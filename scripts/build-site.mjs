// Builds the public site into dist/ — only files meant to be publicly served end up there.
// Source files (README, package.json, desktop-app/ source, scripts/) never get deployed.
import { copyFileSync, cpSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = path.join(root, "dist");

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
mkdirSync(path.join(dist, "app"), { recursive: true });

copyFileSync(path.join(root, "index.html"), path.join(dist, "index.html"));
copyFileSync(path.join(root, "privacy.html"), path.join(dist, "privacy.html"));
copyFileSync(path.join(root, "web", "creator-tracker-app.html"), path.join(dist, "app", "index.html"));

const assetsDir = path.join(root, "assets");
if (existsSync(assetsDir)) {
  cpSync(assetsDir, path.join(dist, "assets"), { recursive: true });
}

console.log(`Built site into ${dist}`);
