import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { getFirstCategoryProduct } from "../features/Products/productSlice";

import { useNavigate, useSearchParams } from "react-router-dom";

function HomeProduct({ category }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const product = useSelector(getFirstCategoryProduct(category));
  return (
    <Card style={{ height: "350px", position: "relative", overflow: "hidden" }}>
      <Card.Img
        variant="top"
        src={product.thumbnail}
        className="object-fit-cover h-100"
        onClick={() => {
          navigate("/products");
          setSearchParams((params) => {
            params.set("category", category);
            return params;
          });
        }}
      />
      <div
        className="position-absolute p-2"
        style={{
          top: 10,
          left: 15,
          fontWeight: "700",
          backgroundColor: "#D9AFD9",
          backgroundImage: "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
          borderRadius: "40px",
          fontSize: "12px",
          color: "black",
        }}
      >
        {category.toUpperCase()}
      </div>
      {/* <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body> */}
    </Card>
  );
}

export default HomeProduct;
