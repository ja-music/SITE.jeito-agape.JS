#!/usr/bin/env node
/**
 * Valida os blocos JSON-LD de um site gerado.
 *
 * Percorre <dir>/** /*.html, extrai cada <script type="application/ld+json">…</script>
 * (pode haver vários por página), faz JSON.parse e exige, no topo, "@context" e
 * "@type" ou "@graph" (um array no topo vale se cada item cumprir isso).
 *
 * Uso:  node scripts/check-jsonld.mjs _site
 * Sem dependências. Sai com 1 listando arquivo + posição de qualquer falha.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const dir = process.argv[2];
if (!dir) {
  console.error('uso: node scripts/check-jsonld.mjs <dir>');
  process.exit(2);
}

const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
const LD_TYPE_RE = /\btype\s*=\s*(?:"application\/ld\+json"|'application\/ld\+json'|application\/ld\+json(?=[\s>]))/i;

async function walk(current) {
  const entries = await fs.readdir(current, { withFileTypes: true });
  entries.sort((a, b) => a.name.localeCompare(b.name));
  const files = [];
  for (const entry of entries) {
    const full = path.join(current, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) files.push(full);
  }
  return files;
}

/** Linha/coluna (1-based) de um offset dentro de um texto. */
function lineCol(text, offset) {
  const before = text.slice(0, offset);
  const line = before.split('\n').length;
  const col = offset - before.lastIndexOf('\n');
  return { line, col };
}

function describeParseError(err, html, blockStart, json) {
  const match = /position (\d+)/i.exec(err.message);
  if (!match) return err.message;
  const inBlock = Number(match[1]);
  const { line, col } = lineCol(html, blockStart + inBlock);
  const snippet = json.slice(Math.max(0, inBlock - 40), inBlock + 40).replace(/\s+/g, ' ');
  return `${err.message} → linha ${line}, coluna ${col} do arquivo · trecho: …${snippet}…`;
}

function structuralProblems(data) {
  const items = Array.isArray(data) ? data : [data];
  if (items.length === 0) return ['array vazio'];
  const problems = [];
  items.forEach((item, i) => {
    const where = Array.isArray(data) ? `item ${i}` : 'topo';
    if (item === null || typeof item !== 'object' || Array.isArray(item)) {
      problems.push(`${where}: não é um objeto`);
      return;
    }
    if (!('@context' in item)) problems.push(`${where}: falta "@context"`);
    if (!('@type' in item) && !('@graph' in item)) problems.push(`${where}: falta "@type" ou "@graph"`);
  });
  return problems;
}

async function main() {
  let stat;
  try {
    stat = await fs.stat(dir);
  } catch {
    throw new Error(`diretório não encontrado: ${dir}`);
  }
  if (!stat.isDirectory()) throw new Error(`não é um diretório: ${dir}`);

  const files = await walk(dir);
  if (files.length === 0) throw new Error(`nenhum .html em ${dir}`);

  const failures = [];
  let totalBlocks = 0;
  let filesWithBlocks = 0;

  for (const file of files) {
    const html = await fs.readFile(file, 'utf8');
    const relative = path.relative(process.cwd(), file);
    const rel = relative.startsWith('..') ? file : relative;
    let count = 0;

    for (const match of html.matchAll(SCRIPT_RE)) {
      const [, attrs, body] = match;
      if (!LD_TYPE_RE.test(attrs)) continue;
      count++;
      const blockStart = match.index + '<script'.length + attrs.length + '>'.length;

      let data;
      try {
        data = JSON.parse(body);
      } catch (err) {
        failures.push(`${rel} · bloco ${count}: JSON inválido — ${describeParseError(err, html, blockStart, body)}`);
        continue;
      }
      for (const problem of structuralProblems(data)) failures.push(`${rel} · bloco ${count}: ${problem}`);
    }

    if (count > 0) {
      filesWithBlocks++;
      totalBlocks += count;
      console.log(`OK ${rel} (${count} ${count === 1 ? 'bloco' : 'blocos'})`);
    }
  }

  console.log(
    `\n${totalBlocks} blocos JSON-LD em ${filesWithBlocks} de ${files.length} páginas` +
      (filesWithBlocks < files.length ? ` (${files.length - filesWithBlocks} sem JSON-LD)` : ''),
  );

  if (failures.length > 0) {
    console.error(`\nFALHOU — ${failures.length} problema(s):`);
    for (const failure of failures) console.error(`  ${failure}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`erro: ${err?.message ?? err}`);
  process.exit(1);
});
