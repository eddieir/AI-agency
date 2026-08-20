import{sitemapIndex,xmlResponse}from"@/lib/sitemap-xml";

export const dynamic="force-static";

export function GET(){return xmlResponse(sitemapIndex(["/sitemaps/core.xml","/sitemaps/news.xml","/sitemaps/models.xml"]),"public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800")}
