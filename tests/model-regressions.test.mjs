import assert from"node:assert/strict";import test from"node:test";import{readFile}from"node:fs/promises";import{formatUtcDate,formatUtcTime}from"../lib/date-format.ts";import{extractParameters}from"../lib/model-parameters.ts";import{pluralize}from"../lib/grammar.ts";
import{modelIdFromSlug,modelSlug}from"../lib/model-slug.ts";

test("UTC timestamp formatting is deterministic across runtime timezones",()=>{const value="2026-08-20T23:30:00.000Z";const previous=process.env.TZ;process.env.TZ="Pacific/Auckland";const a=formatUtcTime(value),dateA=formatUtcDate(value,"year");process.env.TZ="America/Los_Angeles";const b=formatUtcTime(value),dateB=formatUtcDate(value,"year");process.env.TZ=previous;assert.equal(a,"23:30");assert.equal(a,b);assert.equal(dateA,"Aug 20, 2026");assert.equal(dateA,dateB)});

test("repository parameter disclosure wins over unrelated base-model tags",()=>{const parameters=extractParameters({id:"community/Qwen3.5-4B-Opus-Distilled-Heretic-Thinking-Multistage-SFT-v1.0-i1-GGUF",tags:["base_model:someone/Unrelated-9B-Instruct","gguf"]});assert.equal(parameters,4e9)});

test("authoritative safetensors total wins when it is disclosed",()=>{assert.equal(extractParameters({id:"provider/model-4B",tags:["base_model:model-9B"],safetensors:{total:4_123_456_789}}),4_123_456_789)});

test("arbitrary model relationship tags do not invent a parameter size",()=>{assert.equal(extractParameters({id:"provider/model-without-size",tags:["base_model:other/model-70B","finetuned_from:other/model-9B"]}),null);assert.equal(extractParameters({id:"provider/model-without-size",tags:["parameters:7B"]}),7e9)});

test("evaluation labels use correct singular and plural grammar",()=>{assert.equal(pluralize(1,"case"),"case");assert.equal(pluralize(0,"case"),"cases");assert.equal(pluralize(2,"case"),"cases")});

test("filterable intelligence surfaces retain explicit zero-result recovery",async()=>{const files=["components/BenchmarkExplorer.tsx","components/ModelRadar.tsx","components/NewsFeed.tsx"];for(const file of files){const source=await readFile(new URL(`../${file}`,import.meta.url),"utf8");assert.match(source,/role="status"/);assert.match(source,/clear (search|filters)/i)}});

test("comparison missing values use one consistent presentation",async()=>{const source=await readFile(new URL("../components/ModelComparator.tsx",import.meta.url),"utf8");assert.match(source,/recorded\(m\.hosting\)/);assert.match(source,/recorded\(m\.privacy\)/)});

test("model URLs retain the exact upstream repository identity",()=>{const id="Qwen/模型 3.5-special_4B";const slug=modelSlug(id,"模型 3.5-special_4B",value=>value.toLowerCase().replace(/[^a-z0-9]+/g,"-"));assert.equal(modelIdFromSlug(slug),id);assert.equal(modelIdFromSlug("legacy-model-abc123"),null)});

test("server-rendered routes receive the complete security policy",async()=>{const source=await readFile(new URL("../next.config.ts",import.meta.url),"utf8");for(const header of["Content-Security-Policy","Cross-Origin-Opener-Policy","Permissions-Policy","Referrer-Policy","X-Frame-Options","X-Content-Type-Options"])assert.match(source,new RegExp(header));assert.match(source,/frame-ancestors 'none'/);assert.match(source,/connect-src 'self'/)});

test("dynamic sitemaps avoid serving day-old volatile records",async()=>{for(const file of["app/sitemaps/news.xml/route.ts","app/sitemaps/models.xml/route.ts"]){const source=await readFile(new URL(`../${file}`,import.meta.url),"utf8");assert.match(source,/s-maxage=300/);assert.doesNotMatch(source,/stale-while-revalidate/)}});

test("vision inference enforces capability, type, size, origin, and ephemeral handling",async()=>{const endpoint=await readFile(new URL("../netlify/functions/playground-run.ts",import.meta.url),"utf8"),client=await readFile(new URL("../components/VisionPlayground.tsx",import.meta.url),"utf8");assert.match(endpoint,/mode==="vision"/);assert.match(endpoint,/\.vision/);assert.match(endpoint,/jpeg\|png\|webp/);assert.match(endpoint,/4\*1024\*1024/);assert.match(endpoint,/content-length/);assert.match(endpoint,/signatureValid/);assert.match(endpoint,/Origin not allowed/);assert.match(endpoint,/cache-control":"no-store/);assert.doesNotMatch(client,/localStorage|sessionStorage/);assert.match(client,/MAX_IMAGE_BYTES=4\*1024\*1024/);assert.match(client,/image\/jpeg","image\/png","image\/webp/)});

test("vision playground is included in permanent discovery surfaces",async()=>{for(const file of["app/sitemaps/core.xml/route.ts","app/llms.txt/route.ts","components/SiteFooter.tsx"]){const source=await readFile(new URL(`../${file}`,import.meta.url),"utf8");assert.match(source,/playground\/vision/)}});
