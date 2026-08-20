import{guides}from"@/lib/guides";
import{SITE_URL}from"@/lib/seo";

export function GET(){
  const guideLines=guides.map(guide=>`- [${guide.title}](${SITE_URL}/guides/${guide.slug}): ${guide.description}`).join("\n");
  const body=`# AXON//RADAR

> AXON//RADAR is an independent AI intelligence platform for tracking current AI news, frontier and open models, developer platforms, and creative production tools.

## Primary sections

- [Latest AI News](${SITE_URL}/news): Current source-linked AI releases, research, agents, business, robotics, policy, and creative technology.
- [Live AI Model Radar](${SITE_URL}/models): Recently updated open models plus frontier release signals.
- [Model Benchmarks](${SITE_URL}/benchmarks): Sourced benchmark evidence, leaderboards, and model profiles.
- [Multi-Model Playground](${SITE_URL}/playground): Run one prompt across real models and compare outputs, speed, tokens, and cost.
- [Evaluation Studio](${SITE_URL}/evaluations): Build controlled prompt datasets, run repeatable multi-model evaluations, score quality, and export reports.
- [Evaluation Methodology](${SITE_URL}/evaluations/methodology): Practical guidance for representative datasets, controlled runs, human scoring, and limitations.
- [Intelligent Model Router](${SITE_URL}/router): Build ordered model-routing policies, simulate decisions, enforce cost guards, execute fallbacks, and export configuration.
- [Routing Methodology](${SITE_URL}/router/methodology): Guidance for evidence-based rules, budgets, resilience, and observable routing.
- [AI Operations](${SITE_URL}/operations): Inspect local Router and Evaluation traces across reliability, latency, tokens, cost, model distribution, fallbacks, and thresholds.
- [Operations Methodology](${SITE_URL}/operations/methodology): Provenance, calculations, limitations, portability, and honest local-first observability.
- [AI Tools for Developers](${SITE_URL}/developers): APIs, runtimes, model platforms, and local AI tools.
- [AI Tools for Creators](${SITE_URL}/creators): Tools for photography, filmmaking, editing, design, and audio.
- [Compare AI Tools](${SITE_URL}/compare): Free, freemium, paid, and open-source tools compared by audience and use.
- [AI Guides](${SITE_URL}/guides): Independent frameworks for choosing models and tools.

## Editorial guides

${guideLines}

## Machine-readable resources

- [XML sitemap](${SITE_URL}/sitemap.xml)
- [RSS feed](${SITE_URL}/rss.xml)
- [Robots policy](${SITE_URL}/robots.txt)

## Content policy

News briefings use publisher-provided excerpts and always link to the original source. AXON//RADAR does not republish complete third-party articles. Model information is derived from public registry metadata and may change when a publisher updates its model card.
`;
  return new Response(body,{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"public, max-age=3600"}});
}
