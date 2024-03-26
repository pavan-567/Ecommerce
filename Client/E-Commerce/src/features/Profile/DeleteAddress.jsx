import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteAddress } from "../../services/apiAddress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function DeleteAddress({ id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteAddress,
    onSuccess: (data) => {
      toast.success("Deleted The Address Successfully!");
      queryClient.invalidateQueries(["address"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleDelete() {
    mutate(id);
    handleClose();
  }

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure You Want To Delete The Item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteAddress;
