import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";

function AppLayout() {
  return (
    <Container
      fluid
      className="d-flex flex-column min-vh-100 gap-3 p-0"
      // style={{ backgroundColor: "#e5e5e5" }}
      style={{ overflowX: "scroll" }}
    >
      <Header />
      <Container as="main" className="flex-fill my-2">
        <Outlet />
      </Container>
      <Footer />
    </Container>
  );
}

export default AppLayout;
