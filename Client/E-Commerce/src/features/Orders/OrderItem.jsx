import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../utils/dates";
import CartCanvasItems from "../../ui/CartCanvasItems";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function OrderItem({ order }) {
  const navigate = useNavigate();

  return (
    <div className="mt-3">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <div className="d-flex gap-4">
            <div className="d-flex flex-column justify-content-center">
              <div style={{ color: "#878e8d" }}>ORDER PLACED</div>
              <div>{formatDate(order.created_at)}</div>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <div style={{ color: "#878e8d" }}>TOTAL</div>
              <div>${order.discountedPrice}</div>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <div style={{ color: "#878e8d" }}>SHIPPING TO</div>
              <div>{order.shipments.address}</div>
            </div>
          </div>
          <div style={{ color: "#878e8d" }}>
            #order : {order.id.toUpperCase()}
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">
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
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            Order Detail
          </button>
          <button
            className="btn btn-warning"
            onClick={() => navigate(`/invoice/${order.id}`)}
          >
            Invoice
          </button>
        </div>
      </div>
      {/*  */}
    </div>
  );
}

export default OrderItem;
