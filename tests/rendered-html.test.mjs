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