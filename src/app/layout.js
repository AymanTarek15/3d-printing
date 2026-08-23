
// 

// New code

import "../app/styles/variables.css";
import "../app/styles/layout.css";
import "../app/styles/sections.css";
import "./globals.css"
import { site } from "@/app/lib/site"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { getCategories, getSeason } from "./lib/api";
import Providers from "./Providers";
import localFont from "next/font/local";
import { Inter, Space_Grotesk } from "next/font/google";



// config.autoAddCss = false; // Disable automatic CSS insertion

export const metadata = {
title: {
default: site.name,
template: `%s · ${site.name}`,
},
description: site.description,
metadataBase: new URL("https://3d-printing-six.vercel.app"),
}


// UI type system: Space Grotesk for headings, Inter for body.
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});


// Local font imports
const ahNaskhHadith = localFont({
  src: "./fonts/arfonts-ah-naskh-hadith.ttf",
  variable: "--font-ah-naskh-hadith",
  display: "swap",
});

const blabeloo = localFont({
  src: "./fonts/خط بلابيلو.ttf",
  variable: "--font-blabeloo",
  display: "swap",
});

const superCreamy = localFont({
  src: "./fonts/SuperCreamy-OGAPp.ttf",
  variable: "--font-super-creamy",
  display: "swap",
});

const goudyOldStyle = localFont({
  src: "./fonts/goudy-old-style.ttf",
  variable: "--font-goudy-old-style",
  display: "swap",
});

export default async function RootLayout({ children }) {

  
  const categories= await getCategories();
  const season=await getSeason();
  // console.log(season);
  

  
return (
<html lang="en"
className={`${bodyFont.variable} ${displayFont.variable} ${ahNaskhHadith.variable} ${blabeloo.variable} ${superCreamy.variable} ${goudyOldStyle.variable}`}
    >
<body>
  <Providers>
<Navbar categories={categories} season={season} />
<main>{children}</main>
<Footer />
</Providers>
</body>
</html>
)
}