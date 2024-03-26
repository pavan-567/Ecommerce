import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder, getOrderAddress } from "./OrderSlice";
import { getSelectedAddress } from "../Address/addressSlice";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSingleOrder } from "../../services/apiOrders";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import CartCanvasItems from "../../ui/CartCanvasItems";
import { formatDate } from "../../utils/dates";
import { capitalizeFirstLetter } from "../../utils/products";
import Loader from "../../ui/Loader";

function OrderDetail() {
  const { id } = useParams();
  // const order = useSelector(getOrder(id));

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getSingleOrder(id),
  });

  if (isLoading) return <Loader height="yes" />;
  if (isError) return <p>{error.message}</p>;

  const {
    id: orderId,
    cartItems,
    deliveryStatus,
    discountedPrice,
    orderStatus,
    paymentMethod,
    paymentStatus,
    shipments,
    totalItems,
    totalPrice,
    created_at,
    deliveryDate,
  } = order;

  console.log(order);

  const { fullName, address, city, country, landmark, mobile, state, zipCode } =
    shipments;

  return (
    <>
      <Row>
        <Col className="mt-2" lg={8}>
          <Card className="">
            <Card.Header className="fs-4">Order Details</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Table responsive bordered className="text-center">
                    <thead>
                      <tr>
                        <th>Ordered Date</th>
                        <th>Order ID</th>
                        <th>Order Status</th>
                        {orderStatus === "delivered" && (
                          <th>Date Of Delivery</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{formatDate(created_at)}</td>
                        <td>{orderId.toUpperCase()}</td>
                        <td>{capitalizeFirstLetter(orderStatus)}</td>

                        {orderStatus === "delivered" && (
                          <td>{formatDate(deliveryDate)}</td>
                        )}
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mt-2">
            <Card.Header className="fs-5">
              Order Related Information
            </Card.Header>
            <Card.Body>
              {/* <Row>
            <Col>
              <div>Shipping Address</div>
              <div>{fullName}</div>
              <div>{address}</div>
              <div>
                {city}
                {state}
                {zipCode}
              </div>
              <div>{country}</div>
            </Col>
            <Col>
              <div>Payment Status</div>
              <div>{paymentMethod === "card" ? "card" : "Pay On Delivery"}</div>
            </Col>
            <Col>
              <div>Order Summary</div>
              <div>Items Subtotal : ${discountedPrice}</div>
              <div>Shipping : ${0}</div>
              <div>Total : ${discountedPrice}</div>
              <div>Discount : ${0}</div>
              <div className="fw-bold">Grand Total : ${discountedPrice}</div>
            </Col>
          </Row> */}
              <Row>
                <Col>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th>Shipping Address</th>
                        <th>Payment Status</th>
                        <th>Order Summary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div>{fullName}</div>
                          <div>{address}</div>
                          <div>
                            {city}
                            {state}
                            {zipCode}
                          </div>
                          <div>{country}</div>
                        </td>
                        <td>
                          {paymentMethod === "card"
                            ? "card"
                            : "Pay On Delivery"}
                        </td>
                        <td>
                          <div>Items Subtotal : ${discountedPrice}</div>
                          <div>Shipping : ${0}</div>
                          <div>Total : ${discountedPrice}</div>
                          <div>Discount : ${0}</div>
                          <div className="fw-bold">
                            Grand Total : ${discountedPrice}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mt-2" lg={4}>
          <Card>
            <Card.Header className="fs-5">Ordered Products</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <CartCanvasItems cartItems={cartItems} mode="display" />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderDetail;
