import{SITE_URL}from"@/lib/seo";

export type SitemapEntry={url:string;lastModified?:Date|string;changeFrequency?:"always"|"hourly"|"daily"|"weekly"|"monthly"|"yearly"|"never";priority?:number};

const escapeXml=(value:string)=>value.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;");

export function sitemapIndex(paths:string[]){return`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(path=>`  <sitemap><loc>${SITE_URL}${path}</loc></sitemap>`).join("\n")}
</sitemapindex>`}

export function urlSet(entries:SitemapEntry[]){return`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry=>`  <url>
    <loc>${escapeXml(entry.url)}</loc>${entry.lastModified?`\n    <lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>`:""}${entry.changeFrequency?`\n    <changefreq>${entry.changeFrequency}</changefreq>`:""}${entry.priority!==undefined?`\n    <priority>${entry.priority}</priority>`:""}
  </url>`).join("\n")}
</urlset>`}

export const xmlResponse=(xml:string,cacheControl:string)=>new Response(xml,{headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":cacheControl,"X-Content-Type-Options":"nosniff"}});
