import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navigate, Outlet } from "react-router-dom";
import AdminSideNav from "../ui/AdminSideNav";
import AdminNav from "../ui/AdminNav";
import { useState } from "react";
import { useSelector } from "react-redux";

function AdminLayout() {
  const token = useSelector((store) => store.user.token);
  if (!token) return <Navigate to="/auth/login" />;
  
  return (
    <Container fluid className="min-vh-100 p-0 me-2">
      <div className="vh-100 d-flex gap-3">
        <div>
          <AdminSideNav />
        </div>
        <div className="flex-grow-1 overflow-scroll">
          <Outlet />
        </div>
      </div>
    </Container>
  );
}

export default AdminLayout;
