import assert from"node:assert/strict";import test from"node:test";import{readFile}from"node:fs/promises";import{formatUtcDate,formatUtcTime}from"../lib/date-format.ts";import{extractParameters}from"../lib/model-parameters.ts";import{pluralize}from"../lib/grammar.ts";

test("UTC timestamp formatting is deterministic across runtime timezones",()=>{const value="2026-08-20T23:30:00.000Z";const previous=process.env.TZ;process.env.TZ="Pacific/Auckland";const a=formatUtcTime(value),dateA=formatUtcDate(value,"year");process.env.TZ="America/Los_Angeles";const b=formatUtcTime(value),dateB=formatUtcDate(value,"year");process.env.TZ=previous;assert.equal(a,"23:30");assert.equal(a,b);assert.equal(dateA,"Aug 20, 2026");assert.equal(dateA,dateB)});

test("repository parameter disclosure wins over unrelated base-model tags",()=>{const parameters=extractParameters({id:"community/Qwen3.5-4B-Opus-Distilled-Heretic-Thinking-Multistage-SFT-v1.0-i1-GGUF",tags:["base_model:someone/Unrelated-9B-Instruct","gguf"]});assert.equal(parameters,4e9)});

test("authoritative safetensors total wins when it is disclosed",()=>{assert.equal(extractParameters({id:"provider/model-4B",tags:["base_model:model-9B"],safetensors:{total:4_123_456_789}}),4_123_456_789)});

test("arbitrary model relationship tags do not invent a parameter size",()=>{assert.equal(extractParameters({id:"provider/model-without-size",tags:["base_model:other/model-70B","finetuned_from:other/model-9B"]}),null);assert.equal(extractParameters({id:"provider/model-without-size",tags:["parameters:7B"]}),7e9)});

test("evaluation labels use correct singular and plural grammar",()=>{assert.equal(pluralize(1,"case"),"case");assert.equal(pluralize(0,"case"),"cases");assert.equal(pluralize(2,"case"),"cases")});

test("filterable intelligence surfaces retain explicit zero-result recovery",async()=>{const files=["components/BenchmarkExplorer.tsx","components/ModelRadar.tsx","components/NewsFeed.tsx"];for(const file of files){const source=await readFile(new URL(`../${file}`,import.meta.url),"utf8");assert.match(source,/role="status"/);assert.match(source,/clear (search|filters)/i)}});

test("comparison missing values use one consistent presentation",async()=>{const source=await readFile(new URL("../components/ModelComparator.tsx",import.meta.url),"utf8");assert.match(source,/recorded\(m\.hosting\)/);assert.match(source,/recorded\(m\.privacy\)/)});
