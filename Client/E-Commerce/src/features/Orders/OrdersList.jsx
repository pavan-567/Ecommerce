import { useDispatch, useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/apiOrders";
import { useEffect } from "react";
import { postOrders } from "./OrderSlice";
import MessagePage from "../../ui/MessagePage";

function OrdersList({ orders }) {
  // const orders = useSelector((store) => store.orders.orders);

  return (
    <div className="">
      {orders.length > 0 ? (
        orders.map((order) => <OrderItem order={order} key={order.id} />)
      ) : (
        <MessagePage message="No Orders Available" />
      )}
    </div>
  );
}

export default OrdersList;
