import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import Button from "react-bootstrap/esm/Button";
import { FaArrowLeft } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

function AdminSideNav() {
  const navigate = useNavigate();

  return (
    <StyledDiv>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="#"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Admin Panel
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/admin" end>
              <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/products">
              <CDBSidebarMenuItem icon="table">Products</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/orders">
              <CDBSidebarMenuItem icon="user">Orders</CDBSidebarMenuItem>
            </NavLink>
            <Link>
              <CDBSidebarMenuItem icon="chart-line">
                Analytics
              </CDBSidebarMenuItem>
            </Link>

            <NavLink to="/hero404" target="_blank">
              <CDBSidebarMenuItem icon="exclamation-circle">
                404 page
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter className="d-flex justify-content-center">
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            <div
              style={{
                border: "none",
                backgroundColor: "gold",
                padding: "10px",
                borderRadius: "10px",
                cursor: "pointer",
                color: "black",
              }}
              onClick={() => navigate("/products")}
            >
              <FaArrowLeft size={20} className="" />
            </div>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  height: 100vh;

  .active {
    color: darksalmon;
  }
`;

export default AdminSideNav;
