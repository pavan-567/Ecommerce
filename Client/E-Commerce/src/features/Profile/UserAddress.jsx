import { useQuery } from "@tanstack/react-query";
import { fetchAddress } from "../../services/apiAddress";
import UserAddressItem from "./UserAddressItem";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAllAddress } from "../Address/addressSlice";
import UserAddressForm from "./UserAddressForm";
import useFetchAddress from "../../hooks/useFetchAddress";
import Loader from "../../ui/Loader";

function UserAddress() {
  const { address, isFetching, isError, error } = useFetchAddress();
  const dispatch = useDispatch();

  const [openAddr, setOpenAddr] = useState(false);
  const [editId, setEditId] = useState(null);

  if (isFetching) return <Loader />;
  if (isError) return <p>{error.message}</p>;

  function handleEdit(id) {
    setEditId(id);
  }

  function clear() {
    setEditId(null);
    setOpenAddr(false);
  }

  return (
    <>
      <div className="bg-white">
        {address.map((addr) => (
          <UserAddressItem userAddress={addr} key={addr.id}>
            <div>
              <button onClick={() => handleEdit(addr.id)}>Update</button>
              <button>Delete</button>
              <button onClick={() => clear()}>Clear</button>
            </div>
          </UserAddressItem>
        ))}
      </div>
      <button onClick={() => setOpenAddr((val) => !val)}>
        {!openAddr ? "Add Address" : "Hide Address Form"}
      </button>
      <div>
        {openAddr && (
          <UserAddressForm
            editId={editId}
            clear={clear}
            handleEdit={handleEdit}
          />
        )}
      </div>
    </>
  );
}

export default UserAddress;
