import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { selectAddress } from "./addressSlice.js";
import { useMutation } from "@tanstack/react-query";
import { makeAddressDefault } from "../../services/apiAddress.js";
import { useEffect } from "react";

function AddressItem({ address }) {
  const dispatch = useDispatch();
  const storedAddr = useSelector((store) => store.address.selectedAddr);

  const { mutate } = useMutation({
    mutationFn: makeAddressDefault,
    onSuccess: (data) => {
      console.log("Successfully Edited");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  function selectAddr() {
    dispatch(selectAddress(address.id));
    mutate(address.id);
  }

  return (
    <div
      className={`${storedAddr === address.id ? "border border-black" : ""}`}
    >
      <Form.Check
        inline
        type="radio"
        id={`${address.id}`}
        className="display-inline"
        name="addrGrp"
        onClick={selectAddr}
        // defaultChecked={storedAddr === address.id ? true : false}
        defaultChecked={address.defaultAddress}
      />
      <span className="fw-bold">{address.fullName}</span> {address.address}{" "}
      {address.city} {address.pinCode} {address.country}
    </div>
  );
}

export default AddressItem;
