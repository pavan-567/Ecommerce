import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AdminOrderForm from "./AdminOrderForm";
import { getSingleOrder } from "../../services/apiOrders";
import Loader from "../../ui/Loader";
import { useSelector } from "react-redux";
import { getAllAddress } from "../Address/addressSlice";
import { fetchAddress } from "../../services/apiAddress";
import { getOrder } from "../Orders/OrderSlice";
// import { useSelector } from "react-redux";

function EditAdminOrder() {
  const { id } = useParams();

  const {
    data: order,
    isFetching,
    error,
    isError,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getSingleOrder(id),
  });

  if (isFetching) return <Loader height="yes" />;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="mt-3">
      KI
      <AdminOrderForm order={order} />
    </div>
  );
}

export default EditAdminOrder;
