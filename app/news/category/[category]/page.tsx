import type{Metadata}from"next";
import Link from"next/link";
import{notFound}from"next/navigation";
import{SiteHeader}from"@/components/SiteHeader";
import{SiteFooter}from"@/components/SiteFooter";
import{getNewsData,newsCategories,type NewsCategory}from"@/lib/news-data";
import{JsonLd,absolute,breadcrumbJson}from"@/lib/seo";

export const dynamic="force-dynamic";
type Props={params:Promise<{category:string}>};
const categorySlug=(value:string)=>value.toLowerCase().replace(/\s+/g,"-");
const resolveCategory=(slug:string)=>newsCategories.find(category=>categorySlug(category)===slug);

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const{category}=await params;
  const label=resolveCategory(category);
  if(!label)return{title:"AI news category not found",robots:{index:false,follow:true}};
  const description=`Latest ${label.toLowerCase()} AI news, releases, research, and original-source briefings from AXON//RADAR.`;
  return{title:`${label} AI News — Latest Releases and Research`,description,alternates:{canonical:`/news/category/${category}`},openGraph:{url:`/news/category/${category}`,title:`${label} AI News`,description},twitter:{title:`${label} AI News | AXON//RADAR`,description}};
}

export default async function NewsCategoryPage({params}:Props){
  const{category}=await params;
  const label=resolveCategory(category);
  if(!label)notFound();
  const data=await getNewsData();
  const items=data.items.filter(item=>item.category===label as NewsCategory);
  const page={"@context":"https://schema.org","@type":"CollectionPage",name:`${label} AI News`,url:absolute(`/news/category/${category}`),mainEntity:{"@type":"ItemList",itemListElement:items.map((item,index)=>({"@type":"ListItem",position:index+1,url:absolute(`/news/${item.slug}`),name:item.title}))}};
  return <><SiteHeader/><main className="seo-collection"><JsonLd data={breadcrumbJson([{name:"Home",path:"/"},{name:"News",path:"/news"},{name:label,path:`/news/category/${category}`}])}/><JsonLd data={page}/><header><span>AI NEWS DESK</span><h1>{label}<br/><em>AI news.</em></h1><p>Current {label.toLowerCase()} releases and research, summarized from live sources and linked to the original publisher.</p></header><nav className="seo-category-nav" aria-label="News categories">{newsCategories.map(item=><Link className={item===label?"active":""} key={item} href={`/news/category/${categorySlug(item)}`}>{item}</Link>)}</nav><section className="seo-card-grid">{items.map(item=><Link href={`/news/${item.slug}`} key={item.id}><div><span>{item.source}</span><time>{new Date(item.publishedAt).toLocaleDateString("en",{month:"short",day:"numeric",year:"numeric"})}</time></div><h2>{item.title}</h2><p>{item.summary}</p><b>READ BRIEFING ↗</b></Link>)}</section>{!items.length&&<div className="seo-empty"><h2>No current {label.toLowerCase()} stories</h2><p>The live desk is refreshing. Explore the complete newsroom while new source material arrives.</p><Link href="/news">OPEN NEWSROOM ↗</Link></div>}</main><SiteFooter/></>;
}
