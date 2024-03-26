import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { HiStar } from "react-icons/hi2";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantity } from "../Cart/cartSlice";
import toast from "react-hot-toast";
import { capitalizeFirstLetter } from "../../utils/products";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Star from "../../ui/Star";
import { FaC, FaCartShopping, FaS } from "react-icons/fa6";
import Button from "react-bootstrap/esm/Button";
import { FaStar } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";

function ProductItem({ product, view }) {
  const {
    title,
    description,
    brand,
    category,
    thumbnail,
    discountPercentage,
    stock,
    rating,
    price,
    images,
    isInStock,
    id,
  } = product;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const discountedPrice = Math.round(price * (1 - discountPercentage / 100));
  const mode = useSelector((store) => store.user?.mode);

  const itemQuantity = useSelector(getCurrentQuantity(id));

  function handleAddCart() {
    const newItem = {
      id,
      image: thumbnail,
      totalPrice: price,
      discountPercentage,
      discountedPrice,
      brand,
      title,
      quantity: 1,
    };
    dispatch(addItem(newItem));
    toast.success("Product Added To Cart!");
  }

  return (
    <StyledDiv
      view={view}
      stock={isInStock}
      className={view === "item" && "border p-1 d-flex flex-column gap-3"}
      style={{
        backgroundColor: `${mode === "light" ? "#f5f5f5" : ""}`,
        boxShadow:
          "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
      }}
    >
      {view === "item" ? (
        <div className="position-relative">
          <img
            src={thumbnail}
            height={300}
            width={140}
            className="card-img-top object-fit-cover rounded"
            alt="..."
            onClick={() => navigate(`/products/${id}`)}
          />
          {/* <div className="position-absolute" style={{ top: 5, left: 5 }}>
            <Badge
              bg="warning"
              className="text-black fw-bold d-flex gap-1 align-items-center"
              style={{ fontSize: "15px" }}
            >
              <FaStar size={15} />
              {rating}
            </Badge>
          </div> */}
          <div className="p-3" style={{ height: "150px" }}>
            <div className="d-flex justify-content-between gap-2">
              <div>
                <div className="fw-medium fs-5">
                  {capitalizeFirstLetter(title)}
                </div>
                <div style={{ color: "#a8a29e" }}>By {brand}</div>
              </div>
              <div>
                <span
                  className="text-decoration-line-through"
                  style={{ color: "#737373" }}
                >
                  ${price}
                </span>
                <span className="ms-2 fw-semibold" style={{ color: "#dc2626" }}>
                  ${discountedPrice}
                </span>
                <div className="d-flex gap-2 align-items-center justify-content-end">
                  <FaStar size={18} fill="#fbbf24" />
                  <span className="fw-medium">{rating}</span>
                </div>
              </div>
            </div>
            {!isInStock && (
              <div className="mt-2">
                <Badge bg="danger">Out Of Stock</Badge>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="innerDiv">
          <img
            src={thumbnail}
            className="object-fit-cover"
            alt=""
            onClick={() => navigate(`/products/${id}`)}
          />

          <div className="d-flex flex-column gap-3">
            <div className="">
              <div className="fs-2">{title}</div>
              <Star stars={rating} />
            </div>
            <div className="fs-2">
              ${discountedPrice}{" "}
              <span className="text-decoration-line-through fs-6">
                ${price}
              </span>
              <span className="fs-6">({discountPercentage}% off)</span>
            </div>
            <div>Save Extra With No Cost EMI</div>
            <div>Free Delivery</div>
            <div className="d-flex gap-3">
              {isInStock ? (
                itemQuantity > 0 ? (
                  <Button onClick={() => navigate("/cart")}>Go To Cart</Button>
                ) : (
                  <Button onClick={handleAddCart}>Add To Cart</Button>
                )
              ) : (
                <Button variant="danger" disabled>
                  Out Of Stock
                </Button>
              )}

              <Button
                variant="outline-dark"
                onClick={() => navigate(`/products/${id}`)}
              >
                More Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  transition: 0.25s linear;
  cursor: pointer;
  &:hover {
    transform: ${(props) => props.stock && "scale(1.1)"};
  }
  width: ${(props) => (props.view === "item" ? "300px" : "800px")};

  & .innerDiv {
    width: auto;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    gap: 30px;

    img {
      width: 300px;
      height: 300px;
    }
    @media screen and (max-width: 1010px) {
      width: 596px;
      padding: 20px 0px;
    }
  }
`;

export default ProductItem;
