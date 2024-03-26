import MessagePage from "../../ui/MessagePage";
import AdItm from "./AdItm";

function AdminOrderList({ orders }) {
  return (
    <div>
      {orders.length > 0 ? (
        orders.map((order) => <AdItm order={order} key={order.id} />)
      ) : (
        <MessagePage message="No Orders Available" />
      )}
    </div>
  );
}

export default AdminOrderList;
