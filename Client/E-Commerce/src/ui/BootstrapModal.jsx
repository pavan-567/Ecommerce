import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

function BootstrapModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit } = useForm();

  function onSubmitForm(data) {
    const { mode } = data;
    console.log(mode);
    handleClose();
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Paymnet Mode
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Payment Mode</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            {/* CASH OR CARD MODE */}
            Select 2 Modes
            <div>
              <Form.Check
                inline
                label="Cash"
                name="mode"
                value="cash"
                type="radio"
                id={`inline-radio-1`}
                {...register("mode", {
                  required: "This Field Is Required",
                })}
              />
            </div>
            <div>
              <Form.Check
                inline
                label="Card"
                name="mode"
                type="radio"
                value="card"
                id={`inline-radio-2`}
                {...register("mode", {
                  required: "This Field Is Required",
                })}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default BootstrapModal;
