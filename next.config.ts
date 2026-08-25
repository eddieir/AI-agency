import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers(){
    return[{source:"/:path*",headers:[
      {key:"Cross-Origin-Opener-Policy",value:"same-origin"},
      {key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"},
      {key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},
      {key:"Strict-Transport-Security",value:"max-age=31536000; includeSubDomains; preload"},
      {key:"X-Content-Type-Options",value:"nosniff"},
      {key:"X-Frame-Options",value:"DENY"},
      {key:"Content-Security-Policy",value:"default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; manifest-src 'self'; upgrade-insecure-requests"},
    ]}];
  },
};

export default nextConfig;
