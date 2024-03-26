import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/Cart/cartSlice";
import addressSlice from "../features/Address/addressSlice";
import OrderSlice from "../features/Orders/OrderSlice";
import UserSlice from "../features/Users/userSlice";
import reviewSlice from "../features/Reviews/reviewSlice";
import productSlice from "../features/Products/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    address: addressSlice,
    orders: OrderSlice,
    user: UserSlice,
    reviews: reviewSlice,
    products: productSlice
  },
});
