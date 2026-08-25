import "server-only";
import{getStore}from"@netlify/blobs";
import type{NewsItem}from"@/lib/news-data";

const PREFIX="news/";

function store(){
  return getStore({name:"axon-radar-content-v1",consistency:"strong"});
}

export async function archiveNewsItems(items:NewsItem[]){
  if(!process.env.NETLIFY&&!process.env.NETLIFY_BLOBS_CONTEXT)return false;
  try{
    const archive=store();
    const byMonth=new Map<string,NewsItem[]>();
    for(const item of items){
      const month=item.publishedAt.slice(0,7).match(/^\d{4}-\d{2}$/)?.[0]??"undated";
      byMonth.set(month,[...(byMonth.get(month)??[]),item]);
    }
    await Promise.all([...byMonth].map(async([month,monthlyItems])=>{
      const manifestKey=`manifests/news-${month}`;
      const known=await archive.get(manifestKey,{type:"json",consistency:"strong"}) as string[]|null;
      const existing=new Set(known??[]);
      const additions=monthlyItems.filter(item=>!existing.has(item.slug));
      await Promise.all(additions.map(item=>archive.setJSON(`${PREFIX}${item.slug}`,item,{onlyIfNew:true})));
      if(additions.length)await archive.setJSON(manifestKey,[...existing,...additions.map(item=>item.slug)]);
    }));
    return true;
  }catch{return false}
}

export async function getArchivedNewsItem(slug:string):Promise<NewsItem|null>{
  if(!process.env.NETLIFY&&!process.env.NETLIFY_BLOBS_CONTEXT)return null;
  try{return await store().get(`${PREFIX}${slug}`,{type:"json",consistency:"strong"}) as NewsItem|null}
  catch{return null}
}
