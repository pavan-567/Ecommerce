import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminProductItem({ product }) {
  const navigate = useNavigate();
  return (
    <Row>
      <Col>
        <Card style={{ width: "26rem" }}>
          <Card.Img
            variant="top"
            src={product.thumbnail}
            className="object-fit-cover"
            height={300}
            width={300}
          />
          <Card.Body
            as="div"
            style={{ minHeight: "150px" }}
            className="d-flex flex-column gap-3"
          >
            <Card.Text as="div" className="">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <div className="fs-3 fw-normal" style={{ maxWidth: "250px" }}>
                    {product.title}
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <FaStar size={20} />
                  <span style={{ fontSize: "20px" }}>{product.rating}</span>
                </div>
              </div>
              <span className="mt-1">By {product.brand}</span>
            </Card.Text>
            <div className="d-flex gap-3">
              <Button
                variant="warning"
                className="mt-auto"
                onClick={() => navigate(`${product.id}/edit`)}
              >
                Edit
              </Button>
              {/* <Button variant="danger">Delete</Button> */}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default AdminProductItem;
