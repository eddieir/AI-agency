# AI Radar architecture

AI Radar uses a page-oriented modular architecture. Each product area owns a route, while shared presentation and data modules stay independent.

## Route map

- `/` — editorial home and audience entry points
- `/news` — live, searchable AI news feed
- `/developers` — developer model and platform directory
- `/creators` — photography, video, design, and editing directory
- `/compare` — cross-audience comparison matrix
- `/api/news` — cached server-side news aggregation endpoint

## Module boundaries

- `app/` contains routes, route metadata, and global design tokens.
- `components/` contains reusable presentation and interaction modules.
- `lib/catalog.ts` is the typed catalog source of truth.
- `app/api/news/route.ts` isolates external feed retrieval from the UI.

The UI layer never owns provider data. Filtering is local and progressive; the news route keeps a usable fallback when an external feed is unavailable.
