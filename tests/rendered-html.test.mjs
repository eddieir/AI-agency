import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const {default: worker} = await import(workerUrl.href);
const env = {ASSETS: {fetch: async () => new Response("Not found", {status: 404})}};
const ctx = {waitUntil() {}, passThroughOnException() {}};
const render = async path => worker.fetch(new Request(`http://localhost${path}`, {headers: {accept: "text/html"}}), env, ctx);

test("renders the guided landing page with crawlable metadata", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(html, /<title>AXON\/\/RADAR — Live AI News, Models and Tools<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/axonradar\.netlify\.app\/"/);
  assert.match(html, /Know what(?:<br\/>|<br>)matters in AI/);
  assert.match(html, /href="\/news"[^>]*>News<\/a>.*href="\/models"[^>]*>Models<\/a>.*href="\/benchmarks"[^>]*>Benchmarks<\/a>.*href="\/playground"[^>]*>Playground<\/a>.*href="\/evaluations"[^>]*>Evaluations<\/a>.*href="\/router"[^>]*>Router<\/a>.*href="\/developers"[^>]*>Developers<\/a>.*href="\/creators"[^>]*>Creators<\/a>.*href="\/compare"[^>]*>Compare<\/a>/s);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /href="https:\/\/axonradar\.netlify\.app\/favicon\.ico\?v=2"/);
  assert.match(html, /href="https:\/\/axonradar\.netlify\.app\/favicon\.svg\?v=2"/);
  assert.match(html, /href="https:\/\/axonradar\.netlify\.app\/apple-touch-icon\.png\?v=2"/);
});

for (const [path, heading] of [["/news", "The world of AI"], ["/models", "Every model"], ["/playground", "One prompt"], ["/evaluations", "Test a model"], ["/router", "Right request"], ["/developers", "Build systems"], ["/creators", "More control"], ["/compare", "Choose with"]]) {
  test(`renders ${path} with its primary heading`, async () => {
    const response = await render(path);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(html, new RegExp(`<h1[^>]*>[^<]*${heading}`));
    assert.match(html, new RegExp(`rel="canonical" href="https://axonradar\\.netlify\\.app${path}"`));
  });
}

test("renders an indexable editorial guide with article and breadcrumb data", async () => {
  const response = await render("/guides/choosing-an-ai-model");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /<title>How to Choose an AI Model for Production \| AXON\/\/RADAR<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/axonradar\.netlify\.app\/guides\/choosing-an-ai-model"/);
  assert.match(html, /How to Choose an AI Model for Production/);
  assert.match(html, /BreadcrumbList/);
  assert.match(html, /"@type":"Article"/);
});

