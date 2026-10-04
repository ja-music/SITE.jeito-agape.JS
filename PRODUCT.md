# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary — the person who decides whether to invite the ministry.** Pároco (parish priest), coordenador de pastoral (liturgy or youth), comissão da festa do padroeiro (lay committee), EJC / youth coordination, grupo de oração leaders. They arrive *warm*: someone recommended the ministry or they saw it play, and they google the name on a phone between other duties to answer three things — is this the group people told me about, do they do our kind of celebration, how do I invite them. The decision is relational and trust-based (indication, having seen the band, reviews). It is not search-driven: Google Ads proved the intent keywords ("banda para missa", "banda para festa de padroeiro"…) have low volume (LOPS `docs/PROSPECCAO-PAROQUIAS.md`).

**Secondary (confirmed 2026-10-02).** Fiéis and listeners who already know the ministry — they come for the music (*Confiar*, *Incondicional Sessions*), the monthly Mass, the blog and the wallpapers. Served after the organizer, never instead.

**Tertiary.** Other ministries, journalists and AI assistants looking up the entity "Jeito Ágape".

## Product Purpose

`jeitoagape.com.br` is the public home of Jeito Ágape, a Catholic music ministry from Belo Horizonte (MG), Brazil. It exists so a warm visitor can confirm the ministry is real, serious and right for their celebration, and then **invite it via WhatsApp** — the single conversion: a click on "Convide-nos" opening a pre-filled message that asks for event type, city and date (tracked as GA4 `whatsapp_click` and a Google Ads conversion). Secondary purposes: be the authoritative source about the entity for search engines and LLMs (SEO + GEO), publish the agenda, the album, the Sessions and the blog.

Success: more qualified WhatsApp conversations; the site is the first result for the name with correct, rich information; Lighthouse mobile ≥ 95/100/100/100.

## Positioning

**A ministry, not a hired band.** Confirmed by the owner (2026-10-02) as four truths a neighbouring band could not copy:

- 16 years (since 2010), 500+ "missões" in 100+ cities — historically without charging a fee; evangelization as mission, the community organizes sound and structure.
- Original music: the album *Confiar* (2020, 11 tracks: 10 songs plus one spoken "oracional", produced by Anderson Di Almeida) and the YouTube series *Incondicional Sessions* (chapter 1 "Espírito Poderoso").
- A format that adapts to the celebration: Missa (liturgical), retiro, EJC, festa de padroeiro, show de evangelização, grupo de oração, ministrações, pregações.
- A community of faith that plays: prayer before every stage; members are a community, not session musicians. This is real and is proof material — shown with real photos and real words, never dramatized.

## Operating Context

- Static **Jekyll 4.4** site built by **GitHub Actions**, served by **GitHub Pages** at the apex domain (no custom headers, no server redirects, `cache-control: max-age=600`). The owner edits YAML and Markdown: `_posts/`, `_data/agenda.yml`, `_data/faq.yml` (single source for the visible FAQ and its JSON-LD), `_data/incondicional.yml`, `_data/authors.yml`, `_data/depoimentos.yml` (empty on purpose until real testimonials exist).
- Conversion path: every CTA opens `https://api.whatsapp.com/send?phone=5531991267983&text=…` in a new tab; the owner closes the invitation on WhatsApp. E-mail `contato@jeitoagape.com.br` is secondary.
- Measurement: GA4 `G-HMWJ8YLG75` + Google Ads `AW-18334068087` (conversion label `uxE2CImi3dIcEPfarqZE` on WhatsApp clicks). GTM is being removed (decided 2026-10-02).
- Agenda is hand-maintained; only public events with real date, place and time are listed (SEO rule since 2026-07-24). Monthly Mass: 4th Sunday, 19h, Igreja Nossa Senhora de Lourdes, Contagem – MG.
- Social: Instagram and TikTok `@jeitoagape`, YouTube `@jeitoagape`; *Confiar* on Spotify, Deezer, Apple Music, SoundCloud. Social posts go out through the Orbit publisher in the LOPS repo.
- Local preview runs in the LOPS Docker `site` container (`https://site.jamanager.local`); the owner's Mac cannot run Jekyll natively.

## Capabilities and Constraints

