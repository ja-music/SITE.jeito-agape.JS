#!/usr/bin/env node
/**
 * Pipeline de imagens responsivas do site (sharp).
 *
 * Entradas:
 *   - assets/src/** /*.{jpg,jpeg,png}  (originais novos — a pasta "src" não entra na chave)
 *   - lista legada: hero1/hero2/confiar-album/agenda/Beto/Delliz, assets/blog/* (sem *-og.*)
 *   - assets/wallpapers/** /*.png  → só miniaturas (480 e 960); o original fica intocado (é download)
 *
 * Saídas:
 *   - assets/img/<key>.<hash8>-<w>.{avif,webp,jpg|png}  (git-ignored, gerado no CI)
 *   - _data/images.json  — manifesto lido por _includes/picture.html e preload-image.html
 *
 * Chave = caminho relativo a assets/ com "/" → "-" e sem extensão
 *   (assets/blog/quaresma.png → "blog-quaresma"; assets/src/missa-2025.jpg → "missa-2025").
 *
 * Uso:  npm run images          (idempotente: variante que já existe não é regerada)
 *       npm run images:clean    (apaga assets/img/ antes)
 * Rodar sempre a partir da raiz do repositório.
 */

import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import { availableParallelism } from 'node:os';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const ROOT = process.cwd();
const ASSETS = path.join(ROOT, 'assets');
const SRC_DIR = path.join(ASSETS, 'src');
const OUT_DIR = path.join(ASSETS, 'img');
const MANIFEST = path.join(ROOT, '_data', 'images.json');

const WIDTHS = [480, 768, 1200, 1920];
const THUMB_WIDTHS = [480, 960];
const MAX_WIDTH = 1920;

const LEGACY_FILES = ['hero1.png', 'hero2.png', 'confiar-album.png', 'agenda.jpg', 'Beto.jpg', 'Delliz.jpg'];
const IMAGE_RE = /\.(jpe?g|png)$/i;
const OG_RE = /-og\.(jpe?g|png)$/i;

const CLEAN = process.argv.includes('--clean');
const CONCURRENCY = Math.max(2, Math.min(8, availableParallelism()));

// ---------------------------------------------------------------- utilitários

const kb = (bytes) => Math.round(bytes / 1024);
const posix = (p) => p.split(path.sep).join('/');

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function fileSize(file) {
  return (await fs.stat(file)).size;
}

/** Lista arquivos recursivamente (ordem estável); pasta inexistente → []. */
async function walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
  entries.sort((a, b) => a.name.localeCompare(b.name));
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

/** Limitador simples de concorrência (sem dependência). */
function createLimiter(max) {
  let active = 0;
  const queue = [];
  const next = () => {
    if (active >= max || queue.length === 0) return;
    active++;
    const { task, resolve, reject } = queue.shift();
    task().then(resolve, reject).finally(() => {
      active--;
      next();
    });
  };
  return (task) =>
    new Promise((resolve, reject) => {
      queue.push({ task, resolve, reject });
      next();
    });
}

function keyFor(file) {
  const parts = path.relative(ASSETS, file).split(path.sep);
  if (parts[0] === 'src') parts.shift();
  return parts.join('-').replace(IMAGE_RE, '');
}

// ---------------------------------------------------------------- entradas

async function collectInputs() {
  const inputs = [];
  const add = (file, thumb = false) => inputs.push({ file, key: keyFor(file), thumb });

  for (const file of await walk(SRC_DIR)) if (IMAGE_RE.test(file)) add(file);

  for (const name of LEGACY_FILES) {
    const file = path.join(ASSETS, name);
    if (await exists(file)) add(file);
    else console.warn(`aviso: arquivo legado ausente, ignorado — assets/${name}`);
  }

  for (const file of await walk(path.join(ASSETS, 'blog'))) {
    if (IMAGE_RE.test(file) && !OG_RE.test(file)) add(file);
  }

  for (const file of await walk(path.join(ASSETS, 'wallpapers'))) {
    if (/\.png$/i.test(file)) add(file, true);
  }

  const seen = new Map();
  for (const input of inputs) {
    const other = seen.get(input.key);
    if (other) {
      throw new Error(
        `chave duplicada "${input.key}": ${posix(path.relative(ROOT, other))} e ${posix(path.relative(ROOT, input.file))}`,
      );
    }
    seen.set(input.key, input.file);
  }

  return inputs.sort((a, b) => a.key.localeCompare(b.key));
}

// ---------------------------------------------------------------- processamento

function widthsFor(sourceWidth, thumb) {
  const list = thumb ? THUMB_WIDTHS : WIDTHS;
  const widths = list.filter((w) => w <= sourceWidth);
  if (!thumb && sourceWidth < MAX_WIDTH && !widths.includes(sourceWidth)) widths.push(sourceWidth);
  if (widths.length === 0) widths.push(sourceWidth); // fonte menor que a menor largura
  return widths.sort((a, b) => a - b);
}

