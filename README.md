# Booming Soluções Aéreas

Site da Booming Soluções Aéreas: limpeza de fachadas em altura com drones, em Luanda.

O conceito é **A Descida**: a página é a fachada de uma torre de vidro. O scroll desce um drone de limpeza andar a andar, o jacto limpa o vidro e o conteúdo aparece. No fim, o drone aterra junto ao formulário de cotação.

## Proposta 2: Do lado de dentro (`/proposta-2/`)

Lançamento de produto, em navy e branco. A primeira cena fica dentro de um escritório, a olhar por um vidro sujo. Lá fora, um drone limpa a janela linha a linha com o scroll, e no fim a câmara atravessa o vidro para o branco. Seguem-se:

- o drone em vista explodida;
- um manifesto que se acende palavra a palavra;
- os serviços em panorâmica horizontal;
- o fecho em navy com a cotação.

O código está em `src/v2` e a entrada em `proposta-2/index.html`.

## Stack

- Bun, Vite, React, TypeScript
- Tailwind CSS v4
- Three.js (cena em `src/scene`, carregada depois do primeiro ecrã)
- GSAP com ScrollTrigger e SplitText, Lenis para o scroll suave
- Ícones Phosphor
- Fontes da marca (Lufga e Ubuntu) alojadas em `public/fonts`

## Comandos

```bash
bun install
bun run dev      # desenvolvimento
bun run build    # build de produção em dist/
bun run preview  # servir o build
```

## Ramos

- `main`: produção
- `develop`: trabalho em curso. Abrir PR de `develop` para `main`.

## Por preencher (dados do cliente)

Em `src/config.ts`:

- número de WhatsApp (sem ele, o formulário abre o WhatsApp para o visitante escolher o contacto)
- email, Instagram, LinkedIn

Também em falta: domínio, textos validados pelo Carlos e as imagens reais das demonstrações (Novembro).

## Estrutura

```
src/
  App.tsx          scroll, ScrollTrigger da descida, revelações
  scene/           Three.js: fachada (shader), drone, mangueira, jacto
  sections/        secções da página
  components/      nav, HUD de altitude, logo
  config.ts        contactos e listas do formulário
```

Contexto de produto em `PRODUCT.md`; contrato de direcção em `.impeccable/surfaces/`.
