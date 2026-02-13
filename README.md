# Brutalist Studio Template

Template de landing page com estética brutalista, responsivo (mobile-first) e com animações via GSAP + ScrollTrigger. Estrutura focada em organização, acessibilidade e facilidade de customização.

## Visão Geral

Este repositório entrega um template pronto para deploy com:

- HTML semântico (SEO + a11y)
- CSS modular (tokens em variáveis + partials por seção)
- JavaScript enxuto e focado (sem build obrigatório)
- Animações com GSAP + ScrollTrigger (via CDN)

## Como Rodar Localmente

### Opção A (mais simples)

Abra o arquivo `index.html` no navegador.

### Opção B (recomendado)

Servir via HTTP evita diferenças de comportamento entre navegadores.

Com Python:

```bash
python -m http.server 4173
```

Depois acesse:

```text
http://localhost:4173/
```

## Deploy

O projeto é estático. Faça deploy em qualquer host de arquivos:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

Observação: substitua os placeholders de domínio e metadados em `index.html` antes de publicar.

## Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript (ES6+)
- GSAP 3 + ScrollTrigger (CDN)
- Google Fonts (Bodoni Moda + Syne)

## Estrutura de Pastas

```text
WEB POST 03/
├── assets/
│   ├── css/
│   │   ├── global/
│   │   │   ├── reset.css
│   │   │   ├── base.css
│   │   │   ├── utilities.css
│   │   │   └── variables.css
│   │   ├── pages/
│   │   │   └── partials/
│   │   │       ├── hero-section.css
│   │   │       ├── services-section.css
│   │   │       ├── features-section.css
│   │   │       ├── gallery-section.css
│   │   │       ├── about-section.css
│   │   │       ├── testimonials-section.css
│   │   │       ├── contact-section.css
│   │   │       └── menu-overlay.css
│   │   └── index.css
│   ├── favicons/
│   │   ├── favicon.svg
│   │   └── site.webmanifest
│   ├── imagens/
│   │   ├── og-image.svg
│   │   ├── placeholder-landscape.svg
│   │   ├── placeholder-portrait.svg
│   │   └── placeholder-portrait-2.svg
│   └── js/
│       └── main.js
├── index.html
├── robots.txt
├── sitemap.xml
└── README.md
```

## Customização Rápida

### 1) Branding

Edite os seguintes pontos em `index.html`:

- `<title>`, `description`, Open Graph (og:title, og:description, og:url, og:image)
- Texto do Hero e textos das seções
- Links do menu e do footer (email/portfolio/social)

### 2) Cores e Tipografia

Tokens em `assets/css/global/variables.css`.

### 3) Imagens

Substitua os SVGs em `assets/imagens/` por imagens do seu projeto (preferencialmente WebP/AVIF).

## Acessibilidade e SEO

- Skip link para navegação por teclado
- Hierarquia de heading com H1 único
- Meta tags e Open Graph configurados (placeholders)
- Robots e sitemap prontos (placeholders)

## API

Não aplicável (projeto estático, sem backend).

## Contribuição

1. Crie uma branch a partir de `main`:
   - `feat/nome-da-feature`
   - `fix/descricao-do-bug`
2. Faça commits pequenos e descritivos:
   - `feat: adiciona nova seção`
   - `fix: corrige menu no mobile`
3. Abra um Pull Request descrevendo o que mudou e por quê.

## Segurança

Este template não inclui chaves, tokens ou credenciais. Se você integrar APIs, utilize variáveis de ambiente no pipeline de deploy e não comite segredos no repositório.
