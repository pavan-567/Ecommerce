import { useState } from "react";
import styled from "styled-components";
import ProfileDetails from "./ProfileDetails";
import UserAddress from "./UserAddress";
import UserAddressForm from "./UserAddressForm";

function UserProfile() {
  const [open, setOpen] = useState(null);

  function handleOpen(openOption) {
    if (open === openOption) setOpen(null);
    else setOpen(openOption);
  }

  return (
    <>
      <div>
        <button onClick={() => handleOpen("profile")}>Profile</button>
        <button onClick={() => handleOpen("address")}>Address</button>
        <div>profile Orders Addresses</div>
      </div>
      <div>
        {/* Components */}
        {open === "profile" && <ProfileDetails />}
        {open === "address" && <UserAddress />}
      </div>
      <div></div>
    </>
  );
}

const StyledProfile = styled.div`
  background-color: white;
`;

export default UserProfile;
