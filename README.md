# OCHAYOLI — music label website

An editorial, responsive static website for Ochayoli and its O'Flow collective.

## What is included

- Semantic responsive homepage with label story, O'Flow manifesto, live placeholder, Store link, and contact workflow.
- O'Flow collective copy currently represents six artists; individual artist sections remain intentionally withheld until the label confirms the final roster presentation.
- Selected-track catalogue cards for Thuvvak, Laav, and Melle Panjo.
- Catalogue-first OCHAYOLI STORE at `/store/`, with category filters for vinyl, cassettes, music players, posters, streetwear, accessories, and phone cases.
- Shortlist, availability-request checkout, and request confirmation routes at `/cart/`, `/checkout/`, and `/order-confirmation/`.
- Initial Qikink POD launch candidates for tees, hoodies, totes, caps, stickers, and phone cases; each remains clearly marked as draft until SKU, artwork, pricing, and inventory are verified.
- Disabled-by-default Qikink Open API boundary under `api/`, with a safe dry-run contract and `/api/health.php` configuration status endpoint.
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

### Qikink integration status

Qikink's documented custom-store flow uses its Open API order endpoint with an account auth token, Qikink SKU mappings, line-item prices, shipping details, and an order number. This repository includes a PHP adapter and dry-run validation, but no Qikink credential is stored or configured. Live supplier order creation requires `QIKINK_AUTH_TOKEN`, verified SKU mappings, and explicit enablement of both `OCHAYOLI_LIVE_ORDERS_ENABLED` and `OCHAYOLI_LIVE_PAYMENTS_ENABLED` outside GitHub. No supplier order is created by default.

There is no live payment webhook, order database, admin order-management surface, or automated fulfillment job enabled yet. Those are intentionally blocked until a payment provider, database target, Qikink account/API approval, SKU map, shipping/returns policy, and approval for non-dry-run ordering are supplied.

Before launch, confirm:

1. Artist names, biographies, spellings, credits, and approved imagery.
2. Official streaming links, release dates, and cover art.
3. Event details and the preferred contact destination.
4. Rights for music, photography, logos, and commissioned graphics.
5. Store inventory, product photography, prices, variant stock, fulfilment, return policy, shipping restrictions, and payment provider before activating purchases.
6. Qikink account access, API approval, SKU mappings, design URLs, sandbox instructions, and a non-paid test-order process before enabling fulfillment automation.

## Hostinger deployment

This is a static site and does not need Node.js hosting in production.

1. Run `npm test` and `npm run build` locally.
2. In Hostinger hPanel, open the target website's file manager or FTP connection.
3. Upload the repository contents to the website root, normally `public_html`, including the root files plus `store/`, `cart/`, `checkout/`, `order-confirmation/`, `store.js`, and `contact.php`.
4. If using Git deployment, connect the repository and configure the document root to the directory containing `index.html`; no build command is required.
5. Enable SSL and the HTTPS redirect, then verify the home page, Store catalogue filters, shortlist, availability request, doodle motion, release notes, and contact forwarding on a real domain.
6. Replace all pending editorial content before announcing the site.

The inquiry form posts to `contact.php`, validates the submission server-side, and forwards approved messages to `hello@ochayoli.in` through Hostinger mail delivery. Keep mail credentials and any future database credentials outside GitHub.

