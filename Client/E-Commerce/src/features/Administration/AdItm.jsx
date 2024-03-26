// import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dates";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import CartCanvasItems from "../../ui/CartCanvasItems";
import { useNavigate } from "react-router-dom";

function AdItm({ order }) {
  // const username = useSelector((store) => store.user.userDetails?.username);
  const navigate = useNavigate();
  // if (username === order.username) return <></>;
  return (
    <div className="mt-3 me-3" key={order.id}>
      <div className="card">
        <div className="card-header d-md-flex justify-content-between">
          <div className="d-md-flex gap-4" style={{ fontSize: "13px" }}>
            <div className="d-md-flex flex-column">
              <div style={{ color: "#878e8d" }}>USER</div>
              <div className="">{order.username}</div>
            </div>
            <div className="d-md-flex flex-column ">
              <div style={{ color: "#878e8d" }}>ORDER PLACED</div>
              <div className="">{formatDate(order.created_at)}</div>
            </div>
            <div className="d-md-flex flex-column ">
              <div style={{ color: "#878e8d" }}>TOTAL</div>
              <div className="">${order.discountedPrice}</div>
            </div>
            <div className="d-md-flex flex-column ">
              <div style={{ color: "#878e8d" }}>SHIPPING TO</div>
              <div className="">{order.shipments.address}</div>
            </div>
          </div>
          <div> #Order : {order.id.toUpperCase()}</div>
        </div>
        <div className="card-body">
          <h5 className="card-title">
            Status :{" "}
            {order.orderStatus === "processing" ? (
              <span className="text-primary">PROCESSING</span>
            ) : (
              <>
                {order.orderStatus === "shipped" ? (
                  <span className="text-warning">SHIPPED</span>
                ) : (
                  <>
                    {order.orderStatus === "delivered" ? (
                      <span className="text-success">
                        DELIVERED ON {formatDate(order.deliveryDate)}
                      </span>
                    ) : (
                      <>
                        {order.orderStatus === "cancelled" ? (
                          <span className="text-danger">Delivery Failed</span>
                        ) : (
                          <span className="text-info">Out For Delivery</span>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </h5>
          <div className="card-text">
            <div>Your Items</div>
            <Row>
              <Col>
                <CartCanvasItems cartItems={order.cartItems} mode="display" />
              </Col>
            </Row>
          </div>
        </div>
        <div className="card-footer d-flex gap-3">
          <button
            className="btn btn-warning"
            onClick={() => navigate(`${order.id}`)}
          >
            Edit Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdItm;
