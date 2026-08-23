import Section from "@/components/ui/Section";
import Link from "next/link";
import Image from "next/image";
import Carousel from "@/components/ui/Carousel";
import './HeroCarousel.css';


function HeroSlide({ title, text, img, primaryHref = "#products", primary = "Browse Models", secondaryHref = "#about", secondary = "Learn More" }) {
  return (
    <div className="heroRow">
      <div>
        <h1 className="h1" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="muted" style={{ marginTop: 16, maxWidth: 520 }}>{text}</p>
        <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={primaryHref} className="btn btn-primary">{primary}</Link>
          <Link href={secondaryHref} className="btn btn-ghost">{secondary}</Link>
        </div>
      </div>
      <div className="heroImageWrap">
        <Image src={img} alt="" width={520} height={520} priority sizes="(max-width: 768px) 100vw, 520px" className="heroImage" />
      </div>
    </div>
  );
}

export default function HeroCarousel() {
  
  return (
    <Section id="home" className="hero">
      <Carousel interval={6000}>
        <HeroSlide
          title={"High-Quality<br/>3D Models"}
          text="Explore our collection of premium 3D models for all your 3D printing needs."
          img="https://incredideals.co/cdn/shop/files/MXLJ3ref_VW_34FR_watch-case-42-aluminum-jetblack-nc-s10_VW_34FR_watch-face-42-aluminum-jetblack-s10_VW_34FR_df2624fb-22ec-48f0-ada0-cf07ede870be.jpg?v=1738363875"
        />
        <HeroSlide
          title={"Custom <br/>Design Service"}
          text="Need a unique part? We design, iterate, and deliver print-ready STL files."
          img="/hero-printer.png"
          primaryHref="/contact"
          primary="Start a Project"
        />
        <HeroSlide
          title={" & Reliable <br/>Printing Help"}
          text="Tips, settings, and troubleshooting for popular printers and materials."
          img="/hero-spool.png"
          primaryHref="#guides"
          primary="View Guides"
        />
        
        
      </Carousel>
    </Section>
  );
}
