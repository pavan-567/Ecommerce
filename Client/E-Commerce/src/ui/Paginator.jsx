import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";

function Paginator({ pages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(() =>
    searchParams.get("page") === null ? 1 : +searchParams.get("page")
  );

  console.log(searchParams.get("page"), active);

  let items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        onClick={(e) => {
          let num = +e.target.innerText;

          if (num === 1) {
            searchParams.delete("page");
            setSearchParams(searchParams);
          } else
            setSearchParams((params) => {
              params.set("page", e.target.innerText);
              return params;
            });

          setActive(num);

          console.log(active, num);
        }}
        key={number}
        active={number === active}
        disabled={number === +active}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination size="md" className="justify-content-center mt-5">
      <Pagination.First
        onClick={() => {
          setSearchParams((params) => {
            params.delete("page");
            return params;
          });
          setActive(1);
        }}
      />
      <Pagination.Prev
        disabled={active === 1}
        onClick={() => {
          setSearchParams((params) => {
            params.set("page", active - 1);
            return params;
          });
          setActive((num) => num - 1);
        }}
      />
      {items}
      <Pagination.Next
        onClick={() => {
          setSearchParams((params) => {
            params.set("page", active + 1);
            return params;
          });
          setActive((num) => num + 1);
        }}
        disabled={active === pages}
      />
      <Pagination.Last
        onClick={() => {
          setSearchParams((params) => {
            params.set("page", pages);
            return params;
          });
          setActive(pages);
        }}
      />
    </Pagination>
  );
}

export default Paginator;
