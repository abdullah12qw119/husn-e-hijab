import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const MANIFEST_PATH = path.join(__dirname, "..", "image-variants.generated.json");

const LADDER = [128, 256, 480, 768, 1080, 1600];
const VARIANT_RE = /-(\d+)w\.webp$/i;

async function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else if (/\.webp$/i.test(entry.name) && !VARIANT_RE.test(entry.name)) files.push(full);
  }
  return files;
}

function toPublicPath(full) {
  return "/" + path.relative(PUBLIC_DIR, full).split(path.sep).join("/");
}

// Remove stale variants whose source no longer exists
function cleanStale(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { cleanStale(full); continue; }
    if (!VARIANT_RE.test(entry.name)) continue;
    const source = full.replace(VARIANT_RE, ".webp");
    if (!fs.existsSync(source)) {
      fs.unlinkSync(full);
      console.log(`CLEANED stale variant: ${path.relative(PUBLIC_DIR, full)}`);
    }
  }
}

const manifest = {};
const sources = await walk(PUBLIC_DIR);
cleanStale(PUBLIC_DIR);

let generated = 0;
const pending = [];

for (const source of sources) {
  const meta = await sharp(source).metadata();
  const srcWidth = meta.width ?? 0;
  const steps = LADDER.filter((w) => w < srcWidth);
  const isLogo = /husn-mark/i.test(source);
  manifest[toPublicPath(source)] = steps.length ? steps : [];

  for (const step of steps) {
    const out = source.replace(/\.webp$/i, `-${step}w.webp`);
    const opts = isLogo ? { lossless: true, effort: 4 } : { quality: 95, effort: 4 };
    pending.push(
      sharp(source)
        .resize({ width: step, withoutEnlargement: true })
        .webp(opts)
        .toFile(out)
        .then(() => {
          generated++;
          console.log(`${step}w  ${path.relative(PUBLIC_DIR, out)}`);
        })
        .catch((e) => {
          console.error(`FAILED ${step}w ${path.basename(source)}: ${e.message}`);
          process.exitCode = 2;
        })
    );
  }
}

await Promise.all(pending);

const entries = Object.keys(manifest).length;
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n==== ${generated} variants generated for ${entries} sources ====`);
