export const dynamic = "force-dynamic";

import Section from "@/components/ui/Section"
import ContactForm from "@/components/sections/ContactForm"


export default function ContactPage() {
return (
<Section>
<div className="container" style={{maxWidth:720}}>
<h1 className="h2">Contact us</h1>
<p className="muted" style={{marginTop:8}}>We usually respond within 1 business day.</p>
<div style={{marginTop:24}}>
<ContactForm />
</div>
</div>
</Section>
)
}