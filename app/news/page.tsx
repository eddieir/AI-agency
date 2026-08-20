import type{Metadata}from"next";
import Link from"next/link";
import{SiteHeader}from"@/components/SiteHeader";
import{SiteFooter}from"@/components/SiteFooter";
import{NewsFeed}from"@/components/NewsFeed";
import{getNewsData,newsCategories}from"@/lib/news-data";
import{JsonLd,absolute,breadcrumbJson}from"@/lib/seo";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Latest AI News — Models, Agents and Research",description:"Read current AI news from official sources covering frontier models, open source AI, agents, research, creative technology, business, robotics, and policy.",keywords:["latest AI news","AI model news","artificial intelligence news","AI agents news","open source AI news","AI research news"],alternates:{canonical:"/news"},openGraph:{url:"/news",title:"Latest AI News — Models, Agents and Research",description:"Current AI releases and research from official and trusted technical sources."},twitter:{title:"Latest AI News | AXON//RADAR",description:"Current AI releases, models, agents, research, and industry news."}};

export default async function NewsPage(){
  const data=await getNewsData();
  const collection={"@context":"https://schema.org","@type":"CollectionPage",name:"Latest AI News",description:metadata.description,url:absolute("/news"),mainEntity:{["@type"]:"ItemList",itemListElement:data.items.slice(0,30).map((item,index)=>({"@type":"ListItem",position:index+1,url:absolute(`/news/${item.slug}`),name:item.title}))}};
  return <><SiteHeader/><main className="news-page"><JsonLd data={breadcrumbJson([{name:"Home",path:"/"},{name:"News",path:"/news"}])}/><JsonLd data={collection}/><section className="news-hero"><div><span className="intel-kicker"><i/>NEWS INTELLIGENCE / LIVE</span><h1>The world of AI.<br/><em>In one signal.</em></h1></div><div><p>Seven live desks tracking frontier labs, open source, agents, research, creative technology, business, robotics, and policy.</p><nav className="desk-codes" aria-label="AI news categories">{newsCategories.map(category=><Link key={category} href={`/news/category/${category.toLowerCase().replace(/\s+/g,"-")}`}>{category}</Link>)}</nav></div></section><section className="newsroom-shell"><NewsFeed initialData={data}/></section><section className="news-method" id="method"><span>THE EDITORIAL SYSTEM</span><h2>Wide coverage.<br/><em>Fast orientation.</em></h2><div><article><b>01</b><h3>Scan broadly</h3><p>Distinct topic desks reduce the blind spots of a single generic AI feed.</p></article><article><b>02</b><h3>Remove repeats</h3><p>Near-duplicate headlines are collapsed before stories reach the newsroom.</p></article><article><b>03</b><h3>Keep the source</h3><p>Every briefing links to the original publisher so context remains verifiable.</p></article><article><b>04</b><h3>Refresh often</h3><p>The server refreshes frequently while permanent briefing URLs remain indexable.</p></article></div></section></main><SiteFooter/></>;
}
