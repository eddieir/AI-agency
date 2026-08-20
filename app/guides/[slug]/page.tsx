import type{Metadata}from"next";
import Link from"next/link";
import{notFound}from"next/navigation";
import{SiteHeader}from"@/components/SiteHeader";
import{SiteFooter}from"@/components/SiteFooter";
import{guideBySlug,guides}from"@/lib/guides";
import{JsonLd,absolute,breadcrumbJson}from"@/lib/seo";

type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return guides.map(guide=>({slug:guide.slug}))}

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const guide=guideBySlug((await params).slug);
  if(!guide)return{title:"Guide not found",robots:{index:false,follow:true}};
  return{title:guide.title,description:guide.description,keywords:guide.keywords,alternates:{canonical:`/guides/${guide.slug}`},openGraph:{type:"article",url:`/guides/${guide.slug}`,title:guide.title,description:guide.description,publishedTime:guide.updatedAt,modifiedTime:guide.updatedAt,images:[]},twitter:{card:"summary",title:guide.title,description:guide.description,images:[]}};
}

export default async function GuidePage({params}:Props){
  const guide=guideBySlug((await params).slug);
  if(!guide)notFound();
  const article={"@context":"https://schema.org","@type":"Article",headline:guide.title,description:guide.description,datePublished:guide.updatedAt,dateModified:guide.updatedAt,mainEntityOfPage:absolute(`/guides/${guide.slug}`),author:{"@type":"Organization",name:"AXON//RADAR"},publisher:{"@type":"Organization",name:"AXON//RADAR",url:absolute("/")},articleSection:"Artificial Intelligence Guides",keywords:guide.keywords.join(", ")};
  return <><SiteHeader/><main className="seo-detail guide-detail"><JsonLd data={breadcrumbJson([{name:"Home",path:"/"},{name:"Guides",path:"/guides"},{name:guide.title,path:`/guides/${guide.slug}`}])}/><JsonLd data={article}/><nav className="seo-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/guides">Guides</Link></nav><article><header><span>{guide.eyebrow}</span><time dateTime={guide.updatedAt}>Updated {new Date(guide.updatedAt).toLocaleDateString("en",{year:"numeric",month:"long",day:"numeric"})}</time><h1>{guide.title}</h1><p>{guide.description}</p></header>{guide.sections.map((section,index)=><section key={section.heading}><small>{String(index+1).padStart(2,"0")}</small><h2>{section.heading}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{section.points&&<ul>{section.points.map(point=><li key={point}>{point}</li>)}</ul>}</section>)}<aside><h2>Continue exploring</h2><div>{guide.related.map(item=><Link href={item.href} key={item.href}>{item.label}</Link>)}</div></aside></article></main><SiteFooter/></>;
}
