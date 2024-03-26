import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import CartQuantity from "./CartQuantity";
import { useDispatch } from "react-redux";
import { removeItem } from "./cartSlice";
import toast from "react-hot-toast";
import Card from "react-bootstrap/Card";
import { AiFillDelete } from "react-icons/ai";

function CartItem({ item }) {
  const {
    id,
    image,
    totalPrice: price,
    discountPercentage,
    brand,
    quantity,
    title,
  } = item;

  const dispatch = useDispatch();

  const discountedPrice = Math.round(price * (1 - discountPercentage / 100));

  // const discountedPrice =
  //   quantity * Math.round(price * (1 - discountPercentage / 100));
  const totalPrice = quantity * price;
  const totalDiscountedPrice = quantity * discountedPrice;

  return (
    <tr
      className=""
      style={{ verticalAlign: "middle", margin: "0px auto", width: "100%" }}
    >
      {/* <div className="">
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
              <div>
                <CartQuantity quantity={quantity} itemId={id} />
              </div>
            </div>
          </div>
          <div>
            <div className="fw-bold fs-5">${totalDiscountedPrice}</div>
            <RiDeleteBin2Fill className="fs-2" />
            <div
              className="mt-2 text-warning"
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(removeItem(id));
                toast.success("Removed Item From The Cart!");
              }}
            >
              Remove
            </div>
          </div>
        </div>
      </div>
      <div>

      </div> */}
      <td className="">
        <div className="d-flex gap-3">
          <div>
            <img
              src={image}
              width={70}
              height={70}
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              className="object-fit-cover rounded"
            />
          </div>
          <div className="d-flex flex-column text-start">
            <div className="fw-bold fs-5">{title}</div>
            <div style={{ color: "#878e8d" }}>By {brand}</div>
          </div>
        </div>
      </td>
      <td>${discountedPrice}</td>
      <td
        className="d-flex border-0 align-items-center justify-content-center"
        style={{ height: "80px" }}
      >
        <CartQuantity quantity={quantity} itemId={id} />
      </td>

      <td>${totalDiscountedPrice}</td>
      <td>
        <AiFillDelete
          style={{ cursor: "pointer", fontSize: "25px", color: "#f59e0b" }}
          onClick={() => {
            dispatch(removeItem(id));
            toast.success("Removed Item From The Cart!");
          }}
        />
      </td>
    </tr>
  );
}

export default CartItem;
