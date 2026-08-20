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
  assert.match(html, /href="\/news"[^>]*>News<\/a>.*href="\/models"[^>]*>Models<\/a>.*href="\/developers"[^>]*>Developers<\/a>.*href="\/creators"[^>]*>Creators<\/a>.*href="\/compare"[^>]*>Compare<\/a>/s);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /href="https:\/\/axonradar\.netlify\.app\/favicon\.ico\?v=2"/);
  assert.match(html, /href="https:\/\/axonradar\.netlify\.app\/favicon\.svg\?v=2"/);
  assert.match(html, /href="https:\/\/axonradar\.netlify\.app\/apple-touch-icon\.png\?v=2"/);
});

for (const [path, heading] of [["/news", "The world of AI"], ["/models", "Every model"], ["/developers", "Build systems"], ["/creators", "More control"], ["/compare", "Make a"]]) {
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
