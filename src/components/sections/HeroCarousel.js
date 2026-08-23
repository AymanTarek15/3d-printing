import Section from "@/components/ui/Section";
import Link from "next/link";
import "./HeroCarousel.css";

function HeroArt() {
  // Self-contained isometric "3D print" illustration — no external image files.
  return (
    <svg
      className="heroArtSvg"
      viewBox="0 0 420 420"
      role="img"
      aria-label="Isometric 3D printed cube"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="topFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f8a5b" />
          <stop offset="1" stopColor="#0f5e3a" />
        </linearGradient>
        <linearGradient id="leftFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f5e3a" />
          <stop offset="1" stopColor="#0a4429" />
        </linearGradient>
        <linearGradient id="rightFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b6b41" />
          <stop offset="1" stopColor="#083c25" />
        </linearGradient>
      </defs>

      {/* soft platform */}
      <ellipse cx="210" cy="330" rx="150" ry="34" fill="#0f5e3a" opacity="0.10" />

      {/* cube */}
      <g>
        {/* top */}
        <polygon points="210,120 320,175 210,230 100,175" fill="url(#topFace)" />
        {/* left */}
        <polygon points="100,175 210,230 210,335 100,280" fill="url(#leftFace)" />
        {/* right */}
        <polygon points="320,175 210,230 210,335 320,280" fill="url(#rightFace)" />

        {/* print layer lines on the left face */}
        <g stroke="#ffffff" strokeOpacity="0.18" strokeWidth="2">
          <line x1="100" y1="193" x2="210" y2="248" />
          <line x1="100" y1="211" x2="210" y2="266" />
          <line x1="100" y1="229" x2="210" y2="284" />
          <line x1="100" y1="247" x2="210" y2="302" />
          <line x1="100" y1="265" x2="210" y2="320" />
        </g>
        {/* print layer lines on the right face */}
        <g stroke="#000000" strokeOpacity="0.12" strokeWidth="2">
          <line x1="320" y1="193" x2="210" y2="248" />
          <line x1="320" y1="211" x2="210" y2="266" />
          <line x1="320" y1="229" x2="210" y2="284" />
          <line x1="320" y1="247" x2="210" y2="302" />
          <line x1="320" y1="265" x2="210" y2="320" />
        </g>
      </g>

      {/* accent print nozzle dropping a layer */}
      <g>
        <rect x="196" y="70" width="28" height="26" rx="5" fill="#f1c40f" />
        <polygon points="200,96 220,96 210,116" fill="#f1c40f" />
        <circle cx="210" cy="122" r="4" fill="#f1c40f" />
      </g>

      {/* floating accent dots */}
      <circle cx="350" cy="120" r="6" fill="#f1c40f" opacity="0.9" />
      <circle cx="70" cy="150" r="5" fill="#0f5e3a" opacity="0.5" />
      <circle cx="360" cy="300" r="4" fill="#0f5e3a" opacity="0.5" />
    </svg>
  );
}

export default function HeroCarousel() {
  const features = [
    { title: "Custom Design", text: "We design and iterate print-ready STL files." },
    { title: "Premium Models", text: "A curated collection ready to print or buy." },
    { title: "Reliable Help", text: "Guidance on printers, materials and settings." },
  ];

  return (
    <Section id="home" className="hero">
      <div className="heroRow">
        <div className="heroCopy">
          <span className="heroEyebrow">Custom 3D Printing Studio</span>
          <h1 className="h1 heroTitle">
            Bring your ideas to life in <span className="heroAccent">3D</span>
          </h1>
          <p className="muted heroSub">
            Premium, print-ready models and bespoke design — delivered to your
            door. From one-off prototypes to personalized gifts.
          </p>
          <div className="heroCtas">
            <Link href="/products" className="btn btn-primary">Shop Models</Link>
            <Link href="/contact" className="btn btn-ghost">Start a Custom Order</Link>
          </div>

          <ul className="heroFeatures">
            {features.map((f) => (
              <li key={f.title} className="heroFeature">
                <span className="heroFeatureDot" aria-hidden="true" />
                <div>
                  <strong>{f.title}</strong>
                  <span className="muted">{f.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="heroArt">
          <HeroArt />
        </div>
      </div>
    </Section>
  );
}
