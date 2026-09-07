import Section from "@/components/ui/Section";
import "./homeHighlights.css";

const ITEMS = [
  {
    title: "Custom Design",
    text: "Send an idea or a reference — we model print-ready STLs and iterate with you.",
    icon: (
      <path d="M12 2l2.4 5 5.6.5-4.2 3.7 1.3 5.5L12 19.8 6.9 21.7 8.2 16 4 12.3l5.6-.5L12 2z" />
    ),
  },
  {
    title: "Premium Materials",
    text: "Durable PLA+, resin and specialty filaments in a wide range of colors.",
    icon: (
      <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2zm0 2.3L6 7.6v6.8l6 3.3 6-3.3V7.6L12 4.3z" />
    ),
  },
  {
    title: "Personalization",
    text: "Add names in Arabic or English with a choice of fonts on supported products.",
    icon: (
      <path d="M4 20v-2h16v2H4zM6 16l5-12h2l5 12h-2l-1.2-3H9.2L8 16H6zm3.9-5h4.2L12 6.2 9.9 11z" />
    ),
  },
  {
    title: "Fast Turnaround",
    text: "Most orders printed and shipped within a few business days.",
    icon: (
      <path d="M13 3a9 9 0 108.9 10h-2A7 7 0 1113 5v4l4.5-4.5L13 0v3zm-1 5v5l4 2.4.9-1.6L13.5 12V8H12z" />
    ),
  },
];

export default function HomeHighlights() {
  return (
    <Section id="why" className="why">
      <div className="sectionTitle">
        <span className="eyebrow">Why FAT7</span>
        <h2 className="h2">Crafted, personalized, delivered</h2>
        <p className="muted">Everything you need from idea to a finished print.</p>
      </div>

      <div className="whyGrid">
        {ITEMS.map((it) => (
          <div key={it.title} className="whyCard">
            <span className="whyIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                {it.icon}
              </svg>
            </span>
            <h3 className="whyTitle">{it.title}</h3>
            <p className="muted whyText">{it.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
