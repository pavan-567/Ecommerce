import { useQuery } from "@tanstack/react-query";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../services/apiProducts";
import { addProducts } from "../features/Products/productSlice";
import styled from "styled-components";
import HomeProduct from "./HomeProduct";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { MdOutlinePayment } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { MdHighQuality } from "react-icons/md";
import { CiGift } from "react-icons/ci";
import Loader from "../ui/Loader";

function Home() {
  const dispatch = useDispatch();

  const {
    data: products,
    isFetched,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isFetching) return <Loader height="yes" />;
  if (isError) return <p>{error.message}</p>;

  if (isFetched) dispatch(addProducts(products));
  const categories = Array.from(
    new Set(products?.map((product) => product?.category))
  );

  return (
    <div>
      {/*  */}
      <Card className="bg-dark text-white">
        <Card.Img
          src="https://wallpaperaccess.com/full/1130705.jpg"
          alt="Card image"
          className="object-fit-cover"
          width={300}
          height={400}
        />
        <Card.ImgOverlay className="d-flex justify-content-end flex-column gap-3">
          <Card.Text as="div" className="fs-1 fw-medium">
            Grab Upto 50% Off On Selected Stuff
          </Card.Text>
          <div>
            <Button>Buy Now</Button>
          </div>
        </Card.ImgOverlay>
      </Card>

      {/* Category Products */}
      <div className="d-flex flex-column gap-4 my-4">
        <div className="fs-2 mt-4 fw-medium">Shop By Category</div>
        <StyledDiv>
          {categories.length > 0 &&
            categories.map((category, idx) => (
              <HomeProduct category={category} key={idx} />
            ))}
        </StyledDiv>
      </div>

      {/* Services */}
      <div className="d-flex flex-column gap-4 my-4">
        <Row>
          <Col className="fw-medium fs-2">Our Services</Col>
        </Row>
        <Row>
          <Col className="d-flex gap-3">
            <MdOutlinePayment size={50} />
            <div className="d-flex flex-column gap-3">
              <div className="fw-bold fs-5">Secured Payments</div>
              <div>
                Secure payment options to ensure that your transactions are
                protected and your personal information is kept safe.
              </div>
            </div>
          </Col>
          <Col className="d-flex gap-3">
            <TbTruckDelivery size={50} />

            <div className="d-flex flex-column gap-3">
              <div className="fw-bold fs-5">Free Delivery Worldwide</div>
              <div>
                Enjoy free worldwide delivery on all orders, no matter where you
                are located.
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex gap-3">
            <MdHighQuality size={50} />
            <div className="d-flex flex-column gap-3">
              <div className="fw-bold fs-5">High Quality Materials</div>
              <div>
                We use only the finest materials in our products, ensuring that
                they are long-lasting and of the highest quality.
              </div>
            </div>
          </Col>
          <Col className="d-flex gap-3">
            <CiGift size={50} />
            <div className="d-flex flex-column gap-3">
              <div className="fw-bold fs-5">Send Gifts Easily</div>
              <div>
                Want to surprise someone special? Our site makes it easy to send
                a gift to your loved ones with just a few clicks.
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

const StyledDiv = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;

  & img {
    cursor: pointer;
    transition: 0.2s linear;
  }

  & img:hover {
    transform: scale(1.2);
  }
`;

export default Home;
