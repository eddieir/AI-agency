export const SITE_URL = "https://axonradar.netlify.app";
export const SITE_NAME = "AXON//RADAR";

export function slugify(value:string){
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,90);
}

export function stableHash(value:string){
  let hash=2166136261;
  for(let index=0;index<value.length;index+=1){
    hash^=value.charCodeAt(index);
    hash=Math.imul(hash,16777619);
  }
  return (hash>>>0).toString(36);
}

export function absolute(path:string){
  return new URL(path,SITE_URL).toString();
}

export function breadcrumbJson(items:Array<{name:string;path:string}>){
  return {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    itemListElement:items.map((item,index)=>({
      "@type":"ListItem",
      position:index+1,
      name:item.name,
      item:absolute(item.path),
    })),
  };
}

export function JsonLd({data}:{data:unknown}){
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}}/>;
}
