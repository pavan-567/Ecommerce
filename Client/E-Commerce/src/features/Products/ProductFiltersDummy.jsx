import { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

function ProductFiltersDummy({ categories, filters, addFilter }) {
  const [collapse, setCollapse] = useState(true);
  return (
    <Form>
      <div>
        <div id="category__label" className="d-flex justify-content-between">
          <p>Category</p>
          <p
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
            onClick={() => setCollapse((val) => !val)}
          >
            {collapse ? "-" : "+"}
          </p>
        </div>
        <div className="collapse show" id="collapseExample">
          {categories.map((category, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              defaultChecked={filters.includes("category")}
              id={`default-${category}`}
              label={`${category}`}
              onChange={(e) => {
                if (e.target.checked)
                  addFilter((filters) => [...filters, category]);
                else
                  addFilter((filters) =>
                    filters.filter((filter) => filter !== category)
                  );
              }}
            />
          ))}
        </div>
      </div>
    </Form>
  );
}

export default ProductFiltersDummy;
