import { useDispatch, useSelector } from "react-redux";
import AddressItem from "./AddressItem";
import { useQuery } from "@tanstack/react-query";
import { fetchAddress } from "../../services/apiAddress";
import { addAllAddress, fetchAddresses } from "./addressSlice";
import { useEffect } from "react";

function Address() {
  const dispatch = useDispatch();

  const {
    data: allAddresses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["address"],
    queryFn: fetchAddress,
  });

  useEffect(() => {
    dispatch(addAllAddress(allAddresses));
  }, [allAddresses, dispatch]);

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      {allAddresses.map((address, idx) => (
        <AddressItem address={address} key={idx} />
      ))}
    </div>
  );
}

export default Address;
