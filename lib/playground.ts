export type PlaygroundPreset={id:string;label:string;eyebrow:string;system:string;prompt:string;format:"text"|"json"|"markdown";temperature:number;maxTokens:number};

export const playgroundPresets:PlaygroundPreset[]=[
  {id:"release-brief",label:"Release brief",eyebrow:"NEWSROOM",system:"You are a technical AI editor. Separate confirmed facts from interpretation and preserve source attribution.",prompt:"Create a concise release brief about {{model}} for {{audience}}. Cover what changed, strongest evidence, limitations, pricing implications, and the next validation step.",format:"markdown",temperature:.3,maxTokens:900},
  {id:"architecture-review",label:"Architecture review",eyebrow:"DEVELOPERS",system:"You are a senior AI systems architect. Optimize for correctness, observability, security, and reversible decisions.",prompt:"Review this proposed AI workload for {{company}}:\n\n{{workload}}\n\nReturn the recommended model profile, deployment pattern, evaluation plan, failure modes, and rollout gates.",format:"markdown",temperature:.2,maxTokens:1400},
  {id:"creative-treatment",label:"Creative treatment",eyebrow:"CREATORS",system:"You are a creative director for premium photography and film. Give production-ready direction without changing the subject's identity.",prompt:"Build a visual treatment for {{campaign}}. Define concept, shot list, lighting, camera movement, color language, edit rhythm, deliverables, and practical constraints.",format:"markdown",temperature:.7,maxTokens:1200},
  {id:"structured-extract",label:"Structured extract",eyebrow:"OPERATIONS",system:"Extract only information supported by the supplied text. Use null for unknown values and never invent a field.",prompt:"Extract the following document into the requested schema:\n\n{{document}}",format:"json",temperature:0,maxTokens:800}
];

export const defaultVariables:Record<string,string>={model:"the selected model",audience:"a technical product team",company:"an AI startup",workload:"A customer-support agent using private documents and internal tools.",campaign:"a cinematic editorial campaign",document:"Paste the source document here."};

export function findVariables(value:string){return[...new Set([...value.matchAll(/{{\s*([\w-]+)\s*}}/g)].map(match=>match[1]))]}

export function interpolate(value:string,variables:Record<string,string>){return value.replace(/{{\s*([\w-]+)\s*}}/g,(_,key:string)=>variables[key]?.trim()||`{{${key}}}`)}
