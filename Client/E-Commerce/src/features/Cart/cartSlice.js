import { createSlice } from "@reduxjs/toolkit";
import { getCart, resetCart, setCart } from "../../utils/Cart";

const initialState = {
  cart: getCart(),
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
      setCart(state.cart);
    },
    removeItem(state, action) {
      // action = id
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      setCart(state.cart);
    },
    increaseItemQuantity(state, action) {
      // action = id
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
      setCart(state.cart);
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity--;
      if (item.quantity === 0) cartSlice.caseReducers.removeItem(state, action);
      setCart(state.cart);
    },
    clearCart(state) {
      state.cart = [];
      resetCart();
    },
    itemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      item.quantity = quantity;
      setCart(state.cart);
    },
  },
});
export function getCurrentQuantity(id) {
  return function (state) {
    return state.cart.cart.find((item) => item.id === id)?.quantity ?? 0;
  };
}

export function getTotalQuantity() {
  return function (state) {
    return state.cart.cart.reduce(function (acc, cartItem) {
      return acc + cartItem.quantity;
    }, 0);
  };
}

export function getTotalPrice() {
  return function (state) {
    return state.cart.cart.reduce(function (acc, currItem) {
      return acc + currItem.quantity * currItem.totalPrice;
    }, 0);
  };
}

export function getDiscountedPrice() {
  return function (state) {
    return state.cart.cart.reduce(function (acc, currItem) {
      return (
        acc +
        currItem.quantity *
          Math.round(
            currItem.totalPrice * (1 - currItem.discountPercentage / 100)
          )
      );
    }, 0);
  };
}

export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  itemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
