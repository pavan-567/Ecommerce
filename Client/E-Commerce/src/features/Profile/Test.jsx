import Button from "react-bootstrap/esm/Button";
import useFetchAddress from "../../hooks/useFetchAddress";
import TestItem from "./TestItem";
import { Link, NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loader from "../../ui/Loader";
import MessagePage from "../../ui/MessagePage";

function Test() {
  const { address, isFetching, isError, error } = useFetchAddress();

  if (isFetching) return <Loader height="yes" />;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <div className="mt-3">
        <Row>
          <Col>
            <div className="d-flex align-items-center justify-content-between border p-3">
              <div className="fw-bold fs-4">Address List</div>
              <Link className="btn btn-success" to="add">
                Add New Address
              </Link>
            </div>
            <hr />
            <div>
              {address.length > 0 ? (
                address.map((addr) => <TestItem address={addr} key={addr.id} />)
              ) : (
                <MessagePage
                  message="No Saved Addresses!"
                  vh={false}
                  home={false}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Test;
