# OCHAYOLI — music label website

An editorial, responsive static website for Ochayoli and its O'Flow collective.

## What is included

- Semantic responsive homepage with label story, O'Flow manifesto, live placeholder, and contact workflow.
- Five artist profile cards with accessible modal profiles: Farsida, Jarvie G, Kazee, NAN6, and Lostix.
- Selected-track catalogue cards for Thuvvak, Laav, and Melle Panjo.
- Illustrative CSS/SVG artwork clearly marked as placeholder material.
- Mobile navigation, keyboard-friendly controls, reduced-motion support, metadata, favicon, Open Graph poster, robots.txt, and sitemap.xml.
- Dependency-free smoke test and build check.

## Local preview

Open `index.html` directly, or serve the repository with any static file server. For a quick local server with Node.js:

```text
npx serve .
```

Run the repository checks with:

```text
npm test
npm run build
```

The `build` script is intentionally a validation step because this is a buildless static site; no bundling or runtime dependency is required.

## Source and editorial guardrails

The existing O'Flow-derived repository copy is the source of truth for the collective, its artists, and the three track names. This site does not invent official artist photography, release artwork, streaming URLs, event dates, contact addresses, testimonials, or performance claims. Those items remain visibly marked as pending verification.

Before launch, confirm:

1. Artist names, biographies, spellings, credits, and approved imagery.
2. Official streaming links, release dates, and cover art.
3. Event details and the preferred contact destination.
4. Rights for music, photography, logos, and commissioned graphics.
5. The production domain; replace the `example.com` placeholders in `robots.txt` and `sitemap.xml`.

## Hostinger deployment

This is a static site and does not need Node.js hosting in production.

1. Run `npm test` and `npm run build` locally.
2. In Hostinger hPanel, open the target website's file manager or FTP connection.
3. Upload the repository contents to the website root, normally `public_html`, including `index.html`, `styles.css`, `script.js`, SVG files, `robots.txt`, and `sitemap.xml`.
4. If using Git deployment, connect the repository and configure the document root to the directory containing `index.html`; no build command is required.
5. Enable SSL and the HTTPS redirect, then verify the home page, mobile navigation, artist dialogs, release notes, and inquiry-copy flow on a real domain.
6. Replace placeholder domain values and all pending editorial content before announcing the site.

The inquiry form intentionally does not transmit or store data. Configure an approved backend or official email destination only after the label confirms the desired contact workflow.
