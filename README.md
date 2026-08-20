# AXON//RADAR

AXON//RADAR is a live AI intelligence and decision platform for discovering AI releases, evaluating models, selecting production tools, and comparing options with sourced evidence.

Production: [axonradar.netlify.app](https://axonradar.netlify.app/)

Created, designed, and engineered by [Peyman Iravani](https://github.com/eddieir). Product direction, architecture, full-stack implementation, and UI/UX are credited globally in the shared website footer.

## Product workflow

The primary navigation follows the user decision journey:

1. **News** — follow releases, research, business, agents, creative AI, robotics, and policy.
2. **Models** — inspect frontier, small, mid-size, and open-model activity.
3. **Benchmarks** — review sourced quality, coding, agentic, and speed evidence.
4. **Playground** — design prompts, estimate cost, and export model requests.
5. **Evaluations** — run representative datasets across real models, score results, and export decision evidence.
6. **Router** — convert evaluation evidence into explainable cost, quality, and fallback policies.
7. **Operations** — inspect actual local reliability, latency, tokens, cost, fallbacks, traces, and budget signals.
8. **Developers** — find APIs, runtimes, infrastructure, and production guidance.
9. **Creators** — find image, video, editing, design, and audio tools.
10. **Compare** — compare models or tools before committing.

## Current capabilities

### Live AI newsroom

`/api/news` aggregates current entries from OpenAI, Hugging Face, NVIDIA Developer, Google Research, Microsoft Research, AWS Machine Learning, and Hacker News.

The pipeline fetches sources concurrently, applies per-source timeouts, parses RSS/Atom/JSON, removes encoded HTML, validates links and dates, classifies stories, deduplicates normalized headlines, and exposes source-health metadata. Successful responses are cached for five minutes. The interface never substitutes fabricated stories when upstream feeds fail.

News is server-rendered into permanent `/news/[slug]` article pages and category hubs so headlines, summaries, source attribution, internal links, canonical URLs, and structured data are available to crawlers without client-side execution.

### Live model radar

`/api/models` retrieves recent text-generation activity from the Hugging Face Hub and merges curated frontier-release signals.

The model pipeline excludes private records, normalizes names, extracts disclosed scale, classifies model size, identifies open or gated access, preserves original links, and refreshes every five minutes. Permanent `/models/[slug]` pages provide indexable model records.

Model tiers are editorial classifications based on disclosed metadata—not benchmark scores.

Parameter extraction uses an explicit evidence order: an authoritative Hugging Face `safetensors.total` value first, then a size disclosed by the repository name, then only an explicitly named parameter-count tag. Relationship tags such as `base_model` and `finetuned_from` are never treated as the current model's size.

### Benchmark intelligence workspace

`/benchmarks` is an evidence-oriented leaderboard rather than an unsourced score table. It includes:

- Intelligence, coding-agent, professional agentic-work, and output-speed views;
- metric definitions, units, methodology, update date, and source links;
- category leaderboards at `/benchmarks/category/[category]`;
- permanent evidence profiles at `/benchmarks/models/[slug]`;
- a methodology and limitations page at `/benchmarks/methodology`;
- explicit handling of missing evidence instead of invented values.

Benchmark snapshots are directional evidence. Harnesses, providers, sampling settings, prices, and model versions can change, so important production decisions should be reproduced against the actual workload.

### Advanced model comparator

`/compare` is an interactive decision engine for comparing two to four models. Selections persist in the URL for sharing. The matrix covers sourced benchmark evidence, input/output pricing, context, capabilities, deployment, privacy, access, and best-fit workloads.

Permanent editorial comparisons live under `/compare/models/[pair]` and include unique metadata, canonical URLs, breadcrumbs, structured data, evidence links, and contextual internal navigation.

The original developer/creator tool matrix remains available at `/compare/tools`.

### Interactive request playground

`/playground` is a live multi-model testing laboratory. It includes workflow presets, editable system and user prompts, reusable variable resolution, output and sampling controls, and an allowlisted set of frontier, open, and small models. One controlled request can run across two to four models, returning real outputs with measured latency, token usage, and cost. Users can mark the best answer and export its configuration as JavaScript, Python, or cURL.

Inference runs server-side through Netlify AI Gateway when gateway credentials are available. If the site gateway is inactive, the interface offers an explicit bring-your-own OpenRouter key mode: the key is held only in component memory for the current browser tab, sent only with the Run request, and is never persisted by the application. The execution function validates origins, model IDs, prompt length, output limits, request shape, and visitor-key format; applies a 45-second model timeout; disables caching; and enforces a per-IP/domain request limit. Running a test transmits the completed prompt to the selected providers, so the interface warns users not to submit secrets or personal data.

### Evaluation Studio

`/evaluations` turns real workloads into controlled multi-model evaluations. Users can start from support, code-review, or editorial templates; edit the shared system instruction; add, edit, or remove test cases; define transparent expected-term checks; and select two to four executable models. The studio runs every case through the existing protected inference endpoint with the same temperature and output limit.

Completed reports combine model completion rate, expected-term coverage, human quality scores, average latency, token volume, and estimated cost. Users can inspect every answer, record a one-to-five judgment, reopen recent runs saved in browser storage, export the full evidence record as JSON or CSV, and print a decision-ready report. `/evaluations/methodology` documents representative dataset design, controlled runs, scoring discipline, operational considerations, and limitations. `/evaluations/new` provides a stable entry route into the studio.

Evaluation definitions, reports, and history are local-first and require no database. They stay in the current browser unless exported; only an explicit model run sends system instructions and case prompts to the inference endpoint and selected providers. Expected-term coverage is a lexical diagnostic rather than a semantic correctness claim, and the interface deliberately pairs it with human review.

### Intelligent Model Router

`/router` converts model evidence into an executable routing policy. Users can begin with balanced, cost-first, or quality-first templates; edit ordered task, keyword, and request-length rules; select primary routes; define cost and latency limits; and configure a three-step fallback chain. The deterministic simulator evaluates every rule locally and exposes the complete decision trace, selected model, reason, matched signals, token estimate, cost estimate, budget status, and estimated savings relative to a frontier baseline.

Live dispatch calls only the selected primary model and attempts configured fallbacks sequentially only after execution failure. The existing protected inference function now accepts one to four allowlisted models so Router can dispatch one selected route while Playground and Evaluations continue enforcing their own multi-model selection rules. Every live attempt, latency, token count, and provider-reported cost is visible.

Policies and recent dispatch summaries persist in browser local storage. Users can export the complete versioned policy as JSON or typed TypeScript. `/router/methodology` documents evidence-based routing, rule transparency, model sufficiency, cost guards, fallback discipline, and observability; `/router/new` provides a stable creation entry route.

### AI Operations and Observability

`/operations` turns completed Router dispatches and Evaluation results into an honest local-first control center. It reads only real activity already stored in the current browser and derives request volume, success rate, average latency, input and output token volume, provider-reported cost, fallback usage, and per-model distribution. An empty browser produces a clear empty state rather than synthetic analytics.

Users can filter Router and Evaluation traces, inspect the full execution ledger, set working thresholds for latency, budget, error rate, and fallback use, and export the visible evidence as JSON or CSV. Portable Operations JSON can be imported into the current view without silently modifying the underlying Router or Evaluation history. `/operations/methodology` documents provenance, calculations, alert semantics, portability, and the limits of browser-local observability.

This workspace is not a replacement for production telemetry, provider billing, authentication, durable retention, privacy controls, or incident delivery. Those integrations require an authenticated backend and a real observability pipeline; the current implementation deliberately makes that boundary explicit.

### Developer and creator directories

The typed catalog in `lib/catalog.ts` is the source of truth for production tools. Users can search and filter by Free, Freemium, Paid, or Open source; inspect company, category, use case, and audience; open official provider pages; and compare tools in a shared matrix.

## Route map

| Route | Purpose |
|---|---|
| `/` | Landing page and guided product journey |
| `/news` | Live, searchable AI newsroom |
| `/news/[slug]` | Permanent server-rendered story page |
| `/news/category/[category]` | Search-focused editorial desk |
| `/models` | Live model and frontier-release index |
| `/models/[slug]` | Permanent server-rendered model page |
| `/benchmarks` | Evidence-backed benchmark workspace |
| `/benchmarks/category/[category]` | Metric-specific leaderboard |
| `/benchmarks/models/[slug]` | Model benchmark evidence profile |
| `/benchmarks/methodology` | Measurement methodology and limitations |
| `/playground` | Interactive prompt, token-cost, and API request laboratory |
| `/evaluations` | Multi-case, multi-model Evaluation Studio and local report history |
| `/evaluations/new` | Stable entry route for creating an evaluation |
| `/evaluations/methodology` | Evaluation design, scoring rubric, and limitations |
| `/router` | Explainable routing-policy builder, simulator, live dispatcher, and exporter |
| `/router/new` | Stable entry route for creating a routing policy |
| `/router/methodology` | Routing rules, cost guards, fallback, and observability method |
| `/operations` | Local-first AI operations dashboard, thresholds, trace ledger, and exports |
| `/operations/methodology` | Operations provenance, calculations, limitations, and portability |
| `/developers` | Developer architecture guidance and tool directory |
| `/creators` | Creative workflow guidance and tool directory |
| `/compare` | Interactive two-to-four-model comparator |
| `/compare/models/[pair]` | Permanent editorial model comparison |
| `/compare/tools` | Free-vs-paid developer and creator tool comparison |
| `/guides` | Search-focused editorial guide index |
| `/guides/[slug]` | Permanent editorial guide |
| `/api/news` | Normalized external news aggregation endpoint |
| `/api/models` | Normalized model-activity endpoint |
| `/sitemap.xml` | Sitemap index |
| `/sitemaps/core.xml` | Core, category, guide, benchmark, and comparison URLs |
| `/sitemaps/news.xml` | News record URLs |
| `/sitemaps/models.xml` | Model record URLs |
| `/rss.xml` | News RSS feed |
| `/robots.txt` | Crawler rules and sitemap discovery |
| `/llms.txt` | Machine-readable product and content map |
| `/manifest.webmanifest` | Install metadata and brand assets |

## Architecture

AXON//RADAR uses a page-oriented modular architecture built on the Next.js App Router.

```text
app/
├── api/{news,models}/
├── benchmarks/{category,methodology,models}/
├── compare/{models,tools}/
├── evaluations/{methodology,new}/
├── router/{methodology,new}/
├── operations/methodology/
├── guides/[slug]/
├── models/[slug]/
├── news/{[slug],category}/
├── playground/
├── sitemaps/{core.xml,models.xml,news.xml}/
├── developers/
├── creators/
└── page.tsx

components/
├── ModelComparator.tsx
├── ModelRadar.tsx
├── NewsFeed.tsx
├── PromptPlayground.tsx
├── EvaluationStudio.tsx
├── ModelRouter.tsx
├── OperationsConsole.tsx
├── SiteHeader.tsx
├── ToolDirectory.tsx
└── shared presentation modules

lib/
├── benchmarks.ts
├── catalog.ts
├── comparison.ts
├── evaluations.ts
├── router.ts
├── guides.ts
├── news-data.ts
├── playground.ts
├── seo.ts
└── sitemap-xml.ts
```

The boundaries are deliberate:

- route files own composition, metadata, and structured data;
- API routes own external retrieval, validation, normalization, and caching;
- client components own local interaction, filtering, and URL state;
- typed `lib/` modules own curated data and reusable domain rules;
- CSS layers own shared tokens and route-specific presentation;
- sitemap routes enumerate every intended indexable record.
- live timestamps are formatted in explicit UTC on both server and client to keep hydration deterministic;
- the root not-found boundary returns a branded, actionable 404 instead of reusing homepage content.

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the concise module map.

## Technology

- Next.js 16 and React 19
- TypeScript 5.9
- Next.js App Router and server rendering
- Vite/Vinext compatibility tooling for local development
- ESLint and Node test runner
- Netlify Next.js runtime for production hosting

## Local development

Requirements: Node.js 22.13 or newer and npm.

```bash
npm ci
npm run dev
```

Production-compatible builds:

```bash
npm run build:netlify
npm run build
```

Quality checks:

```bash
npm run lint
npm test
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Run the verified Vinext-compatible build |
| `npm run build:netlify` | Run the production Next.js build used by Netlify |
| `npm run start` | Start the built Vinext server |
| `npm test` | Build and run rendered-HTML route tests |
| `npm run lint` | Run ESLint against the source tree |
| `npm run install:ci` | Run the bounded integrity-checked CI install |
| `npm run db:generate` | Generate Drizzle artifacts if persistence is introduced |

## SEO and discovery

The production SEO foundation includes:

- server-rendered news, model, benchmark, comparison, evaluation, methodology, and guide content;
- unique titles, descriptions, headings, canonical URLs, Open Graph, and X metadata;
- Organization, WebSite, Article, BreadcrumbList, and application-oriented structured data where relevant;
- crawlable navigation and contextual internal links;
- split dynamic sitemaps for core, news, and model records;
- `robots.txt`, RSS, `llms.txt`, and a web manifest;
- Google Search Console verification and submitted sitemap coverage.

SEO implementation improves discoverability but cannot guarantee indexing or ranking. Search visibility also depends on original value, crawl history, performance, authority, backlinks, competition, and Google’s indexing decisions.

## Caching and resilience

- News and model responses use a five-minute shared cache.
- Successful responses support stale-while-revalidate behavior.
- External sources are isolated with timeouts so one unavailable publisher cannot block the feed.
- Source health is visible in the interface.
- Empty or failed upstream results are reported honestly.
- No database or object-storage binding is currently required.
- Evaluation definitions, completed reports, routing policies, and dispatch summaries persist in browser local storage and can be exported.

## Content, evidence, and attribution

AXON//RADAR displays publisher-provided excerpts and sends readers to the original publisher for the complete article. It does not republish full third-party articles.

Benchmark values retain named sources and methodology context. Pricing, access, limits, capabilities, and provider policies can change; confirm current terms and reproduce critical evaluations before a purchasing or architecture decision.

## Deployment

The canonical repository is deployed to Netlify using `netlify.toml` and the Netlify Next.js runtime.

```bash
npm run build:netlify
```

Netlify publishes the `.next` output, applies the configured redirects and security headers, and automatically rebuilds production after changes reach the repository’s `main` branch.

## Release status

- **Phase 1 — Benchmark intelligence:** live.
- **Phase 2 — Advanced model comparison:** live.
- **Phase 3 — Interactive request playground:** live.
- **Phase 4 — Evaluation Studio:** live.
- **Phase 5 — Intelligent Model Router:** live.
- **Phase 6 — AI Operations and Observability:** live.

AXON//RADAR remains under active development. Live-data availability depends on upstream publishers and model registries.
