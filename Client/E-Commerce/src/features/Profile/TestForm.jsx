import { useForm } from "react-hook-form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { countries } from "countries-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAddress, editAddress } from "../../services/apiAddress";
import { useDispatch, useSelector } from "react-redux";
import { getAddress, selectAddress } from "../Address/addressSlice";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/ClipLoader";

function TestForm() {
  const { id } = useParams();
  const address = useSelector(getAddress(id));
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: id ? address : "",
    values: id ? address : "",
  });

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: create, status: createStatus } = useMutation({
    mutationFn: createAddress,
    onSuccess: (data) => {
      toast.success("Address Created Successfully!");
      queryClient.invalidateQueries(["address"]);
      navigate(-1);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: update, status: updateStatus } = useMutation({
    mutationFn: editAddress,
    onSuccess: (data) => {
      toast.success("Address Updated Successfully!");
      queryClient.invalidateQueries(["address"]);
      navigate(-1);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    if (!id) create(data);
    else update(data);
    reset();
  }

  return (
    <div>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <Card>
                  <Card.Header>
                    {!id ? "Add Address" : "Edit Address"}
                  </Card.Header>
                  <Card.Body className="d-flex flex-column gap-5 justify-content-center px-4 py-4">
                    <Form.Group>
                      <Row>
                        <Col sm={3} className="fw-bold">
                          <Form.Label>Full Name</Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            placeholder="Full Name"
                            {...register("fullName", {
                              required: "This Field Is Required",
                            })}
                            className="mb-1"
                            disabled={
                              createStatus === "pending" ||
                              updateStatus === "pending"
                            }
                          />
                          <span className="text-danger mt-5">
                            {errors?.fullName?.message}
                          </span>
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group>
                      <Row>
                        <Col sm={3} className="fw-bold">
                          <Form.Label>Mobile No.</Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            type="number"
                            placeholder="Mobile"
                            disabled={
                              createStatus === "pending" ||
                              updateStatus === "pending"
                            }
                            {...register("mobile", {
                              required: "This Field Is Required",
                              minLength: {
                                value: 10,
                                message: "Phone Number Should Be 10 Digits",
                              },
                              maxLength: {
                                value: 10,
                                message: "Phone Number Should Be 10 Digits",
                              },
                            })}
                            className="mb-1"
                          />
                          <span className="text-danger mt-5">
                            {errors?.mobile?.message}
                          </span>
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group>
                      <Row>
                        <Col sm={3} className="fw-bold">
                          <Form.Label>Pin Code</Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            type="number"
                            placeholder="Pin Code"
                            disabled={
                              createStatus === "pending" ||
                              updateStatus === "pending"
                            }
                            {...register("zipCode", {
                              required: "This Field Is Required",
                              maxLength: {
                                value: 6,
                                message: "Pin Code Should Be Of 6 Digits",
                              },
                              minLength: {
                                value: 6,
                                message: "Pin Code Should Be Of 6 Digits",
                              },
                            })}
                            className="mb-1"
                          />
                          <span className="text-danger mt-5">
                            {errors?.zipCode?.message}
                          </span>
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group>
                      <Row>
                        <Col sm={3} className="fw-bold">
                          <Form.Label>Address</Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            as="textarea"
                            placeholder="Enter Your Address"
                            style={{ height: "100px" }}
                            disabled={
                              createStatus === "pending" ||
                              updateStatus === "pending"
                            }
                            {...register("address", {
                              required: "This Field Is Required",
                            })}
                            className="mb-1"
                          />
                          <span className="text-danger mt-5">
                            {errors?.address?.message}
                          </span>
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group>
                      <Row>
                        <Col sm={3} className="fw-bold">
                          <Form.Label>Landmark</Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            disabled={
                              createStatus === "pending" ||
                              updateStatus === "pending"
                            }
                            type="text"
                            placeholder="land mark"
                            {...register("landmark", {
                              required: "This Field Is Required",
                            })}
                            className="mb-1"
                          />
                          <span className="text-danger mt-5">
                            {errors?.landmark?.message}
                          </span>
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group>
                      <Row>
                        <Col sm={3} className="fw-bold">
                          <Form.Label>City</Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            placeholder="City"
                            disabled={
                              createStatus === "pending" ||
                              updateStatus === "pending"
                            }
                            {...register("city", {
                              required: "This Field Is Required",
                            })}
                            className="mb-1"
                          />{" "}
                          <span className="text-danger mt-5">
                            {errors?.city?.message}
                          </span>
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group>
                      <Row>
                        <Col sm={3} className="fw-bold">
                          <Form.Label>State</Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            disabled={
                              createStatus === "pending" ||
                              updateStatus === "pending"
                            }
                            type="text"
                            placeholder="State"
                            {...register("state", {
                              required: "This Field Is Required",
                            })}
                            className="mb-1"
                          />
                          <span className="text-danger mt-5">
                            {errors?.state?.message}
                          </span>
                        </Col>
                      </Row>
                    </Form.Group>

                    {/*  */}
                    <Form.Group>
                      <Row>
                        <Col sm={3} className="fw-bold">
                          <Form.Label>Country</Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={8}>
                          <Form.Select
                            className="mb-1"
                            aria-label="Floating label select example"
                            disabled={
                              createStatus === "pending" ||
                              updateStatus === "pending"
                            }
                            {...register("country", {
                              required: "This Field Is Required",
                            })}
                          >
                            {Object.keys(countries).map((country, index) => {
                              return (
                                <option
                                  value={countries[country].name}
                                  key={index}
                                >
                                  {countries[country].name}
                                </option>
                              );
                            })}
                          </Form.Select>
                          <span className="text-danger mt-5">
                            {errors?.country?.message}
                          </span>
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group>
                      <Row className="align-items-center">
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={
                            createStatus === "pending" ||
                            updateStatus === "pending"
                          }
                        >
                          {id &&
                            (updateStatus === "pending" ? (
                              <div className="d-flex align-items-center gap-1 justify-content-center">
                                <PulseLoader color="white" />
                                <span>Editing..</span>
                              </div>
                            ) : (
                              "Edit"
                            ))}
                          {!id &&
                            (createStatus === "pending" ? (
                              <div className="d-flex align-items-center gap-1 justify-content-center">
                                <ClipLoader size={20} color="white" />
                                <span>Creating...</span>
                              </div>
                            ) : (
                              "Submit"
                            ))}
                        </Button>
                      </Row>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default TestForm;
