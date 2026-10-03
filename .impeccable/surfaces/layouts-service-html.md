---
version: 2
slug: "layouts-service-html"
primary_target: "_layouts/service.html"
related_targets: ["_servicos","_sass/components/_pages.scss"]
---

# Surface brief — Service pages (`/banda-para-missa/`, `/banda-para-festa-de-padroeiro/`, `/banda-para-retiro/`, `/show-de-evangelizacao/`)

Scope: the four intent pages rendered by `_layouts/service.html`. Visitor mode: **Persuade**. Status: **established world, refinement only** — these pages are new, but built strictly from the home's vocabulary (DESIGN.md).

Audience and job: an organizer who searched (or was sent) for one kind of celebration; must understand in one screen what the ministry does for that celebration and invite with the page-specific WhatsApp text. Proof: the facts in the body, the FAQ, related guides. Constraints: ≥ 300 unique words per page; the searcher's words only in `<title>`, H1 and the first paragraph; breadcrumb + `Service` JSON-LD; same world as the home.

## Direction contract

THESIS: a service page is one more section of the home, read on its own: the section header signature (H1 + red bar + lead), the primary button, then a 720px reading column, then the home's own blocks (FAQ items, related cards, "Outras celebrações" cards, the red invitation band).

OWN-WORLD: inherits DESIGN.md unchanged. Page hero = title Display + bar + Lead + `cta-btn`; body = `.post-content` typography; FAQ = `.faq-item`; related = `.post-related-card`; sister celebrations = `a.card`; close = `.cta-section`.

STORY: recognise the celebration in the H1, read the direct answer, scan "como funciona", find the FAQ, invite with the page's own WhatsApp text.

FIRST VIEWPORT: breadcrumb, H1, bar, lead, red button; the first paragraph begins below. Mobile: the button stays above the fold.

REFINEMENT SCOPE: breadcrumb legibility, the related-posts grid when it holds a single card (today it stretches full width), heading rhythm in the body (more space above than below), FAQ chevron target size, consistent CTA label per page. Not in scope: new components, copy changes, URL changes.

FORM: incumbent vocabulary; no new form.

FINISH: same gate as the home — captures, detector, Lighthouse, owner approval.
