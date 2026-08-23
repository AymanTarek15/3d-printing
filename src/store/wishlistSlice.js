import { createSlice } from "@reduxjs/toolkit";


// State:
// wishlist: {
//   byId: { [id]: { id, title, price, image } }
// }


const initialState = {
  byId: {},
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    replaceWishlist(state, action) {
      state.byId = action.payload?.byId || {};
    },
    clearWishlist(state) {
      state.byId = {};
    },
    addToWishlist(state, action) {
      const item = action.payload; // { id, title, price, image }
      if (!item?.id) return;
      state.byId[item.id] = item;
    },
    removeFromWishlist(state, action) {
      const id = action.payload;
      delete state.byId[id];
    },
    toggleWishlist(state, action) {
      const item = action.payload; // { id, title, price, image }
      if (!item?.id) return;
      if (state.byId[item.id]) delete state.byId[item.id];
      else state.byId[item.id] = item;
    },
  },
});

export const {
  replaceWishlist,
  clearWishlist,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

/* ---------- Selectors ---------- */
export const selectWishlistObj = (state) => state.wishlist.byId;
export const selectWishlist = (state) => Object.values(state.wishlist.byId);
export const selectWishlistCount = (state) => Object.keys(state.wishlist.byId).length;
export const selectIsWishlistedById = (id) => (state) => Boolean(state.wishlist.byId[id]);
