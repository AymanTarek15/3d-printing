// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {}, // key -> line object (key is lineKey or id)
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload?.items || {};
    },
    clearCart(state) {
      state.items = {};
    },
    addItem(state, action) {
      const payload = action.payload || {};
      // Prefer composite key if provided:
      const key = String(payload.lineKey || payload.id);
      const qtyToAdd = Number(payload.qty || 1);

      const existing = state.items[key];
      if (existing) {
        existing.qty += qtyToAdd;
      } else {
        // Store the key as the item's "id" so UI (increase/decrease/remove) keeps working.
        state.items[key] = {
          ...payload,
          id: key,                    // line id for UI actions
          productId: payload.productId ?? payload.id, // actual product id for backend
          qty: qtyToAdd,
        };
      }
    },
    increase(state, action) {
      const key = String(action.payload);
      if (state.items[key]) state.items[key].qty += 1;
    },
    decrease(state, action) {
      const key = String(action.payload);
      const item = state.items[key];
      if (!item) return;
      if (item.qty > 1) item.qty -= 1;
      else delete state.items[key];
    },
    removeItem(state, action) {
      const key = String(action.payload);
      delete state.items[key];
    },
  },
});

export const {
  replaceCart,
  clearCart,
  addItem,
  increase,
  decrease,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;

/* ---------- Selectors ---------- */
export const selectItemsObj = (state) => state.cart.items;
export const selectItems    = (state) => Object.values(state.cart.items);
export const selectCount    = (state) => Object.values(state.cart.items).reduce((acc, it) => acc + it.qty, 0);
export const selectSubtotal = (state) => Object.values(state.cart.items).reduce((acc, it) => acc + it.qty * Number(it.price || 0), 0);
export const selectTotals   = (state) => {
  const subtotal = selectSubtotal(state);
  const shipping = subtotal > 0 ? 0 : 0;
  const tax = 0;
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total };
};
