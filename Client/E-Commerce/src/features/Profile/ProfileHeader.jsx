import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function ProfileHeader() {
  return (
    <>
      <ul className="nav nav-tabs d-md-flex flex-md-column">
        <li className="nav-item">
          <NavLink className="nav-link" to="" end replace>
            Profile Info
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="address">
            Address
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="password">
            Change Password
          </NavLink>
        </li>
      </ul>
    </>
  );
}

const StyledDiv = styled.div`
  min-height: 100vh;

  & ul li .active {
    background-color: black;
  }
`;

export default ProfileHeader;
