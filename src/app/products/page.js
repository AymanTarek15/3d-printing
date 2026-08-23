import ProductCard from "@/components/cards/ProductCard";
import Section from "@/components/ui/Section";
import Link from "next/link";
import React from "react";
// import './categorySlugPage.css'
import { getAllProducts, getSpecificCategory } from "@/app/lib/api";
import { redirect } from "next/navigation";
import AllProducts from "@/components/sections/AllProducts";

export default async function CategoryPage() {
  

  
  
const products=await getAllProducts();

   console.log(products);
   
  

  return(
    <>
    <AllProducts products={products} />
    </>
  )
}