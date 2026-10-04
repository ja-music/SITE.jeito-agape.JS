# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Public site of **Jeito Ágape**, a Catholic music ministry from Belo Horizonte (pt-BR throughout). **Jekyll 4.4** built by **GitHub Actions** and served by **GitHub Pages** at `jeitoagape.com.br`. The single conversion is the "Convide-nos" WhatsApp link; everything else exists to make a parish organizer trust the ministry and tap it.

Three documents rule the work here, in this order: `PRODUCT.md` (who it is for, what is locked — the **current visual identity is the established world**; the owner rejected a redesign on 2026-10-03), `DESIGN.md` (the extracted design system: tokens, type roles, components, named rules) and `.impeccable/surfaces/*.md` (per-surface briefs: what a refinement pass may touch). Refine, never replace: no new typeface, palette, section order or copy without an explicit request.

## Running and building

The owner's Mac has no usable Ruby. Jekyll runs in the LOPS Docker container (`../JAM.jeito-agape.LOPS`, service `site`, dev server at `https://site.jamanager.local` with `--force_polling`). For a production build and audits:

```bash
# from ../JAM.jeito-agape.LOPS (Docker must be up)
docker compose exec -T -e JEKYLL_ENV=production site bundle exec jekyll build -d /srv/jekyll/_site
# serve the output on the host for Lighthouse / detector / parity
python3 -m http.server 4010 -d _site

npm ci && npm run images            # sharp pipeline: assets/src → assets/img/*.{avif,webp,jpg} + _data/images.json (git-ignored)
node scripts/check-jsonld.mjs _site # every page's JSON-LD parses and has the expected @ids
npx html-validate "_site/**/*.html" # config in .htmlvalidate.json
node scripts/parity.mjs <dirA> <dirB> <diffDir>   # pixel diff of two screenshot folders (pixelmatch)
.claude/skills/impeccable/scripts/impeccable detect http://localhost:4010/   # design anti-pattern detector
npx lighthouse http://localhost:4010/ --form-factor=mobile --screenEmulation.mobile
```

`JEKYLL_ENV=production` is what turns analytics on (`data-ga4` on `<html>`); a dev build ships no Google script.

## Deploy

