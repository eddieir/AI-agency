const encoder=new TextEncoder();
const decoder=new TextDecoder();

function toBase64(value:string){
  const bytes=encoder.encode(value);
  let binary="";
  for(const byte of bytes)binary+=String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"");
}

function fromBase64(value:string){
  const normalized=value.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(value.length/4)*4,"=");
  const binary=atob(normalized);
  return decoder.decode(Uint8Array.from(binary,character=>character.charCodeAt(0)));
}

export function modelSlug(id:string,name:string,slugify:(value:string)=>string){
  return`${slugify(name)}--${toBase64(id)}`;
}

export function modelIdFromSlug(slug:string){
  const encoded=slug.split("--").pop();
  if(!encoded||encoded===slug)return null;
  try{
    const id=fromBase64(encoded);
    return id.includes("/")&&!/[\0-\x1f]/.test(id)?id:null;
  }catch{return null}
}
