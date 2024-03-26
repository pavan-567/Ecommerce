import Button from "react-bootstrap/Button";

import { BsExclamationTriangleFill } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MessagePage({ message, vh = true, home = true }) {
  const navigate = useNavigate();
  return (
    <div
      className={` ${
        vh && "min-vh-100"
      }  d-flex align-items-center justify-content-center`}
    >
      <div
        className="p-5 border d-flex flex-column align-items-center gap-5 me-3"
        style={{ width: "100%", maxWidth: "1000px" }}
      >
        <BsExclamationTriangleFill size={100} />
        <div className="fw-medium fs-3">{message}</div>
        {home && (
          <Button
            variant="outline-danger"
            className="d-flex align-items-center gap-2"
            onClick={() => navigate("/")}
          >
            <FaArrowLeft /> Go To Home
          </Button>
        )}
      </div>
    </div>
  );
}

export default MessagePage;