test("serves machine-readable AI discovery and RSS endpoints", async () => {
  const llmsResponse = await render("/llms.txt");
  const llms = await llmsResponse.text();
  assert.equal(llmsResponse.status, 200);
  assert.match(llmsResponse.headers.get("content-type") ?? "", /^text\/plain/i);
  assert.match(llms, /# AXON\/\/RADAR/);
  assert.match(llms, /https:\/\/axonradar\.netlify\.app\/sitemap\.xml/);

  const rssResponse = await render("/rss.xml");
  const rss = await rssResponse.text();
  assert.equal(rssResponse.status, 200);
  assert.match(rssResponse.headers.get("content-type") ?? "", /^application\/rss\+xml/i);
  assert.match(rss, /<rss version="2\.0">/);
});

test("serves a fast sitemap index that separates live source discovery",async()=>{
  const response=await render("/sitemap.xml");
  const xml=await response.text();
  assert.equal(response.status,200);
  assert.match(response.headers.get("content-type")??"",/^application\/xml/i);
  assert.match(xml,/<sitemapindex/);
  assert.match(xml,/\/sitemaps\/core\.xml/);
  assert.match(xml,/\/sitemaps\/news\.xml/);
  assert.match(xml,/\/sitemaps\/models\.xml/);
});

test("renders sourced benchmark intelligence and model evidence",async()=>{
 const board=await render("/benchmarks"),html=await board.text();assert.equal(board.status,200);assert.match(html,/Measure the model/);assert.match(html,/Claude Opus 5/);assert.match(html,/"@type":"Dataset"/);
 const detail=await render("/benchmarks/models/gpt-5-6-sol"),detailHtml=await detail.text();assert.equal(detail.status,200);assert.match(detailHtml,/GPT-5\.6 Sol Benchmarks, Scores and Evidence/);assert.match(detailHtml,/Coding Agent Index/);assert.match(detailHtml,/BreadcrumbList/);
});

test("renders the advanced model comparator and permanent comparison pages",async()=>{
 const response=await render("/compare?models=claude-opus-5,gpt-5-6-sol"),html=await response.text();assert.equal(response.status,200);assert.match(html,/DECISION ENGINE \/ MODELS/);assert.match(html,/Intelligence Index/);assert.match(html,/OPEN COMPARATOR|MODEL COMPARATOR/);
 const editorial=await render("/compare/models/claude-opus-5-vs-gpt-5-6-sol"),editorialHtml=await editorial.text();assert.equal(editorial.status,200);assert.match(editorialHtml,/Claude Opus 5 vs GPT-5\.6 Sol/);assert.match(editorialHtml,/"@type":"Article"/);
});

test("renders the browser-safe prompt playground with crawlable product metadata",async()=>{
 const response=await render("/playground"),html=await response.text();assert.equal(response.status,200);assert.match(html,/LIVE MULTI-MODEL LAB \/ REAL INFERENCE/);assert.match(html,/One fair test/);assert.match(html,/real frontier, open, and small models/i);assert.match(html,/RUN SIDE-BY-SIDE TEST/);assert.match(html,/MODEL CONNECTION/);assert.match(html,/Live multi-model inference/);assert.match(html,/"@type":"WebApplication"/);assert.match(html,/rel="canonical" href="https:\/\/axonradar\.netlify\.app\/playground"/);
});

test("renders the complete evaluation studio and methodology",async()=>{
 const response=await render("/evaluations"),html=await response.text();assert.equal(response.status,200);assert.match(html,/PHASE 04 \/ EVALUATION STUDIO/);assert.match(html,/Turn a real workload into a repeatable test/);assert.match(html,/Support answer quality/);assert.match(html,/RUN FULL EVALUATION/);assert.match(html,/JSON and CSV reports/);assert.match(html,/"@type":"WebApplication"/);assert.match(html,/rel="canonical" href="https:\/\/axonradar\.netlify\.app\/evaluations"/);
 const method=await render("/evaluations/methodology"),methodHtml=await method.text();assert.equal(method.status,200);assert.match(methodHtml,/Evidence needs/);assert.match(methodHtml,/RECOMMENDED HUMAN RUBRIC/);assert.match(methodHtml,/representative cases/i);assert.match(methodHtml,/BreadcrumbList/);
});

test("renders the intelligent router and routing methodology",async()=>{
 const response=await render("/router"),html=await response.text();assert.equal(response.status,200);assert.match(html,/PHASE 05 \/ INTELLIGENT ROUTER/);assert.match(html,/Define the operating limits/);assert.match(html,/See the decision before spending a token/);assert.match(html,/SIMULATE ROUTE/);assert.match(html,/DISPATCH ROUTED REQUEST/);assert.match(html,/JSON and TypeScript export/);assert.match(html,/"@type":"SoftwareApplication"/);assert.match(html,/rel="canonical" href="https:\/\/axonradar\.netlify\.app\/router"/);
 const method=await render("/router/methodology"),methodHtml=await method.text();assert.equal(method.status,200);assert.match(methodHtml,/Every route/);assert.match(methodHtml,/PRODUCTION CHECKLIST/);assert.match(methodHtml,/Route from evidence/);assert.match(methodHtml,/BreadcrumbList/);
});
