export default function Section({ id, className, children }) {
return (
<section id={id} className={["section", className].filter(Boolean).join(" ")}>
<div className="container">{children}</div>
</section>
)
}