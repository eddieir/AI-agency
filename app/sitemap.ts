import type{MetadataRoute}from"next";
import{guides}from"@/lib/guides";
import{getModelData}from"@/lib/model-data";
import{getNewsData,newsCategories}from"@/lib/news-data";
import{SITE_URL}from"@/lib/seo";

export const dynamic="force-dynamic";

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const now=new Date();
  const staticRoutes=[
    {path:"",changeFrequency:"daily" as const,priority:1},
    {path:"/news",changeFrequency:"hourly" as const,priority:.95},
    {path:"/models",changeFrequency:"hourly" as const,priority:.9},
    {path:"/developers",changeFrequency:"weekly" as const,priority:.8},
    {path:"/creators",changeFrequency:"weekly" as const,priority:.8},
    {path:"/compare",changeFrequency:"weekly" as const,priority:.75},
    {path:"/guides",changeFrequency:"weekly" as const,priority:.8},
  ].map(route=>({url:`${SITE_URL}${route.path}`,lastModified:now,changeFrequency:route.changeFrequency,priority:route.priority}));
  const categoryRoutes=newsCategories.map(category=>({url:`${SITE_URL}/news/category/${category.toLowerCase().replace(/\s+/g,"-")}`,lastModified:now,changeFrequency:"hourly" as const,priority:.72}));
  const guideRoutes=guides.map(guide=>({url:`${SITE_URL}/guides/${guide.slug}`,lastModified:new Date(guide.updatedAt),changeFrequency:"monthly" as const,priority:.82}));
  const [news,models]=await Promise.all([getNewsData().catch(()=>null),getModelData().catch(()=>null)]);
  const newsRoutes=(news?.items??[]).map(item=>({url:`${SITE_URL}/news/${item.slug}`,lastModified:new Date(item.publishedAt),changeFrequency:"never" as const,priority:.68}));
  const modelRoutes=(models?.models??[]).slice(0,100).map(model=>({url:`${SITE_URL}/models/${model.slug}`,lastModified:new Date(model.updatedAt),changeFrequency:"weekly" as const,priority:.65}));
  return[...staticRoutes,...categoryRoutes,...guideRoutes,...newsRoutes,...modelRoutes];
}
