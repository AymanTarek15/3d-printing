import Link from "next/link";

/**
 * Eyebrow + display heading, with an optional right-hand action link.
 * Used at the top of nearly every marketing section.
 */
export default function SectionHead({ eyebrow, title, dot = true, sub, action, actionHref }) {
  return (
    <div className={`section-head ${action ? "section-head--row" : ""}`}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="h2">
          {title}
          {dot && <span className="dot-gold">.</span>}
        </h2>
        {sub && <p className="lead" style={{ marginTop: 10 }}>{sub}</p>}
      </div>

      {action && (
        <Link href={actionHref || "#"} className="link-gold">
          {action} <span className="arw">→</span>
        </Link>
      )}
    </div>
  );
}
