import Button from "react-bootstrap/Button";
import AdminProductList from "./AdminProductList";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex justify-content-between mt-5 mx-5">
        <div className="fs-2 fw-bold">Products</div>
        <div>
          <Button variant="outline-success" onClick={() => navigate("add")}>
            Add Product
          </Button>
        </div>
      </div>
      <hr className="mx-3" />
      <AdminProductList />
    </>
  );
}

export default AdminProducts;
