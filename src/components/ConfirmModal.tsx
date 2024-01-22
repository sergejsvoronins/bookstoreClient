import { Modal, Button } from "react-bootstrap";
import { deleteBook } from "../transport/books";
import { useNavigate } from "react-router-dom";

interface IConfirmModal {
  bookId: number;
  openConfirmModal: boolean;
  closeConfirmModal: () => void;
  onConfirm: () => void;
  setAlertMessage: (message: string) => void;
}

export function ConfirmModal({
  bookId,
  openConfirmModal,
  closeConfirmModal,
  onConfirm,
  setAlertMessage,
}: IConfirmModal) {
  const navigate = useNavigate();
  const removeBook = async () => {
    try {
      const response = await deleteBook(bookId);
      navigate("/admin/books");
    } catch (e) {
      console.log(e);
    }
    setAlertMessage(`Boken med ID: ${bookId} är borttagen`);
    onConfirm();
  };
  return (
    <Modal show={openConfirmModal} onHide={closeConfirmModal}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>Är du säker vill ta bort boken?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeConfirmModal}>
          Avbryt
        </Button>
        <Button variant="danger" onClick={removeBook}>
          Radera
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
