import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function ProductOptions({ sort, handleSort }) {
  return (
    <FloatingLabel controlId="floatingSelect" label="Options">
      <Form.Select
        aria-label="Floating label select example"
        defaultValue={sort}
        onChange={(e) => {
          handleSort(e.target.value);
        }}
      >
        <option value="">None</option>
        <option value="rating">Best Rating</option>
        <option value="low">Price : Low To High</option>
        <option value="high">Price : High To Low</option>
      </Form.Select>
    </FloatingLabel>
  );
}

export default ProductOptions;
