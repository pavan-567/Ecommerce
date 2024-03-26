import { useSelector } from "react-redux";
import OrdersList from "../features/Orders/OrdersList";
import useFetchOrders from "../hooks/useFetchOrders";
import Loader from "../ui/Loader";

function Orders() {
  const { orders, isFetching: isLoading, isError, error } = useFetchOrders();

  if (isLoading) return <Loader height="yes" />;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <OrdersList orders={orders} />
    </>
  );
}

export default Orders;
