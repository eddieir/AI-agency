import{getNewsData}from"@/lib/news-data";
import{SITE_URL}from"@/lib/seo";
import{urlSet,xmlResponse}from"@/lib/sitemap-xml";

export const dynamic="force-dynamic";

export async function GET(){
  const news=await getNewsData().catch(()=>null);
  const entries=(news?.items??[]).map(item=>({url:`${SITE_URL}/news/${item.slug}`,lastModified:item.publishedAt,changeFrequency:"never" as const,priority:.68}));
  return xmlResponse(urlSet(entries),"public, max-age=300, s-maxage=3600, stale-while-revalidate=86400");
}
