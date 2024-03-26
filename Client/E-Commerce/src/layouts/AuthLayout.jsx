import Container from "react-bootstrap/esm/Container";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

function AuthLayout() {
  return (
    <Container className="min-vh-100">
      <Outlet />
    </Container>
  );
}

const StyledDiv = styled.div`
  background: url("/src/assets/spidy.jpg");
  background-repeat: no-repeat;

  background-size: cover;
`;

export default AuthLayout;
