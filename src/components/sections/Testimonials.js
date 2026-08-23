import Section from "@/components/ui/Section"


const quotes = [
{ name: "Sara", text: "So fast to ship pages now." },
{ name: "Youssef", text: "Best developer experience I've had." },
{ name: "Mina", text: "Looks great on every device." },
]


export default function Testimonials() {
return (
<Section>
<div className="sectionTitle">
<h2 className="h2">What users say</h2>
<p className="muted" style={{marginTop:8}}>Real words from happy teams.</p>
</div>
<div className="cards">
{quotes.map((q) => (
<figure key={q.name} className="card cardItem">
<blockquote>“{q.text}”</blockquote>
<figcaption className="muted" style={{marginTop:12}}>— {q.name}</figcaption>
</figure>
))}
</div>
</Section>
)
}