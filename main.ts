// makefun-news-image-20261124-r2 — entry runner (Node stdlib only).
// Copies the repo's entry.png byte-identical to $MAKEFUN_OUTPUT_DIR/entry.png
// (default "/output") after validating the PNG. Deterministic: same input
// bytes always produce the same output bytes. No network, no cwd reads.
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const srcPath = join(repoDir, "entry.png");

function fail(message) {
  console.error("makefun-news-image-20261124-r2: " + message);
  process.exit(1);
}

function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n += 1) {
      let c = n;
      for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function validatePng(data) {
  if (data.length < 8 || !data.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    fail("entry.png: bad PNG magic");
  }
  if (data.length > 1024 * 1024) fail("entry.png: over 1 MiB");
  let pos = 8;
  let sawIend = false;
  let sawIdat = false;
  let width = 0;
  let height = 0;
  while (pos + 12 <= data.length) {
    const len = data.readUInt32BE(pos);
    const type = data.subarray(pos + 4, pos + 8).toString("ascii");
    if (pos + 12 + len > data.length) fail("entry.png: truncated chunk " + type);
    const stored = data.readUInt32BE(pos + 8 + len);
    const actual = crc32(Buffer.concat([data.subarray(pos + 4, pos + 8), data.subarray(pos + 8, pos + 8 + len)]));
    if (stored !== actual) fail("entry.png: bad CRC in chunk " + type);
    if (type === "IHDR") {
      width = data.readUInt32BE(pos + 8);
      height = data.readUInt32BE(pos + 12);
      const bitDepth = data[pos + 16];
      const colorType = data[pos + 17];
      if (width > 1024 || height > 1024) fail("entry.png: side over 1024px");
      if (bitDepth !== 8 || colorType !== 2) fail("entry.png: expected 8-bit RGB");
    }
    if (type === "IDAT") sawIdat = true;
    if (type === "IEND") sawIend = true;
    pos += 12 + len;
  }
  if (!sawIdat) fail("entry.png: missing IDAT");
  if (!sawIend) fail("entry.png: missing IEND");
  if (width === 0 || height === 0) fail("entry.png: missing IHDR");
}

const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");
const outPath = join(outDir, "entry.png");
// Guard: never write inside the repo itself.
if (outPath === srcPath || outDir === repoDir || outDir.startsWith(repoDir + sep)) {
  fail("refusing to write output inside the repo: " + outPath);
}

let data;
try {
  data = readFileSync(srcPath);
} catch {
  fail("cannot read " + srcPath);
}
validatePng(data);
mkdirSync(outDir, { recursive: true });
copyFileSync(srcPath, outPath);
const written = statSync(outPath).size;
if (written !== data.length) fail("output size mismatch");
const sha = createHash("sha256").update(data).digest("hex");
console.log("copied entry.png (" + written + " bytes, sha256 " + sha + ") to " + outPath);
