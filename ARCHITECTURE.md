# AXON//RADAR architecture

AXON//RADAR uses a page-oriented modular architecture. Each product area owns a route, while shared presentation and data modules stay independent.

## Route map

- `/` — editorial home and audience entry points
- `/models` — continuously refreshed frontier and small-model radar
- `/benchmarks` — sourced benchmark evidence, metric leaderboards, and model profiles
- `/playground` — live two-to-four-model testing, measured output comparison, winner selection, and request export
- `/evaluations` — local-first multi-case evaluation design, real batch execution, scoring, reports, and history
- `/evaluations/new` — stable creation entry point redirected into the studio
- `/evaluations/methodology` — evaluation design, human rubric, reproducibility, and limitations
- `/api/playground/run` — rate-limited Netlify AI Gateway inference across an explicit model allowlist
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
- `app/api/news/route.ts` isolates external feed retrieval from the UI.
- `app/api/models/route.ts` normalizes live registry data, infers disclosed model scale, and merges frontier release signals.

Playground composition is local; only an explicit Run action sends the completed prompt to the protected Netlify function. The function prefers AI Gateway-injected secrets. When the gateway is inactive, a visitor may explicitly supply an OpenRouter key held only in React component memory for the current tab and forwarded in that Run request; the application does not persist it. The function validates every request, applies hard limits and timeouts, and returns normalized results without caching. External failures are surfaced honestly rather than replaced with fabricated records.

The Evaluation Studio reuses that inference boundary once per test case and executes selected models concurrently within each case. Evaluation definitions, answers, human ratings, and report history persist only in browser local storage; JSON and CSV export provide portable records without introducing a database. Expected-term scoring is deterministic and inspectable. It is presented as a lexical coverage signal and remains separate from the human quality rubric.