- **Pages (decided 2026-10-02).** Home as hub (keeps section ids `#sobre #servicos #album #sessions #faq #agenda #contato` so old anchor links still land), `/banda-para-missa/`, `/banda-para-festa-de-padroeiro/`, `/banda-para-retiro/` (retiro + EJC), `/sobre/`, `/agenda/`, `/contato/`; later `/show-de-evangelizacao/`, `/confiar/`, `/incondicional-sessions/`. Existing `/blog/`, `/blog/YYYY/MM/DD/slug/`, `/blog/feed.xml`, `/wallpapers/`, `/sitemap.xml`, `/404.html` and every `/assets/*` URL referenced by published OG tags must not change.
- **Performance is a product requirement.** Lighthouse mobile ≥ 95/100/100/100; LCP ≤ 2 s; no third-party script above the fold; analytics after `load`; self-hosted fonts (≤ 2 families, ≤ 4 files, ≤ 120 KB); images as AVIF/WebP with `srcset`; no Tailwind CDN, Lucide or AOS; first-party JS ≤ 25 KB, no libraries.
- **Discoverability (SEO + GEO).** One JSON-LD `@graph` per page with stable `@id`s (`https://jeitoagape.com.br/#musicgroup`, `#website` already indexed); a definitional first sentence and a facts block on every page; FAQ written answer-first; `llms.txt`; `robots.txt` allowing AI crawlers; Bing + IndexNow after launch. Never: fake reviews, `Review`/`AggregateRating` on own testimonials, `LocalBusiness`, city doorway pages, `meta keywords`.
- **Accessibility.** Pinch-zoom allowed (no `maximum-scale`), 44 px touch targets, every control named, `prefers-reduced-motion` respected, text contrast ≥ 4.5:1 over grain.
- **Terminology.** "Jeito Ágape" always with the accent; "ministério de música católica"; "missões" for the count (not "shows"); "Convide-nos" is the CTA verb; "celebração", "paróquia", "comunidade". "Banda" only where the searcher's words are needed (titles and H1 of the service pages), never as the brand's self-description in body copy.
- **Undecided — do not invent.** Travel-expense policy (FAQ item left commented in `_data/faq.yml`); member names and instruments; founding date beyond "2010"; names of parishes served; testimonials (none on file).

## Brand Commitments

Binding, confirmed by the owner 2026-10-02:

- **Symbol and palette are fixed.** The gradient-red heart (`assets/logo.png`; no vector on file — a trace must be approved) and black `#0A0A0A` / red `#C53050` / white.
- **The incumbent look is the established world (owner decision, 2026-10-03).** After seeing three redesign directions the owner kept the current site: Inter, the dark stage with film grain, section title + red accent bar, bordered cards, the hero carousel, the agenda parallelograms, the section order of the home. `DESIGN.md` documents it. Work on the site is **refinement of this world**, never replacement: no new typeface, palette, section structure or copy without an explicit request. Imagery stays open (more real photos and a hero reel are welcome).
- **Incumbent brand artwork** (evidence of the identity, not authority over the new look): `assets/hero1.png` and `assets/hero2.png` — heavy condensed white wordmark "JEITO ÁGAPE" with the heart, "MINISTÉRIO" small above it, fine black grain, a band of crumpled-foil texture with red speckles, slanted photo strips of the six members in black "Ministério Jeito Ágape" T-shirts, and the verse «"Nada pode nos separar do amor de Deus" – Romanos 8,39».
- **Voice.** Catholic, warm, welcoming, hopeful; "Paz e bem"; never corporate, never hype; pt-BR throughout. Emojis only on social, not on the site.
- **Vocabulary.** "Convide-nos", "missões", "ministério". Never "contratar banda" or "orçamento" as headlines, even on pages that rank for those searches.
- **Never promise gratuity as a rule.** Speak of the history (fact) and take the conversation to WhatsApp; the policy can change case by case.

## Evidence on Hand

- Numbers (site/FAQ, owner-confirmed): since 2010; 500+ missões; 100+ cities; 7 members; *Confiar* (2020, 11 tracks = 10 songs + 1 oracional, prod. Anderson Di Almeida); monthly Mass (4th Sunday, 19h, N. Sra. de Lourdes, Contagem).
- Imagery in the repo: `assets/hero1.png` (logo lock-up on grain, 1920×1080), `assets/hero2.png` (six members in photo strips), `assets/confiar-album.png` (cover, 800²), `assets/agenda.jpg`, columnist photos `assets/Beto.jpg` and `assets/Delliz.jpg`, blog covers in `assets/blog/`, Incondicional Sessions #001 cover on R2 (`https://pub-b07d240f6cf240969a26c85f8e6496f6.r2.dev/covers/capa-is-001-espirito-poderoso.png`), wallpapers in `assets/wallpapers/`.
- Owner will provide: more live photos and videos by event type, and a < 60 s reel on YouTube for the hero (link pending).
- Blog: 6 posts by Beto Ferreira (theology student, composer and vocalist); columnist Delliz Christine. Two posts are organizer-facing guides ("Quanto custa contratar uma banda para missa ou festa paroquial?", "Como organizar a festa do padroeiro").
- Absent — do not fabricate: testimonials, parish names and addresses served, reviews, press, member bios beyond the two columnists, upload dates and durations of the Sessions, a vector logo.

## Product Principles

1. **Convert the warm visitor in one screen.** Who we are, what we do, proof, "Convide-nos" — before any scroll.
2. **Prove with the real thing.** Real numbers, photos, music and agenda; a gap stays visible as a gap, never filled with stock imagery or invented claims.
3. **Mission voice over sales voice.** Invite, don't sell; ranking pages speak the searcher's words in titles but the ministry's words in copy.
4. **Fast on a parish phone.** Performance and accessibility are brand traits, not engineering niceties.
5. **One truth, many readers.** Facts live once (data files) and feed the page, the JSON-LD and `llms.txt` together.

## Accessibility & Inclusion

Decision-makers are often older, on mid-range Android phones, in daylight. Zoom must work, text must stay legible over any grain or photo, every control must be keyboard-reachable and named, and motion must be optional.
