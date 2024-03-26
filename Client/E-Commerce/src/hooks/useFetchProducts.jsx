import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addProducts } from "../features/Products/productSlice";
import { fetchProducts, fetchProductsViaQuery } from "../services/apiProducts";

function useFetchProducts({ searchParams = "" }) {
  const {
    data: products,
    isFetching,
    isFetched,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", Object.fromEntries(searchParams)],
    queryFn: () => fetchProductsViaQuery(Object.fromEntries(searchParams)),
  });

  return { products, isFetching, isFetched, isError, error };
}

export default useFetchProducts;
