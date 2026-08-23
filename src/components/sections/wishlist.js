"use client";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlist, clearWishlist } from "@/store/wishlistSlice";
import ProductCard from "@/components/cards/ProductCard";

export default function Wishlist() {
  const dispatch = useDispatch();
  const items = useSelector(selectWishlist);

  return (
    <section className="container section page-wishlist">
      <h1 className="h2">Your Wishlist</h1>

      {items.length === 0 ? (
        <p className="muted" style={{ marginTop: 12 }}>No items saved yet.</p>
      ) : (
        <>
          <div className="pGrid">
            {items.map((it) => (
              <ProductCard key={it.id} product={{ ...it, image_url: it.image_url || it.image }} />
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <button className="btn" onClick={() => dispatch(clearWishlist())}>Clear Wishlist</button>
          </div>
        </>
      )}
    </section>
  );
}
