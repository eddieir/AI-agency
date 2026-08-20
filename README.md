# AXON//RADAR

AXON//RADAR is a live AI intelligence platform that helps people understand what changed, inspect the models behind the change, select practical tools, and compare options before committing.

It brings together:

- current AI news from official publishers and technical communities;
- continuously refreshed open-model activity;
- frontier-model release signals;
- production-oriented tooling for developers;
- creative tooling for photographers, filmmakers, editors, and designers;
- free, freemium, paid, and open-source comparisons.

## Product

The product journey follows a real decision workflow:

1. **News** — discover releases, research, and industry changes.
2. **Models** — inspect frontier, small, mid-size, and open model activity.
3. **Developers** — evaluate APIs, runtimes, agents, and infrastructure.
4. **Creators** — evaluate image, video, editing, design, and audio tools.
5. **Compare** — compare audience, category, pricing, and best-fit use cases.

Production URL: [axonradar.netlify.app](https://axonradar.netlify.app/)

> The hosted Site may remain access-controlled until its public launch. Search engines cannot index an authenticated deployment.

## Features

### Live AI newsroom

`/api/news` aggregates and normalizes current entries from OpenAI, Hugging Face, NVIDIA Developer, Google Research, Microsoft Research, AWS Machine Learning, and Hacker News.

The endpoint:

- fetches sources concurrently with per-source timeouts;
- parses RSS, Atom, and JSON responses;
- removes nested and double-encoded HTML safely;
- decodes named and numeric entities;
- validates source links and publication dates;
- classifies stories into Frontier, Open source, Agents, Research, Creative, Business, Robotics, or Policy;
- deduplicates normalized headlines;
- returns source-health metadata;
- caches successful results for five minutes without serving fabricated fallback stories.

### Live model radar

`/api/models` retrieves the latest text-generation models from the Hugging Face Hub and merges separate frontier-release signals.

The model pipeline:

- excludes private models;
- normalizes provider and model names;
- extracts disclosed parameter counts when available;
- classifies models as Small, Mid-size, Frontier, or Unknown;
- identifies Open and Gated access;
- preserves original Hugging Face links;
- refreshes every five minutes.

Model tiers are an editorial classification based on disclosed metadata. They are not benchmark scores.

### Developer and creator directories

The typed catalog in `lib/catalog.ts` is the source of truth for tool cards and comparison data. Users can filter by Free, Freemium, Paid, or Open source; search by company, category, product, or use case; open official product pages; and compare developer and creative tools in one matrix.

### Search foundation

The project includes unique route metadata, canonical URLs, Open Graph and X cards, crawler directives, Organization and WebSite JSON-LD, `/sitemap.xml`, `/robots.txt`, a web manifest, crawlable navigation, and contextual internal links.

SEO implementation makes the site understandable and crawlable; it does not guarantee indexing or ranking. Public access, useful original content, reputation, backlinks, performance, and Search Console monitoring remain necessary.

## Routes

| Route | Purpose | Data |
|---|---|---|
| `/` | Product landing and guided entry path | Live news and model previews |
| `/news` | Searchable and filterable AI newsroom | `/api/news` |
| `/models` | Live model and frontier-signal index | `/api/models` |
| `/developers` | Architecture guidance and developer tools | Model API and typed catalog |
| `/creators` | Creative workflow and production tools | Typed catalog |
| `/compare` | Cross-audience AI tool comparison | Typed catalog |
| `/api/news` | Normalized news aggregation endpoint | External RSS, Atom, and JSON |
| `/api/models` | Normalized model activity endpoint | Hugging Face and release coverage |
| `/sitemap.xml` | Canonical crawl map | Generated metadata route |
| `/robots.txt` | Crawler policy and sitemap location | Generated metadata route |
| `/manifest.webmanifest` | Install and theme metadata | Generated metadata route |

## Architecture

AXON//RADAR uses a page-oriented modular architecture:

```text
app/
├── api/
│   ├── models/route.ts
│   └── news/route.ts
├── compare/page.tsx
├── creators/page.tsx
├── developers/page.tsx
├── models/page.tsx
├── news/page.tsx
├── layout.tsx
├── manifest.ts
├── robots.ts
├── sitemap.ts
└── page.tsx

components/
├── HomeNewsBrief.tsx
├── ModelRadar.tsx
├── NewsFeed.tsx
├── SiteFooter.tsx
├── SiteHeader.tsx
├── ToolCard.tsx
└── ToolDirectory.tsx

lib/
└── catalog.ts
```

Responsibilities are separated deliberately:

- route files own page composition and search metadata;
- API routes own external retrieval and normalization;
- client components own filtering, searching, refresh controls, and loading states;
- `lib/catalog.ts` owns curated tool data;
- CSS layers own the shared visual system and route-specific presentation.

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the concise module map.

## Technology

- Next.js 16
- React 19
- TypeScript
- Vinext
- Vite 8
- Cloudflare Workers runtime
- OpenAI Sites hosting

The production build emits a Worker-compatible ESM server entrypoint and static assets.

## Local development

Requirements:

- Node.js 22.13 or newer
- npm

```bash
npm ci
npm run dev
```

Production build:

```bash
npm run build
```

Quality checks:

```bash
npm test
npm run lint
```

The build and install wrappers apply bounded execution and the environment expected by the hosted Sites runtime.

## Available scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Run the verified Vinext production build |
| `npm run start` | Start the built Vinext server |
| `npm test` | Build and run rendered-HTML tests |
| `npm run lint` | Run ESLint against source files |
| `npm run install:ci` | Run the bounded, integrity-checked CI install |
| `npm run db:generate` | Generate Drizzle artifacts if database bindings are added |

## Caching and resilience

- News and model responses use a five-minute shared cache.
- Successful responses allow stale-while-revalidate behavior.
- External publishers are isolated with timeouts so one unavailable source does not block the feed.
- Source health is returned to the interface.
- If all real news sources fail, the UI displays an honest error instead of placeholder articles.
- No database or object-storage binding is currently required.

## Content and attribution

AXON//RADAR shows publisher-provided excerpts and links users to the original source for the complete article. It does not republish full third-party articles.

Pricing categories and capabilities can change. Confirm current limits and terms with each provider before making a purchasing or architecture decision.

## Deployment

The application is deployed through OpenAI Sites. The hosting manifest is stored in `.openai/hosting.json`; remote infrastructure identifiers and deployment credentials must never be copied into documentation, source URLs, or environment files.

The deployment pipeline validates and builds the source, produces a Vinext artifact, saves an immutable source version, deploys it to the Cloudflare Workers-based runtime, and verifies the production deployment.

## Public launch checklist

Before enabling search indexing:

- make the hosted Site publicly accessible;
- attach the final production domain if a custom domain will be used;
- update `metadataBase`, canonical, sitemap, and structured-data URLs if the domain changes;
- add the production property to Google Search Console;
- submit `/sitemap.xml`;
- validate structured data with Google Rich Results Test;
- inspect representative URLs with Google URL Inspection;
- monitor indexing, Core Web Vitals, crawl errors, and query performance.

## Status

AXON//RADAR is under active development. Live data availability depends on upstream publishers and model registries.