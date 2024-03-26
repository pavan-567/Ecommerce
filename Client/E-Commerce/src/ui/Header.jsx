import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsCartCheck } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FiSun } from "react-icons/fi";
import {
  getCurrentQuantity,
  getTotalQuantity,
} from "../features/Cart/cartSlice";
import { RiMoonClearFill } from "react-icons/ri";
import { RiMoonClearLine } from "react-icons/ri";
import { IoCartSharp } from "react-icons/io5";
import { logout, toogleMode } from "../features/Users/userSlice";
import toast from "react-hot-toast";
import CartCanvas from "./CartCanvas";
import { LuShoppingCart } from "react-icons/lu";

function Header() {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.user.token);
  const username = useSelector((store) => store.user.userDetails?.username);
  const role = useSelector((store) => store.user.userDetails?.role);
  const image = useSelector((store) => store.user.profileDetails?.image);
  const mode = useSelector((store) => store.user?.mode);

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand>
          <img src="/src/assets/logo.png" width={40} height={40} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="d-lg-flex justify-content-lg-between"
        >
          <Nav className="">
            <NavLink className="nav-link" to="/" end>
              Home
            </NavLink>
            <NavLink className="nav-link" to="/products">
              Products
            </NavLink>
            {token && (
              <NavLink className="nav-link" to="/orders">
                Orders
              </NavLink>
            )}
            {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav className="align-items-lg-center">
            <CartCanvas />
            <span className="ms-3 d-lg-block d-none">|</span>
            {!token ? (
              <>
                <NavLink className="nav-link" to="/auth/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/auth/signup">
                  Sign Up
                </NavLink>
              </>
            ) : (
              <>
                <NavDropdown
                  title={
                    <img
                      src={`http://localhost:8000${image}`}
                      width={40}
                      height={40}
                      className="rounded-circle shadow"
                    />
                  }
                  id="collapsible-nav-dropdown"
                  // className="dropstart"
                >
                  <NavDropdown.Item>
                    <Link
                      className="dropdown-item"
                      data-rr-ui-dropdown-item={true}
                      to="/orders"
                    >
                      Orders
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      className="dropdown-item"
                      data-rr-ui-dropdown-item={true}
                      href="#action/3.2"
                      to="profile"
                    >
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  {role === 1 && (
                    <NavDropdown.Item>
                      <Link className="dropdown-item" to="/admin">
                        Admin
                      </Link>
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link
                      className="dropdown-item"
                      data-rr-ui-dropdown-item={true}
                      onClick={() => {
                        dispatch(logout());
                        toast.success("Logged Out Successfully!");
                      }}
                    >
                      Logout
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            <div>
              <Form.Check
                className="d-flex align-items-center gap-2"
                type="switch"
                id="custom-switch"
                label={mode === "dark" ? <RiMoonClearFill /> : <FiSun />}
                onChange={() => dispatch(toogleMode())}
                defaultChecked={mode === "dark"}
              />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
