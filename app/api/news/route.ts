type Category="Models"|"Developer"|"Creative"|"Industry";
type Item={title:string;summary:string;source:string;url:string;publishedAt:string;category:Category};
const feeds:{query:string;category:Category}[]=[
  {query:"artificial intelligence model release when:7d",category:"Models"},
  {query:"AI developer API coding agents when:7d",category:"Developer"},
  {query:"AI photography video editing generative tools when:7d",category:"Creative"},
  {query:"artificial intelligence industry when:7d",category:"Industry"},
];
const clean=(value:string)=>value.replace(/<!\[CDATA\[|\]\]>/g,"").replace(/<[^>]+>/g," ").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g," ").trim();
const tag=(xml:string,name:string)=>clean(xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`,"i"))?.[1]??"");
const parse=(xml:string,category:Category):Item[]=>[...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0,5).map(match=>{const block=match[1];const rawTitle=tag(block,"title");const split=rawTitle.split(" - ");const source=split.length>1?split.pop()!:"AI News";return{title:split.join(" - ")||rawTitle,summary:"Open the original report for the full story and source context.",source,url:tag(block,"link"),publishedAt:new Date(tag(block,"pubDate")||Date.now()).toISOString(),category}}).filter(item=>item.title&&item.url);
export async function GET(){
  try{
    const groups=await Promise.all(feeds.map(async feed=>{const url=`https://news.google.com/rss/search?q=${encodeURIComponent(feed.query)}&hl=en-US&gl=US&ceid=US:en`;const response=await fetch(url,{headers:{"User-Agent":"AI-Radar/1.0"},next:{revalidate:1800}});if(!response.ok)throw new Error("feed unavailable");return parse(await response.text(),feed.category)}));
    const items=groups.flat().sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt));
    return Response.json({items,updatedAt:new Date().toISOString()},{headers:{"Cache-Control":"public, max-age=600, s-maxage=1800"}});
  }catch{return Response.json({items:[],updatedAt:new Date().toISOString()},{status:200,headers:{"Cache-Control":"public, max-age=120"}})}
}
