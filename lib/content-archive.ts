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
    const existing=new Set<string>();
    for await(const page of archive.list({prefix:PREFIX,paginate:true})){
      page.blobs.forEach(blob=>existing.add(blob.key));
    }
    await Promise.all(items.filter(item=>!existing.has(`${PREFIX}${item.slug}`)).map(item=>archive.setJSON(`${PREFIX}${item.slug}`,item,{onlyIfNew:true})));
    return true;
  }catch{return false}
}

export async function getArchivedNewsItem(slug:string):Promise<NewsItem|null>{
  if(!process.env.NETLIFY&&!process.env.NETLIFY_BLOBS_CONTEXT)return null;
  try{return await store().get(`${PREFIX}${slug}`,{type:"json",consistency:"strong"}) as NewsItem|null}
  catch{return null}
}
