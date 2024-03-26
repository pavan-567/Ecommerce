import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getSelectedAddress, selectAddress } from "../Address/addressSlice";

function UserAddressItem({ userAddress, children }) {
  const { address, fullName, city, country, landmark, mobile, zipCode, id } =
    userAddress;

  const selectedAddr = useSelector(getSelectedAddress());
  const dispatch = useDispatch();

  return (
    <StyledDiv>
      <div
        style={{ cursor: "pointer" }}
        className={`fw-bold fs-5 ${id === selectedAddr ? "text-warning" : ""}`}
        onClick={() => dispatch(selectAddress(id))}
      >
        {fullName}
      </div>
      <p style={{ color: "#878e8d" }}>{address}</p>
      {/* <p>Name : {fullName}</p>
      <p>Address : {address}</p>
      <p>City : {city}</p>
      <p>Country : {country}</p>
      <p>Pin Code : {zipCode}</p> */}
      <div>{children}</div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding: 10px;
`;

export default UserAddressItem;
