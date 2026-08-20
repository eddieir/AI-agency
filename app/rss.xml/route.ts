import{getNewsData}from"@/lib/news-data";
import{SITE_NAME,SITE_URL}from"@/lib/seo";

export const dynamic="force-dynamic";
const escapeXml=(value:string)=>value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");

export async function GET(){
  const data=await getNewsData();
  const items=data.items.slice(0,50).map(item=>`<item><title>${escapeXml(item.title)}</title><link>${SITE_URL}/news/${item.slug}</link><guid isPermaLink="true">${SITE_URL}/news/${item.slug}</guid><description>${escapeXml(item.summary)}</description><pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate><category>${escapeXml(item.category)}</category><source url="${escapeXml(item.url)}">${escapeXml(item.source)}</source></item>`).join("");
  const xml=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${SITE_NAME} — AI News</title><link>${SITE_URL}/news</link><description>Current AI news, model releases, research, developer tools, and creative technology from original sources.</description><language>en-US</language><lastBuildDate>${new Date(data.meta.updatedAt).toUTCString()}</lastBuildDate><ttl>5</ttl>${items}</channel></rss>`;
  return new Response(xml,{headers:{"Content-Type":"application/rss+xml; charset=utf-8","Cache-Control":"public, max-age=60, s-maxage=300, stale-while-revalidate=900"}});
}
