export type ParameterEvidence={id:string;tags?:string[];safetensors?:{total?:number}};
const parameterFromText=(text:string)=>{const match=text.match(/(?:^|[-_\s])([0-9]+(?:\.[0-9]+)?)\s*[bB](?:[-_\s]|$)/);return match?Number(match[1])*1e9:null};

export function extractParameters(model:ParameterEvidence){if(model.safetensors?.total&&model.safetensors.total>0)return model.safetensors.total;const repositoryName=model.id.split("/").pop()??model.id;const disclosedInName=parameterFromText(repositoryName);if(disclosedInName!==null)return disclosedInName;const explicitTag=(model.tags??[]).find(value=>/^(?:parameters?|parameter_count):/i.test(value));return explicitTag?parameterFromText(explicitTag.slice(explicitTag.indexOf(":")+1)):null}
