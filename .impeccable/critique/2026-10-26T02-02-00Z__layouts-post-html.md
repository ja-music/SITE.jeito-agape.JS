---
target: post festa do padroeiro (conversão)
total_score: 25
max_score: 36
na_heuristics: 9
p0_count: 0
p1_count: 1
target_identity: "file:/Users/idelbertoferreira/development/jeitoagape/SITE.jeito-agape.JS/_layouts/post.html"
target_fingerprint: "sha256:a4211642c113da9f28d8e102826cfe85ae1b8f31b2c514b9a66220e9678d3ba1"
target_path: /Users/idelbertoferreira/development/jeitoagape/SITE.jeito-agape.JS/_layouts/post.html
timestamp: 2026-10-26T02-02-00Z
slug: layouts-post-html
---
Method: dual-agent (A: design review · B: detector + browser). Targets: home and post "Como organizar a festa do padroeiro" (service page /banda-para-festa-de-padroeiro/ as context). GA4 Oct 1–25: 89 sessions, 4 whatsapp_click (all on /), festa post 36 views / 0 contacts, 1.2 pages/session.

## Design Health Score
| # | Heuristic | Home | Post | Key issue |
|---|---|---|---|---|
| 1 | Visibility of status | 3 | 3 | hero hint lacks the service page's "mensagem pronta" line |
| 2 | Real world | 3 | 4 | English leaks (banner FOLLOW US/SUBSCRIBE, Sessions, Wallpapers) |
| 3 | User control | 3 | 3 | ok |
| 4 | Consistency | 2 | 2 | one action: 6 labels, 5 styles, 3 icons; 50px radius off-scale |
| 5 | Error prevention | 3 | 3 | mobile stats overlay over "Ler artigo"; post uses generic prefill |
| 6 | Recognition | 3 | 2 | no CTA in mobile header; post byline lacks role |
| 7 | Flexibility | n/a | 2 | 1,800-word guide without TOC |
| 8 | Aesthetic/minimal | 2 | 3 | ~45% empty first mobile viewport; banner as post cover |
| 9 | Error recovery | 3 | n/a | email alternative |
| 10 | Help | 3 | 3 | FAQ after the red band |
| Total | | 25/36 | 25/36 | Acceptable (69%) |

## Design specificity
Skin is the ministry's (dark stage, grain, heart, parallelogram agenda, "missões", "Convide-nos"); skeleton is the stock band/church site. Faces hidden on mobile until slide 2 (30 s). Post content authored, frame generic, cover = channel banner.
Detector: home 8, post 8, festa page 5. Real: radius 50px (hero link, .post-invite-btn), toast 6px, post 23/32 targets < 44px, home platform-links 37px, float covers text in 21/29 scroll positions on post. False positives (documented identity): overused-font Inter, dark-glow float/carousel, bounce (8px sway), flat-type-hierarchy (sr-only h1), clipped-overflow (root overflow-x).

## Priority issues
- [P1] Festa post has no handoff to /banda-para-festa-de-padroeiro/; only invite at 91% depth (y 10742/11829) with generic prefill. Fix: `servico:` front matter → invite uses service whatsapp_text + cta + link; byline role from authors.yml; optional mid-article invite after "Reservar as atrações musicais" and closing link → service page (needs owner OK). clarify + layout.
- [P1] Hero CTA is a ghost pill (10% border, 13.6px), outshone by the green float and red dot; no CTA in mobile header. Fix: rest state = current hover (solid red, 1rem/600), hint "mensagem pronta" under it, compact nav-cta beside menu on mobile. bolder.
- [P1] Mobile hero: .hero-stats-overlay printed over members' photos (slide 2) and over "Ler artigo" (slide 3); ~170px empty black above carousel. Fix: stats out of the frame on ≤768px, shorter hero so next section peeks. adapt.
- [P2] No visual proof per celebration type (no festa/retiro photos; banner with FOLLOW US as hero and post cover). Live agenda already shows real past events (local copy was stale). Needs owner photos.
- [P2] One action, many faces; home ends on social cards (WhatsApp card last, phone icon; menu CTA calendar icon). Fix: WhatsApp glyph everywhere, WhatsApp card first and wide, 10px radius, 44px targets, post text clear of the float. polish.

## Persona red flags
- Dona Márcia (comissão, 55, mid Android, daylight): festa guide → generic home grid; must delete "(show, festa do padroeiro, retiro ou encontro)" in prefill; no proof of a festa de padroeiro.
- Jordan: no visible "ministério de música católica de BH"; "what does Convide-nos commit me to" answered ~6000px down.
- Casey: only top control is the menu; slide-3 mis-tap; float and back-to-top cover text.

## Minor
Dangling "·" in post meta; post table without column separation on mobile; Instagram in share row isn't a share; footer has no invite; cta_location not registered in GA4 (can't attribute conversions per button).

## Questions
1. Is the festa guide there to rank, or to hand the comissão to "Convide-nos para a festa"?
2. Logo banner or the faces first for a referred visitor?
3. Should the stage's loudest light be the red invite or WhatsApp's green?
