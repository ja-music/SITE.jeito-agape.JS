---
target: service page (_layouts/service.html)
total_score: 29
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 3
target_identity: "file:/Users/idelbertoferreira/development/jeitoagape/SITE.jeito-agape.JS/_layouts/service.html"
target_fingerprint: "sha256:56dfc445a2c655920af4441d1ff74640734cf6b66df2d5036368e8c802fd8e28"
target_path: /Users/idelbertoferreira/development/jeitoagape/SITE.jeito-agape.JS/_layouts/service.html
timestamp: 2026-10-03T18-57-46Z
slug: layouts-service-html
---
Method: dual-agent (A: design review sub-agent · B: detector/browser sub-agent) — target `_layouts/service.html`, rendered at http://localhost:4010/banda-para-missa/ (local build, 2026-10-03).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Breadcrumb com `aria-current`, mas sem `.nav-link.active` nas páginas de serviço; botão do herói não diz que abre o WhatsApp em nova aba |
| 2 | Match System / Real World | 4 | As palavras do pároco; "Banda" confinada ao `<title>` e à migalha |
| 3 | User Control and Freedom | 3 | WhatsApp/mail em `_blank` sem aviso; `<details>` nativo |
| 4 | Consistency and Standards | 3 | `.card p` justificado vs corpo alinhado; `.page-section` 4rem vs home 7rem; o float usa o texto genérico enquanto os botões da página dizem "…para uma Missa" |
| 5 | Error Prevention | 4 | "Cidade e data:" pré-preenchido evita a primeira mensagem vaga |
| 6 | Recognition Rather Than Recall | 3 | H2 são perguntas do organizador; a resposta sobre cachê só dentro de um `<details>` fechado |
| 7 | Flexibility and Efficiency | n/a | superfície Persuade de visita única |
| 8 | Aesthetic and Minimalist Design | 3 | Vermelho único respeitado; lead ≈ primeiro parágrafo; 1072 px de cards irmãos entre o leitor e a faixa final no celular |
| 9 | Error Recovery | 3 | `mailto:` sem endereço visível |
| 10 | Help and Documentation | 3 | A FAQ é a ajuda; "Todas as perguntas" sai para `/#faq` |
| **Total** | | **29/36** | **Good (81 %)** |

## Design Specificity Verdict

**LLM assessment:** no mundo, não genérica: título + barra + lead + `cta-btn`, alternância carvão, fios — lê como mais uma seção da home. A especificidade, porém, mora no corpo (ato penitencial, salmo, missa aberta do 4º domingo), não no desenho: o primeiro ecrã é só texto e o lead repete a primeira frase do corpo. Refinada mas pouco provada acima da dobra.

**Deterministic scan:** 8 achados — `line-length` (coluna de 720 px a 16,8 px = 86 caracteres), `undersized-ui-text` ("Eventos" em `.post-related-cat` a 10,88 px), `justified-text` ×3 (os três `a.card > p` de "Outras celebrações"), `dark-glow` ×2 (o mesmo botão do WhatsApp contado duas vezes), `overused-font` (Inter, decisão travada). Nas páginas irmãs o padrão se repete (8–14 por página); só `/agenda/` tem `skipped-heading` (h1 → h3) e `/sobre/` + `/contato/` têm o vermelho `#C53050` em texto pequeno a 3,7:1 (`.page-facts dt`). Scan dos fontes: só falsos positivos de fragmento Liquid.

**Browser evidence:** sem overlay (sessão sem aba visível). Sem rolagem horizontal em 390 nem em 1440. Cinco alvos abaixo de 24 px de altura, todos links de texto (migalhas a 19 px e links de prosa — exceção inline da WCAG 2.5.8). Medidos contra o fundo real: `.post-related-cat` 3,57:1 e `.card__more` 3,52:1 (falham AA); migalhas, lead, corpo e FAQ passam (5,3:1 a 15:1).

## Overall Impression

A página responde "fazem a minha Missa?" e "como convido?" no primeiro ecrã — H1 direto e botão vermelho. O que a enfraquece é o acabamento: um lead de 35 palavras em peso 300 e 50 % de branco (7 linhas no celular), o float que esquece em que página está, o botão que não diz que é WhatsApp, e vermelho em texto pequeno que falha contraste. Maior oportunidade: tratar o lead como parágrafo de leitura e dar ao float o texto da página.

