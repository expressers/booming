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
    fontSize: "clamp(2.6rem, 6vw, 5.25rem)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Lufga, Ubuntu, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.025em"
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
  section: "96px / 128px"
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

**Creative North Star: "Relatório técnico de primeira linha"**

Institucional e premium, para gestores de bancos, hotéis, hospitais e indústria. O site parece um dossier técnico bem paginado: fotografia grande de fachadas, drones e parques solares, títulos pesados em Lufga, muito branco e blocos navy para os momentos de peso (sectores, segurança, contacto). Nada de 3D nem de efeitos; o movimento é uma subida curta ao entrar no ecrã.

**Key Characteristics:**
- Branco e papel como base, navy como cor de autoridade, lima só para acção e sinal.
- Uma página longa com âncoras, oito secções na ordem dos textos do cliente.
- Linhas finas (1px) para organizar conteúdo em vez de cartões.
- Fotografia de banco de imagens marcada como ilustrativa até existirem trabalhos reais.

## Colors

### Primary
- **Navy BOOMING** (#192730): texto, botões secundários, secções escuras (Sectores, Segurança, Contactos).
- **Lima Sinal** (#91d336): botão principal sobre fundo escuro, ícones dos sectores, marcadores de lista, valores. Nunca em texto corrido.

### Neutral
- **Branco** (#ffffff): fundo principal.
- **Papel** (#f5f6f7): secções alternadas (Quem somos, Processo, FAQ).
- **Linha** (#dfe3e6): divisórias e bordas de campos.
- **Navy Profundo** (#111c23): rodapé e sobreposição do hero.

### Named Rules
**The Signal Rule.** O lima marca acção ou confirmação. Se não é botão, ícone de sector ou marcador, não é lima.

## Typography

**Display Font:** Lufga (900 e 500), self-hosted woff2
**Body Font:** Ubuntu (400 e 500), self-hosted woff2

### Hierarchy
- **Display** (900, clamp(2.6rem, 6vw, 5.25rem), 0.98): só o título do hero.
- **Headline** (900, clamp(2rem, 4vw, 3.5rem), 1.02): um por secção, terminado em ponto final.
- **Title** (500, 1.25rem): nomes de serviços, sectores, razões, perguntas.
- **Body** (400, 1.125rem, 1.625): parágrafos com 48 a 62ch.
- **Label** (500, 15px): navegação, etiquetas de formulário, legendas.
- **Small** (400, 14px): ajuda e erros de formulário.

### Named Rules
**The No Kicker Rule.** Nenhuma etiqueta por cima dos títulos. Os títulos do cliente vêm em maiúsculas no documento e são compostos em frase.

## Layout

Contentor de 1320px, margens de 20px (mobile) e 40px (desktop), secções com 96px a 128px de respiro vertical. Grelha de 12 colunas no desktop com composições assimétricas (imagem 5 colunas e texto 7, título 4 e conteúdo 8). Tudo colapsa para uma coluna abaixo de 768px; serviços passam de separadores para linhas expansíveis abaixo de 1024px.

## Elevation & Depth

Plano. Sem sombras, excepto a linha de 1px do menu quando fica sólido. A profundidade vem da alternância branco, papel e navy, e da sobreposição do painel de Segurança sobre a fotografia.

## Shapes

Cantos rectos em imagens e secções; 4px em botões, campos e no cartão do formulário. Círculos só para os números do processo e os marcadores de valores.

## Components

### Buttons
- **Primário:** lima com texto navy (sobre fundo escuro); navy com texto branco (sobre fundo claro). 52px de altura, uma linha sempre.
- **Contorno claro:** borda branca a 45% no hero.
- **Pressão:** scale(0.97) em 160ms com cubic-bezier(0.23, 1, 0.32, 1); hover só em ponteiro fino.

### Navigation
Transparente sobre o hero, branca com linha inferior depois dele. Links sem sublinhado em repouso, sublinhado no hover. Abaixo de 1024px, menu de ecrã inteiro.

### Inputs
Fundo branco, borda #dfe3e6, foco com borda navy e anel lima a 45%. Etiqueta em cima, erro em baixo.

### Serviços (signature)
No desktop, lista de cinco serviços à esquerda (separadores com teclado) e painel com imagem, texto e aplicações à direita.

## Do's and Don'ts

### Do:
- **Do** manter os textos do cliente tal como enviados (`content/textos-cliente.md`).
- **Do** marcar a galeria como "Imagens ilustrativas" até haver trabalhos reais autorizados.
- **Do** respeitar `prefers-reduced-motion`: o conteúdo aparece sem animação.

### Don't:
- **Don't** atribuir à BOOMING trabalhos, clientes ou números que não existem.
- **Don't** usar 3D, parallax ou efeitos de scroll pesados (decisão do Eládio, Out. 2026).
- **Don't** usar travessões, etiquetas por cima dos títulos ou cartões com sombra.
