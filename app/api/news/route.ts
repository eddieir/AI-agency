import {getNewsData} from "@/lib/news-data";

export async function GET(){
  const data=await getNewsData();
  return Response.json(data,{
    status:data.items.length?200:503,
    headers:{"Cache-Control":data.items.length?"public, max-age=60, s-maxage=300, stale-while-revalidate=900":"no-store"},
  });
}
