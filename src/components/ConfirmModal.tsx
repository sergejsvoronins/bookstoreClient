import { Modal, Button } from "react-bootstrap";

interface IConfirmModal {
  openConfirmModal: boolean;
  closeConfirmModal: () => void;
  action: () => void;
}

export function ConfirmModal({
  openConfirmModal,
  closeConfirmModal,
  action,
}: IConfirmModal) {
  return (
    <Modal show={openConfirmModal} onHide={closeConfirmModal}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>{`Är du säker?`}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeConfirmModal}>
          Avbryt
        </Button>
        <Button variant="danger" onClick={action}>
          Radera
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
