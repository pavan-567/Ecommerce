import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CartItemOverview from "./CartItemOverview";
import { getDiscountedPrice, getTotalPrice } from "./cartSlice";

function CartOverview() {
  const cartItems = useSelector((store) => store.cart.cart);
  
  return (
    <>
      <Row>
        <Col xs={12}>
          {cartItems.map((item, idx) => (
            <CartItemOverview item={item} key={idx} />
          ))}
        </Col>
        {/* <p>
          Total :{" "}
          <span className="text-decoration-line-through">${totalPrice}</span> $
          {discountPrice}
        </p> */}
      </Row>
    </>
  );
}

export default CartOverview;
