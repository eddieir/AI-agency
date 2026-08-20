import type{Metadata}from"next";
import{SiteHeader}from"@/components/SiteHeader";
import{SiteFooter}from"@/components/SiteFooter";
import{ModelRadar}from"@/components/ModelRadar";
import{getModelData}from"@/lib/model-data";
import{JsonLd,absolute,breadcrumbJson}from"@/lib/seo";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Live AI Model Radar — Frontier, Small and Open Models",description:"Track new frontier AI models, small language models, open-weight releases, model sizes, providers, access, and recent activity in one live index.",keywords:["AI models","frontier AI models","open source AI models","small language models","new AI models","LLM releases","Hugging Face models"],alternates:{canonical:"/models"},openGraph:{url:"/models",title:"Live AI Model Radar — Frontier, Small and Open Models",description:"Track new AI models as they arrive, from small open models to frontier systems."},twitter:{title:"Live AI Model Radar | AXON//RADAR",description:"Frontier, small, mid-size, and open AI model activity."}};

export default async function ModelsPage(){
  const data=await getModelData();
  const collection={"@context":"https://schema.org","@type":"CollectionPage",name:"Live AI Model Radar",description:metadata.description,url:absolute("/models"),mainEntity:{"@type":"ItemList",itemListElement:data.models.slice(0,60).map((model,index)=>({"@type":"ListItem",position:index+1,url:absolute(`/models/${model.slug}`),name:`${model.name} by ${model.provider}`}))}};
  return <><SiteHeader/><main className="intel-main"><JsonLd data={breadcrumbJson([{name:"Home",path:"/"},{name:"Models",path:"/models"}])}/><JsonLd data={collection}/><section className="intel-hero"><div><span className="intel-kicker"><i/>GLOBAL MODEL INTELLIGENCE</span><h1>Every model.<br/><em>As it lands.</em></h1></div><div><p>A server-rendered, continuously refreshed stream of open model uploads and frontier release signals—from tiny on-device models to the largest research systems.</p><div className="intel-stats"><span><b>5m</b> REFRESH</span><span><b>{data.models.length||100}</b> LATEST</span><span><b>2</b> LIVE SOURCES</span></div></div></section><section className="radar-shell"><ModelRadar initialData={data}/></section></main><SiteFooter/></>;
}
