import{getModelData,isIndexableModel}from"@/lib/model-data";
import{SITE_URL}from"@/lib/seo";
import{urlSet,xmlResponse}from"@/lib/sitemap-xml";

export const dynamic="force-dynamic";

export async function GET(){
  const models=await getModelData().catch(()=>null);
  const entries=(models?.models??[]).filter(isIndexableModel).slice(0,100).map(model=>({url:`${SITE_URL}/models/${model.slug}`,lastModified:model.updatedAt,changeFrequency:"weekly" as const,priority:.65}));
  return xmlResponse(urlSet(entries),"public, max-age=60, s-maxage=300, must-revalidate");
}
