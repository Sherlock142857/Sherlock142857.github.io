/**
 * Generates the deterministic noise placeholder images used by the site.
 *
 * These files are checked into the repository (under public/assets) so the site
 * behaves exactly as it will with final artwork: replace any file in place and
 * the UI needs no code changes.
 *
 * Run with:  npm run assets
 */
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* ------------------------------------------------------------------ */
/* Minimal 8-bit grayscale PNG encoder (no dependencies).              */
/* ------------------------------------------------------------------ */

const CRC_TABLE = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function encodeGrayscalePng(width, height, pixels) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 0; // color type: grayscale
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  // Each scanline is prefixed with a 0 (filter "none") byte.
  const raw = Buffer.alloc(height * (width + 1));
  for (let y = 0; y < height; y++) {
    const rowStart = y * (width + 1);
    raw[rowStart] = 0;
    pixels.copy(raw, rowStart + 1, y * width, (y + 1) * width);
  }

  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ------------------------------------------------------------------ */
/* Seeded random noise.                                                */
/* ------------------------------------------------------------------ */

function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Per-pixel grayscale noise with a soft vertical tonal bias so each field has
 * a slightly different "temperature" while staying within the monochrome
 * visual language.
 */
function makeNoise(width, height, { seed, bias = 0 }) {
  const rand = mulberry32(seed);
  const pixels = Buffer.alloc(width * height);
  let i = 0;
  for (let y = 0; y < height; y++) {
    const ramp = 1 - (y / height) * 0.35; // darker toward the bottom
    for (let x = 0; x < width; x++) {
      const v = Math.round((rand() * 255 * ramp + bias) % 256);
      pixels[i++] = Math.max(0, Math.min(255, v));
    }
  }
  return pixels;
}

function writeNoise(relativePath, width, height, opts) {
  const abs = resolve(ROOT, relativePath);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, encodeGrayscalePng(width, height, makeNoise(width, height, opts)));
  console.log(`wrote ${relativePath} (${width}x${height})`);
}

/* ------------------------------------------------------------------ */

// Homepage carousel images — portrait, framed by the geometric brackets.
writeNoise("public/assets/fields/mathematics.png", 360, 450, { seed: 101 });
writeNoise("public/assets/fields/deep-learning.png", 360, 450, { seed: 202 });
writeNoise("public/assets/fields/rock-music.png", 360, 450, { seed: 303 });
writeNoise("public/assets/fields/geometry.png", 360, 450, { seed: 404 });
writeNoise("public/assets/fields/algebra.png", 360, 450, { seed: 505 });
writeNoise("public/assets/fields/video-games.png", 360, 450, { seed: 606 });

// Detail images — landscape, used by the text-image and gallery templates.
writeNoise("public/assets/detail/mathematics-01.png", 480, 360, { seed: 707 });
writeNoise("public/assets/detail/mathematics-02.png", 480, 360, { seed: 808 });
writeNoise("public/assets/detail/deep-learning-01.png", 480, 360, { seed: 909 });
writeNoise("public/assets/detail/rock-music-01.png", 480, 360, { seed: 1010 });
writeNoise("public/assets/detail/rock-music-02.png", 480, 360, { seed: 1111 });
writeNoise("public/assets/detail/rock-music-03.png", 480, 360, { seed: 1212 });
writeNoise("public/assets/detail/algebra-01.png", 480, 360, { seed: 1313 });
writeNoise("public/assets/detail/video-games-01.png", 480, 360, { seed: 1414 });
writeNoise("public/assets/detail/video-games-02.png", 480, 360, { seed: 1515 });
writeNoise("public/assets/detail/video-games-03.png", 480, 360, { seed: 1616 });
