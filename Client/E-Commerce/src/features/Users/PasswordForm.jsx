import { useForm } from "react-hook-form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../services/apiUser";
import toast from "react-hot-toast";
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/ClipLoader";

function PasswordForm() {
  const { register, formState, reset, handleSubmit } = useForm();

  const { mutate, status } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
      reset();
    },
  });

  function onSubmitPassword(data) {
    console.log(data);
    mutate(data);
  }

  return (
    <Form className="border p-4 mt-2" onSubmit={handleSubmit(onSubmitPassword)}>
      <Row>
        <Col>
          <div className="fs-4 fw-bold">Change Password</div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {" "}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Old Password"
              {...register("oldPassword", {
                required: "This Field Is Required",
              })}
              disabled={status === "pending"}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              {...register("password", { required: "This Field Is Required" })}
              disabled={status === "pending"}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              {...register("password2", { required: "This Field Is Required" })}
              disabled={status === "pending"}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="danger"
            type="submit"
            disabled={status === "pending"}
          >
            {status === "pending" ? (
              <div className="d-flex align-items-center gap-1 justify-content-center">
                <ClipLoader size={20} color="white" />
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default PasswordForm;
