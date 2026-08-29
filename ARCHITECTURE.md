# AXON//RADAR architecture

AXON//RADAR uses a page-oriented modular architecture. Each product area owns a route, while shared presentation and data modules stay independent.

## Route map

- `/` — editorial home and audience entry points
- `/models` — continuously refreshed frontier and small-model radar
- `/benchmarks` — sourced benchmark evidence, metric leaderboards, and model profiles
- `/playground` — live two-to-four-model testing, measured output comparison, winner selection, and request export
- `/playground/vision` — ephemeral single-image comparison across explicitly vision-capable models
- `/evaluations` — local-first multi-case evaluation design, real batch execution, scoring, reports, and history
- `/evaluations/new` — stable creation entry point redirected into the studio
- `/evaluations/methodology` — evaluation design, human rubric, reproducibility, and limitations
- `/router` — ordered policy authoring, local simulation, cost guards, live dispatch, fallback execution, and export
- `/router/new` — stable routing-policy creation entry point
- `/router/methodology` — evidence, rule design, failure handling, budget, and observability guidance
- `/api/playground/run` — rate-limited text and vision inference across explicit model and capability allowlists
- `/news` — eight-desk newsroom with up to 90 deduplicated stories, filters, search, and progressive loading
- `/developers` — production architecture guide, live release pressure, and developer platform directory
- `/creators` — creative workflow system and photography, video, design, and editing directory
- `/compare` — two-to-four-model evidence, cost, capability, and deployment matrix
- `/compare/tools` — cross-audience developer and creator tool matrix
- `/api/news` — five-minute, multi-query news aggregation and deduplication endpoint
- `/api/models` — five-minute model registry and frontier-release aggregation endpoint

## Module boundaries

- `app/` contains routes, route metadata, and global design tokens.
- `components/` contains reusable presentation and interaction modules.
- `lib/catalog.ts` is the typed catalog source of truth.
- `lib/benchmarks.ts` and `lib/comparison.ts` own benchmark evidence and model-decision facts.
- `lib/playground.ts` owns reusable workflows and variable-resolution rules; `lib/playground-models.ts` owns the executable model allowlist and pricing snapshot.
- `lib/evaluations.ts` owns evaluation templates, result types, transparent requirement checks, and model-level aggregation.
- `lib/router.ts` owns policy templates, routing types, ordered matching, cost estimation, decision traces, and portable policy serialization.
- `app/api/news/route.ts` isolates external feed retrieval from the UI.
- `app/api/models/route.ts` normalizes live registry data, infers disclosed model scale, and merges frontier release signals.

Playground composition is local; only an explicit Run action sends the completed prompt to the protected Netlify function. The function prefers AI Gateway-injected secrets. When the gateway is inactive, a visitor may explicitly supply an OpenRouter key held only in React component memory for the current tab and forwarded in that Run request; the application does not persist it. The function validates every request, applies hard limits and timeouts, and returns normalized results without caching. External failures are surfaced honestly rather than replaced with fabricated records.

Vision requests reuse that boundary with a distinct `mode: "vision"` contract. The client accepts one JPEG, PNG, or WebP file up to 4 MB and holds its data URL in component memory. The server repeats MIME, encoded-payload-size, prompt, origin, key, and model validation; rejects models without an explicit vision capability; and converts the request into provider-compatible text and `image_url` content. No image is written to local storage, durable storage, logs, cache, exports, or URLs. The route, footer, machine-readable discovery file, and core sitemap expose the feature as a permanent indexable product surface.

## Responsive and navigation contract

The shared header remains inline above 1050 px. At 1050 px and below it becomes a fixed-height dark drawer trigger with a 44 px touch target, explicit `aria-expanded` and `aria-controls` state, two-column tablet navigation, viewport-bounded independent scrolling, visible active states, and link-driven close behavior. At 480 px the drawer becomes a compact single column. Phase-specific CSS is loaded before the final header correction layer so route themes cannot override navigation contrast or geometry.

The Vision workspace collapses its image preview, prompt editors, model picker, results, and disclosure progressively at 850 px and 600 px. File controls retain semantic labels, model selectors expose pressed state, errors use a live alert role, and Run remains disabled until the required local image, prompt, provider access, and model selection state are valid.

## Release verification boundary

Focused source tests preserve security, mobile-navigation, responsive-layout, and discovery contracts. Rendered-route tests verify permanent HTML, canonical metadata, structured data, creator attribution, initial interaction states, and the branded 404. Production verification separately checks deployed security headers, negative inference responses, machine-readable discovery, and every URL emitted by the core, news, and model sitemaps. Real provider inference is never used as a health check because it would transmit content and incur provider cost; it requires an explicit user Run action and valid gateway or visitor credentials.

The Evaluation Studio reuses that inference boundary once per test case and executes selected models concurrently within each case. Evaluation definitions, answers, human ratings, and report history persist only in browser local storage; JSON and CSV export provide portable records without introducing a database. Expected-term scoring is deterministic and inspectable. It is presented as a lexical coverage signal and remains separate from the human quality rubric.

The Router performs policy matching and cost estimation entirely in the browser. A live dispatch sends only the selected primary model to the inference function; configured fallbacks are attempted sequentially by the client after execution failure. The shared endpoint accepts one to four allowlisted model IDs, while each product interface enforces its own selection contract. Routing policies and non-secret dispatch summaries persist locally and can be exported as versioned JSON or typed TypeScript.
