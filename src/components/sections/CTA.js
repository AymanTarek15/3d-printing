import Section from "@/components/ui/Section"
import Link from "next/link"

export default function CTA() {
  return (
    <Section id="cta" className="cta">
      <div className="ctaInner">
        <h2 className="h2">Have a custom idea in mind?</h2>
        <p className="muted" style={{ marginTop: 10, maxWidth: 520, marginInline: "auto" }}>
          Tell us what you want printed — we&apos;ll design it, print it, and ship it to your door.
        </p>
        <div style={{ marginTop: 22, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" className="btn btn-cta">Start a Custom Order</Link>
          <Link
            href="/products"
            className="btn btn-ghost"
            style={{ background: "rgba(255,255,255,.12)", color: "#fff", borderColor: "rgba(255,255,255,.3)" }}
          >
            Browse Models
          </Link>
        </div>
      </div>
    </Section>
  )
}
