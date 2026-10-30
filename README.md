# OCHAYOLI — music label website

An editorial, responsive static website for Ochayoli and its O'Flow collective.

## What is included

- Semantic responsive homepage with label story, O'Flow manifesto, live placeholder, Store link, and contact workflow.
- O'Flow collective copy currently represents six artists; individual artist sections remain intentionally withheld until the label confirms the final roster presentation.
- Selected-track catalogue cards for Thuvvak, Laav, and Melle Panjo.
- Catalogue-first OCHAYOLI STORE at `/store/`, with category filters for vinyl, cassettes, music players, posters, streetwear, accessories, and phone cases.
- Shortlist, availability-request checkout, and request confirmation routes at `/cart/`, `/checkout/`, and `/order-confirmation/`.
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

The existing O'Flow-derived repository copy is the source of truth for the collective, its artists, and the three track names. This site does not invent official artist photography, release artwork, streaming URLs, event dates, testimonials, or performance claims. Those items remain visibly marked as pending verification. The confirmed contact destination is `hello@ochayoli.in`.

The Store is intentionally a catalogue and availability-request experience until the label verifies products, authorised artwork, manufacturers, specifications, prices, stock, shipping rules, payment processing, and fulfilment. The product slots do not claim that official merchandise or physical releases currently exist.

Before launch, confirm:

1. Artist names, biographies, spellings, credits, and approved imagery.
2. Official streaming links, release dates, and cover art.
3. Event details and the preferred contact destination.
4. Rights for music, photography, logos, and commissioned graphics.
5. Store inventory, product photography, prices, variant stock, fulfilment, return policy, shipping restrictions, and payment provider before activating purchases.

## Hostinger deployment

This is a static site and does not need Node.js hosting in production.

1. Run `npm test` and `npm run build` locally.
2. In Hostinger hPanel, open the target website's file manager or FTP connection.
3. Upload the repository contents to the website root, normally `public_html`, including the root files plus `store/`, `cart/`, `checkout/`, `order-confirmation/`, `store.js`, and `contact.php`.
4. If using Git deployment, connect the repository and configure the document root to the directory containing `index.html`; no build command is required.
5. Enable SSL and the HTTPS redirect, then verify the home page, Store catalogue filters, shortlist, availability request, doodle motion, release notes, and contact forwarding on a real domain.
6. Replace all pending editorial content before announcing the site.

The inquiry form posts to `contact.php`, validates the submission server-side, and forwards approved messages to `hello@ochayoli.in` through Hostinger mail delivery. Keep mail credentials and any future database credentials outside GitHub.
