export const dynamic = "force-dynamic";


import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlist, removeFromWishlist, clearWishlist } from "@/store/wishlistSlice";
import { addItem } from "@/store/cartSlice";
import { formatPrice } from "@/app/lib/format";

import ProductCard from "@/components/cards/ProductCard";
import { getAllProducts, getProduct } from "../lib/api";
import Wishlist from "@/components/sections/wishlist";
import './page.css'


export default async function WishlistPage() {

const wishlistProducts=await getAllProducts();
console.log(wishlistProducts);


  return (
    <Wishlist products={wishlistProducts} />
  );
}