"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replaceWishlist, selectWishlistObj } from "./wishlistSlice";

const STORAGE_KEY = "wishlist:v1";

export default function WishlistPersistence() {
  const dispatch = useDispatch();
  const byId = useSelector(selectWishlistObj);

  // hydrate once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch(replaceWishlist(JSON.parse(raw)));
    } catch (e) {
      console.warn("Wishlist hydrate error:", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ byId }));
    } catch (e) {
      console.warn("Wishlist persist error:", e);
    }
  }, [byId]);

  return null;
}
