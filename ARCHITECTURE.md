# AI Radar architecture

AI Radar uses a page-oriented modular architecture. Each product area owns a route, while shared presentation and data modules stay independent.

## Route map

- `/` — editorial home and audience entry points
- `/models` — continuously refreshed frontier and small-model radar
- `/news` — eight-desk newsroom with up to 90 deduplicated stories, filters, search, and progressive loading
- `/developers` — production architecture guide, live release pressure, and developer platform directory
- `/creators` — creative workflow system and photography, video, design, and editing directory
- `/compare` — cross-audience comparison matrix
- `/api/news` — five-minute, multi-query news aggregation and deduplication endpoint
- `/api/models` — five-minute model registry and frontier-release aggregation endpoint

## Module boundaries

- `app/` contains routes, route metadata, and global design tokens.
- `components/` contains reusable presentation and interaction modules.
- `lib/catalog.ts` is the typed catalog source of truth.
- `app/api/news/route.ts` isolates external feed retrieval from the UI.
- `app/api/models/route.ts` normalizes live registry data, infers disclosed model scale, and merges frontier release signals.

The UI layer never owns provider data. Filtering is local and progressive; the news route keeps a usable fallback when an external feed is unavailable.
