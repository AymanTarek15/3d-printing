import Section from "@/components/ui/Section"
import Link from "next/link"


export default function CTA() {
return (
<Section id="cta" className="cta">
<div className="card ctaInner">
<h2 className="h2">Ready to launch?</h2>
<p className="muted" style={{marginTop:8}}>Start building with reusable sections now.</p>
<div style={{marginTop:16}}>
<Link href="/contact" className="btn btn-primary">Contact Us</Link>
</div>
</div>
</Section>
)
}