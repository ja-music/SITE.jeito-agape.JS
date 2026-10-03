---
name: Jeito Ágape
description: Palco escuro, coração vermelho — o sistema visual do site do ministério, extraído do código em 2026-10-03.
colors:
  night: "#0A0A0A"
  charcoal: "#111111"
  agape-red: "#C53050"
  agape-red-lit: "#d4365a"
  agape-red-text: "#e8657e"
  white: "#FFFFFF"
  white-soft: "rgba(255, 255, 255, 0.75)"
  white-muted: "rgba(255, 255, 255, 0.5)"
  hairline: "rgba(255, 255, 255, 0.06)"
  whatsapp-green: "#25D366"
  tag-espiritualidade: "#818cf8"
  tag-ministerio: "#e8657e"
  tag-musica: "#eab308"
  tag-eventos: "#4ade80"
  tag-reflexao: "#c084fc"
typography:
  display:
    fontFamily: "Inter, Inter Fallback, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, Inter Fallback, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, Inter Fallback, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 600
    lineHeight: 1.5
  body:
    fontFamily: "Inter, Inter Fallback, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  lead:
    fontFamily: "Inter, Inter Fallback, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.7
  label:
    fontFamily: "Inter, Inter Fallback, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    letterSpacing: "0.08em"
  nav:
    fontFamily: "Inter, Inter Fallback, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
    letterSpacing: "0.05em"
rounded:
  tag: "4px"
  pill: "8px"
  button: "10px"
  card: "12px"
  frame: "16px"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section-mobile: "5rem 1.5rem"
  section: "7rem 2rem"
components:
  button-primary:
    backgroundColor: "{colors.agape-red}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "0.9rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.agape-red-lit}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "0.9rem 2rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "0.9rem 2rem"
  nav-cta:
    backgroundColor: "{colors.agape-red}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 1.2rem"
  pill:
    backgroundColor: "transparent"
    textColor: "{colors.white-muted}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.9rem"
  card:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "2rem"
  tag:
    backgroundColor: "rgba(197, 48, 80, 0.15)"
    textColor: "{colors.tag-ministerio}"
    rounded: "{rounded.tag}"
    padding: "0.25rem 0.7rem"
---

# Design System: Jeito Ágape

## Overview

**Creative North Star: "O palco apagado antes da primeira nota"**

O site é um palco escuro: fundo quase preto com grão de filme, luz branca só onde há palavra, e um único vermelho — o do coração da marca — marcando o que importa: a barra sob cada título, o botão de convite, os ícones. Nada brilha por brilhar; a sensação é de teatro paroquial à noite, com a banda prestes a tocar. É quente sem ser colorido, sério sem ser corporativo.

