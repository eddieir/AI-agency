export type GuideSection={heading:string;paragraphs:string[];points?:string[]};
export type Guide={slug:string;title:string;description:string;eyebrow:string;updatedAt:string;keywords:string[];sections:GuideSection[];related:Array<{label:string;href:string}>};

export const guides:Guide[]=[
  {
    slug:"choosing-an-ai-model",
    title:"How to Choose an AI Model for Production",
    description:"A practical framework for comparing frontier, small, open-weight, and commercial AI models by quality, latency, privacy, cost, and operational fit.",
    eyebrow:"DEVELOPER GUIDE / MODEL SELECTION",
    updatedAt:"2026-08-20",
    keywords:["how to choose an AI model","AI model comparison","frontier vs small language models","open source AI models"],
    sections:[
      {heading:"Start with the workload",paragraphs:["The best model is not automatically the largest model. Begin with the task: classification, extraction, retrieval, coding, multimodal understanding, long-form generation, or autonomous tool use. Each workload creates a different quality and latency threshold."],points:["Define acceptable output quality with real examples.","Measure the maximum response time users will tolerate.","Identify whether requests contain regulated or sensitive data.","Estimate normal and peak token volume before comparing prices."]},
      {heading:"Compare capability and reliability",paragraphs:["Public benchmarks are useful for orientation, but production evaluation should use your own inputs and pass criteria. Test failure modes, structured-output consistency, refusal behavior, context retention, and tool-call accuracy—not only average answer quality."]},
      {heading:"Decide between hosted and open models",paragraphs:["Hosted frontier APIs reduce operational work and provide rapid access to new capabilities. Open-weight models offer more control over privacy, deployment location, fine-tuning, and unit economics at sustained scale. Hybrid stacks often route difficult requests to frontier systems and predictable tasks to smaller models."]},
      {heading:"Calculate the full production cost",paragraphs:["Token price is only one component. Include retries, output length, caching, evaluation, observability, moderation, infrastructure, and engineering time. A cheaper model with inconsistent output can cost more after recovery logic and human review."]},
    ],
    related:[{label:"Live AI model radar",href:"/models"},{label:"Developer AI tools",href:"/developers"},{label:"Compare AI tools",href:"/compare"}],
  },
  {
    slug:"best-ai-tools-for-developers",
    title:"Best AI Tools for Developers: APIs, Agents and Local Models",
    description:"Understand the modern AI developer stack, from foundation-model APIs and agent runtimes to open models, local inference, evaluation, and production monitoring.",
    eyebrow:"DEVELOPER GUIDE / AI STACK",
    updatedAt:"2026-08-20",
    keywords:["best AI tools for developers","AI APIs","AI agent tools","local AI models","open source AI developer tools"],
    sections:[
      {heading:"The stack has five layers",paragraphs:["A production AI feature usually combines a model provider, orchestration layer, data or retrieval system, evaluation workflow, and observability. Selecting each layer independently prevents a single vendor choice from determining the entire architecture."],points:["Model APIs for reasoning, generation, vision, and speech.","Open-model runtimes for local or controlled deployment.","Agent frameworks for tools, state, and multi-step workflows.","Evaluation systems for quality, safety, and regression testing.","Tracing and cost monitoring for production operations."]},
      {heading:"Prototype with portability",paragraphs:["Start with the fastest path to a measurable prototype, but keep prompts, evaluations, tool definitions, and domain logic outside provider-specific code. A thin adapter makes it possible to test new models without rewriting the product."]},
      {heading:"Treat evaluation as product infrastructure",paragraphs:["AI behavior changes across models and versions. Maintain representative datasets, deterministic checks where possible, and human-reviewed scorecards for subjective tasks. Run those evaluations before changing the model behind a production feature."]},
      {heading:"Use local models deliberately",paragraphs:["Local inference is valuable for privacy, offline operation, predictable high-volume workloads, and low-latency edge experiences. It also transfers responsibility for capacity, updates, security, and model governance to your team."]},
    ],
    related:[{label:"Developer tool directory",href:"/developers"},{label:"Track new AI models",href:"/models"},{label:"Compare tools by price",href:"/compare"}],
  },
  {
    slug:"best-ai-tools-for-creators",
    title:"Best AI Tools for Photographers, Filmmakers and Editors",
    description:"A production-focused guide to choosing AI tools for photography, video, editing, color, design, audio, restoration, and creative delivery.",
    eyebrow:"CREATIVE GUIDE / PRODUCTION TOOLS",
    updatedAt:"2026-08-20",
    keywords:["best AI tools for photographers","AI tools for filmmakers","AI video editing tools","AI photo editing tools","AI tools for creators"],
    sections:[
      {heading:"Choose by stage, not by hype",paragraphs:["Creative professionals need tools that fit an existing production pipeline. Map options to pre-production, capture support, generation, editing, cleanup, color, audio, delivery, and archive. A spectacular demo is not useful if it breaks continuity or cannot export into the next stage."]},
      {heading:"Protect authorship and consistency",paragraphs:["Evaluate whether the tool gives you repeatable control over composition, identity, color, motion, and revisions. For client work, confirm commercial-use terms, asset retention policies, training-data controls, and whether generated elements can be documented."]},
      {heading:"Separate generation from enhancement",paragraphs:["Generative tools create or transform content. Enhancement tools recover detail, reduce noise, upscale, transcribe, mask, stabilize, or accelerate repetitive editing. Enhancement often provides the fastest professional return because it preserves the original creative direction."]},
      {heading:"Compare total workflow time",paragraphs:["Measure import, setup, generation, correction, export, and client revision time. A tool that produces a result quickly but requires extensive cleanup may be slower than a more controllable alternative integrated into your editor."]},
    ],
    related:[{label:"Creative AI tool directory",href:"/creators"},{label:"Compare free and paid tools",href:"/compare"},{label:"Latest creative AI news",href:"/news/category/creative"}],
  },
];

export const guideBySlug=(slug:string)=>guides.find(guide=>guide.slug===slug);
