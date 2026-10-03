---
version: 2
slug: "index-html"
primary_target: "index.html"
related_targets: ["_layouts/home.html","_includes/home","_sass"]
---

# Surface brief — Home (`/`)

Scope: the home page of jeitoagape.com.br. Visitor mode: **Persuade**. Status: **established world, refinement only** (owner decision 2026-10-03; see PRODUCT.md › Brand Commitments and DESIGN.md).

Audience and job: a parish organizer (pároco, coordenador de pastoral, comissão da festa) arriving warm on a phone after a recommendation, deciding whether to invite the ministry and how. Action: tap "Convide-nos" (WhatsApp with pre-filled message). Proof: real numbers (desde 2010, 500+ missões, 100+ cidades, 7 integrantes), the band photo, the album, the Sessions, the monthly Mass. Constraints: palette, Inter, section order and ids (`#sobre #servicos #album #sessions #faq #agenda #contato`), the hero carousel, the title + red bar signature all stay; Lighthouse mobile ≥ 95; no third-party above the fold.

Unresolved (owner): a < 60 s reel for the hero (link pending), more live photos by event type, testimonials (none on file), a vector logo.

## Direction contract

THESIS: the home is the dark stage the ministry already owns — hero carousel on black with film grain, one red accent, Inter — kept exactly as the visitor remembers it and finished to the craft floor.

OWN-WORLD: DESIGN.md is the law. Night `#0A0A0A`, charcoal `#111111`, Ágape red `#C53050` under 10% of the screen, white in three intensities, 1px hairlines instead of shadows, Inter 300–700, radii 4/8/10/12/16, title + 40×3 bar + muted lead on every section, bordered cards, the parallelogram agenda, the floating WhatsApp button.

STORY: recognise the heart and wordmark, read the tally, scan the six celebrations, hear the album, see the next Mass, tap "Convide-nos".

FIRST VIEWPORT: unchanged — transparent header with heart and uppercase nav, carousel with logo lock-up, stats overlay, dots, social column, "Convide para Seu Evento" pill, scroll indicator. Mobile 390×844: carousel full width under the header, pill visible without scrolling.

REFINEMENT SCOPE (what the lapidação may touch): minimum text sizes (hero stats overlay at 0.55rem), contrast of red text on charcoal (card "Como funciona" links), 44px targets (carousel dots, FAQ summaries), justified text without hyphens in cards, the `padding-left` transition on tracks, the album pills wrapping on phones, the share row overflowing on phones, flat h1 hierarchy for screen readers, one authored reveal instead of the identical fade-up on every block, reduced-motion coverage. Not in scope: palette, type family, section order, copy, carousel behaviour, URLs.

FORM: incumbent; no seed, no candidate list — the owner chose the existing site over three alternatives.

FINISH: the pass ends with before/after captures (1440 and 390), the detector at or below the live baseline with no new rule, Lighthouse a11y 100, DESIGN.md kept current, and the owner's approval on the PR before deploy.
