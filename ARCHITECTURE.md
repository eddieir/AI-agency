# AXON//RADAR architecture

AXON//RADAR uses a page-oriented modular architecture. Each product area owns a route, while shared presentation and data modules stay independent.

## Route map

- `/` — editorial home and audience entry points
- `/models` — continuously refreshed frontier and small-model radar
- `/benchmarks` — sourced benchmark evidence, metric leaderboards, and model profiles
- `/playground` — browser-safe prompt design, token-cost inspection, and request export
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
- `lib/playground.ts` owns reusable playground workflows and variable-resolution rules.
- `app/api/news/route.ts` isolates external feed retrieval from the UI.
- `app/api/models/route.ts` normalizes live registry data, infers disclosed model scale, and merges frontier release signals.

The UI layer never owns provider data. Filtering and playground composition are local and progressive. Prompt content remains in the browser, and the playground never accepts API keys or executes inference. External feed failures are surfaced honestly rather than replaced with fabricated records.