A densidade é editorial e calma: seções largas com muito ar (7rem de respiro), títulos centrados com a barra vermelha embaixo, textos curtos em cinza suave. Os blocos de conteúdo são cartões escuros com borda de 1px quase invisível — a profundidade vem de camadas tonais (#0A0A0A → #111111), não de sombra. O movimento é discreto: as seções sobem e aparecem uma vez ao rolar, o carrossel do herói flutua devagar, o coração do logo bate.

Rejeições confirmadas pelo dono (2026-10-03): nenhuma paleta nova, nenhuma fonte nova, nenhuma reestruturação das seções. Este arquivo descreve o mundo estabelecido para que a lapidação o refine sem substituir.

**Key Characteristics:**
- Fundo noturno com grão de filme a 5% sobre tudo
- Um só acento (vermelho #C53050) em menos de 10% de qualquer tela
- Inter em todos os papéis; hierarquia por peso (300 / 400 / 500 / 600 / 700), não por família
- Cartões e painéis separados por borda de 1px a 6% de branco, nunca por sombra em repouso
- Título centrado + barra vermelha de 40×3px abre toda seção
- Movimento mínimo e desligável (`prefers-reduced-motion`)

## Colors

Preto quente, branco em três intensidades e um vermelho só — mais o verde do WhatsApp, que é da plataforma, não da marca.

### Primary
- **Vermelho Ágape** (#C53050): o coração da marca. Barra de acento sob títulos, botão primário, ícones dos cartões, links no corpo dos posts, dot ativo do carrossel, dia do evento na agenda. Em texto pequeno sobre #111111 rende 3,5:1 — use só em tamanho ≥ 1rem/600 ou como cor de ícone; para texto pequeno sobre superfícies escuras prefira **Vermelho Ágape aceso** (#d4365a, hover) ou o branco.
- **Vermelho Ágape aceso** (#d4365a): estado de hover dos botões e links.
- **Vermelho Ágape para texto** (#e8657e, `--accent-text`): o mesmo vermelho clareado para texto pequeno — 6,2:1 sobre noite e 5,9:1 sobre carvão. Usado em "Como funciona →", número das faixas, etiqueta das Sessions, rótulos dos fatos, links no corpo dos posts e no índice do blog. É a cor das etiquetas "ministério" do blog, promovida a token em 2026-10-03.

### Neutral
- **Noite** (#0A0A0A): fundo da página e das seções principais.
- **Carvão** (#111111): superfícies elevadas — cartões, cabeçalho, seções alternadas (`section-alt`), rodapé do menu.
- **Branco** (#FFFFFF): títulos, texto principal, ícones em repouso.
- **Branco suave** (rgba 255/0.75): parágrafos de leitura (Quem Somos, páginas internas).
- **Branco apagado** (rgba 255/0.5): subtítulos, textos de apoio, navegação em repouso, legendas. Abaixo disso a legibilidade sobre o grão cai — é o piso.
- **Fio** (rgba 255/0.06): toda borda e divisória.

### Tertiary
- **Verde WhatsApp** (#25D366): exclusivo do botão flutuante; não é cor da marca.
- **Cores das categorias do blog** (#818cf8 espiritualidade, #e8657e ministério, #eab308 música, #4ade80 eventos, #c084fc reflexão): só nas etiquetas de categoria, sempre sobre fundo da mesma matiz a 15%.

### Named Rules
**A Regra do Único Vermelho.** O vermelho aparece em menos de 10% de qualquer tela: barra, botão, ícones, links. A raridade é o que faz o botão de convite saltar. A única exceção é a faixa de convite (`cta-section`), que inverte: fundo vermelho inteiro, texto branco.

**A Regra do Vermelho em Texto.** `#C53050` só em superfícies, ícones, barra e texto ≥ 1.1rem/600. Texto menor que precise ser vermelho usa `--accent-text` (#e8657e); nunca o vermelho da marca a 3,5:1.

**A Regra do Grão.** Um grão de filme fixo (SVG `feTurbulence`, 140px, opacidade 5%) cobre a página inteira acima de tudo. Ele é parte da identidade; qualquer contraste é medido com ele por cima.

## Typography

**Display Font:** Inter (variável 300–700, auto-hospedada, subset latino) com "Inter Fallback" (Arial com métrica ajustada)
**Body Font:** Inter — a mesma família
**Label/Mono Font:** nenhuma; etiquetas são Inter em caixa alta com tracking

**Character:** uma só família, neutra e limpa; a hierarquia nasce do peso e do tamanho, não do contraste entre fontes. Títulos pesados (700) com tracking negativo; corpo leve (300–400) em cinza; etiquetas pequenas em caixa alta espaçada.

### Hierarchy
- **Display** (700, clamp(1.8rem, 4vw, 2.5rem), -0.02em): títulos de seção e H1 das páginas internas. Sempre centrados e seguidos pela barra de acento.
- **Headline** (700, 1.5rem, -0.01em): H2 dentro do corpo dos posts e das páginas de serviço. H3 de corpo: 600, 1.2rem.
- **Title** (600, 1.1rem): título dos cartões (serviços, contato, relacionados).
- **Body** (400, 1rem, 1.7): parágrafos. Nos cartões o texto cai para 0.9rem em branco apagado. Medida de leitura: 720px (≈ 70ch) nos posts e páginas.
- **Lead** (300, 1rem, 1.7, branco apagado, max 560px): subtítulo sob o título da seção.
- **Label** (600, 0.7rem, caixa alta, 0.08em): etiquetas de categoria, mês na agenda, rótulos de fatos.
- **Nav** (500, 0.85rem, caixa alta, 0.05em): links do cabeçalho, em branco apagado; branco no hover/ativo.

### Named Rules
**A Regra do Peso.** Quando precisar de ênfase, suba o peso ou o tamanho; nunca mude a família nem use gradiente no texto.

**A Regra do Piso.** Nenhum texto funcional abaixo de 0.75rem (12px) — vale para o overlay de números do herói, etiquetas, meses da agenda e handles dos cartões de contato (todos subidos ao piso em 2026-10-03).

## Layout

Página de uma coluna com contêineres centrados em quatro larguras herdadas do Tailwind: 48rem (texto corrido), 56rem (FAQ, contato, páginas), 64rem (grades de cartões, álbum, sessions) e 72rem (cabeçalho). Seções com `padding: 7rem 2rem` no desktop e `5rem 1.5rem` até 768px; o herói ocupa 100vh (100svh no celular) e centra o carrossel.

Grades: cartões em 1 → 2 (≥768px) → 3 (≥1024px) colunas com `gap: 1.5rem`; álbum em 1 → 2 (≥1024px) com `gap: 2.5rem`; cartões de contato em 2 → 3 (≥768px) → 5 (≥1024px) com `gap: 1rem`; agenda em 1 → `1fr 2fr` (≥768px). Todas as colunas são `minmax(0, 1fr)`, para o conteúdo nunca alargar a grade.

Ritmo vertical: título → barra (1rem acima, 1.5rem abaixo) → subtítulo (4rem abaixo) → conteúdo. Dentro dos cartões, `padding: 2rem` e `gap` de 0.75rem entre ícone, título e texto. Escala de espaço: 0.5 / 0.75 / 1 / 1.5 / 2 / 2.5 / 4 / 5 / 7rem.

Cabeçalho fixo de 67px (logo 34px, `padding: 1rem 1.5rem`) que ganha fundo carvão e borda ao rolar; no celular vira um botão de menu de 44px abrindo um painel lateral de 80% (máx. 320px).

## Elevation & Depth

Sistema plano com camadas tonais. Em repouso, nada tem sombra: um cartão é carvão (#111111) sobre noite (#0A0A0A) com fio de 1px a 6% de branco. A hierarquia de profundidade é fundo → seção alternada → cartão → cabeçalho fixo.

Sombras só existem em três lugares, cada um com motivo: o carrossel do herói (é o objeto do palco), os estados de hover (o cartão "levanta" 2–3px e ganha brilho vermelho) e o botão flutuante do WhatsApp (precisa descolar da página).

### Shadow Vocabulary
- **Palco** (`box-shadow: 0 20px 60px rgba(0,0,0,.5), 0 0 100px rgba(0,0,0,.25), 0 0 3px rgba(197,48,80,.12)`): só o carrossel do herói. O halo é da identidade; não copiar para outros elementos.
- **Levantar** (`0 8px 30px rgba(197,48,80,.3)` ou `0 8px 30px rgba(0,0,0,.2)`): hover de botões primários e cartões de sessão, junto com `translateY(-2px)`.
- **Flutuante** (`0 4px 20px rgba(37,211,102,.3)`): o botão do WhatsApp.
- **Modal** (`0 8px 40px rgba(0,0,0,.3)`): painel do menu e modal de autor.

### Named Rules
**A Regra da Borda, Não da Sombra.** Superfícies em repouso se separam por tom e fio de 1px. Uma sombra em repouso fora do carrossel e do botão flutuante está errada.

## Shapes

Cantos arredondados em escala curta e consistente: etiqueta 4px, pílula e botão de navegação 8px, botão 10px, cartão 12px, moldura (carrossel, imagem de post, cartão de sessão) 16px, círculos (avatares, botões flutuantes, dots) e pílulas completas (9999px) para os links-pílula. Bordas sempre de 1px no fio; o botão primário tem borda de 2px na própria cor.

A exceção geométrica é a agenda: itens em paralelogramo (`clip-path: polygon(3% 0, 100% 0, 97% 100%, 0 100%)`) e a foto da banda inclinada com brilho vermelho — a assinatura visual da seção, não um padrão para repetir.

Ícones: SVG inline de traço único (1.5–2px), 1rem a 2.5rem, na cor do contexto (vermelho nos cartões, branco apagado no cabeçalho e redes).

## Components

### Buttons
- **Shape:** cantos de 10px; botão da navegação 8px; pílulas 8px ou totalmente redondas.
- **Primary** (`cta-btn`): vermelho sobre texto branco 600 / 1rem, `padding: 0.9rem 2rem`, borda 2px vermelha, ícone de 1.25rem à esquerda com `gap: 0.6rem`. Hover: vermelho aceso, `translateY(-2px)` e sombra Levantar.
- **Outline** (`cta-btn-outline`): transparente, texto branco, borda 2px a 30% de branco; hover: borda branca e fundo a 10%. Usado só na faixa de convite vermelha.
- **Nav CTA** (`nav-cta`): o mesmo vermelho em 0.85rem / 600, `padding: 0.45rem 1.2rem`, 8px.
- **Pill** (`platform-link`, `pill-link`): borda no fio, texto apagado 0.8rem / 500, ícone 1rem; hover: texto branco, borda vermelha, fundo vermelho a 10%.
- **Hero link** (`hero-cta-link`): pílula completa, texto branco a 85%, borda a 15%; o convite do herói.
- **Focus:** contorno branco de 2px a 3px de distância (`:focus-visible`), em todos os controles.

### Chips
- **Category tag:** 0.7rem / 600, caixa alta, 0.08em, `padding: 0.25rem 0.7rem`, 4px; cor da categoria sobre a mesma matiz a 15%. Sem estado interativo.

### Cards / Containers
- **Corner Style:** 12px (`card`, `link-card`, `post-related-card`); 16px nas molduras de imagem.
- **Background:** carvão.
- **Shadow Strategy:** nenhuma em repouso; hover muda a borda para vermelho (cartões de serviço e contato) ou levanta com sombra (cartão de sessão).
- **Border:** 1px no fio.
- **Internal Padding:** 2rem (cartão), 2rem 1.5rem (link-card), 1.25rem (colunista).

### Inputs / Fields
- **Style:** só o formulário de inscrição do blog: fundo carvão, borda no fio, 8px, `padding: 0.75rem 1rem`, texto branco.
- **Focus:** borda vermelha.

### Navigation
- Links em caixa alta 0.85rem / 500 em branco apagado; hover e ativo em branco; o item ativo ganha `aria-current`. CTA vermelho à direita. Cabeçalho transparente sobre o herói, carvão com fio ao rolar. Menu móvel em `<dialog>` lateral (80% / 320px) com links de 1rem separados por fio e o CTA em largura total.

### Section header (signature)
Título Display centrado, barra vermelha 40×3px (1rem acima, 1.5rem abaixo), subtítulo Lead em branco apagado limitado a 560px, 4rem de respiro antes do conteúdo. Toda seção da home e toda página interna abre assim.

### Hero carousel (signature)
Moldura de 16px com fio e sombra Palco, 960px máx (90vw), três slides em crossfade de 1.8s com leve desfoque (slides inativos ficam `visibility: hidden` + `inert`: não recebem foco), overlay de números na base (0.75rem, quebra em duas linhas no celular), dots de 8px dentro de botões de 24px, ícones sociais numa coluna à direita (linha no celular; alvo de 44px por padding negativo) e um indicador de rolagem que balança. Flutua 6s em loop; tudo isso para com `prefers-reduced-motion`.

### FAQ item
`<details>` com `summary` em 0.95rem / 500 a 90% de branco, chevron de 1rem à direita que gira 180° ao abrir, resposta em 0.9rem apagada; divisórias no fio.

### Agenda item
Paralelogramo carvão com dia em vermelho (1.6rem / 700) e mês em etiqueta, título 600 e meta apagada. Evento passado: dia e título em branco apagado + etiqueta "Realizada" (`.agenda-status`), nunca opacidade ou risco (lia como cancelada e dava 1,5:1). Foto da banda em moldura inclinada com brilho vermelho pulsante.

## Do's and Don'ts

### Do:
- **Do** abrir toda seção com título centrado + barra vermelha de 40×3px + subtítulo apagado; é a assinatura do site.
- **Do** separar superfícies por tom (#0A0A0A → #111111) e fio de 1px; reservar sombra para hover, carrossel e botão flutuante.
- **Do** manter o vermelho em menos de 10% da tela e usar o branco aceso só para hover/ativo.
- **Do** usar Inter em todos os papéis e diferenciar por peso: 700 títulos, 600 subtítulos e botões, 500 navegação, 300–400 corpo.
- **Do** manter cantos na escala 4 / 8 / 10 / 12 / 16px e círculos completos para avatares e botões flutuantes.
- **Do** medir contraste com o grão por cima: texto funcional ≥ 4,5:1, piso de opacidade 50% para apoio e 75% para leitura.
- **Do** dar 44px de área de toque a todo controle, mesmo quando o desenho visível é menor (dots, chevrons, ícones sociais); todo link que abre o WhatsApp leva o glifo do WhatsApp e um aviso `sr-only` de nova aba.
- **Do** desligar loops (float, heartbeat, bounce, agenda-pulse, desfoque dos slides) com `prefers-reduced-motion`.

### Don't:
- **Don't** introduzir outra família tipográfica, gradiente em texto ou vermelho diferente do #C53050.
- **Don't** colocar sombra em repouso em cartões, botões ou seções.
- **Don't** usar o vermelho em texto abaixo de 1rem sobre carvão (3,5:1): use branco, branco apagado ou o vermelho aceso só em hover.
- **Don't** usar borda lateral colorida grossa como destaque; o destaque é a barra de 3px sob o título ou a borda de 1px que vira vermelha no hover.
- **Don't** justificar texto: cartões, Quem Somos e a nota do álbum são alinhados à esquerda desde a lapidação de 2026-10-03; prosa fica entre 65 e 80 caracteres por linha (`.sobre-text` 42rem, `.post-content` 42rem).
- **Don't** reordenar, renomear ou remover as seções da home (`#sobre #servicos #album #sessions #faq #agenda #contato`) nem mudar o padrão título-barra-subtítulo.
