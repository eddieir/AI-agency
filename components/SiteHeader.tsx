"use client";
import {usePathname} from "next/navigation";
import {useState} from "react";
const links=[{href:"/news",label:"News"},{href:"/developers",label:"Developers"},{href:"/creators",label:"Creators"},{href:"/compare",label:"Compare"}];
export function SiteHeader(){const path=usePathname();const [open,setOpen]=useState(false);return <header className="site-header"><a href="/" className="logo" aria-label="AI Radar home"><span className="logo-orbit"><i/></span><strong>AI/RADAR</strong></a><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle menu"><span/><span/></button><nav className={open?"nav-links open":"nav-links"} aria-label="Main navigation">{links.map(link=><a key={link.href} href={link.href} className={path===link.href?"active":""}>{link.label}</a>)}</nav><a className="header-cta" href="/developers">Explore the index <span>↗</span></a></header>}
