# BOOMING Soluções Aéreas

Site institucional da BOOMING Soluções Aéreas: limpeza, manutenção e inspecção com drones, em Angola. Uma página com as secções e os textos enviados pelo cliente (`content/textos-cliente.md`).

## Stack

- Bun, Vite, React, TypeScript
- Tailwind CSS v4
- Ícones Phosphor
- Fontes da marca (Lufga e Ubuntu) alojadas em `public/fonts`
- Fotografias de banco de imagens (Unsplash, licença livre) em `public/img`; origem em `public/img/SOURCES.txt`

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

As propostas anteriores com 3D (A Descida e Do lado de dentro) estão guardadas na tag `propostas-3d`.

## Por preencher

Em `src/config.ts`:

- número de WhatsApp (sem ele, o formulário abre o WhatsApp para o visitante escolher o contacto)
- email

Também em falta: domínio final e fotografias reais dos trabalhos, para substituir as imagens ilustrativas.

## Estrutura

```
src/
  App.tsx          ordem das secções e revelação ao scroll
  content.ts       todos os textos do site
  config.ts        contactos e lista de serviços do formulário
  sections/        uma secção por ficheiro
  components/      navegação e logo
```
