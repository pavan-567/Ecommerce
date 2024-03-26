import { useMutation, useQuery } from "@tanstack/react-query";
import { FaArrowLeft } from "react-icons/fa6";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useForm } from "react-hook-form";
import { getProfileDetails, login as loginAPI } from "../../services/apiUser";
import { useDispatch, useSelector } from "react-redux";
import { login, profileDetails } from "./userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function LoginForm() {
  const { register, formState, reset, handleSubmit } = useForm();
  const { errors } = formState;

  const token = useSelector((store) => store.user.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: loginFn, status } = useMutation({
    mutationFn: loginAPI,
    onSuccess: (token) => {
      dispatch(login(token));
      toast.success("Login Successful!");
      navigate(-1);
    },
    onError: (err) => {
      toast.error(err.message);
      reset();
    },
  });

  useEffect(() => {
    async function fetchProfDetails() {
      const profData = await getProfileDetails();
      dispatch(profileDetails(profData));
    }
    if (token) fetchProfDetails();
  }, [dispatch, token]);

  function onSubmit(data) {
    loginFn(data);
  }

  return (
    <div className="border p-4 mx-3" style={{ width: "600px" }}>
      <div className="text-center mb-4 fs-1">User Login</div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            {...register("email", {
              required: "This Field Is Required",
            })}
            disabled={status === "pending"}
          />
          <span className="text-danger">{errors?.email?.message}</span>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "This Field Is Required",
            })}
            disabled={status === "pending"}
          />
          <span className="text-danger">{errors?.password?.message}</span>
        </FloatingLabel>
        <div className="mt-3 d-flex gap-3">
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
                  <span>Logging In...</span>
                </div>
              </>
            ) : (
              "Submit"
            )}
          </Button>
          <Button variant="outline-warning" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Go Back
          </Button>
        </div>
      </Form>
      <div className="mt-3">
        New To Website ?{" "}
        <Link className="" to="/auth/signup">
          Register
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
