#!/usr/bin/env node
/**
 * Gera _data/agenda.yml a partir da agenda pública do JAM (GET /api/public/agenda).
 *
 * Roda no CI antes do `jekyll build`. O coordenador marca "Publicar na agenda do site" no app,
 * e o JAM dispara este workflow; o site continua estático e o JSON-LD continua saindo do YAML.
 *
 * Regra de SEO do site (24/07/2026): evento futuro só entra com data, horário, nome, local, cidade e UF.
 * Item incompleto é descartado com aviso — "A confirmar" gera MusicEvent inválido no Google.
 * Evento que já aconteceu entra sem cidade/UF (2026-10-13): o JAM publicou todos os passados de uma
 * vez (migration V63) e eles são anteriores a esses campos; o site os mostra como "Realizada" só com
 * o local, e o seo.html não gera MusicEvent para datas passadas.
 *
 * Se a API estiver fora do ar, o arquivo commitado fica como está e o build segue (exit 0):
 * agenda velha é melhor que site sem deploy.
 *
 * Uso:  AGENDA_API_URL=https://api.jeitoagape.com.br/api/public/agenda node scripts/sync-agenda.mjs
 * Sem dependências.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DEFAULT_API_URL = 'https://api.jeitoagape.com.br/api/public/agenda';
const OUTPUT = path.join('_data', 'agenda.yml');
const TIMEOUT_MS = 20_000;

const apiUrl = process.env.AGENDA_API_URL || DEFAULT_API_URL;

/** "19:00:00" → "19h"; "19:30:00" → "19h30". É o formato que os templates já exibem. */
export function horarioLegivel(startTime) {
  const [hh, mm] = startTime.split(':');
  const minutos = mm === '00' ? '' : mm;
  return `${Number(hh)}h${minutos}`;
}

/** "19:30:00" → "19:30" — o JSON-LD monta `T19:30:00-03:00` a partir disto. */
export function horarioIso(startTime) {
  const [hh, mm] = startTime.split(':');
  return `${hh}:${mm}`;
}

/** Hoje no fuso da banda, "AAAA-MM-DD" — o mesmo corte de passado/futuro que os templates usam. */
export function hojeBrt(agora = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(agora);
}

export function completo(ev, hoje = hojeBrt()) {
  const basico = Boolean(ev.date && ev.startTime && ev.title && ev.venue);
  if (!basico) return false;
  return ev.date < hoje || Boolean(ev.city && ev.state);
}

export function paraYaml(eventos) {
  const linhas = [
    '# GERADO no CI por scripts/sync-agenda.mjs a partir do JAM (GET /api/public/agenda).',
    '# Não edite à mão: marque "Publicar na agenda do site" no evento, dentro do app.',
    '# Este arquivo commitado é o fallback quando a API está fora do ar no build.',
    '# Campos: data (AAAA-MM-DD) · nome · local · endereco (opcional) · cidade · uf · horario ("19h") · inicio ("19:00")',
  ];
  const ordenados = [...eventos].sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`));
  for (const ev of ordenados) {
    linhas.push('');
    linhas.push(`- data: ${JSON.stringify(ev.date)}`);
    linhas.push(`  nome: ${JSON.stringify(ev.title)}`);
    linhas.push(`  local: ${JSON.stringify(ev.venue)}`);
    if (ev.address) linhas.push(`  endereco: ${JSON.stringify(ev.address)}`);
    if (ev.city) linhas.push(`  cidade: ${JSON.stringify(ev.city)}`);
    if (ev.state) linhas.push(`  uf: ${JSON.stringify(ev.state)}`);
    linhas.push(`  horario: ${JSON.stringify(horarioLegivel(ev.startTime))}`);
    linhas.push(`  inicio: ${JSON.stringify(horarioIso(ev.startTime))}`);
  }
  return `${linhas.join('\n')}\n`;
}

async function buscar() {
  const res = await fetch(apiUrl, { signal: AbortSignal.timeout(TIMEOUT_MS), headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = await res.json();
  if (!Array.isArray(body)) throw new Error('resposta não é uma lista');
  return body;
}

async function main() {
  let eventos;
  try {
    eventos = await buscar();
  } catch (err) {
    console.warn(`sync-agenda: API indisponível (${apiUrl}): ${err.message} — mantendo ${OUTPUT} commitado`);
    return;
  }

  const hoje = hojeBrt();
  const validos = eventos.filter((ev) => completo(ev, hoje));
  const descartados = eventos.length - validos.length;
  if (descartados > 0) {
    console.warn(`sync-agenda: ${descartados} evento(s) descartado(s): falta data/horário/nome/local, ou cidade/UF num evento futuro (regra de SEO)`);
  }

  await fs.writeFile(OUTPUT, paraYaml(validos), 'utf8');
  console.log(`sync-agenda: ${validos.length} evento(s) escritos em ${OUTPUT}`);
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  main().catch((err) => {
    console.error(`sync-agenda: ${err.message}`);
    process.exit(1);
  });
}
