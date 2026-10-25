---
# MODELO de post da categoria Música. Copie para _posts/AAAA-MM-DD-slug.md e apague o que não usar.
# Jekyll ignora a pasta _drafts/ no build: este arquivo nunca vai ao ar.
#
# Regras da casa (PRODUCT.md / CLAUDE.md do site):
# - pt-BR, voz do ministério: católica, acolhedora, sem hype. Nunca "banda" como rótulo.
# - Primeira frase define o assunto (quem não conhece a canção entende do que se trata).
# - Cover de outro artista SEMPRE credita quem compôs/gravou e linka a gravação original.
# - Nunca inventar compositor, data, história ou nome de paróquia. Sem certeza, omita o campo.
# - A data não pode ser futura (o site não publica posts com data à frente do build).
layout: post
title: "Título da canção ou do assunto"
date: 2026-01-01 18:00:00 -0300
author: "Beto Ferreira"
category: "Música"
image: "/assets/blog/<capa>.jpg"          # foto real (ensaio, palco). Original em assets/src/blog/<capa>.jpg
og_image: "/assets/blog/<capa>-og.jpg"    # 1200×630, opcional
description: "Uma frase de até 160 caracteres que responde: sobre o que é este texto e por que ler."
faq: []                                   # ids de _data/faq.yml (ex.: [musica-pout-pourri]) → FAQ visível + FAQPage

# Ficha da(s) canção(ões). Um item por canção; o pout-pourri tem três.
musicas:
  - titulo: "Nome da canção"
    autor: "Quem compôs"                  # OMITA se não tiver certeza
    interprete: "Quem gravou a referência"
    gravacao: "Nome do disco ou 'ao vivo'"
    album: "Confiar"                      # só para as nossas faixas: liga ao álbum no site
    autoral: true                         # true = canção do Jeito Ágape
    tom: "D"
    tom_original: "F"                     # só se mudamos o tom
    bpm: 140
    youtube: "https://www.youtube.com/watch?v=…"
    spotify: "https://open.spotify.com/track/…"

# Vídeo (opcional). Prefira mp4 do R2 público (toca no site); youtube só entra no clique.
video:
  youtube: "ID_DO_VIDEO"
  mp4: ""
  capa: ""                                # poster; sem ele usa a capa do post
  titulo: "Nome — artista (gravação)"
---

Primeira frase: diga o que é a canção (ou o assunto) e por que ela importa aqui.

## A história (série "A história por trás da canção")

Quem compôs, de que experiência ou versículo nasceu, o que a letra diz. Só o que o compositor
confirmou. Cite o versículo com livro, capítulo e versículo.

## Por que cantamos isso (série de liturgia)

O que a Igreja pede neste momento da celebração. Cite o documento e o número
(Sacrosanctum Concilium 112–121; Musicam Sacram; IGMR nn. 39–41).

## Como montamos (série de repertório)

Tom, andamento, emendas, o que mudou em relação à gravação original e por quê.

## Onde ouvir

Links para a gravação de quem é dono da canção. Para as nossas, Spotify e YouTube do álbum.

Feche com uma pergunta para quem lê. O bloco "Qual música você quer ver aqui?" com o WhatsApp
entra sozinho em todo post da categoria Música.
