import { Modal, Button } from "react-bootstrap";
import { deleteBook } from "../transport/books";
import { useNavigate } from "react-router-dom";

interface IConfirmModal {
  bookId: number;
  openConfirmModal: boolean;
  closeConfirmModal: () => void;
}

export function ConfirmModal({
  bookId,
  openConfirmModal,
  closeConfirmModal,
}: IConfirmModal) {
  const navigate = useNavigate();
  const removeBook = async () => {
    try {
      const response = await deleteBook(bookId);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
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
