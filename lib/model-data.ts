import {slugify,stableHash} from "@/lib/seo";
import{extractParameters}from"@/lib/model-parameters";
export{extractParameters}from"@/lib/model-parameters";

type HfModel={id:string;author?:string;lastModified?:string;downloads?:number;likes?:number;pipeline_tag?:string;tags?:string[];safetensors?:{total?:number};private?:boolean;gated?:boolean|string};
export type ModelItem={id:string;slug:string;name:string;provider:string;url:string;updatedAt:string;downloads:number;likes:number;task:string;parameters:number|null;sizeLabel:string;tier:"Frontier"|"Small"|"Mid-size"|"Unknown";access:"Open"|"Gated";tags:string[];source:"Hugging Face"};
export type ModelSignal={title:string;source:string;url:string;publishedAt:string};
export type ModelData={models:ModelItem[];signals:ModelSignal[];meta:{updatedAt:string;refreshSeconds:number;sources:string[]}};

const trustedFrontier=new Set(["meta-llama","google","mistralai","deepseek-ai","qwen","nvidia","ibm-granite","microsoft","tiiuae","moonshotai","zai-org","openai"]);
function tierFor(provider:string,parameters:number|null,name:string):ModelItem["tier"]{if(parameters!==null){if(parameters<=15e9)return"Small";if(parameters>=70e9)return"Frontier";return"Mid-size"}if(trustedFrontier.has(provider.toLowerCase())&&/(ultra|max|pro|reason|r1|large|opus|frontier)/i.test(name))return"Frontier";return"Unknown"}
function sizeLabel(parameters:number|null){if(parameters===null)return"Not disclosed";if(parameters>=1e12)return`${(parameters/1e12).toFixed(parameters%1e12?1:0)}T`;if(parameters>=1e9)return`${(parameters/1e9).toFixed(parameters%1e9?1:0)}B`;return`${Math.round(parameters/1e6)}M`}
const modelSlug=(id:string,name:string)=>`${slugify(name)}-${stableHash(id)}`;
const clean=(value:string)=>value.replace(/<!\[CDATA\[|\]\]>/g,"").replace(/<[^>]+>/g," ").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g," ").trim();
const tag=(xml:string,name:string)=>clean(xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`,"i"))?.[1]??"");

async function timedFetch(url:string,init:RequestInit={},ms=4000){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),ms);
  try{return await fetch(url,{...init,signal:controller.signal,next:{revalidate:300}})}
  finally{clearTimeout(timer)}
}

async function frontierSignals(){
  const query='("new model" OR "model release") (OpenAI OR Anthropic OR Google DeepMind OR Meta AI OR Mistral OR DeepSeek OR Qwen) when:14d';
  const url=`https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
  const response=await timedFetch(url,{headers:{"User-Agent":"AXON-Radar/3.0"}},3000);
  if(!response.ok)return[];
  const xml=await response.text();
  return[...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0,12).map(match=>{const block=match[1];const raw=tag(block,"title");const parts=raw.split(" - ");const source=parts.length>1?parts.pop()!:"Model news";return{title:parts.join(" - ")||raw,source,url:tag(block,"link"),publishedAt:new Date(tag(block,"pubDate")||Date.now()).toISOString()}}).filter(item=>item.title&&item.url);
}

export async function getModelData():Promise<ModelData>{
  try{
    const hfUrl="https://huggingface.co/api/models?pipeline_tag=text-generation&sort=lastModified&direction=-1&limit=100&full=true";
    const [hfResponse,signals]=await Promise.all([timedFetch(hfUrl,{headers:{Accept:"application/json","User-Agent":"AXON-Radar/3.0"}},4000),frontierSignals().catch(()=>[])]);
    if(!hfResponse.ok)throw new Error("model registry unavailable");
    const raw=(await hfResponse.json()) as HfModel[];
    const models:ModelItem[]=raw.filter(model=>!model.private).map(model=>{
      const provider=model.id.split("/")[0]||model.author||"Community";
      const name=model.id.split("/").pop()||model.id;
      const parameters=extractParameters(model);
      return{id:model.id,slug:modelSlug(model.id,name),name,provider,url:`https://huggingface.co/${model.id}`,updatedAt:model.lastModified??new Date().toISOString(),downloads:model.downloads??0,likes:model.likes??0,task:model.pipeline_tag??"text-generation",parameters,sizeLabel:sizeLabel(parameters),tier:tierFor(provider,parameters,name),access:model.gated?("Gated" as const):("Open" as const),tags:(model.tags??[]).filter(value=>!value.includes(":")).slice(0,5),source:"Hugging Face" as const};
    }).sort((a,b)=>Date.parse(b.updatedAt)-Date.parse(a.updatedAt));
    return{models,signals,meta:{updatedAt:new Date().toISOString(),refreshSeconds:300,sources:["Hugging Face Hub","AI release coverage"]}};
  }catch{return{models:[],signals:[],meta:{updatedAt:new Date().toISOString(),refreshSeconds:300,sources:[]}}}
}

export async function getModelItem(slug:string){
  const data=await getModelData();
  return data.models.find(model=>model.slug===slug)??null;
}
