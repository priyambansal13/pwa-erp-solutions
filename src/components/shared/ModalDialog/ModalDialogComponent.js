import React from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./modalDialogComponent.scss";
function ModalDialogComponent(props) {
  // const [show, setShow] = useState(false);

  return (
    <>
      {/* <Button variant="primary" onClick={() => props.closeModal()}>
        Custom Width Modal
      </Button> */}

      <Modal
        size="lg"
        show={props.show}
        onHide={() => props.closeModal()}
        // dialogClassName="modal-90w"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            User Details{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <pre>{props.userDetails}</pre>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ModalDialogComponent;
