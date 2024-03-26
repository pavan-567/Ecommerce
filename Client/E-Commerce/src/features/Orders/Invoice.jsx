import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder } from "./OrderSlice";
import { FaFileInvoice } from "react-icons/fa";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";

function Invoice() {
  const { id } = useParams();
  const order = useSelector(getOrder(id));
  const email = useSelector((store) => store.user.userDetails?.email);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const handleDownloadPDF = () => {
    const input = document.getElementById("pdf-content");
    // Specify the id of the element you want to convert to PDF
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "em", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
      const imgX = (pdfWidth - imageWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imageWidth * ratio,
        imageHeight * ratio
      );
      pdf.save(`Invoice-${order.id}.pdf`);
    });
  };

  const { shipments } = order;
  const { cartItems } = order;

  return (
    <div className="min-vh-100 d-flex flex-column gap-4">
      <section
        className="py-3 py-md-3 border vh-100"
        ref={printRef}
        id="pdf-content"
      >
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex flex-column gap-5">
              <div className="row gy-3 mb-3">
                <div className="col">
                  <div className="text-uppercase fw-medium fs-4 text-center mb-4">
                    Invoice - {order.id}
                  </div>
                  <hr />
                </div>
                {/* <div className="col-12">
                  <h4>From</h4>
                  <address>
                    <strong>BootstrapBrain</strong>
                    <br />
                    875 N Coast Hwybr
                    <br />
                    Laguna Beach, California, 92651
                    <br />
                    United States
                    <br />
                    Phone: (949) 494-7695
                    <br />
                    Email: email@domain.com
                  </address>
                </div> */}
              </div>
              <div className="row mb-3">
                <div className="col-12 col-sm-6 col-md-8">
                  <h4>To</h4>
                  <address>
                    <strong>{shipments.fullName}</strong>
                    <br />
                    {shipments.address}
                    <br />
                    {shipments.city}
                    <br />
                    {shipments.state}, {shipments.zipCode}
                    <br />
                    Phone: {shipments.mobile}
                    <br />
                    Email: {email}
                    <br />
                    Status :{" "}
                    <span
                      className={`fw-bold text-uppercase ${
                        order.paymentStatus === "paid"
                          ? "text-success"
                          : "text-primary"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </address>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <h4 className="row">
                    <span className="col-12 text-sm-end">From</span>
                  </h4>
                  <div className="row">
                    <span className="col-12 text-sm-end">G-Shop</span>
                    <span className="col-12 text-sm-end">406,MSM Arcade</span>

                    <span className="col-12 text-sm-end">JNTU, Hyderabad</span>

                    <span className="col-12 text-sm-end">8555925312</span>
                    <span className="col-12 text-sm-end">
                      pavanram425@gmail.com
                    </span>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="text-uppercase">
                            ID
                          </th>
                          <th scope="col" className="text-uppercase">
                            Name
                          </th>
                          <th scope="col" className="text-uppercase text-end">
                            Price
                          </th>
                          <th scope="col" className="text-uppercase text-end">
                            Qty
                          </th>
                          <th scope="col" className="text-uppercase text-end">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        {cartItems.map((item) => (
                          <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.title}</td>
                            <td className="text-end">
                              ${item.discountedPrice}
                            </td>
                            <td className="text-end">{item.quantity}</td>
                            <td className="text-end">
                              ${item.discountedPrice * item.quantity}
                            </td>
                          </tr>
                        ))}

                        <tr>
                          <td colSpan="4" className="text-end">
                            Subtotal
                          </td>
                          <td className="text-end">${order.discountedPrice}</td>
                        </tr>
                        {/* <tr>
                          <td colSpan="4" className="text-end">
                            VAT (5%)
                          </td>
                          <td className="text-end">18.1</td>
                        </tr> */}
                        <tr>
                          <td colSpan="4" className="text-end">
                            Shipping
                          </td>
                          <td className="text-end">0</td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan="4"
                            className="text-uppercase text-end"
                          >
                            Total
                          </th>
                          <td className="text-end">${order.discountedPrice}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="d-flex justify-content-center">
        <div className="row">
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary mb-3"
              // onClick={handlePrint}
              onClick={handleDownloadPDF}
            >
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
