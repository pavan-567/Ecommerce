import { useSelector } from "react-redux";
import { getDiscountedPrice, getTotalPrice } from "./cartSlice";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

function CartItemOverview({ item }) {
  const {
    id,
    image,
    totalPrice: price,
    discountPercentage,
    brand,
    quantity,
    title,
  } = item;
  

  const itemPrice = quantity * price;
  const itemDiscountedPrice =
    quantity * Math.round(price * (1 - discountPercentage / 100));

  return (
    <div className="">
      <div className="my-3 d-flex justify-content-between">
        <div className="d-flex gap-3">
          <img
            src={image}
            width={100}
            height={100}
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            className="object-fit-cover rounded"
          />
          <div className="d-flex flex-column gap-2">
            <div className="fw-bold fs-5">{title}</div>
            <div style={{ color: "#878e8d" }}>By {brand}</div>
            <div className="fw-bold text-danger">${itemDiscountedPrice}</div>
          </div>
        </div>
        <div className="fw-bold fs-5">{quantity} Item('s)</div>
      </div>
      {/*  */}
    </div>
  );
}

export default CartItemOverview;
