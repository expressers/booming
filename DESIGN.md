---
name: BOOMING Soluções Aéreas
description: Tecnologia aérea ao serviço da limpeza, manutenção e inspecção de infra-estruturas.
colors:
  navy: "#192730"
  navy-deep: "#111c23"
  navy-2: "#2d3d4b"
  white: "#ffffff"
  paper: "#f5f6f7"
  line: "#dfe3e6"
  lime: "#91d336"
  lime-hover: "#a3df52"
  error: "#c2412d"
  error-text: "#b03a26"
typography:
  display:
    fontFamily: "Lufga, Ubuntu, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 7vw, 6.25rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Lufga, Ubuntu, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 4.25rem)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Lufga, Ubuntu, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
  body:
    fontFamily: "Ubuntu, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Ubuntu, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
  small:
    fontFamily: "Ubuntu, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
rounded:
  control: "4px"
spacing:
  gutter-mobile: "20px"
  gutter-desktop: "40px"
  container: "1320px"
  section: "96px / 144px"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    height: "52px"
    padding: "0 24px"
  button-primary-hover:
    backgroundColor: "{colors.lime-hover}"
  button-navy:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    height: "52px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    height: "52px"
---

# Design System: BOOMING Soluções Aéreas

## Overview

**Creative North Star: "A passagem de limpeza"**

O site é um voo. Abre colado ao vidro de uma torre e, com o scroll, o drone afasta-se até a cidade inteira ficar à vista. Daí em diante cada imagem é descoberta de cima para baixo por uma aresta lima, como um drone a descer uma fachada, e os serviços passam de lado como as faixas de um trabalho em altura. Cinematográfico porque o cliente vende tecnologia no ar; contido porque o comprador é um gestor de bancos, hotéis e indústria.

**Key Characteristics:**
- 60-30-10: navy (fundos escuros, hero, serviços, razões, segurança, contacto) 60, branco e papel 30, lima 10 (acção e sinal).
- Uma página longa com âncoras, na ordem dos textos do cliente.
- Movimento ligado ao scroll e com uma razão de ser: voo do hero, passagem de limpeza nas imagens, faixa de serviços, rota do processo.
- Fotografia e vídeo de banco de imagens, marcados como ilustrativos até existirem trabalhos reais.

## Colors

### Primary
- **Navy Profundo** (#111c23): fundo do hero, apresentação, razões, segurança, rodapé, e a barra de navegação depois do hero.
- **Navy BOOMING** (#192730): serviços, contacto, texto sobre claro.
- **Lima Sinal** (#91d336): botão principal, aresta da passagem de limpeza, rota do processo, marcas de serviço e valores. Nunca em texto corrido.

### Neutral
- **Branco** (#ffffff): Quem somos, Sectores, Projectos.
- **Papel** (#f5f6f7): Processo, FAQ.
- **Linha** (#dfe3e6): divisórias claras e campos.

### Named Rules
**The 60-30-10 Rule.** Escuro domina, claro respira, lima só sinaliza. Se uma secção nova não sabe que fundo usar, alterna com a anterior.
**The Signal Rule.** O lima marca acção ou progresso. Se não é botão, aresta, rota ou marcador, não é lima.

## Typography

**Display Font:** Lufga (900 e 500), self-hosted woff2
**Body Font:** Ubuntu (400 e 500), self-hosted woff2

### Hierarchy
- **Display** (900, clamp(2.6rem, 7vw, 6.25rem), 0.95): só o título do hero, sobe palavra a palavra ao abrir.
- **Headline** (900, clamp(2.25rem, 4.6vw, 4.25rem), 0.98): um por secção, terminado em ponto final.
- **Lead** (Lufga 500, até 2.75rem): o primeiro parágrafo da apresentação, que "limpa" palavra a palavra com o scroll.
- **Title** (500, 1.375 a 1.875rem): serviços, sectores, razões, passos, perguntas.
- **Body** (400, 1.125rem, 1.625): 48 a 62ch.
- **Label/Small** (15px e 14px): navegação, formulário, etiquetas de aplicação.

### Named Rules
**The No Kicker Rule.** Nenhuma etiqueta nem numeração por cima dos títulos. Os títulos do cliente são compostos em frase.

## Layout

Contentor de 1320px, margens de 20px e 40px, secções com 96px a 144px. Grelha de 12 colunas com composições assimétricas (título 5 e conteúdo 7; texto 6 e imagem 6). Títulos de Razões e Processo ficam fixos (sticky) enquanto a lista passa. Abaixo de 1024px tudo empilha; a faixa de serviços vira uma coluna.

## Motion

- **Voo do hero:** 96 frames do vídeo em canvas, escolhidos pela posição do scroll ao longo de 300svh; o título sai, a frase "Tecnologia aérea ao serviço..." ocupa o meio do voo, a cidade fica limpa no fim e escurece para navy. Frames verticais próprios para telemóvel. O primeiro frame é a imagem LCP.
- **Passagem de limpeza:** imagens reveladas de cima para baixo por clip-path com uma aresta lima de 2px que desce com o scroll.
- **Faixa de serviços:** no desktop a secção prende e os cinco serviços passam na horizontal; as fotos têm parallax dentro do enquadramento.
- **Rota do processo:** linha lima desenha-se com o scroll e cada paragem acende quando a rota chega.
- **Entradas:** títulos sobem 40px com expo.out; Lenis suaviza o scroll, sincronizado com ScrollTrigger.
- **Reduced motion:** sem Lenis, sem voo (fica o primeiro frame), sem vídeo em loop, sem faixa horizontal; todo o conteúdo visível.

## Elevation & Depth

Plano. A profundidade vem da alternância navy, branco e papel, do vídeo atrás de Segurança e do parallax das fotos. A navegação depois do hero é navy a 95% com desfoque.

## Shapes

Cantos rectos em imagens e secções; 4px em botões, campos e no cartão do formulário; pílulas só para valores e aplicações de serviço; círculos para as paragens do processo.

## Components

### Buttons
- **Primário:** lima com texto navy, 52px, uma linha. Hover #a3df52; pressão scale(0.97) em 160ms.
- **Contorno claro:** borda branca a 45% sobre escuro.
- **Desactivado:** 45% de opacidade (envio de orçamento enquanto não há número de WhatsApp).

### Navigation
Transparente sobre o hero, navy profundo depois dele. CTA lima sempre visível a partir de 640px. Menu de ecrã inteiro abaixo de 1024px (folha branca).

### Inputs
Fundo branco, borda #dfe3e6, foco com borda navy e anel lima a 45%.

## Do's and Don'ts

### Do:
- **Do** manter os textos do cliente tal como enviados (`content/textos-cliente.md`).
- **Do** marcar imagens e vídeos como ilustrativos até haver trabalhos reais autorizados.
- **Do** dar a cada animação uma razão (voo, passagem, faixa, rota). Se não tem razão, sai.

### Don't:
- **Don't** atribuir à BOOMING trabalhos, clientes ou números que não existem.
- **Don't** voltar ao 3D com Three.js (descartado pelo Eládio em Out. 2026); o cinema vem de vídeo real.
- **Don't** usar travessões, numeração de secções, cartões com sombra ou mais de um elemento em loop por ecrã.
