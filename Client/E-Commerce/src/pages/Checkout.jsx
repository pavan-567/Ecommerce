import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CartOverview from "../features/Cart/CartOverview";
import { useDispatch, useSelector } from "react-redux";
import OrderSuccess from "../features/Orders/OrderSuccess";
import Card from "react-bootstrap/Card";

import {
  addAddress,
  getAllAddress,
  getSelectedAddress,
  selectAddress,
} from "../features/Address/addressSlice";
import UserAddressItem from "../features/Profile/UserAddressItem";
import useFetchAddress from "../hooks/useFetchAddress";
import CartSummary from "../features/Cart/CartSummary";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { callStripeSession } from "../services/apiStripe";
import BootstrapModal from "../ui/BootstrapModal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import {
  clearCart,
  getDiscountedPrice,
  getTotalPrice,
  getTotalQuantity,
} from "../features/Cart/cartSlice";
import { placeOrder } from "../services/apiOrders";
import toast from "react-hot-toast";
import { resetCart } from "../utils/Cart";
import Test from "../features/Profile/Test";
import Button from "react-bootstrap/esm/Button";

function Checkout() {
  const {
    address: userAddress,
    isFetching,
    isFetched,
    isError,
    error,
  } = useFetchAddress();

  const selectedAddr = useSelector(getSelectedAddress());
  const cartItems = useSelector((store) => store.cart.cart);

  const totalItems = useSelector(getTotalQuantity());
  const totalPrice = useSelector(getTotalPrice());
  const discountedPrice = useSelector(getDiscountedPrice());

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    async function createOrder() {
      const isStripe = JSON.parse(localStorage.getItem("isStripe"));
      console.log(isStripe);

      if (
        isStripe &&
        selectedAddr &&
        params.get("status") === "success" &&
        cartItems &&
        cartItems.length > 0 &&
        !isOrderProcessing &&
        !isFetching
      ) {
        setIsOrderProcessing(true);

        const orderPayload = {
          totalItems,
          paymentMethod: "card",
          paymentStatus: "paid",
          totalPrice,
          discountedPrice,
          orderedProducts: [...cartItems],
          shipment: selectedAddr,
        };

        try {
          await placeOrder(orderPayload);
          setOrderSuccess(true);
          toast.success("Order Successfully Placed!");
          dispatch(clearCart());
        } catch (err) {
          toast.error(err.message);
          setOrderSuccess(false);
        } finally {
          setIsOrderProcessing(false);
          localStorage.removeItem("isStripe");
        }
      }
    }

    createOrder();
  }, [
    cartItems,
    discountedPrice,
    dispatch,
    isFetching,
    isOrderProcessing,
    params,
    selectedAddr,
    totalItems,
    totalPrice,
  ]);

  useEffect(() => {
    if (orderSuccess) {
      setTimeout(() => {
        setOrderSuccess(false);
        navigate("/orders");
      }, 3000);
    }
  }, [navigate, orderSuccess]);

  if (isFetching) return <p>Fetching...</p>;
  if (isError) return <p>{error.message}</p>;

  if (isOrderProcessing) return <p>Processing</p>;

  async function handleCheckout() {
    const createLineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          images: [item.image],
          name: item.title,
        },
        unit_amount: item.discountedPrice * item.quantity * 100,
      },
      quantity: 1,
    }));

    const url = await callStripeSession(createLineItems);

    localStorage.setItem("isStripe", true);
    setIsOrderProcessing(true);
    window.location.replace(url);
  }

  if (orderSuccess) return <OrderSuccess />;

  return (
    <>
      {/* <Row>
        <Col>
          <div className="fs-2 fw-bold">Cart Summary</div>
        </Col>
        <Col>
          <div className="fs-2 fw-bold">Shipping Address Details</div>
          <p style={{ color: "#878e8d" }}>
            Complete Your Order By Selecting The Address Below
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <CartOverview />
        </Col>
        <Col className="bg-white px-3 py-4">
          {userAddress.map((address) => (
            <UserAddressItem key={address.id} userAddress={address}>
              <button onClick={() => dispatch(selectAddress(address.id))}>
                {address.id === selectedAddr ? "Selected" : "Select"}
              </button>
            </UserAddressItem>
          ))}
          <hr />
          <button onClick={() => navigate("/profile")}>Add New Address</button>
          <CartSummary />
          <Row>
            <button
              disabled={selectedAddr && cartItems.length > 0 ? false : true}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </Row>
        </Col>
      </Row> */}

      {/*  */}
      <Row className="">
        <Col md={6} className="my-3">
          <Card>
            {/* <Card.Header>Order Summary</Card.Header> */}
            <Card.Body>
              <Row>
                <Col className="fs-2">Order Summary</Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <CartOverview />
                </Col>
              </Row>
              <hr />
              <CartSummary />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="my-3">
          <Card>
            <Card.Body>
              <Row>
                <Col className="" md={8}>
                  <div className="fs-2">Shipping Information</div>
                  <p style={{ color: "#878e8d" }}>
                    Complete Your Order By Selecting The Address Below
                  </p>
                </Col>
                <Col
                  md={4}
                  className="d-md-flex align-items-md-center justify-content-md-end"
                >
                  <Button
                    className=""
                    onClick={() => navigate("/profile/address/add")}
                    variant="outline-success"
                  >
                    Create Address
                  </Button>
                </Col>
                <hr />
              </Row>
              <Row>
                <Col>
                  {userAddress.map((address) => (
                    <UserAddressItem key={address.id} userAddress={address}>
                      <Button
                        variant={
                          address.id === selectedAddr
                            ? "danger"
                            : "outline-danger"
                        }
                        onClick={() => dispatch(selectAddress(address.id))}
                      >
                        {address.id === selectedAddr ? "Selected" : "Select"}
                      </Button>
                    </UserAddressItem>
                  ))}
                </Col>
              </Row>
              <hr />
              <Row>
                <Button
                  variant="outline-success"
                  disabled={selectedAddr && cartItems.length > 0 ? false : true}
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Checkout;
