import type{MetadataRoute}from"next";
export default function robots():MetadataRoute.Robots{return{rules:{userAgent:"*",allow:"/",disallow:["/api/"]},sitemap:"https://ai-radar-hub.eddieir.chatgpt.site/sitemap.xml",host:"https://ai-radar-hub.eddieir.chatgpt.site"}}
