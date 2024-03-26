import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItem } from "../features/Cart/cartSlice";

function CartCanvasItems({ cartItems, mode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="my-3">
            <div className="d-flex gap-4" style={{ height: "100px" }}>
              <div>
                <img
                  src={item.image}
                  width={100}
                  className="object-fit-cover rounded h-100"
                  alt=""
                  style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                />
              </div>
              <div className="d-flex flex-column justify-content-between">
                <>
                  <div>
                    <div className="fw-bold">{item.title}</div>
                    <div style={{ color: "#878e8d" }}>
                      ${item.discountedPrice}
                    </div>
                  </div>
                  {mode === "display" && (
                    <div
                      className="text-info"
                      style={{
                        color: "#121212",
                        fontSize: "17px",
                      }}
                    >
                      {item.quantity} pieces
                    </div>
                  )}
                </>
                {mode !== "display" && (
                  <div
                    className="text-warning"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch(removeItem(item.id));
                      toast.success("Removed Item From The Cart!");
                    }}
                  >
                    Remove
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center fs-3 fw-bold">Your Cart Is Empty</p>
      )}
    </>
  );
}

export default CartCanvasItems;
