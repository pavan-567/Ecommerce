import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/esm/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function ProductHeader({ view, handleView }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  return (
    <div className="d-flex border p-4 justify-content-between align-items-center mb-5 mt-3">
      <div className="">
        <InputGroup className="">
          <Form.Control
            placeholder="Search"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroup.Text
            id="basic-addon2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSearchParams((params) => {
                if (search != "") params.set("search", search);
                return params;
              });
              setSearch("");
            }}
          >
            <FaSearch size={30} />
          </InputGroup.Text>
        </InputGroup>
        {/* <input
          type="text"
          name=""
          id=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
          placeholder="search"
        /> */}
      </div>
      <div>
        <Dropdown as={ButtonGroup}>
          <Button variant="outline">
            {view === "item" ? "Item View" : "List View"}
          </Button>

          <Dropdown.Toggle split variant="outline" id="dropdown-split-basic" />

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleView("item")}>
              Item View
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleView("list")}>
              List View
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        <DropdownButton
          variant=""
          className="border"
          id="dropdown-basic-button"
          title="Filters"
        >
          <Dropdown.Item onClick={() => setSearchParams("")}>
            None
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>
              setSearchParams((params) => {
                params.set("sort", "-rating");
                return params;
              })
            }
          >
            Sort By Ratings
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>
              setSearchParams((params) => {
                params.set("sort", "price");
                return params;
              })
            }
          >
            Price Low To High
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>
              setSearchParams((params) => {
                params.set("sort", "-price");
                return params;
              })
            }
          >
            Price High To Low
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
}

export default ProductHeader;
