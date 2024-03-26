import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import useFetchProfile from "../../hooks/useFetchProfile";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";

function ProfileDetails() {
  const {
    data: profile,
    isFetching,
    isFetched,
    isError,
    error,
  } = useFetchProfile();
  const { username, email } = useSelector((store) => store.user.userDetails);
  const navigate = useNavigate();

  if (isFetching) return <Loader height="yes" />;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <Card>
        <Card.Header className="text-center fs-2">Profile Details</Card.Header>
        <Card.Body>
          <Row className="">
            <Col className="d-flex justify-content-center align-items-center position-relative flex-column gap-3">
              <img
                src={`http://localhost:8000${profile.image}/`}
                width={150}
                height={150}
                className="rounded-circle object-fit-cover"
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col className="d-flex align-items-center flex-column gap-1">
              <div className="fs-3 fw-semibold">{username}</div>
              <div>{email}</div>
              <Button
                variant="danger"
                className="mt-2"
                onClick={() => navigate("edit")}
              >
                Edit Profile
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {/*  */}
    </>
  );
}

export default ProfileDetails;
