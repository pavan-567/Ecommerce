import { useSelector } from "react-redux";
import { getDiscountedPrice, getTotalPrice } from "./cartSlice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";

function CartSummary() {
  const totalDiscountedPrice = useSelector(getDiscountedPrice());
  const totalPrice = useSelector(getTotalPrice());
  return (
    <Row className="gap-3">
      <Row>
        <Col>Products</Col>
        <Col className="text-end">${totalDiscountedPrice}</Col>
      </Row>
      <Row className="">
        <Col>Shipping</Col>
        <Col className="text-end">${0}</Col>
      </Row>
      <hr className="p-0 m-0" />
      <Row className="align-items-center">
        <Col>Total Amount</Col>
        <Col className="text-end fw-bold fs-5">${totalDiscountedPrice}</Col>
      </Row>
    </Row>
  );
}

export default CartSummary;
