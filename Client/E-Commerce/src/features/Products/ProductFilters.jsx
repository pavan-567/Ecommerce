import Dropdown from "react-bootstrap/Dropdown";

function ProductFilters({ searchParams, handleParams, categories }) {
  return (
    <div className="d-flex gap-3">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter Options
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleParams("")}>None</Dropdown.Item>
          <Dropdown.Item onClick={() => handleParams({ sort: "-rating" })}>
            Sort By Highest Ratings
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleParams({ sort: "price" })}>
            Price - Low To High
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleParams({ sort: "-price" })}>
            Price - High To Low
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle variant="danger" id="dropdown-cateogry">
          Select Category
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {categories.map((category, idx) => (
            <Dropdown.Item
              key={idx}
              // onClick={(e) => handleParams({ category: e.target.value })}
              onClick={() =>
                handleParams((params) => {
                  params.set("category", category);
                  return params;
                })
              }
            >
              {category}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default ProductFilters;
