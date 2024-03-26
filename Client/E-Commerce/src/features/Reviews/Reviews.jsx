import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAlreadyReviewGiven, fetchReviews } from "./reviewSlice";
import ReviewItem from "./ReviewItem";
import CreateReview from "./CreateReview";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

function Reviews({ productId, itemPurchased }) {
  const loading = useSelector((store) => store.reviews.loading);
  const error = useSelector((store) => store.reviews.error);
  const dispatch = useDispatch();

  const productReviews = useSelector((store) => store.reviews.reviews);
  const currentProductReviews = productReviews.filter(
    (review) => review.product === productId
  );
  const token = useSelector((store) => store.user.token);
  const username = useSelector((store) => store.user.userDetails?.username);

  const reviewAlreadyGiven = useSelector(
    checkAlreadyReviewGiven(productId, username)
  );

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>{error}</p>;


  return (
    <>
      <Col>
        <Row>
          {currentProductReviews.length > 0 ? (
            currentProductReviews.map((review) => (
              <ReviewItem
                review={review}
                productId={productId}
                key={review.id}
              />
            ))
          ) : (
            <p>No Reviews Yet For This Product</p>
          )}
        </Row>

        <Row className="mt-2">
          {itemPurchased && token && !reviewAlreadyGiven && (
            <CreateReview product={productId} />
          )}
        </Row>
      </Col>
    </>
  );
}

export default Reviews;
