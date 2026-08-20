import type{Metadata}from"next";
import Link from"next/link";
import{notFound}from"next/navigation";
import{SiteHeader}from"@/components/SiteHeader";
import{SiteFooter}from"@/components/SiteFooter";
import{getModelItem}from"@/lib/model-data";
import{JsonLd,absolute,breadcrumbJson}from"@/lib/seo";

export const dynamic="force-dynamic";
type Props={params:Promise<{slug:string}>};

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const{slug}=await params;
  const model=await getModelItem(slug);
  if(!model)return{title:"AI model not found",robots:{index:false,follow:true}};
  const description=`${model.name} by ${model.provider}: ${model.tier.toLowerCase()} ${model.task} model, ${model.sizeLabel} parameters, ${model.access.toLowerCase()} access. Updated model details and source link.`;
  return{title:`${model.name} — AI Model Specs and Access`,description,alternates:{canonical:`/models/${model.slug}`},openGraph:{url:`/models/${model.slug}`,title:`${model.name} by ${model.provider}`,description,images:[]},twitter:{card:"summary",title:`${model.name} | AXON//RADAR`,description,images:[]}};
}

export default async function ModelDetailPage({params}:Props){
  const{slug}=await params;
  const model=await getModelItem(slug);
  if(!model)notFound();
  const schema={
    "@context":"https://schema.org",
    "@type":"SoftwareApplication",
    name:model.name,
    description:`${model.name} is a ${model.tier.toLowerCase()} ${model.task} AI model published by ${model.provider}.`,
    applicationCategory:"Artificial Intelligence Model",
    operatingSystem:"Cloud or compatible model runtime",
    url:absolute(`/models/${model.slug}`),
    sameAs:model.url,
    dateModified:model.updatedAt,
    author:{"@type":"Organization",name:model.provider},
    offers:{
      "@type":"Offer",
      price:"0",
      priceCurrency:"USD",
      availability:model.access==="Open"?"https://schema.org/InStock":"https://schema.org/LimitedAvailability",
    },
  };
  return <><SiteHeader/><main className="seo-detail model-detail"><JsonLd data={breadcrumbJson([{name:"Home",path:"/"},{name:"Models",path:"/models"},{name:model.name,path:`/models/${model.slug}`}])}/><JsonLd data={schema}/><nav className="seo-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/models">Models</Link><span>›</span><span>{model.name}</span></nav><article><header><span>{model.provider} / {model.tier}</span><time dateTime={model.updatedAt}>Updated {new Date(model.updatedAt).toLocaleDateString("en",{year:"numeric",month:"long",day:"numeric"})}</time><h1>{model.name}</h1><p>A current {model.task} model indexed from the Hugging Face Hub and classified by disclosed size, access, and provider metadata.</p></header><section className="model-facts"><div><small>PROVIDER</small><b>{model.provider}</b></div><div><small>CLASS</small><b>{model.tier}</b></div><div><small>PARAMETERS</small><b>{model.sizeLabel}</b></div><div><small>ACCESS</small><b>{model.access}</b></div><div><small>DOWNLOADS</small><b>{model.downloads.toLocaleString()}</b></div><div><small>LIKES</small><b>{model.likes.toLocaleString()}</b></div></section><section><h2>Model profile</h2><p>{model.name} is listed for {model.task}. Its current classification is {model.tier.toLowerCase()}, with {model.sizeLabel.toLowerCase()} disclosed parameters and {model.access.toLowerCase()} repository access. Registry metadata can change as the publisher updates the model card.</p>{model.tags.length>0&&<div className="model-tags">{model.tags.map(tag=><span key={tag}>{tag}</span>)}</div>}<a className="seo-primary-link" href={model.url} target="_blank" rel="noopener noreferrer">OPEN MODEL REPOSITORY <span>↗</span></a></section><aside><h2>Compare your options</h2><div><Link href="/models">All AI models</Link><Link href="/developers">Developer AI stack</Link><Link href="/compare">Compare AI tools</Link><Link href="/guides/choosing-an-ai-model">How to choose an AI model</Link></div></aside></article></main><SiteFooter/></>;
}
