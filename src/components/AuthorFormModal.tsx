import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import {
  NewAuthor,
  addAuthor,
  getOneAuthor,
  updateAuthor,
} from "../transport/books";
import { useState, useEffect } from "react";

interface IModal {
  id?: number | null;
  openModal: boolean;
  closeModal: () => void;
  setId?: (id: number | null) => void;
  setAlertMessage: (message: string) => void;
}
export function AuthorFormModal({
  openModal,
  closeModal,
  setAlertMessage,
  id,
  setId,
}: IModal) {
  const [author, setAuthor] = useState<NewAuthor>({ name: "" });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const getAuthor = async () => {
      if (id) {
        try {
          let response = await getOneAuthor(id);
          setAuthor(response);
        } catch (e) {
          console.log(e);
        }
      }
    };
    getAuthor();
  }, [id]);
  console.log(author);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      if (!id) {
        const response = await addAuthor(author);
        setAlertMessage(`Kategori med ID: ${response?.id} har skapats`);
      } else {
        const response = await updateAuthor(author);
        if (response) {
          setAlertMessage(`Kategori med ID: ${id} har blivit uppdaterad`);
        }
      }
      setAuthor({ name: "" });
      closeModal();
    }
  };
  return (
    <Modal
      show={openModal}
      onHide={() => {
        setAuthor({ name: "" });
        closeModal();
        setId && setId(null);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {id ? "Uppdatera information" : "Skapa en ny kategory"}
        </Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              xs="12"
              className="py-3"
              controlId="validationTitle"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                isValid={!!id}
                onChange={(e) => setAuthor({ ...author, name: e.target.value })}
                value={author.name}
              />
              <Form.Control.Feedback type="invalid">
                Ange name
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Spara</Button>
          <Button
            variant="secondary"
            onClick={() => {
              closeModal();
              setAuthor({ name: "" });
            }}
          >
            Stäng
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
