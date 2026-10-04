---
version: 2
slug: "layouts-post-html"
primary_target: "_layouts/post.html"
related_targets: ["blog/index.html","_sass/components/_post.scss","_sass/components/_blog.scss"]
---

# Surface brief — Blog posts (`/blog/YYYY/MM/DD/slug/`) and blog index

Scope: `_layouts/post.html` and `blog/index.html`. Visitor mode: **Read**. Status: **established world, refinement only** — the post and index keep the look the live site has today (verified by pixel parity on 2026-10-03).

Audience and job: organizers and fiéis reading a guide or a reflection; comprehension first, then the quiet invitation at the end. Constraints: URLs unchanged; `BlogPosting` + `BreadcrumbList` JSON-LD; pt-BR dates; category tags; share links; related posts; reading time.

## Direction contract

THESIS: the post is the site's reading register: cover framed at 16px, category tag, H1, meta row, 720px column of Inter at 1.05rem/1.8, red underlined links, the `.post-invite` card and three related cards at the end.

OWN-WORLD: inherits DESIGN.md unchanged; the only page-specific pieces are the category tag colours and the share row.

STORY: read, understand, share, and (for organizer posts) follow the link to the matching service page.

FIRST VIEWPORT: back link, cover, tag, H1, date · author · reading time, first paragraph.

REFINEMENT SCOPE: the share row overflowing on phones (must wrap), kramdown tables on phones (horizontal scroll container), blockquote and list rhythm, `.post-invite` contrast, the blog index featured card meta wrapping. Not in scope: typography family, colours, markup of posts (Markdown stays as the authors wrote it).

FORM: incumbent; no new form.

FINISH: same gate as the home.
