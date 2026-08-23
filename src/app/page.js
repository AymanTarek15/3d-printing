export const dynamic = "force-dynamic";

// import Hero from "@/components/sections/Hero"
// import Features from "@/components/sections/BestSellers"
import Gallery from "@/components/sections/Categories"
import Testimonials from "@/components/sections/Testimonials"
import Pricing from "@/components/sections/Pricing"
import FAQ from "@/components/sections/FAQ"
import CTA from "@/components/sections/CTA"
import HeroCarousel from "@/components/sections/HeroCarousel"
import BestSellers from "@/components/sections/BestSellers"
import Categories from "@/components/sections/Categories"
import { getBestSelling, getCategories } from "./lib/api"

import './page.module.css'


export default async function HomePage() {

  
  const bestSellingProducts=await getBestSelling()

  // const bestSellingSection=bestSellingProducts.slice(0,3)
  var bestSellingSection=[]
  const uniqueCategoryBestSellingSection=bestSellingProducts.filter((p,i,arr)=> arr.findIndex(x=> x.category===p.category)===i).slice(0,3) 
  if (uniqueCategoryBestSellingSection.length <3){
    bestSellingSection=bestSellingProducts.slice(0,3)
  }
  else{
    bestSellingSection=uniqueCategoryBestSellingSection
  }
  
  const categories=await getCategories();
  
    
  
return (
<>
{/* <Hero /> */}
<HeroCarousel />
<BestSellers products={bestSellingSection} />
<Categories categories={categories} />
{/* <Testimonials /> */}
{/* <Pricing /> */}
{/* <FAQ /> */}
{/* <CTA /> */}
</>
)
}