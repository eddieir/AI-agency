import Link from"next/link";
import type{NewsData}from"@/lib/news-data";

export function HomeNewsBrief({data}:Readonly<{data:NewsData}>){
  const stories=data.items.slice(0,5);
  if(!stories.length)return <div className="home-news-loading error"><span>LIVE FEED TEMPORARILY UNAVAILABLE</span><Link href="/news">OPEN NEWSROOM ↗</Link></div>;
  const[lead,...rest]=stories;
  return <div className="home-news-grid"><Link className="home-news-lead" href={`/news/${lead.slug}`}><div><span>{lead.category}</span><time>{new Date(lead.publishedAt).toLocaleDateString("en",{month:"short",day:"numeric",year:"numeric"})}</time></div><h3>{lead.title}</h3><p>{lead.summary}</p><footer><b>{lead.source}</b><span>READ BRIEFING ↗</span></footer></Link><div className="home-news-side">{rest.map(story=><Link href={`/news/${story.slug}`} key={story.id}><div><span>{story.category}</span><time>{new Date(story.publishedAt).toLocaleDateString("en",{month:"short",day:"numeric"})}</time></div><h3>{story.title}</h3><footer><b>{story.source}</b><span>↗</span></footer></Link>)}</div></div>;
}