## What's Working

- Continuação fiel da home — sem cheiro de template.
- A melhor coluna de leitura do site: 720 px, 16,8/31 px, H2 de 24 px com 40/16 px acima/abaixo.
- História de teclado completa: skip link, 33 paradas lógicas, todas com anel visível; FAQ abre com Enter; chevron `aria-hidden`.

## Priority Issues

1. **[P1] `.page-hero .lead` no celular.** 35 palavras no papel de subtítulo de uma linha (o da home tem 12): 7 linhas em 300/50 % antes do único botão. **Fix:** `--text-soft` (75 %) + peso 400, como o DESIGN.md prescreve para parágrafos de leitura das páginas internas. → typeset
2. **[P1] O float esquece a página.** `whatsapp-float.html` usa `wa_url_geral` ("…para um evento"); os dois botões da página dizem "…para uma Missa". Casey toca no verde. **Fix:** `{{ wa_url }}` (já resolvido por `wa-vars.html`). → optimize
3. **[P1] O botão do herói esconde o meio.** Ícone genérico de balão, rótulo sem WhatsApp, `_blank`. **Fix:** glifo do WhatsApp + linha de apoio apagada sob o botão + aviso para leitor de tela. → clarify
4. **[P2] Vermelho em texto pequeno.** `.post-content a` `#C53050` a 16,8 px = 3,69:1; `.post-related-cat` 10,9 px; `.card__more` 12,8 px a 3,52:1. **Fix:** um tom de vermelho para texto (≥ 4,5:1 sobre noite e carvão); etiqueta a 0,75rem. → harden
5. **[P2] Grade de relacionados com um card só.** `.related-grid` resolve para `896px 0 0 0`: um letterbox de 896×196 do banner. **Fix:** `repeat(auto-fit, minmax(220px, 300px))` centrado; `.card p { text-align: left }` (rios a 328/342 px). → layout

## Persona Red Flags

- **Jordan:** nova aba surpresa para o WhatsApp; o card relacionado "Quanto Custa Contratar uma Banda…" usa a palavra banida na página; "ministério vs banda" é explicado — bom.
- **Casey:** 7169 px (8,5 ecrãs); 1072 px de cards irmãos antes da faixa; float verde sobre o texto; provavelmente toca no float genérico.
- **Sam:** ordem boa; H2 consecutivos "Perguntas de quem organiza" / "Para quem está organizando" quase homófonos; `_blank` sem aviso; anel do botão da faixa é rosa-claro de 2 px (fora do sistema).
- **Pároco:** migalhas a 12,8 px, respostas da FAQ a 14,4 px e 50 %, etiqueta a 10,9 px, links a 3,7:1 à luz do dia; nenhuma foto ou som antes da FAQ; o convite da missa aberta a 4 ecrãs; botões de 57 px e zoom liberado — certos.

## Minor Observations

- `.page-hero h1` herda `line-height: 1.5` (43 px em 28,8 px); `text-wrap: balance` arrumaria "para a / sua Missa".
- Gutters no celular: herói/FAQ/cards 24 px, `.page-body.px-4` 16 px.
- Migalha da página irmã usa `page.title` ("Banda para Festa de Padroeiro") e quebra em 46 px a 390 px; `short` caberia.
- "Enviar E-mail": borda a 40 % de branco sobre vermelho = 1,98:1.
- `.page-section` 4rem vs home 7rem; `.post-related-grid` deixa três colunas de 0 px (grade do rodapé do post reaproveitada).

## Questions to Consider

1. Se o lead e o primeiro parágrafo são a mesma frase, qual é para o Google e qual é para o pároco — o lead poderia virar a linha de números que o herói da home já tem?
2. Um clipe de 15 s de um Salmo num presbitério real responderia "fazem a minha Missa?" melhor que 600 palavras; a imagem é "aberta" — por que este é o único herói do site sem moldura?
3. Quatro portas para o WhatsApp (nav, herói, faixa, float) e uma esquece em que página está — o float deveria existir em páginas que já têm o próprio botão, ou virar ele?
