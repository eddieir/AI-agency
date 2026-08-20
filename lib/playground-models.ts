export type PlaygroundModel={id:string;name:string;provider:string;tier:"Frontier"|"Open"|"Small";context:string;inputPrice:number;outputPrice:number;note:string};

export const playgroundModels:PlaygroundModel[]=[
 {id:"google/gemini-3.7-flash",name:"Gemini 3.7 Flash",provider:"Google",tier:"Frontier",context:"1M",inputPrice:.375,outputPrice:1.875,note:"Fast multimodal reasoning and agentic work"},
 {id:"x-ai/grok-4.6",name:"Grok 4.6",provider:"SpaceXAI",tier:"Frontier",context:"500K",inputPrice:2,outputPrice:6,note:"Frontier coding, knowledge work, and STEM"},
 {id:"deepseek/deepseek-v4-pro-0813",name:"DeepSeek V4 Pro",provider:"DeepSeek",tier:"Open",context:"1M",inputPrice:1.188,outputPrice:3.564,note:"Open-model reasoning and software work"},
 {id:"z-ai/glm-5.3",name:"GLM 5.3",provider:"Z.ai",tier:"Open",context:"1M",inputPrice:1.4,outputPrice:4.4,note:"Long-horizon reasoning and coding"},
 {id:"qwen/qwen3.8-27b",name:"Qwen3.8 27B",provider:"Qwen",tier:"Open",context:"1M",inputPrice:.45,outputPrice:3.2,note:"Open-weight multimodal model at moderate cost"},
 {id:"nvidia/nemotron-3.5-lightning:free",name:"Nemotron 3.5 Lightning",provider:"NVIDIA",tier:"Small",context:"1M",inputPrice:0,outputPrice:0,note:"Free compact model for fast agent workflows"}
];

export const defaultPlaygroundModels=["google/gemini-3.7-flash","deepseek/deepseek-v4-pro-0813","nvidia/nemotron-3.5-lightning:free"];
export const getPlaygroundModel=(id:string)=>playgroundModels.find(model=>model.id===id);
