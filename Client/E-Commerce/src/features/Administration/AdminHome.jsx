import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { RiProductHuntFill } from "react-icons/ri";
import { FaBox } from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <Row className="mx-2">
      <Col className="mt-2">
        <Card>
          <Card.Body as="div" className="d-flex align-items-center gap-3">
            <RiProductHuntFill size={50} />
            <Link className="fs-4 text-decoration-none" to="products">
              Product Handling
            </Link>
          </Card.Body>
        </Card>
      </Col>
      <Col className="mt-2">
        <Card>
          <Card.Body as="div" className="d-flex align-items-center gap-3">
            <FaBox size={50} />
            <Link className="fs-4 text-decoration-none" to="orders">
              Order Handling
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default AdminHome;
