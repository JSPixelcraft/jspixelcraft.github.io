# JSPixelcraft website

Static bilingual website for JSPixelcraft and its iOS apps, hosted with GitHub Pages.

## Structure

- `/index.html` – portfolio overview
- `/assets/` – shared design system and language handling
- `/flybuddy/` – product, support and privacy
- `/zeitpilot/` – product, support and privacy
- `/scanbuddy/` – product, support and privacy
- `/seniorenbuddy/` – product, support and privacy
- `/kassenanker/` – coming-soon page, support and privacy

Each app directory contains:

- `index.html`
- `support.html`
- `privacy.html`

The former top-level page URLs remain as lightweight redirects so existing links continue to work.

## Local preview

Serve the repository root with any static HTTP server, then open `index.html`. The site has no build step or external runtime dependency.
