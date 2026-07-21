# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **Jeito Ágape**, a Catholic music ministry in Belo Horizonte, Brazil. Hosted on GitHub Pages at **jeitoagape.com.br**. Now uses **Jekyll** for blog functionality while keeping the main page as a standalone HTML file.

## Running Locally

```bash
# First-time setup (installs Ruby, Bundler, gems):
bash setup.sh

# Full site with Jekyll (blog + index):
bundle install
bundle exec jekyll serve

# Quick preview of index.html only (no blog):
python3 -m http.server 8000
```

## Deployment

Push to `main` → GitHub Pages builds with Jekyll and auto-deploys. Custom domain configured via `CNAME`.

## Architecture

### Two-Layer Structure

1. **Main page** — [index.html](index.html): Self-contained single file with all HTML, `<style>`, `<script>`, and SEO markup. Has empty YAML front matter (`---\n---`) so Jekyll processes it but it doesn't use a layout.

2. **Blog system** — Jekyll-powered:
   - [_layouts/default.html](_layouts/default.html): Shared shell (header, footer, WhatsApp float, mobile menu, back-to-top). All blog pages use this.
   - [_layouts/post.html](_layouts/post.html): Individual blog post template (extends `default`).
   - [blog/index.html](blog/index.html): Blog listing page with featured card, post grid, and columnists section.
   - [_posts/](_posts/): Blog posts in Markdown with front matter (`layout`, `title`, `date`, `author`, `category`, `image`, `description`).
   - [_data/authors.yml](_data/authors.yml): Blog columnists (name, role, bio, image).
   - [_data/agenda.yml](_data/agenda.yml): Upcoming events data (date, name, location, time).
   - [_data/incondicional.yml](_data/incondicional.yml): Chapters of the **Incondicional Sessions** YouTube quadro — renders the `#sessions` section on the homepage (9:16 cards using each chapter's own cover art from R2, lite-embed player loads on click). New chapter = new block at the top of this file.

3. **Other pages** (use `default` layout):
   - [wallpapers/index.html](wallpapers/index.html): Wallpaper download gallery with ImageGallery JSON-LD schema.
   - [404.html](404.html): Custom error page (`permalink: /404.html`).

### CSS Design System

CSS custom properties defined in `:root` (duplicated in both `index.html` and `_layouts/default.html`):
- `--bg: #0A0A0A`, `--surface: #111111`, `--accent: #C53050`
- `--text: #FFFFFF`, `--text-muted: rgba(255,255,255,0.5)`, `--border: rgba(255,255,255,0.06)`

Font: **Inter** (weights 300–700). Icons: **Lucide** via unpkg CDN. Styling: **Tailwind CSS** via CDN (no build step).

### Key CSS Classes (shared across layouts)

- `.header` / `.header.scrolled` — fixed nav, darkens on scroll
- `.hero` — full-viewport hero (index.html only)
- `.card` — bordered cards with accent hover
- `.section` / `.section-alt` — alternating section backgrounds
- `.track` / `.track-num` / `.track-name` — album tracklist
- `.whatsapp-float` — fixed WhatsApp button (bottom-right)
- `.back-to-top` / `.visible` — scroll-to-top (bottom-left)
- `.mobile-menu` / `.mobile-overlay` — slide-in mobile nav
- `.cta-btn` / `.nav-cta` — call-to-action buttons

### Navigation

Desktop and mobile nav exist in both `index.html` (for the homepage) and `_layouts/default.html` (for blog pages). Nav links use `/#section` anchors so they work from any page. Blog link highlights via Liquid `{% if page.url contains '/blog' %}active{% endif %}`.

### Blog Post Categories

Supported categories with color-coded tags: `espiritualidade`, `ministerio`, `musica`, `eventos`, `reflexao`.

### Adding a Blog Post

Create `_posts/YYYY-MM-DD-slug.md` with front matter:
```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
author: "Author Name"
category: "Ministério"
image: "/assets/image.jpg"
description: "Short description for SEO"
---
```

### Important Patterns

- `index.html` and `_layouts/default.html` share the same header/footer/WhatsApp markup but are **not DRY** — changes to nav or footer must be made in both places.
- AOS (Animate On Scroll) is used only on `index.html` (loaded via unpkg CDN).
- Google Analytics tag `G-D16SF5HL8K` and Google Tag Manager `GTM-M3Q29ZNZ` are present in both `index.html` and `_layouts/default.html`.
- All external links (WhatsApp, social media, streaming) use `target="_blank" rel="noopener noreferrer"`.

## Assets

Images live in [assets/](assets/). Key files: `logo.png`, `favicon.png`, `hero1.png`, `hero2.png`, `confiar-album.png`, `agenda.jpg`, author photos (`Beto.jpg`, `Delliz.jpg`).

## SEO & Integrations

- JSON-LD structured data (MusicGroup schema) in `index.html`
- Jekyll plugins: `jekyll-feed` (RSS at `/blog/feed.xml`), `jekyll-seo-tag`, `jekyll-sitemap` (auto-generates `/sitemap.xml`)
- [robots.txt](robots.txt) for search engines
- Google Search Console verification: [google4935ae81f77f0f51.html](google4935ae81f77f0f51.html)
- `_config.yml` excludes `CLAUDE.md`, `README.md`, `CNAME`, `LICENSE` from the Jekyll build
