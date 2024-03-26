import { useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  itemQuantity,
} from "./cartSlice";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

function CartQuantity({ itemId, quantity }) {
  const dispatch = useDispatch();
  return (
    <>
      {/* <Form.Select
        aria-label="Default select example"
        defaultValue={quantity}
        onChange={(e) =>
          dispatch(itemQuantity({ id: itemId, quantity: +e.target.value }))
        }
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </Form.Select> */}
      <div className="d-flex align-items-center gap-2 h-100">
        <StyledButton onClick={() => dispatch(decreaseItemQuantity(itemId))}>
          -
        </StyledButton>
        <div>{quantity}</div>
        <StyledButton onClick={() => dispatch(increaseItemQuantity(itemId))}>
          +
        </StyledButton>
      </div>
    </>
  );
}

const StyledButton = styled.div`
  border: none;
  background-color: #dc2626;
  padding: 2px 10px;
  border-radius: 10px;
  box-shadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px";
  cursor: pointer;
  transition: all 0.2s linear;

  &:last-child {
    background-color: black;
    color: white;
  }

  &:last-child:hover {
    background-color: #292524;
  }

  &:hover {
    background-color: #ef4444;
  }
`;

export default CartQuantity;
