import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedAddress, selectAddress } from "../Address/addressSlice";
import { GiCheckMark } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress, makeAddressDefault } from "../../services/apiAddress";
import toast from "react-hot-toast";
import DeleteAddress from "./DeleteAddress";

function TestItem({ address: userAddress }) {
  const {
    address,
    fullName,
    city,
    country,
    landmark,
    mobile,
    zipCode,
    state,
    id,
  } = userAddress;

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const selectedAddr = useSelector(getSelectedAddress());

  const { mutate: setDefaultAddr } = useMutation({
    mutationFn: makeAddressDefault,
    onSuccess: (data) => {
      toast.success("Default Address Set!");
      queryClient.invalidateQueries(["address"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <Card className="mt-3">
      <Card.Header className="d-flex justify-content-between">
        <div>Address</div>
        {id === selectedAddr && (
          <div
            className="d-flex align-items-center gap-2"
            style={{ fontSize: "16px" }}
          >
            <span className={`fw-bold`}>Default Address</span>
            <GiCheckMark className="text-success" />
          </div>
        )}
      </Card.Header>
      <Card.Body>
        <Row>
          <Col sm={8}>
            <Card.Title
              as="h5"
              className={`${id === selectedAddr ? "text-warning" : ""} fw-bold`}
            >
              {fullName}
            </Card.Title>
            <Card.Text as="div">
              <div>
                <p>{address}</p>
                <p>
                  {city} {state} {zipCode}
                </p>
                <p>{country}</p>
              </div>
              <div>Phone : {mobile}</div>
            </Card.Text>
          </Col>
          <Col sm>
            <div className="d-flex flex-column gap-2">
              <Link className="btn btn-warning" to={`edit/${id}`}>
                Edit
              </Link>
              <DeleteAddress id={id} />

              <Button
                variant="info"
                disabled={id === selectedAddr}
                onClick={() => {
                  dispatch(selectAddress(id));
                  setDefaultAddr(id);
                }}
              >
                Set as Default
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
      {/* <Card.Footer>Footer</Card.Footer> */}
    </Card>
  );
}

export default TestItem;
