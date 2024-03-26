import { useMutation } from "@tanstack/react-query";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useForm } from "react-hook-form";
import { signUp } from "../../services/apiUser";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/ClipLoader";

function SignUpForm() {
  const { register, formState, reset, handleSubmit, watch } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  const { mutate, status } = useMutation({
    mutationFn: signUp,
    onSuccess: (res) => {
      toast.success(
        "Registration Successful! Please Login With Your Credentials!"
      );
      navigate("/auth/login");
    },
    onError: (err) => {
      toast.error(err.message);
      reset();
    },
  });

  function onSubmit(data) {
    const { age, gender } = data;
    delete data.age;
    delete data.gender;
    data.userProfile = {
      age,
      gender,
    };
    mutate(data);
  }

  return (
    <div className="border p-4 mx-3" style={{ width: "600px" }}>
      <div className="text-center mb-4 fs-1">User Registration</div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FloatingLabel
          controlId="floatingUser"
          label="Username"
          className="mb-3"
        >
          <Form.Control
            type="text"
            disabled={status === "pending"}
            placeholder="username"
            {...register("username", {
              required: "This Field Is Required",
            })}
          />
          <span className="text-danger">{errors?.username?.message}</span>
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingEmail"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            disabled={status === "pending"}
            type="email"
            placeholder="name@example.com"
            {...register("email", {
              required: "This Field Is Required",
            })}
          />
          <span className="text-danger">{errors?.email?.message}</span>
        </FloatingLabel>
        <FloatingLabel controlId="floatingAge" label="Age" className="mb-3">
          <Form.Control
            disabled={status === "pending"}
            type="number"
            placeholder="age"
            {...register("age", {
              required: "This Field Is Required",
              min: {
                value: 0,
                message: "Age Shouldn't Be Below Zero",
              },
            })}
          />
          <span className="text-danger">{errors?.age?.message}</span>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingGender"
          label="Gender"
          className="mb-3"
        >
          <Form.Select
            aria-label="Select Gender"
            {...register("gender", {
              required: "This Field Is Required",
            })}
            disabled={status === "pending"}
          >
            <option value="">-------------</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Select>
          <span className="text-danger">{errors?.gender?.message}</span>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPass"
          className="mb-3"
          label="Password"
        >
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "This Field Is Required",
              minLength: {
                value: 5,
                message: "Password Must Be Minimum Of 5 Characters",
              },
            })}
            disabled={status === "pending"}
          />
          <span className="text-danger">{errors?.password?.message}</span>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPass2" label="Confirm Password">
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password2", {
              required: "This Field Is Required",
              minLength: {
                value: 5,
                message: "Password Must Be Minimum Of 5 Characters",
              },
              validate: (val) => {
                if (watch("password") !== val) {
                  return "Your Password's Doesn't Match!";
                }
              },
            })}
            disabled={status === "pending"}
          />
          <span className="text-danger">{errors?.password2?.message}</span>
        </FloatingLabel>
        <div className="mt-4 d-flex gap-2">
          <Button
            type="submit"
            variant="success"
            className=""
            disabled={status === "pending"}
          >
            {status === "pending" ? (
              <>
                <div className="d-flex align-items-center gap-1 justify-content-center">
                  <ClipLoader color="white" size={20} />
                  <span>Signing Up...</span>
                </div>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <Button variant="outline-warning" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Go Back
          </Button>
        </div>
        <div className="mt-3">
          Already Existing User ? <Link to="/auth/login">Login</Link>
        </div>
      </Form>
    </div>
  );
}

export default SignUpForm;
