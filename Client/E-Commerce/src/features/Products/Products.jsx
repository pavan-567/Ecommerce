import ProductQuery from "./ProductQuery";
import ProductList from "./ProductList";

import { fetchProducts } from "../../services/apiProducts";
import { useDispatch } from "react-redux";
import { addProducts } from "./productSlice";
import { useEffect, useState } from "react";

import {
  Bars,
  Circles,
  Grid,
  Hearts,
  Oval,
  Puff,
  Rings,
  SpinningCircles,
  TailSpin,
  ThreeDots,
} from "react-loading-icons";
import ScaleLoader from "react-spinners/ScaleLoader";
import Loader from "../../ui/Loader";
import styled from "styled-components";
import ProductHeader from "./ProductHeader";

function Products() {
  const dispatch = useDispatch();
  const [view, setView] = useState("item");

  useEffect(() => {
    async function fetchAllProducts() {
      const products = await fetchProducts();
      dispatch(addProducts(products));
    }

    fetchAllProducts();
  }, [dispatch]);

  return (
    <>
      <ProductHeader handleView={setView} view={view} />
      <StyledDiv>
        <ProductQuery />
        <ProductList view={view} />
      </StyledDiv>
    </>
  );
}

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  gap: 20px;
  @media screen and (max-width: 1010px) {
    grid-template-columns: 1fr;
    margin-end: 10px;
  }
`;

export async function loader() {}

export default Products;
