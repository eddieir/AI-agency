export type EvaluationCase={id:string;name:string;prompt:string;expectedTerms:string[]};
export type EvaluationTemplate={id:string;name:string;description:string;system:string;cases:EvaluationCase[]};
export type EvaluationResult={caseId:string;modelId:string;modelName:string;status:"success"|"error";response:string;latencyMs:number;inputTokens:number;outputTokens:number;cost:number;requirementScore:number;matchedTerms:string[];error?:string};
export type EvaluationRun={id:string;name:string;createdAt:string;models:string[];cases:EvaluationCase[];results:EvaluationResult[];manualScores:Record<string,number>;system:string};

export const evaluationTemplates:EvaluationTemplate[]=[
 {id:"support",name:"Support answer quality",description:"Measure grounded, helpful customer-support responses with explicit constraints.",system:"You are a precise customer-support specialist. Use only the facts in the request. State uncertainty clearly and provide actionable next steps.",cases:[
  {id:"refund",name:"Refund policy",prompt:"A customer bought a yearly plan 12 days ago and asks for a refund. Policy: full refunds are available within 14 days. Write a concise reply with the next step.",expectedTerms:["refund","14 days","next"]},
  {id:"outage",name:"Service outage",prompt:"A customer cannot access the dashboard during a confirmed regional outage. A fix is being deployed and there is no exact ETA. Respond without inventing a recovery time.",expectedTerms:["outage","no exact","update"]},
  {id:"security",name:"Suspicious login",prompt:"A customer reports an unfamiliar login. Tell them what to do immediately. Required actions: reset password, revoke sessions, enable MFA, contact support.",expectedTerms:["reset","revoke","MFA","support"]}
 ]},
 {id:"coding",name:"Code review reliability",description:"Compare correctness, defensive reasoning, and instruction-following on software tasks.",system:"You are a senior software reviewer. Be concise, identify concrete risks, and provide a corrected implementation when requested.",cases:[
  {id:"async",name:"Async bug",prompt:"Review this JavaScript and explain the bug, then fix it: const values = items.map(async item => await load(item)); return values;",expectedTerms:["Promise.all","promise","await"]},
  {id:"sql",name:"SQL safety",prompt:"Rewrite this unsafe query using parameters: SELECT * FROM users WHERE email = '${email}'",expectedTerms:["parameter","injection","placeholder"]},
  {id:"retry",name:"Retry policy",prompt:"Design a safe HTTP retry policy for a payment API. Mention which errors to retry, backoff, jitter, idempotency, and a retry limit.",expectedTerms:["backoff","jitter","idempotency","limit"]}
 ]},
 {id:"editorial",name:"Editorial consistency",description:"Test brief adherence, clarity, structure, and brand-safe writing.",system:"You are an exacting technology editor. Follow the requested format, avoid hype, and preserve factual uncertainty.",cases:[
  {id:"headline",name:"Headline discipline",prompt:"Write three neutral headlines, each under 65 characters, about a new open AI model optimized for on-device use.",expectedTerms:["on-device","open","AI"]},
  {id:"summary",name:"Executive summary",prompt:"Summarize this claim in exactly two sentences without endorsing it: A vendor says its model is the fastest available, but provides no benchmark methodology.",expectedTerms:["claims","methodology"]},
  {id:"brief",name:"Creative brief",prompt:"Create a five-bullet photo campaign brief for a sustainable footwear launch. Include audience, mood, setting, deliverables, and one constraint.",expectedTerms:["audience","mood","deliverables","constraint"]}
 ]}
];

export const defaultEvaluation=evaluationTemplates[0];
export const resultKey=(caseId:string,modelId:string)=>`${caseId}::${modelId}`;
export const scoreRequirements=(response:string,terms:string[])=>{const normalized=response.toLowerCase();const matched=terms.filter(term=>normalized.includes(term.toLowerCase()));return{matched,score:terms.length?Math.round(matched.length/terms.length*100):100}};
export const aggregateModel=(run:EvaluationRun,modelId:string)=>{const rows=run.results.filter(result=>result.modelId===modelId);const successful=rows.filter(result=>result.status==="success");const manual=rows.map(row=>run.manualScores[resultKey(row.caseId,row.modelId)]).filter(Boolean);return{modelId,name:rows[0]?.modelName??modelId,passRate:rows.length?Math.round(successful.length/rows.length*100):0,requirements:successful.length?Math.round(successful.reduce((sum,row)=>sum+row.requirementScore,0)/successful.length):0,manual:manual.length?Number((manual.reduce((sum,value)=>sum+value,0)/manual.length).toFixed(1)):0,latency:successful.length?Math.round(successful.reduce((sum,row)=>sum+row.latencyMs,0)/successful.length):0,tokens:successful.reduce((sum,row)=>sum+row.inputTokens+row.outputTokens,0),cost:successful.reduce((sum,row)=>sum+row.cost,0)} };
