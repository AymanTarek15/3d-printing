import Section from "@/components/ui/Section"


const faqs = [
{ q: "Can I use it for client work?", a: "Yes, commercial use is allowed." },
{ q: "Is it responsive?", a: "Absolutely, mobile‑first." },
{ q: "Can I self‑host?", a: "Yes, deploy anywhere." },
]


export default function FAQ() {
return (
<Section id="faq">
<div className="sectionTitle">
<h2 className="h2">FAQs</h2>
<p className="muted" style={{marginTop:8}}>Quick answers to common questions.</p>
</div>
<div className="grid grid-2">
{faqs.map((f) => (
<div key={f.q} className="card cardItem">
<div style={{fontWeight:600}}>{f.q}</div>
<div className="muted" style={{marginTop:8}}>{f.a}</div>
</div>
))}
</div>
</Section>
)
}