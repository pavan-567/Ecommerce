import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../services/apiProducts";
import { useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useDispatch, useSelector } from "react-redux";
import { TbReplaceFilled } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { AiTwotoneTrophy } from "react-icons/ai";
import { LiaToolsSolid } from "react-icons/lia";
import { SiBrandfolder } from "react-icons/si";
import Badge from "react-bootstrap/Badge";
import { IoCart } from "react-icons/io5";
import { TbCategoryFilled } from "react-icons/tb";
import {
  addItem,
  getCurrentQuantity,
  getDiscountedPrice,
} from "../Cart/cartSlice";
import { useQuery } from "@tanstack/react-query";
import Star from "../../ui/Star";
import { checkUserBuyedProduct } from "../Orders/OrderSlice";
import Reviews from "../Reviews/Reviews";
import toast from "react-hot-toast";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import Alert from "react-bootstrap/Alert";

function Product() {
  // const product = useLoaderData();
  const dispatch = useDispatch();
  const { id: pathId } = useParams();

  const token = useSelector((store) => store.user.token);
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", pathId],
    queryFn: () => getProduct(pathId),
  });

  const itemQuantity = useSelector(getCurrentQuantity(pathId));

  const hasItemPurchased = useSelector(checkUserBuyedProduct(pathId));
  const mode = useSelector((store) => store.user?.mode);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  const {
    title,
    description,
    brand,
    category,
    discountPercentage,
    stock,
    thumbnail,
    rating,
    isInStock,
    price,
    images: productImages,
    id,
  } = product;

  const images = productImages.map((image) => image.image_url);

  const discountedPrice = Math.round(price * (1 - discountPercentage / 100));

  function handleAddToCart() {
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
    <>
      <Row className="p-2 border mx-2">
        <Col>
          {" "}
          <div className="mt-3">
            <div className="px-5">
              <Row className="gap-5">
                <Col lg>
                  <Row className="">
                    <img
                      src={images[selectedImage]}
                      alt=""
                      className="object-fit-cover p-0 rounded"
                      height={550}
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    />
                  </Row>
                  <Row className="mt-4">
                    <StyledCol className="col d-flex gap-3 justify-content-center flex-wrap">
                      {images.map((img, idx) => (
                        <img
                          src={img}
                          key={idx}
                          className={`object-fit-cover ${
                            idx === selectedImage && "selected"
                          }`}
                          style={{ cursor: "pointer" }}
                          height={70}
                          width={70}
                          onClick={() => setSelectedImage(idx)}
                        />
                      ))}
                    </StyledCol>
                  </Row>
                </Col>
                <Col lg className="d-flex flex-column gap-3">
                  <Row className="">
                    <Col>
                      <div
                        className="fs-3 fw-semibold mb-2"
                        style={{ color: "#737373" }}
                      >
                        {title}
                      </div>
                      <Star stars={rating} />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="">
                      <Row className="gap-2">
                        <Col md>
                          {isInStock ? (
                            <Badge bg="success">In Stock</Badge>
                          ) : (
                            <Badge bg="danger">Out Of Stock</Badge>
                          )}
                        </Col>
                        <Col md>
                          <SiBrandfolder size={25} /> {brand}
                        </Col>
                        <Col md={5}>
                          <TbCategoryFilled size={25} /> {category}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ color: "#737373" }}>
                      <div className="fs-5 fw-medium">Special Price : </div>
                      <div className="fs-3 fw-bold">${discountedPrice}</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {itemQuantity > 0 ? (
                        <StyledButton onClick={() => navigate("/cart")}>
                          Go To Cart
                        </StyledButton>
                      ) : (
                        <StyledButton
                          variant="outline-success"
                          onClick={handleAddToCart}
                          disabled={!isInStock}
                        >
                          <IoCart size={25} /> Add To Cart
                        </StyledButton>
                      )}
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col style={{ color: "#737373" }}>
                      <div className="fw-bold">Description : </div>
                      <div>{description}</div>
                    </Col>
                  </Row>
                  <Row
                    className="border py-4 px-2 mt-2"
                    style={{
                      backgroundColor: `${mode === "light" ? "#fafafa" : ""}`,
                    }}
                  >
                    <Col
                      className="d-flex gap-3"
                      style={{ overflowX: "scroll" }}
                    >
                      <div className="d-flex gap-2 flex-column align-items-center text-center">
                        <TbReplaceFilled size={35} />
                        <div style={{ maxWidth: "100px" }}>
                          7 Day Service Center Replacement
                        </div>
                      </div>
                      <div className="d-flex flex-column gap-2 align-items-center text-center">
                        <TbTruckDelivery size={35} />
                        <div>Free Delivery</div>
                      </div>
                      <div className="d-flex flex-column gap-2 align-items-center text-center">
                        <AiOutlineSecurityScan size={35} />
                        <div>Warranty Policy</div>
                      </div>
                      <div className="d-flex flex-column gap-2 align-items-center text-center">
                        <AiTwotoneTrophy size={35} />
                        <div>Top Brand</div>
                      </div>
                      <div className="d-flex flex-column gap-2 align-items-center text-center">
                        <LiaToolsSolid size={35} />
                        <div>Installation Available</div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col className="mt-1">
                      {hasItemPurchased && (
                        <Alert
                          key="success"
                          variant="success"
                          className="text-center"
                        >
                          You've Purchased This Product
                        </Alert>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg>
          <div className="mt-3 border p-4 mx-2">
            <div className="fs-4 fw-medium">Reviews</div>
            <hr />
            <div className="mt-2">
              <Row>
                <Reviews productId={pathId} itemPurchased={hasItemPurchased} />
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

const StyledButton = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px;
  cursor: ${(props) => !props.disabled && "pointer"};
  background-color: ${(props) => (props.disabled ? "#fca5a5" : "#ef4444")};
  color: white;
`;

const StyledCol = styled.div`
  img {
    transition: all 0.4s ease-in-out;
  }

  .selected {
    border: 2px inset #fbbf24;
  }

  & img:hover {
    transform: scale(1.2);
  }
`;

export async function loader({ params }) {
  let { id } = params;
  const data = await getProduct(id);
  return data;
}

export default Product;
