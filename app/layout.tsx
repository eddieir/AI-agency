import type { Metadata } from "next";
import "./globals.css";
import "./routes.css";
import "./intel.css";
import "./sections-v2.css";
import "./news-fix.css";
import "./creators-polish.css";
export const metadata:Metadata={metadataBase:new URL("https://ai-radar-hub.eddieir.chatgpt.site"),title:{default:"AI Radar — Useful AI, clearly organized",template:"%s · AI Radar"},description:"Independent AI news, model intelligence, and practical tools for developers and visual creators.",openGraph:{title:"AI Radar",description:"News, models & tools — minus the noise.",images:["/og.png"]},twitter:{card:"summary_large_image",title:"AI Radar",description:"News, models & tools — minus the noise.",images:["/og.png"]},icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
