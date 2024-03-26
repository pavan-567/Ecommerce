// import CartCanvasItems from "../ui/CartCanvasItems";
// import Col from "react-bootstrap/esm/Col";
// import Row from "react-bootstrap/esm/Row";
// import { formatDate } from "../utils/dates";
// import { useSelector } from "react-redux";

// function AdminOrderItem({ order: currOrder }) {
//   const username = useSelector((store) => store.user.userDetails?.username);
//   return (
//     <div className="mt-3" key={currOrder.id}>
//       <div className="card">
//         <div
//           className="card-header d-flex justify-content-between align-items-center"
//           style={{ color: "#878e8d" }}
//         >
//           <div className="d-flex gap-4" style={{ fontSize: "13px" }}>
//             <div className="d-flex flex-column justify-content-center">
//               <div>USER</div>
//               <div className="text-black">{username}</div>
//             </div>
//             <div className="d-flex flex-column justify-content-center">
//               <div>ORDER PLACED</div>
//               <div className="text-black">
//                 {formatDate(currOrder.created_at)}
//               </div>
//             </div>
//             <div className="d-flex flex-column justify-content-center">
//               <div>TOTAL</div>
//               <div className="text-black">${currOrder.discountedPrice}</div>
//             </div>
//             <div className="d-flex flex-column justify-content-center">
//               <div>SHIPPING TO</div>
//               <div className="text-black">{currOrder.shipments.address}</div>
//             </div>
//           </div>
//           <div>#Order : {currOrder.id.toUpperCase()}</div>
//         </div>
//         <div className="card-body">
//           <h5 className="card-title">
//             Status :{" "}
//             {currOrder.orderStatus === "processing" ? (
//               <span className="text-danger">PROCESSING</span>
//             ) : (
//               <>
//                 {currOrder.orderStatus === "shipped" ? (
//                   <span className="text-warning">SHIPPED</span>
//                 ) : (
//                   <span className="text-success">
//                     DELIVERED ON {formatDate(currOrder.updated_at)}
//                   </span>
//                 )}
//               </>
//             )}
//           </h5>
//           <div className="card-text">
//             <div>Your Items</div>
//             <Row>
//               <Col>
//                 <CartCanvasItems
//                   cartItems={currOrder.cartItems}
//                   mode="display"
//                 />
//               </Col>
//             </Row>
//           </div>
//         </div>
//         <div className="card-footer d-flex gap-3">
//           <button className="btn btn-warning">Edit Order</button>
//           <button className="btn btn-warning">Delete Order</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminOrderItem;
