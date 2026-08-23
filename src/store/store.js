import { configureStore } from "@reduxjs/toolkit";
import cart from "./cartSlice";
import wishlist from "./wishlistSlice";

export function makeStore(preloadedState) {
  return configureStore({
    reducer: { cart,wishlist  },
    preloadedState,
    // middleware: (gDM) => gDM(), // default is fine
  });
}

export const store = makeStore();
