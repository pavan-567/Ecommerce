import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Controller, useForm } from "react-hook-form";
import CartCanvasItems from "../../ui/CartCanvasItems";
import Button from "react-bootstrap/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editOrder } from "../../services/apiOrders";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { formatDate, getDateTime } from "../../utils/dates";

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { fetchAllUserAddresses } from "../../services/apiAddress";
import Loader from "../../ui/Loader";

function AdminOrderForm({ order }) {
  const username = order.username;

  const {
    data: shipments,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["shipment", username],
    queryFn: () => fetchAllUserAddresses(username),
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: editOrder,
    onSuccess: (data) => {
      toast.success("Successfully Edited");
      queryClient.invalidateQueries(["order", order.id]);
      navigate("/admin/orders");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });

  const { control, register, watch, handleSubmit } = useForm({
    defaultValues: order,
  });

  if (isFetching) return <Loader height="yes" />;
  if (isError) return <p>{error.message}</p>;

  function onSubmit(data) {
    const {
      paymentStatus,
      deliveryStatus,
      orderStatus,
      deliveryDate,
      shipment,
    } = data;
    const editableData = {
      paymentStatus,
      deliveryStatus,
      orderStatus,
      deliveryDate: orderStatus === "delivered" ? deliveryDate : null,
      shipment,
    };
    mutate({ id: order.id, order: editableData });
  }

  return (
    <div>
      <Row>
        <Col>
          {/* Form */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gap-2">
              <Col lg={7} className="mb-lg-3">
                <Card>
                  <Card.Header>
                    <div
                      style={{ color: "#878e8d" }}
                      className="fw-bold text-uppercase"
                    >
                      #order - {order.id}
                    </div>
                  </Card.Header>
                  <Card.Body>
                    {/*  */}
                    <Form.Group className="mb-3" controlId="orderId">
                      <Row>
                        <Col sm={3}>
                          <Form.Label className="fw-bold">Id</Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={7}>
                          <Form.Control
                            type="text"
                            placeholder="User ID"
                            {...register("id", {
                              required: "This Field Is Required",
                            })}
                            disabled
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group className="mb-3" controlId="orderUser">
                      <Row>
                        <Col sm={3}>
                          <Form.Label className="fw-bold">User</Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={7}>
                          <Form.Control
                            type="text"
                            placeholder="User"
                            defaultValue={order.username}
                            disabled
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group className="mb-3" controlId="orderTotalItems">
                      <Row>
                        <Col sm={3}>
                          <Form.Label className="fw-bold">
                            Total Items
                          </Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={7}>
                          <Form.Control
                            type="number"
                            {...register("totalItems", {
                              required: "This Field Is Required",
                            })}
                            disabled
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group className="mb-3" controlId="orderPaymentMethod">
                      <Row>
                        <Col sm={3}>
                          <Form.Label className="fw-bold">
                            Payment Method
                          </Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={7}>
                          <Form.Control
                            type="text"
                            {...register("paymentMethod", {
                              required: "This Field Is Required",
                            })}
                            disabled
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group className="mb-3" controlId="orderPaymentStatus">
                      <Row>
                        <Col sm={3}>
                          <Form.Label className="fw-bold">
                            Payment Status
                          </Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={7}>
                          <Form.Select
                            disabled={status === "pending"}
                            aria-label="Default select example"
                            {...register("paymentStatus", {
                              required: "This Field Is Required",
                            })}
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group
                      className="mb-3"
                      controlId="orderDeliveryStatus"
                    >
                      <Row>
                        <Col sm={3}>
                          <Form.Label className="fw-bold">
                            Delivery Status
                          </Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={7}>
                          <Form.Select
                            disabled={status === "pending"}
                            aria-label="Default select example"
                            {...register("deliveryStatus", {
                              required: true,
                            })}
                          >
                            <option value="pending">Pending</option>
                            <option value="success">Success</option>
                            <option value="failed">Failed</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group className="mb-3" controlId="orderOrderStatus">
                      <Row>
                        <Col sm={3}>
                          <Form.Label className="fw-bold">
                            Order Status
                          </Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={7}>
                          <Form.Select
                            disabled={status === "pending"}
                            aria-label="Default select example"
                            {...register("orderStatus", {
                              required: "This Field Is Required",
                            })}
                          >
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="out_for_delivery">
                              Out For Delivery
                            </option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group className="mb-3" controlId="orderDeliveryDate">
                      <Row>
                        <Col sm={3}>
                          <Form.Label className="fw-bold">
                            Delivery Date
                          </Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={7}>
                          {/* <input
                            type="datetime-local"
                            defaultValue=" 2015-01-02T11:42:13.510"
                            disabled={watch("orderStatus") !== "delivered"}
                            {...register("deliveryDate", {
                              required: "This Field Is Required",
                            })}
                          /> */}
                          <Controller
                            control={control}
                            name={"deliveryDate"}
                            render={({ field: { onChange, value } }) => {
                              return (
                                <DateTimePicker
                                  value={value}
                                  onChange={onChange}
                                  selected={value}
                                  defaultValue={value}
                                  disabled={
                                    watch("orderStatus") !== "delivered" ||
                                    status === "pending"
                                  }
                                  placeholder="Enter Birth Date"
                                />
                              );
                            }}
                          />
                          {/* <DateTimePicker
                            {...register("deliveryDate", {
                              required: "This Field Is Required",
                            })}
                          /> */}
                        </Col>
                      </Row>
                    </Form.Group>

                    {/*  */}
                    <Form.Group className="mb-3" controlId="orderTotalPrice">
                      <Row>
                        <Col sm={3}>
                          <Form.Label className="fw-bold">
                            Total Price
                          </Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={7}>
                          <Form.Control
                            type="number"
                            {...register("totalPrice", {
                              required: "This Field Is Required",
                            })}
                            disabled
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group
                      className="mb-3"
                      controlId="orderDiscountedPrice"
                    >
                      <Row>
                        <Col sm={3}>
                          <Form.Label className="fw-bold">
                            Discounted Price
                          </Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={7}>
                          <Form.Control
                            type="number"
                            {...register("discountedPrice", {
                              required: "This Field Is Required",
                            })}
                            disabled
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group className="mb-3" controlId="orderShipment">
                      <Row>
                        <Col sm={3}>
                          <Form.Label className="fw-bold">
                            Order Shipment
                          </Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={7}>
                          <Form.Select
                            aria-label="Default select example"
                            {...register("shipment", {
                              required: "This Field Is Required",
                            })}
                            disabled={status === "pending"}
                            defaultValue={order.shipment}
                          >
                            <option>-----------------</option>
                            {shipments.map((shipment, idx) => (
                              <option value={shipment.id} key={shipment.id}>
                                {shipment.address}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Button
                        type="submit"
                        variant="warning"
                        disabled={status === "pending"}
                      >
                        {status === "pending" ? (
                          <>
                            <div className="d-flex align-items-center gap-1 justify-content-center">
                              <ClipLoader color="white" size={20} />
                              <span>Editing...</span>
                            </div>
                          </>
                        ) : (
                          "Edit"
                        )}
                      </Button>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4}>
                <Row className="mb-3">
                  <Col>
                    <Card>
                      <Card.Header
                        className="fw-bold"
                        style={{ color: "#878e8d" }}
                      >
                        Ordered Items
                      </Card.Header>
                      <Card.Body>
                        <CartCanvasItems
                          cartItems={order.cartItems}
                          mode="display"
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card>
                      <Card.Header
                        className="fw-bold"
                        style={{ color: "#878e8d" }}
                      >
                        Options
                      </Card.Header>
                      <Card.Body></Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <div></div>
    </div>
  );
}

export default AdminOrderForm;
