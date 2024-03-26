import { TbError404 } from "react-icons/tb";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center">
      <Card>
        <Card.Body
          as="div"
          className="p-5 d-flex flex-column align-items-center justify-content-center"
          style={{ width: "500px" }}
        >
          <TbError404 size={150} />
          <div className="fs-3 mx-2">Page Not Found</div>
          <div className="mt-3 mx-3">
            We're Sorry! The Page You Requested Couldn't Be Found! Please Go
            Back To The Home Page!
          </div>
          <Button
            variant="outline-danger"
            size="lg"
            className="d-flex align-items-center gap-3 my-3"
            onClick={() => navigate("/")}
          >
            <FaArrowLeft /> Back To Home
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ErrorPage;
