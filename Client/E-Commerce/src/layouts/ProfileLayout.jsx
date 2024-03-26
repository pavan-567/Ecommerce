import Container from "react-bootstrap/Container";
import ProfileHeader from "../features/Profile/ProfileHeader";
import { Outlet } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ProfileLayout() {
  return (
    <Row>
      <Col md={3}>
        <ProfileHeader />
      </Col>
      <Col md>
        <Outlet />
      </Col>
    </Row>
  );
}

export default ProfileLayout;
