import Row from "react-bootstrap/esm/Row";
import Star from "../../ui/Star";
import CreateReview from "./CreateReview";
import Col from "react-bootstrap/esm/Col";
import { formatDate } from "../../utils/dates";
import { FaStar } from "react-icons/fa";

function ReviewItem({ review, productId }) {
  // Product ID: Page Yokka Product ID
  const { description, rating, product, username, image, updated_at } = review;

  return (
    <div>
      {product === productId && (
        <>
          <div>
            {/* <img src={image} alt="" height={100} width={100} /> */}
            {/* <p>{username}</p>
            <Star stars={rating} />
            <p>{description}</p> */}
          </div>
          <Row className="mt-3">
            <Col className="d-flex gap-1">
              <img
                src={`http://localhost:8000/media/${image}`}
                alt=""
                height={40}
                width={40}
                className="rounded-circle"
              />
              <div className="px-2 rounded border py-2 d-flex flex-column gap-2">
                <div className="d-flex justify-content-between">
                  <div className="fw-bold">
                    {username}{" "}
                    <span
                      className="ms-2 fw-normal"
                      style={{ color: "#a3a3a3" }}
                    >
                      {formatDate(updated_at)}
                    </span>
                  </div>
                </div>
                <Star stars={rating} />
                <div className="mb-2">{description}</div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default ReviewItem;
