import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import CartSummary from "./CartSummary";
import MessagePage from "../../ui/MessagePage";

function Cart() {
  const cartItems = useSelector((store) => store.cart.cart);

  const navigate = useNavigate();

  if (cartItems.length <= 0)
    return (
      <MessagePage message="Your Cart Is Empty.. Make Sure To Add The Products To The Cart" />
    );

  return (
    <Row>
      <Col md={9}>
        <Card>
          <Card.Header as="div" className="d-flex justify-content-between py-2">
            <div>Items In Your Cart</div>
            <div>
              <span>{cartItems.length}</span>{" "}
              {cartItems.length === 1 ? "Item" : "Items"}
            </div>
          </Card.Header>
          <Card.Body>
            {/*  */}

            <Table responsive bordered className="text-center">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <CartItem item={item} key={item.id} />
                ))}
              </tbody>
            </Table>

            {/*         
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItem item={item} key={item.id} />)
        ) : (
          <p>Empty Cart</p>
        )} */}
          </Card.Body>
          {/* <Row>
        <Col xs={12} className="px-5">
          {cartItems.length > 0 ? (
            cartItems.map((item) => <CartItem item={item} key={item.id} />)
          ) : (
            <p className="fw-bold fs-2">Your Cart Is Empty!</p>
          )}
        </Col>
      </Row> */}
          {/* <hr className="mx-4" />
      <CartSummary />
      <Row className="mt-2">
        <Col className="px-5 flex-grow-1">
          <Button
            className="w-100"
            disabled={cartItems.length === 0}
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </Button>
        </Col>
      </Row> */}
        </Card>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Header className="py-2">Cart Summary</Card.Header>
          <Card.Body>
            <CartSummary />
          </Card.Body>
          <Card.Footer>
            <Button
              disabled={cartItems.length === 0}
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

export default Cart;
