export const dynamic = "force-dynamic";

import { getProduct } from "@/app/lib/api";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import './page.css'

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  // console.log(product);
  

  if (!product) {
    return (
      <section className="container section">
        <h1 className="h2">Product not found</h1>
        <p className="muted">We couldn’t find that product.</p>
      </section>
    );
  }

  return (
    <section className="container section">
      <ProductDetailClient product={product[0]} />
    </section>
  );
}