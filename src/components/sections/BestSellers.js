import Section from "@/components/ui/Section";
import ProductCard from "@/components/cards/ProductCard";
import'./bestsellers.css'
import Link from "next/link";

const demoProducts = [
  { id: "low-poly-vase", title: "Low-Poly Vase", image: "/products/vase-yellow.png", price: 149, rating: 4.6, badge: "Best Seller" },
  { id: "gear-coaster",  title: "Gear Coaster Set", image: "/products/gear-coaster.png", price: 199, rating: 4.8, badge: "Best Seller" },
  { id: "dragon-bust",   title: "Dragon Bust", image: "/products/dragon-bust.png", price: 349, rating: 4.7, badge: "Best Seller" },
  { id: "phone-stand",   title: "Minimal Phone Stand", image: "/products/phone-stand.png", price: 99, rating: 4.4, badge: "Popular" },
];

export default function BestSellers({ products }) {
  console.log(products);
  // selectedBestProducts=products.filter((p)=>p.id==1)
  
  return (
    <Section id="best" className="best">
      <div className="sectionTitle">
        <h2 className="h2">Best Sellers</h2>
        <p className="muted" style={{marginTop:8}}>Top-rated designs our customers love.</p>
      </div>

      <div className="pGrid bestSellerspGrid">
        {products?.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      <div className="view-all-container">

      <Link href={'#'} className="view-all-btn btn btn-primary">View All</Link>
      </div>
    </Section>
  );
}
