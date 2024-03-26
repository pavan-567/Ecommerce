import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { changeProfileImage, editProfile } from "../../services/apiUser";
import toast from "react-hot-toast";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { logout } from "../Users/userSlice";
import ClipLoader from "react-spinners/ClipLoader";

function EditProfile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { userDetails, profileDetails } = useSelector((store) => store.user);
  const user = { ...userDetails, ...profileDetails };

  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: user,
  });
  
  const { errors } = formState;
  const dispatch = useDispatch();

  const { mutate, status } = useMutation({
    mutationFn: editProfile,
    onSuccess: (data) => {
      toast.success(
        "Profile Successfully Edited! Login Again To See The Changes!"
      );
      queryClient.invalidateQueries(["userProfile"]);
      dispatch(logout());
    },
    onError: (err) => {
      toast.error(err.message);
      reset();
    },
  });

  function handleProfile(data) {
    const profileData = {
      username: data.username,
      email: data.email,
      gender: data.gender,
      age: data.age,
    };

    const formData = new FormData();
    formData.append("profile", JSON.stringify(profileData));
    formData.append("image", data.image[0]);
    mutate(formData);
  }

  // function handleProfileImage(e) {
  //   console.log(e.target.files[0]);
  //   const formData = new FormData();
  //   formData.append("image", e.target.files[0]);
  //   mutate1(formData);
  // }
  return (
    <div>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(handleProfile)}>
            <Row>
              <Col>
                <Card>
                  <Card.Header>Edit Profile</Card.Header>
                  <Card.Body className="d-flex flex-column gap-5 justify-content-center px-4 py-4">
                    <Form.Group>
                      <Row>
                        <Col sm={3} className="fw-bold">
                          <Form.Label>Username</Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            placeholder="Account User Name"
                            className="mb-1"
                            disabled={status === "pending"}
                            {...register("username", {
                              required: "This Field Is Required",
                              minLength: {
                                value: 5,
                                message: "Username Must Be Minimum Of Length 5",
                              },
                            })}
                          />
                          <span>{errors?.username?.message}</span>
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group>
                      <Row>
                        <Col sm={3} className="fw-bold">
                          <Form.Label>Email</Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            disabled={status === "pending"}
                            {...register("email", {
                              required: "This Field Is Required",
                            })}
                          />
                          <span>{errors?.email?.message}</span>
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group>
                      <Row>
                        <Col sm={3} className="fw-bold">
                          <Form.Label>Age</Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            type="number"
                            placeholder="Your Age"
                            disabled={status === "pending"}
                            {...register("age", {
                              required: "This Field Is Required",
                              min: {
                                value: 0,
                                message: "Age Should Be Greater Than 0",
                              },
                            })}
                          />

                          <span>{errors?.age?.message}</span>
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group>
                      <Row>
                        <Col sm={3} className="fw-bold">
                          <Form.Label>Gender</Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={8}>
                          <Form.Select
                            aria-label="Default select example"
                            disabled={status === "pending"}
                            {...register("gender", {
                              required: "This Field Is Required",
                            })}
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </Form.Select>

                          <span>{errors?.gender?.message}</span>
                        </Col>
                      </Row>
                    </Form.Group>
                    {/*  */}
                    <Form.Group>
                      <Row>
                        <Col sm={3} className="fw-bold">
                          <Form.Label>Image</Form.Label>
                          <span className="text-danger">*</span>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            type="file"
                            placeholder="Image"
                            disabled={status === "pending"}
                            accept="image/*"
                            {...register("image", {
                              required: false,
                            })}
                          />
                          <span style={{ fontSize: "10px" }}>
                            Present : {user.image}
                          </span>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group>
                      <Row>
                        <Button type="submit" disabled={status === "pending"}>
                          {status === "pending" ? (
                            <>
                              <div className="d-flex align-items-center gap-1 justify-content-center">
                                <ClipLoader color="white" size={20} />
                                <span>Submitting...</span>
                              </div>
                            </>
                          ) : (
                            "Submit"
                          )}
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

export default EditProfile;
