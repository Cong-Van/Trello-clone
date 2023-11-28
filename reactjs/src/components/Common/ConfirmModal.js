import { MODAL_ACTION_CLOSE, MODAL_ACTION_DELETE } from "../../utils/constant";

import "./ConfirmModal.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmModal({ title, content, show, onAction }) {
  return (
    <div className={`modal ${show ? "show" : "hidden"}`}>
      <Modal.Dialog>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => onAction(MODAL_ACTION_CLOSE)}
          ></button>
        </div>

        <Modal.Body>
          <p>{content}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => onAction(MODAL_ACTION_CLOSE)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => onAction(MODAL_ACTION_DELETE)}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ConfirmModal;
