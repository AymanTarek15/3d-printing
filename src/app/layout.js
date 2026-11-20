import "../app/styles/variables.css";
import "./globals.css";
import "../app/styles/layout.css";
import "../app/styles/sections.css";
import "../app/styles/pages.css";

import { site } from "@/app/lib/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Providers from "./Providers";
import { headers } from "next/headers";
import localFont from "next/font/local";
import { Inter, Fraunces, Caveat } from "next/font/google";

export const metadata = {
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL("https://3d-printing-six.vercel.app"),
};

// UI type system: Fraunces (serif) for display headings, Inter for body text,
// Caveat for the handwritten annotations in the brand layouts.
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const scriptFont = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-script",
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
  // The admin panel brings its own chrome, so the public navbar and footer are
  // left off there. Middleware forwards the pathname for this check.
  const pathname = (await headers()).get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/dashboard");

  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${scriptFont.variable} ${ahNaskhHadith.variable} ${blabeloo.variable} ${superCreamy.variable} ${goudyOldStyle.variable}`}
    >
      <body>
        <Providers>
          {isAdmin ? (
            children
          ) : (
            <>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}
