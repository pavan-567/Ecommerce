import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../features/Products/productSlice";
import AdminProductForm from "../features/Administration/AdminProductForm";
import AdminProductEditForm from "../features/Administration/AdminProductEditForm";
import useFetchProduct from "../hooks/useFetchProduct";
import Loader from "../ui/Loader";

function AdminProductEdit() {
  const { id } = useParams();
  const {
    data: product,
    isFetched,
    isFetching,
    isError,
    error,
  } = useFetchProduct(id);

  if (isFetching) return <Loader height="yes" />;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="mt-4">
      <div className="fs-3 my-3">Admin Product Edit</div>
      <hr className="me-4" />
      <AdminProductEditForm product={product} />
    </div>
  );
}

export default AdminProductEdit;
