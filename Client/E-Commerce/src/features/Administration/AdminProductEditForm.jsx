import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import React from "react";
import DeleteProductModal from "../../ui/DeleteProductModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct } from "../../services/apiProducts";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/ClipLoader";

function AdminProductEditForm({ product }) {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: product,
  });
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: editProduct,
    onSuccess: (data) => {
      toast.success("Product Edited Successfully!");
      queryClient.invalidateQueries(["products", {}]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmitEditProduct(data) {
    const { productImages } = data;
    console.log(productImages);
    delete data.productImages;
    delete data.images;
    delete data.created_at;
    delete data.updated_at;
    delete data.isInStock;

    console.log(data);

    const formData = new FormData();

    for (let productImage of productImages) {
      formData.append("uploadedImages", productImage);
    }

    formData.append("productData", JSON.stringify(data));

    mutate({ id: product.id, formData });
  }

  return (
    <div className="card me-4 my-4">
      <div className="card-body">
        <Form onSubmit={handleSubmit(onSubmitEditProduct)}>
          <Form.Group className="mb-3">
            <Row>
              <Col sm={3}>
                <Form.Label>
                  Id <span className="text-danger">* </span>
                </Form.Label>
              </Col>
              <Col sm={7}>
                <Form.Control
                  type="text"
                  placeholder="Id"
                  {...register("id", { required: true })}
                  disabled
                />
              </Col>
            </Row>
          </Form.Group>

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
                <Form.Select
                  aria-label="Default select example"
                  {...register("thumbnail", {
                    required: "False",
                  })}
                  disabled={status === "pending"}
                  defaultValue={product.thumbnail}
                >
                  <option>--------</option>
                  {product.images.map((prod) => (
                    <option
                      value={prod.image_url}
                      key={prod.id}
                      style={{ backgroundImage: `url(${prod.image_url})` }}
                    >
                      {prod.image_url}
                    </option>
                  ))}
                </Form.Select>
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

          <Form.Group className="mb-3">
            <Row>
              <Col sm={3}>Existing Product Images</Col>
              <Col sm={7}>
                <StyledDiv className="d-flex align-items-center gap-3 flex-wrap">
                  {product.images.map((prod, idx) => (
                    <div key={idx} className="position-relative">
                      <img
                        src={prod.image_url}
                        width={100}
                        height={100}
                        className="rounded object-fit-cover"
                      />

                      <DeleteProductModal
                        productImageId={prod.id}
                        productId={product.id}
                      />
                    </div>
                  ))}
                </StyledDiv>
              </Col>
            </Row>
          </Form.Group>

          <div className="d-flex gap-2 align-items-center">
            <Button variant="warning" type="submit">
              {status === "pending" ? (
                <div className="d-flex align-items-center gap-1 justify-content-center">
                  <ClipLoader size={20} color="white" />
                  <span>Editing...</span>
                </div>
              ) : (
                "Edit"
              )}
            </Button>

            <Button
              variant="outline-danger"
              className="d-flex align-items-center gap-2"
              onClick={() => navigate("/admin/products")}
            >
              <FaArrowCircleLeft /> Go Back
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

const StyledDiv = styled.div`
  & img,
  .button-close {
    transition: 0.2s linear;
  }
  & .button-close {
    cursor: pointer;
  }

  & img:hover {
    transform: scale(1.2);
  }

  & img:hover + .button-close {
    transform: translateX(5px) scale(1.5);
    /* transform: scale(1.5); */
    /* transform: translate(14px, -10px); */
  }
`;

export default AdminProductEditForm;