`.github/workflows/pages.yml`: on push to `main` (and weekly on Monday 03:00 UTC, so the agenda's "past" state stays honest) → `npm ci` → `npm run images` → `jekyll build` → `check-jsonld` → Lighthouse CI (`.lighthouserc.json` + `budget.json`, Google scripts blocked during measurement) → `actions/deploy-pages` → IndexNow ping (key file at the root) → Discord notify. Pages is in `build_type: workflow` mode. Work on a branch and open a PR: the workflow builds and audits without deploying; merging deploys. Rollback = revert the merge.

## Architecture

- **One shell**: `_layouts/default.html` (skip link, header, `<main>`, footer, WhatsApp float, back-to-top, toast; `<body data-page="{{ page.schema }}">`), with `home` / `service` / `page` / `post` layouts on top.
- **Facts live once in `_data/`** and feed pages, JSON-LD and `llms.txt`: `org.yml` (numbers), `contato.yml` (WhatsApp, e-mail, networks with `hero`/`card` flags), `album.yml`, `nav.yml`, `agenda.yml` (only public events with real date/place/time), `faq.yml` (visible FAQ + FAQPage JSON-LD, `home: true` picks the home subset), `incondicional.yml` (Sessions chapters), `meses.yml`, `authors.yml`.
- **Collections**: `_servicos/*.md` — the four intent pages (`/banda-para-missa/` …) with front matter `title/h1/description/intro/short/resumo/cta/whatsapp_text/service_type/icon/order/faq/related_posts`; `_paginas/{sobre,agenda,contato}.md`. `_includes/wa-vars.html` builds `wa_url` (page text) and `wa_url_geral`.
- **SEO/GEO**: `_includes/seo.html` emits one JSON-LD `@graph` per page with stable `@id`s (`#musicgroup`, `#website`, `#album`, `#webpage`); FAQPage only on the home; MusicEvent future-only; BlogPosting + Person on posts; Service + BreadcrumbList on intent pages. `robots.txt` allows AI crawlers; `llms.txt` is Liquid-generated; sitemap `lastmod` comes from `jekyll-last-modified-at` (needs `fetch-depth: 0`). `jekyll-seo-tag` is not used — the `<head>` is `_includes/head.html`.
- **Images**: never reference `assets/img/*` by hand. `{% include picture.html name="hero1" alt="…" sizes="…" priority=true %}` renders AVIF/WebP/JPG `srcset` from `_data/images.json`; `preload-image.html` preloads the LCP image with the same `sizes`. Source files go in `assets/src/` (the key is the file name; blog covers become `blog-<name>`).
- **CSS**: Jekyll Sass, `assets/css/main.scss` → `_sass/` partials (`_tokens`, `_reset`, `_type`, `_base`, `_layout`, `components/*`, `_motion`), ≈ 44 KB compiled. The partials are the original site's CSS sliced by section; `_reset.scss` reproduces what Tailwind's preflight used to provide (`line-height: 1.5`, heading resets, `picture > source { display: none }`). Inter variable is self-hosted (`assets/fonts/`, latin subset) with a metric-matched fallback.
- **JS**: no libraries. `assets/js/main.js` inlines `_includes/js/*.js`: `carousel` (hero crossfade, inactive slides `inert`), `dialog` (menu + author modals), `reveal` (IntersectionObserver fade-up, `[data-reveal]`), `spy`, `lite-yt`, `copy`, `subscribe`, `top`, `track` (GA4 events: `whatsapp_click`/`email_click` with `cta_location`, `service`, `page_path`, `link_text`; `spotify_click`, `youtube_click`, `streaming_click`, `instagram_click`, `tiktok_click`, `wallpaper_download`, `sessions_play`, `agenda_view`, `outbound_click`; Ads conversion from `data-ads-conversion`), `analytics` (gtag after `load`). Every contact link carries `data-track="<position>"`.

### Cascade gotchas (they bit once)

- A `@media` override must come **after** the rule it overrides in `main.scss` order (`.section`/`.hero` mobile paddings live in `_sections.scss`/`_hero.scss`, not in `_base.scss`).
- Blog-index-only rules that collide with post rules are scoped under `.blog-index` (the wrapper div of `blog/index.html`); `_blog.scss` loads after `_post.scss`.
- The hero carousel's width comes from `.carousel-sizer` (960px, `max-width: 100%`) inside an inline-block stage with `max-width: 100%` and a flex item with `min-width: 0` — replicating the invisible `<img>` the old site used as a ruler. Don't "simplify" it.
- Grids use `minmax(0, 1fr)` so long e-mails don't widen a column.
- Small red text uses `--accent-text` (#e8657e), never `--accent` (3.5:1 on charcoal). See DESIGN.md "A Regra do Vermelho em Texto".

## Content rules

- Agenda: only confirmed public events; the home shows the list with past ones labelled "Realizada" (no strike-through, no opacity); `/agenda/` splits future / "Já aconteceu".
- Posts: `_posts/YYYY-MM-DD-slug.md` with `title, date, author, category, image, description`; category drives the tag colour (`slugify` — "Ministério" → `ministerio`). URLs `/blog/YYYY/MM/DD/slug/` must not change, nor `/blog/feed.xml`, `/wallpapers/`, `/404.html`, the GSC file or any `/assets/*` path referenced by published OG tags.
- Vocabulary: "Convide-nos", "missões", "ministério"; "banda" only in `<title>`/H1 of intent pages. Never promise gratuity as a rule; never invent testimonials, member bios or parish names.

## Quality gates before a PR

Lighthouse mobile ≥ 95 / 100 / — / 100 on `/`, `/banda-para-missa/` and a post; detector ≤ 5 findings on the home with no new rule (the remaining ones are documented: the scroll indicator's `bounce` keyframe and the three incumbent glows); `check-jsonld` and `html-validate` clean; a parity run against the live site with every difference explained in the PR. `.impeccable/critique/` keeps the latest critique snapshots; `.impeccable/review/` holds the finish-review captures (git-ignored).
