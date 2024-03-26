import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { deleteProductImage } from "../services/apiProducts";
import toast from "react-hot-toast";

function DeleteProductModal({ productImageId, productId }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteProductImage,
    onSuccess: () => {
      toast.success("Image Deleted Successfully!");
      queryClient.invalidateQueries(["product", productId]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <>
      <AiOutlineClose
        className="button-close"
        fill="red"
        style={{ top: 3, position: "absolute", right: 7 }}
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure You Want To Delete The Image?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              mutate(productImageId);
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteProductModal;
