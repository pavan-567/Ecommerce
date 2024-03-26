import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../services/apiOrders";
import AdminOrderList from "../features/Administration/AdminOrderList";
import Loader from "../ui/Loader";

function AdminOrders() {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["allOrders"],
    queryFn: getAllOrders,
  });

  if (isFetching) return <Loader height="yes" />;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <AdminOrderList orders={data} />
    </>
  );
}

export default AdminOrders;
