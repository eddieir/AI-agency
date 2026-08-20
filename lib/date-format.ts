const validDate=(value:string|Date)=>{const date=value instanceof Date?value:new Date(value);return Number.isNaN(date.getTime())?null:date};

export function formatUtcTime(value:string|Date){const date=validDate(value);return date?new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:"UTC"}).format(date):"—"}

export function formatUtcDate(value:string|Date,style:"short"|"long"|"year"="short"){const date=validDate(value);if(!date)return"—";return new Intl.DateTimeFormat("en-US",{month:style==="long"?"long":"short",day:"numeric",...(style==="year"?{year:"numeric" as const}:{}),timeZone:"UTC"}).format(date)}
