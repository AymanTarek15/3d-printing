import Section from "@/components/ui/Section";
import ProductCard from "@/components/cards/ProductCard";
import'./bestsellers.css'
import Link from "next/link";
import './AllProducts.modules.css'



export default function AllProducts({ products }) {
  const hasProducts = Array.isArray(products) && products.length > 0;

  return (
    <Section id="all-products" className="all-products">
      <div className="sectionTitle">
        <h2 className="h2">All Products</h2>
      </div>

      {hasProducts ? (
        <div className="All-products-Grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <p className="emptyState">No products yet — please check back soon.</p>
      )}
    </Section>
  );
}
