import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../../services/apiProducts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/ClipLoader";

function AdminProductForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const navigate = useNavigate();

  const { errors } = formState;

  const { mutate, status } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast.success("Product Created Successfully!");
      navigate("/products");
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
      reset();
    },
  });

  function onSubmitProduct(data) {
    console.log(data);

    const { productImages } = data;

    delete data.productImages;

    const formData = new FormData();

    for (let productImage of productImages) {
      formData.append("uploadedImages", productImage);
    }

    formData.append("productData", JSON.stringify(data));

    mutate(formData);
  }

  return (
    <div className="card me-4">
      <div className="card-body">
        <Form onSubmit={handleSubmit(onSubmitProduct)}>
          <Form.Group className="mb-3">
            <Row>
              <Col sm={3}>
                <Form.Label>
                  Title <span className="text-danger">* </span>
                </Form.Label>
              </Col>
              <Col sm={7}>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  {...register("title", {
                    required: "This Field Is Required",
                  })}
                  disabled={status === "pending"}
                />
                <span className="text-danger">{errors?.title?.message}</span>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col sm={3}>
                <Form.Label>
                  Brand <span className="text-danger">* </span>
                </Form.Label>
              </Col>
              <Col sm={7}>
                <Form.Control
                  type="text"
                  placeholder="Brand"
                  {...register("brand", {
                    required: "This Field Is Required",
                  })}
                  disabled={status === "pending"}
                />
                <span className="text-danger">{errors?.brand?.message}</span>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col sm={3}>
                <Form.Label>
                  Category <span className="text-danger">* </span>
                </Form.Label>
              </Col>
              <Col sm={7}>
                <Form.Control
                  type="text"
                  placeholder="Category"
                  {...register("category", {
                    required: "This Field Is Required",
                  })}
                  disabled={status === "pending"}
                />
                <span className="text-danger">{errors?.category?.message}</span>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col sm={3}>
                <Form.Label>
                  Description <span className="text-danger">* </span>
                </Form.Label>
              </Col>
              <Col sm={7}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Description"
                  {...register("description", {
                    required: "This Field Is Required",
                  })}
                  disabled={status === "pending"}
                />

                <span className="text-danger">{errors?.category?.message}</span>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col sm={3}>
                <Form.Label>
                  Discount Percentage <span className="text-danger">* </span>
                </Form.Label>
              </Col>
              <Col sm={7}>
                <Form.Control
                  type="number"
                  step={0.01}
                  placeholder="Discount Percentage"
                  {...register("discountPercentage", {
                    required: "This Field Is Required",
                  })}
                  disabled={status === "pending"}
                />
                <span className="text-danger">
                  {errors?.discountPercentage?.message}
                </span>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col sm={3}>
                <Form.Label>
                  Price <span className="text-danger">* </span>
                </Form.Label>
              </Col>
              <Col sm={7}>
                <Form.Control
                  type="number"
                  step={0.01}
                  placeholder="Price"
                  {...register("price", {
                    required: "This Field Is Required",
                  })}
                  disabled={status === "pending"}
                />
                <span className="text-danger">{errors?.price?.message}</span>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col sm={3}>
                <Form.Label>
                  Rating <span className="text-danger">* </span>
                </Form.Label>
              </Col>
              <Col sm={7}>
                <Form.Control
                  type="number"
                  step={0.01}
                  placeholder="Rating"
                  {...register("rating", {
                    required: "This Field Is Required",
                  })}
                  disabled={status === "pending"}
                />
                <span className="text-danger">{errors?.rating?.message}</span>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col sm={3}>
                <Form.Label>
                  Stock <span className="text-danger">* </span>
                </Form.Label>
              </Col>
              <Col sm={7}>
                <Form.Control
                  type="number"
                  placeholder="Stock"
                  {...register("stock", {
                    required: "This Field Is Required",
                  })}
                  disabled={status === "pending"}
                />
                <span className="text-danger">{errors?.stock?.message}</span>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col sm={3}>
                <Form.Label>Thumbnail</Form.Label>
              </Col>
              <Col sm={7}>
                <Form.Control
                  type="text"
                  placeholder="Thumbnail"
                  {...register("thumbnail", {
                    required: false,
                  })}
                  disabled={status === "pending"}
                />
              </Col>
              <span className="text-danger">{errors?.thumbnail?.message}</span>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col sm={3}>
                <Form.Label>
                  Product Images
                  {/* <span className="text-danger">* </span> */}
                </Form.Label>
              </Col>
              <Col sm={7}>
                <Form.Control
                  type="file"
                  multiple
                  {...register("productImages", {
                    required: false,
                  })}
                  disabled={status === "pending"}
                />
                <span className="text-danger">
                  {errors?.productImages?.message}
                </span>
              </Col>
            </Row>
          </Form.Group>

          <div>
            <Button
              variant="warning"
              type="submit"
              disabled={status === "pending"}
            >
              {status === "pending" ? (
                <div className="d-flex align-items-center gap-1 justify-content-center">
                  <ClipLoader color="white" size={20} />
                  <span>Creating...</span>
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AdminProductForm;