async function processInput({ file, key, thumb }, limit) {
  const buffer = await fs.readFile(file);
  const hash = createHash('sha1').update(buffer).digest('hex').slice(0, 8);

  // rotate() sem argumento aplica a orientação EXIF; metadata() reflete o arquivo
  // original, então trocamos w/h quando a orientação é 5–8.
  const base = sharp(buffer, { failOn: 'error' }).rotate();
  const meta = await base.metadata();
  let { width: w, height: h } = meta;
  if ((meta.orientation ?? 1) >= 5) [w, h] = [h, w];

  // "alpha" só conta se de fato há pixel translúcido: um PNG RGBA todo opaco vira JPEG.
  let alpha = false;
  if (meta.hasAlpha) {
    const stats = await base.clone().stats();
    alpha = stats.channels.at(-1).min < 255;
  }

  const widths = widthsFor(w, thumb);
  const fallback = alpha ? 'png' : 'jpg';
  const encoders = {
    avif: (s) => s.avif({ quality: 50, effort: 4 }),
    webp: (s) => s.webp({ quality: 75 }),
    jpg: (s) => s.jpeg({ mozjpeg: true, quality: 80, progressive: true }),
    png: (s) => s.png({ compressionLevel: 9, palette: true }),
  };

  let generated = 0;
  let skipped = 0;
  let largestAvif = 0;

  const tasks = [];
  for (const width of widths) {
    for (const ext of ['avif', 'webp', fallback]) {
      const out = path.join(OUT_DIR, `${key}.${hash}-${width}.${ext}`);
      tasks.push(
        limit(async () => {
          if (await exists(out)) {
            skipped++;
          } else {
            const pipeline = base.clone().resize({ width, withoutEnlargement: true });
            await encoders[ext](pipeline).toFile(out);
            generated++;
          }
          if (ext === 'avif') largestAvif = Math.max(largestAvif, await fileSize(out));
        }),
      );
    }
  }
  await Promise.all(tasks);

  return {
    key,
    entry: { hash, w, h, widths, fallback, alpha, src: posix(path.relative(ROOT, file)) },
    stats: { sourceKB: kb(buffer.length), largestAvifKB: kb(largestAvif), generated, skipped, thumb },
  };
}

// ---------------------------------------------------------------- relatório

function printTable(rows) {
  const header = ['chave', 'fonte KB', 'larguras', 'maior AVIF KB', 'status'];
  const data = rows.map((r) => [
    r.key + (r.stats.thumb ? ' (thumb)' : ''),
    String(r.stats.sourceKB),
    r.entry.widths.join(','),
    String(r.stats.largestAvifKB),
    r.stats.generated ? `${r.stats.generated} gerados` : 'ok (cache)',
  ]);
  const cols = header.map((h, i) => Math.max(h.length, ...data.map((d) => d[i].length)));
  const line = (cells) => cells.map((c, i) => (i === 1 || i === 3 ? c.padStart(cols[i]) : c.padEnd(cols[i]))).join('  ');
  console.log(line(header));
  console.log(cols.map((c) => '-'.repeat(c)).join('  '));
  for (const d of data) console.log(line(d));
}

async function dirSize(dir) {
  let total = 0;
  for (const file of await walk(dir)) total += await fileSize(file);
  return total;
}

// ---------------------------------------------------------------- main

async function main() {
  const started = Date.now();

  if (!(await exists(path.join(ROOT, '_config.yml'))) || !(await exists(ASSETS))) {
    throw new Error(`rode a partir da raiz do repositório (não achei _config.yml / assets/ em ${ROOT})`);
  }

  if (CLEAN) {
    await fs.rm(OUT_DIR, { recursive: true, force: true });
    console.log('limpo: assets/img/');
  }
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(path.dirname(MANIFEST), { recursive: true });

  const inputs = await collectInputs();
  if (inputs.length === 0) throw new Error('nenhuma imagem de entrada encontrada');
  console.log(`${inputs.length} imagens de entrada · concorrência ${CONCURRENCY}\n`);

  const limit = createLimiter(CONCURRENCY);
  const results = await Promise.allSettled(inputs.map((input) => processInput(input, limit)));

  const ok = [];
  const failures = [];
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') ok.push(result.value);
    else failures.push({ input: inputs[i], error: result.reason });
  });

  const manifest = {};
  for (const { key, entry } of ok.sort((a, b) => a.key.localeCompare(b.key))) manifest[key] = entry;
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');

  printTable(ok);
  const generated = ok.reduce((n, r) => n + r.stats.generated, 0);
  const skipped = ok.reduce((n, r) => n + r.stats.skipped, 0);
  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  console.log(
    `\n${generated} arquivos gerados, ${skipped} já existiam · assets/img/ = ${kb(await dirSize(OUT_DIR))} KB · ${seconds}s`,
  );
  console.log(`manifesto: ${posix(path.relative(ROOT, MANIFEST))} (${ok.length} chaves)`);

  if (failures.length > 0) {
    console.error(`\n${failures.length} falha(s):`);
    for (const { input, error } of failures) {
      console.error(`  ${posix(path.relative(ROOT, input.file))} → ${error?.message ?? error}`);
    }
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(`erro: ${err?.message ?? err}`);
  process.exitCode = 1;
});
