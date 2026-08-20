import {getModelData} from "@/lib/model-data";

export async function GET(){
  const data=await getModelData();
  return Response.json(data,{
    headers:{"Cache-Control":"public, max-age=60, s-maxage=300, stale-while-revalidate=600"},
  });
}
