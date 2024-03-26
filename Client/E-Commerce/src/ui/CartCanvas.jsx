import { useState } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsCartCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
import {
  clearCart,
  getTotalQuantity,
  removeItem,
} from "../features/Cart/cartSlice";
import Badge from "react-bootstrap/Badge";
import { GrCart } from "react-icons/gr";

import CartCanvasItems from "./CartCanvasItems";
import Button from "react-bootstrap/esm/Button";

function CartCanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart.cart);
  const totalCartItems = useSelector(getTotalQuantity());

  const mode = useSelector((store) => store.user?.mode);

  return (
    <div className="position-relative">
      <GrCart size={25} style={{ cursor: "pointer" }} onClick={toggleShow} />
      <div
        className="position-absolute bg-success text-white"
        style={{
          top: -10,
          right: -10,
          padding: "1px 5px",
          borderRadius: "30px",
          fontSize: "14px",
        }}
      >
        {totalCartItems}
      </div>
      {/* <Button
        variant={mode === "light" ? "outline-dark" : "outline-warning"}
        size="sm"
        onClick={toggleShow}
      >
        <IoCartSharp
          style={{ fontWeight: "bold", fontSize: "30px", cursor: "pointer" }}
        />{" "}
        Cart
        <Badge bg="danger" className="ms-2">
          {totalCartItems}
        </Badge>
      </Button> */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={false}
        backdrop={true}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart Items</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          <CartCanvasItems cartItems={cartItems} />
          <div className="mt-auto d-flex flex-column gap-3">
            <StyledButton
              onClick={() => {
                handleClose();
                navigate("/cart");
              }}
            >
              Go To Cart
            </StyledButton>
            <StyledButton onClick={() => dispatch(clearCart())}>
              Clear All
            </StyledButton>
            <StyledButton onClick={handleClose}>
              Continue Shopping <HiArrowLongRight />
            </StyledButton>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

const StyledButton = styled.button`
  border: none;
  padding: 10px;

  text-transform: uppercase;
  font-weight: bold;
  background-color: black;
  color: white;
  font-size: 12px;

  &:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    background-color: white;
    color: black;
  }
`;

export default CartCanvas;
