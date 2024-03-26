import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/apiProducts";

function useFetchProduct(id) {
  const { data, isFetched, isFetching, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  return { data, isFetched, isFetching, isError, error };
}

export default useFetchProduct;
