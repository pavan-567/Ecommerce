import Row from "react-bootstrap/esm/Row";
import useFetchProducts from "../../hooks/useFetchProducts";
import ProductItem from "./ProductItem";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Paginator from "../../ui/Paginator";
import Loader from "../../ui/Loader";
import styled from "styled-components";
import { useState } from "react";
import MessagePage from "../../ui/MessagePage";

function ProductList({ view }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    isFetching,
    isError,
    isFetched,
    error,
    products: totalProducts,
  } = useFetchProducts({
    searchParams,
  });

  if (isFetching) return <Loader />;
  if (isError) return <p>{error.message}</p>;

  const { products, pages } = totalProducts;

  if (products.length <= 0)
    return (
      <MessagePage message={"No Products Found"} vh={false} home={false} />
    );

  return (
    <div>
      <GridContainer view={view}>
        {products.map((product, idx) => (
          <ProductItem product={product} key={idx} view={view} />
        ))}
      </GridContainer>
      <Paginator pages={pages} />
    </div>
  );
}

const GridContainer = styled.div`
  display: grid;
  gap: 20px;
  place-items: ${(props) => (props.view === "item" ? "center" : "start")};
  grid-template-columns: ${(props) =>
    props.view === "item" ? "repeat(3, 1fr)" : "minmax(0, 1fr)"};

  @media screen and (max-width: 1400px) {
    grid-template-columns: ${(props) =>
      props.view === "item" ? "repeat(2, 1fr)" : "minmax(0, 1fr)"};
  }

  @media screen and (max-width: 728px) {
    grid-template-columns: 1fr;
  }
`;

export default ProductList;
