import Section from "@/components/ui/Section";
import ProductCard from "@/components/cards/ProductCard";
import'./bestsellers.css'
import Link from "next/link";

export default function BestSellers({ products }) {
  const hasProducts = Array.isArray(products) && products.length > 0;

  return (
    <Section id="best" className="best">
      <div className="sectionTitle">
        <h2 className="h2">Best Sellers</h2>
        <p className="muted" style={{marginTop:8}}>Top-rated designs our customers love.</p>
      </div>

      {hasProducts ? (
        <>
          <div className="pGrid bestSellerspGrid">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="view-all-container">
            <Link href={'/products'} className="view-all-btn btn btn-primary">View All</Link>
          </div>
        </>
      ) : (
        <p className="emptyState">Our best sellers are on their way — check back soon.</p>
      )}
    </Section>
  );
}
