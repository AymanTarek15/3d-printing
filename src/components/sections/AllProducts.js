import Section from "@/components/ui/Section";
import ProductCard from "@/components/cards/ProductCard";
import'./bestsellers.css'
import Link from "next/link";
import './AllProducts.modules.css'



export default function AllProducts({ products }) {
  console.log(products);
  // selectedBestProducts=products.filter((p)=>p.id==1)
  
  return (
    <Section id="all-products" className="all-products">
      <div className="sectionTitle">
        <h2 className="h2">All Products</h2>
        {/* <p className="muted" style={{marginTop:8}}>Top-rated designs our customers love.</p> */}
      </div>

      <div className="All-products-Grid">
        {products?.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      <div className="view-all-container">

    
      </div>
    </Section>
  );
}
