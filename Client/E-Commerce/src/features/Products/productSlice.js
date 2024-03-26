import { createSlice } from "@reduxjs/toolkit";
import { getCacheProducts } from "../../utils/products";

const initialState = {
  products: getCacheProducts(),
  length: 0,
  status: "loading",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, action) {
      state.products = action.payload;
      state.length = action.payload?.length;
      localStorage.setItem("products", JSON.stringify(action.payload));
      state.status = "idle";
    },
  },
});

export function getAllProducts() {
  return function (state) {
    return state.products.products;
  };
}

export function getFirstCategoryProduct(category) {
  return function (state) {
    return state.products.products.find(
      (product) => product.category === category
    );
  };
}

export function getProduct(id) {
  return function (state) {
    return state.products.products.find((product) => product.id === id);
  };
}

export const { addProducts } = productSlice.actions;
export default productSlice.reducer;
