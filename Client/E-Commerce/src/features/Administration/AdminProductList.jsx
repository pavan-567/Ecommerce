import { useSelector } from "react-redux";
import AdminProductItem from "./AdminProductItem";
import Button from "react-bootstrap/Button";
import useFetchProducts from "../../hooks/useFetchProducts";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../services/apiProducts";
import Loader from "../../ui/Loader";

function AdminProductList() {
  // const products = useSelector((store) => store.products.products);

  const {
    data: products,
    isFetching,
    error,
    isError,
  } = useQuery({
    queryKey: ["products-admin"],
    queryFn: fetchProducts,
  });

  if (isFetching) return <Loader height="yes" />;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <div className="d-flex gap-3 flex-wrap mt-4 justify-content-around me-3 align-items-center">
        {products.map((product) => (
          <AdminProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default AdminProductList;
