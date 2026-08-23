"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import CartPersistence from "@/store/CartPersistence";
import WishlistPersistence from "@/store/WishListPresistence";
// import WishlistPersistence from "@/store/WishlistPersistence";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <CartPersistence />
      <WishlistPersistence />
      {children}
    </Provider>
  );
}
