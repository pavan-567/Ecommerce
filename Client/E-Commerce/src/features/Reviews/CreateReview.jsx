import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "./reviewSlice";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

function CreateReview({ product }) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const dispatch = useDispatch();

  const image = useSelector((store) => store.user.profileDetails?.image);

  function onReviewSubmit(data) {
    data.product = product;
    dispatch(addReview(data));
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onReviewSubmit)}>
      <Row>
        <Col className="d-flex align-items-center gap-2">
          <div>
            <img
              src={`http://localhost:8000/${image}`}
              alt=""
              height={50}
              width={50}
              className="rounded-circle"
            />
          </div>
          <div className="flex-grow-1">
            <input
              type="text"
              placeholder="Write Review"
              className="form-control"
              {...register("description", {
                required: "This Field Is Required",
              })}
            />
          </div>
          <div>
            <input
              type="number"
              name=""
              step={0.01}
              id=""
              placeholder="Rating [From 0 To 5]"
              className="form-control"
              {...register("rating", {
                required: "This Field Is Required",
                min: {
                  value: 0,
                  message: "Rating Shouldn't Be Less Than 0",
                },
                max: {
                  value: 5,
                  message: "Rating Shouldn't Be Greater Than 5",
                },
              })}
            />
          </div>
          <div>
            <Button variant="danger" type="submit">
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default CreateReview;
