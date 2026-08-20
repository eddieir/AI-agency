import type{Metadata}from"next";
import Link from"next/link";
import{notFound}from"next/navigation";
import{SiteHeader}from"@/components/SiteHeader";
import{SiteFooter}from"@/components/SiteFooter";
import{getNewsItem}from"@/lib/news-data";
import{JsonLd,absolute,breadcrumbJson}from"@/lib/seo";

export const dynamic="force-dynamic";
type Props={params:Promise<{slug:string}>};

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const{slug}=await params;
  const item=await getNewsItem(slug);
  if(!item)return{title:"AI briefing not found",robots:{index:false,follow:true}};
  const description=item.summary.slice(0,160);
  return{title:item.title,description,alternates:{canonical:`/news/${item.slug}`},openGraph:{type:"article",url:`/news/${item.slug}`,title:item.title,description,publishedTime:item.publishedAt,authors:[item.source],images:[]},twitter:{card:"summary",title:item.title,description,images:[]}};
}

export default async function NewsDetailPage({params}:Props){
  const{slug}=await params;
  const item=await getNewsItem(slug);
  if(!item)notFound();
  const article={"@context":"https://schema.org","@type":"NewsArticle",headline:item.title,description:item.summary,datePublished:item.publishedAt,dateModified:item.publishedAt,mainEntityOfPage:absolute(`/news/${item.slug}`),url:absolute(`/news/${item.slug}`),author:{"@type":"Organization",name:item.source,url:item.url},publisher:{"@type":"Organization",name:"AXON//RADAR",url:absolute("/")},isBasedOn:item.url,articleSection:item.category};
  return <><SiteHeader/><main className="seo-detail"><JsonLd data={breadcrumbJson([{name:"Home",path:"/"},{name:"News",path:"/news"},{name:item.category,path:`/news/category/${item.category.toLowerCase().replace(/\s+/g,"-")}`},{name:item.title,path:`/news/${item.slug}`}])}/><JsonLd data={article}/><nav className="seo-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/news">News</Link><span>›</span><Link href={`/news/category/${item.category.toLowerCase().replace(/\s+/g,"-")}`}>{item.category}</Link></nav><article><header><span>{item.category} / {item.source}</span><time dateTime={item.publishedAt}>{new Date(item.publishedAt).toLocaleDateString("en",{year:"numeric",month:"long",day:"numeric"})}</time><h1>{item.title}</h1><p>{item.summary}</p></header><section><h2>Why this matters</h2><p>This briefing preserves the publisher-provided context in a clean, searchable format. Use the original report for the complete announcement, technical details, evidence, and any subsequent updates.</p><a className="seo-primary-link" href={item.url} target="_blank" rel="noopener noreferrer">READ THE ORIGINAL REPORT <span>↗</span></a></section><aside><h2>Continue exploring</h2><div><Link href="/news">Latest AI news</Link><Link href="/models">Live AI model radar</Link><Link href="/developers">AI tools for developers</Link><Link href="/creators">AI tools for creators</Link></div></aside></article></main><SiteFooter/></>;
}
