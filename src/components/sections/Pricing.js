import Section from "@/components/ui/Section"


const tiers = [
{ name: "Starter", price: "$0", features: ["1 project", "Basic blocks", "Community"] },
{ name: "Pro", price: "$19", features: ["Unlimited", "All blocks", "Email support"] },
{ name: "Business", price: "$49", features: ["Teams", "Priority", "SLA"] },
]


export default function Pricing() {
return (
<Section id="pricing">
<div className="sectionTitle">
<h2 className="h2">Simple pricing</h2>
<p className="muted" style={{marginTop:8}}>Pick a plan, upgrade anytime.</p>
</div>
<div className="cards">
{tiers.map((t) => (
<div key={t.name} className="card cardItem">
<div style={{fontSize:18, fontWeight:600}}>{t.name}</div>
<div className="pricingPrice">{t.price}<span className="muted" style={{fontSize:14, fontWeight:400}}>/mo</span></div>
<ul style={{marginTop:12, paddingLeft:16}}>
{t.features.map((f) => (<li key={f} className="pricingFeat">{f}</li>))}
</ul>
<button className="btn btn-primary" style={{marginTop:16, width:"100%"}}>Choose {t.name}</button>
</div>
))}
</div>
</Section>
)
}