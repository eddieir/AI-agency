import type{Metadata}from"next";
import Link from"next/link";
import{SiteHeader}from"@/components/SiteHeader";
import{SiteFooter}from"@/components/SiteFooter";
import{guides}from"@/lib/guides";
import{JsonLd,absolute,breadcrumbJson}from"@/lib/seo";

export const metadata:Metadata={title:"AI Guides for Developers and Creators",description:"Practical, independent guides for choosing AI models, developer platforms, and creative production tools.",alternates:{canonical:"/guides"},openGraph:{url:"/guides",title:"AI Guides for Developers and Creators",description:"Production-focused guidance for choosing AI models and tools."},twitter:{title:"AI Guides | AXON//RADAR",description:"Production-focused guidance for choosing AI models and tools."}};

export default function GuidesPage(){
  const collection={"@context":"https://schema.org","@type":"CollectionPage",name:"AXON//RADAR AI Guides",url:absolute("/guides"),mainEntity:{"@type":"ItemList",itemListElement:guides.map((guide,index)=>({"@type":"ListItem",position:index+1,name:guide.title,url:absolute(`/guides/${guide.slug}`)}))}};
  return <><SiteHeader/><main className="seo-collection guides-index"><JsonLd data={breadcrumbJson([{name:"Home",path:"/"},{name:"Guides",path:"/guides"}])}/><JsonLd data={collection}/><header><span>PRACTICAL AI KNOWLEDGE</span><h1>Choose with<br/><em>better context.</em></h1><p>Independent frameworks for evaluating models, developer platforms, and creative production tools.</p></header><section className="seo-card-grid">{guides.map((guide,index)=><Link href={`/guides/${guide.slug}`} key={guide.slug}><div><span>{guide.eyebrow}</span><b>{String(index+1).padStart(2,"0")}</b></div><h2>{guide.title}</h2><p>{guide.description}</p><b>READ GUIDE ↗</b></Link>)}</section></main><SiteFooter/></>;
}
