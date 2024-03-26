import { useQuery } from "@tanstack/react-query";
import { fetchAddress } from "../services/apiAddress";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addAllAddress } from "../features/Address/addressSlice";

function useFetchAddress() {
  const {
    data: address,
    isFetching,
    isFetched,
    isError,
    error,
  } = useQuery({
    queryKey: ["address"],
    queryFn: fetchAddress,
  });
  const isAddrExist = useSelector((store) => store.address.addresses);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetched) dispatch(addAllAddress(address));
  }, [address, dispatch, isFetched, isAddrExist]);

  return { address, isFetching, isFetched, isError, error };
}

export default useFetchAddress;
