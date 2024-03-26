import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import ProductFilters from "./ProductFilters";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-dropdown-select";
import Star from "../../ui/Star";
import styled from "styled-components";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

function ProductQuery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useSelector((store) => store.products);
  const categories = new Set(products?.map((product) => product?.category));

  const { register, handleSubmit, reset } = useForm();

  let category = searchParams.get("category", "") ?? "";
  if (category.split(",")[0] === "") {
    category = [];
  } else {
    category = category.split(",");
  }

  return (
    <StyledDiv>
      {/*  */}
      <div className="border px-4 py-3">
        <div className="fs-3">Filters</div>
        <div
          onClick={() => {
            setSearchParams("");
            reset();
          }}
        >
          Clear
        </div>
        <hr />
        <div className="mt-2">
          <div className="fs-4 my-2">Category</div>
          {Array.from(categories).map((c, idx) => (
            <div key={idx}>
              <div className="form-check">
                <input
                  defaultChecked={category.includes(c)}
                  className="form-check-input"
                  type="checkbox"
                  value={c}
                  id={`flexCheckDefault-${idx}`}
                  onClick={(e) =>
                    setSearchParams((params) => {
                      if (e.target.checked)
                        params.set(
                          "category",
                          [...category, e.target.value].toString()
                        );
                      else {
                        const idx = category.indexOf(e.target.value);
                        if (idx > -1) category.splice(idx, 1);

                        if (category.length == 0) params.delete("category");
                        else params.set("category", category.toString());
                      }
                      return params;
                    })
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor={`flexCheckDefault-${idx}`}
                >
                  {c}
                </label>
              </div>
            </div>
          ))}
        </div>
        {/* Rating Filter */}
        {/* <div className="mt-2">
          <div className="fs-4">Rating</div>
          {[5, 4, 3, 2, 1].map((star, idx) => (
            <div className="form-check" key={idx}>
              <input
                className="form-check-input"
                type="radio"
                defaultValue={star}
                id={`flexCheckDefault`}
                name="radio"
                onClick={(e) => {
                  console.log(e.target.value);
                  setSearchParams((params) => {
                    params.set("rating", e.target.value);
                    return params;
                  });
                }}
              />
              <label className="form-check-label" htmlFor={`flexCheckDefault`}>
                <Star stars={star} displayNum={false} />
              </label>
            </div>
          ))}
        </div> */}
        <div className="mt-2">
          <div className="fs-4">Price</div>
          <Form
            className="d-flex gap-2"
            onSubmit={handleSubmit((data) => {
              const { min, max } = data;
              setSearchParams((params) => {
                if (min) params.set("min", min);
                if (max) params.set("max", max);
                return params;
              });
            })}
          >
            <input
              type="number"
              placeholder="Min($)"
              className="form-control"
              id=""
              {...register("min", { required: false })}
            />
            <input
              type="number"
              placeholder="Max($)"
              className="form-control"
              id=""
              {...register("max", { required: false })}
            />
            <Button variant="warning" type="submit">
              Go
            </Button>
          </Form>
        </div>
      </div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: 300px;

  @media screen and (max-width: 1010px) {
    display: none;
  }
`;

export default ProductQuery;
