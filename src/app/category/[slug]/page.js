export const dynamic = "force-dynamic";

import ProductCard from "@/components/cards/ProductCard";
import Section from "@/components/ui/Section";
import Link from "next/link";
import React from "react";
import './categorySlugPage.css'
import { getSpecificCategory } from "@/app/lib/api";
import { redirect } from "next/navigation";

export default async function CategoryPage({params}) {
  const {slug}=params;

  
  const products=await getSpecificCategory(slug);
// console.log(slug);

if (slug==="View%20all%20Products")
  redirect('/products')
   
  

  return(
    <Section id="best" className="best">
      <div className="sectionTitle">
        <h2 className="h2">Product by category</h2>
        <p className="muted" style={{marginTop:8}}>Top-rated designs our customers love.</p>
      </div>

      <div className="pGrid">
        {products?.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      <div className="view-all-container">

      <Link href={'#'} className="view-all-btn btn btn-primary">View All</Link>
      </div>
    </Section>
  )
}