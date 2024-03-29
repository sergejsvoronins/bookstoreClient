import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  NewCategory,
  getCategoryBooks,
  addCategory,
  updateCategory,
} from "../transport/categories";

interface IModal {
  id?: number | null;
  openModal: boolean;
  closeModal: () => void;
  setId?: (id: number | null) => void;
  setAlertMessage: (message: string) => void;
}
export function CategoryFormModal({
  openModal,
  closeModal,
  setAlertMessage,
  id,
  setId,
}: IModal) {
  const [category, setCategory] = useState<NewCategory>({ name: "" });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      if (id) {
        try {
          let response = await getCategoryBooks(id);
          setCategory(response);
        } catch (e) {
          console.log(e);
        }
      }
    };
    getCategory();
  }, [id]);

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
        const response = await addCategory(category);
        setAlertMessage(`Kategori med ID: ${response?.id} har skapats`);
      } else {
        const response = await updateCategory(category);
        if (response) {
          setAlertMessage(`Kategori med ID: ${id} har blivit uppdaterad`);
        }
      }
      setCategory({ name: "" });
      closeModal();
    }
  };
  return (
    <Modal
      show={openModal}
      onHide={() => {
        setCategory({ name: "" });
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
                onChange={(e) =>
                  setCategory({ ...category, name: e.target.value })
                }
                value={category.name}
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
              setCategory({ name: "" });
            }}
          >
            Stäng
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
