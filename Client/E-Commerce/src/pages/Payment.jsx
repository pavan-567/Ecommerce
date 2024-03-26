import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid4 } from "uuid";

import {
  clearCart,
  getDiscountedPrice,
  getTotalPrice,
  getTotalQuantity,
} from "../features/Cart/cartSlice";
import { createOrder } from "../features/Orders/OrderSlice";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../services/apiOrders";

function Payment() {
  // const { mutate } = useMutation({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((store) => store.cart.cart);
  const totalItems = useSelector(getTotalQuantity());

  const totalPrice = useSelector(getTotalPrice());
  const discountedPrice = useSelector(getDiscountedPrice());
  const selectedAddr = useSelector((store) => store.address.selectedAddr);
  
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: placeOrder,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  function handlePayment() {
    const order = {
      totalItems,
      paymentMethod: "cash",
      paymentStatus: "Not Paid",
      deliveryStatus: "PENDING",
      totalPrice,
      discountedPrice,
      orderStatus: "processing",
      orderedProducts: [...cartItems],
      shipment: selectedAddr,
    };
    // Mutate To Backend
    mutate(order);

    navigate("/orders");
    dispatch(clearCart());
  }

  return (
    <>
      {selectedAddr ? (
        <div>
          Select Payment Mode
          <div className="mt-5 p-5 border border-danger d-flex flex-column align-items-center justify-content-center gap-5">
            <button
              className="p-3 text-white rounded btn btn-info"
              onClick={handlePayment}
            >
              Cash On Delivery
            </button>
            <button className="p-3 text-white rounded btn btn-info">
              Card
            </button>
          </div>
        </div>
      ) : (
        <p>No Address Selected! Please Create and Select Address!</p>
      )}
    </>
  );
}

export default Payment;
