import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/apiOrders";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { postOrders } from "../features/Orders/OrderSlice";

function useFetchOrders() {
  const {
    data: orders,
    isFetching,
    isFetched,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetched) dispatch(postOrders(orders));
  }, [orders, dispatch, isFetched]);

  return { orders, isFetching, isError, error };
}

export default useFetchOrders;
