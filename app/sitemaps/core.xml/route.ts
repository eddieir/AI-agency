import{guides}from"@/lib/guides";
import{newsCategories}from"@/lib/news-data";
import{SITE_URL}from"@/lib/seo";
import{urlSet,xmlResponse,type SitemapEntry}from"@/lib/sitemap-xml";

export const dynamic="force-static";

export function GET(){
  const now=new Date();
  const routes:SitemapEntry[]=[
    {url:SITE_URL,lastModified:now,changeFrequency:"daily",priority:1},
    {url:`${SITE_URL}/news`,lastModified:now,changeFrequency:"hourly",priority:.95},
    {url:`${SITE_URL}/models`,lastModified:now,changeFrequency:"hourly",priority:.9},
    {url:`${SITE_URL}/developers`,changeFrequency:"weekly",priority:.8},
    {url:`${SITE_URL}/creators`,changeFrequency:"weekly",priority:.8},
    {url:`${SITE_URL}/compare`,changeFrequency:"weekly",priority:.75},
    {url:`${SITE_URL}/guides`,changeFrequency:"weekly",priority:.8},
    ...newsCategories.map(category=>({url:`${SITE_URL}/news/category/${category.toLowerCase().replace(/\s+/g,"-")}`,lastModified:now,changeFrequency:"hourly" as const,priority:.72})),
    ...guides.map(guide=>({url:`${SITE_URL}/guides/${guide.slug}`,lastModified:guide.updatedAt,changeFrequency:"monthly" as const,priority:.82})),
  ];
  return xmlResponse(urlSet(routes),"public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
}
