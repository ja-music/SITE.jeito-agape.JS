// Paridade visual: compara capturas de mesmo nome em duas pastas (ex.: site ao vivo × build local),
// grava o diff e imprime o % de pixels diferentes na área comum e a diferença de tamanho.
// Uso: node scripts/parity.mjs <pasta-a> <pasta-b> <pasta-diff>
import fs from 'node:fs'; import path from 'node:path';
import { PNG } from 'pngjs'; import pixelmatch from 'pixelmatch';
const [a, b, out] = process.argv.slice(2);
if (!a || !b || !out) { console.error('uso: parity.mjs <a> <b> <diff>'); process.exit(1); }
fs.mkdirSync(out, { recursive: true });
const rows = [];
for (const f of fs.readdirSync(a).filter(n => n.endsWith('.png')).sort()) {
  const pb = path.join(b, f); if (!fs.existsSync(pb)) { rows.push([f, 'sem par', '']); continue; }
  const A = PNG.sync.read(fs.readFileSync(path.join(a, f))), B = PNG.sync.read(fs.readFileSync(pb));
  const w = Math.min(A.width, B.width), h = Math.min(A.height, B.height);
  const crop = (img) => { const o = new PNG({ width: w, height: h }); PNG.bitblt(img, o, 0, 0, w, h, 0, 0); return o; };
  const ca = crop(A), cb = crop(B), d = new PNG({ width: w, height: h });
  const n = pixelmatch(ca.data, cb.data, d.data, w, h, { threshold: 0.1, includeAA: true });
  fs.writeFileSync(path.join(out, f), PNG.sync.write(d));
  const size = (A.width === B.width && A.height === B.height) ? `${A.width}×${A.height}` : `${A.width}×${A.height} → ${B.width}×${B.height}`;
  rows.push([f, (100 * n / (w * h)).toFixed(2) + ' %', size]);
}
console.log(rows.map(([f, v, s]) => `${v.padStart(9)}  ${f.padEnd(16)} ${s}`).join('\n'));
