// Slice : A Piece Of State.. State Lives In Store.. Since We Ae Taking Part
// Of That State, That Part Is Said To Be One Slice Of That State
import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "../../utils/Orders";

const initialState = {
  orders: getOrders(),
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder(state, action) {
      state.orders.push(action.payload);
    },
    postOrders(state, action) {
      state.orders = action.payload;
      localStorage.setItem("orders", JSON.stringify(action.payload));
    },
    clearOrders(state) {
      state.orders = [];
      localStorage.removeItem("orders");
    },
  },
});

export function getOrder(id) {
  return function (state) {
    return state.orders.orders.find((order) => {
      return order.id === id;
    });
  };
}

export function getOrderAddress(id) {
  return function (state) {
    return state.orders.orders.find((order) => order.id === id)?.shipment;
  };
}

export function checkUserBuyedProduct(passedId) {
  return function (state) {
    for (let order of state.orders.orders) {
      const { cartItems } = order;
      for (let item of cartItems) {
        if (item.product === passedId) return true;
      }
    }
    return false;
  };
}

export const { createOrder, postOrders, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
