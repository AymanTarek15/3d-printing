"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replaceCart, selectItemsObj } from "./cartSlice";

const STORAGE_KEY = "cart:v1";

export default function CartPersistence() {
  const dispatch = useDispatch();
  const items = useSelector(selectItemsObj);

  // hydrate once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch(replaceCart(parsed));
      }
    } catch (e) {
      console.warn("Cart hydrate error:", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items }));
    } catch (e) {
      console.warn("Cart persist error:", e);
    }
  }, [items]);

  return null;
}
