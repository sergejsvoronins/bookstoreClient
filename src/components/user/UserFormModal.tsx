import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { NewUser, getOneUser, updateUserLevel } from "../../transport/user";

interface IModal {
  id?: number | null;
  openModal: boolean;
  closeModal: () => void;
  setId?: (id: number | null) => void;
  setAlertMessage: (message: string) => void;
}
const emptyUser = {
  email: "",
  accountLevel: "",
  password: "",
};

export function UserFormModal({
  openModal,
  closeModal,
  setAlertMessage,
  id,
  setId,
}: IModal) {
  const [user, setUser] = useState<NewUser>(emptyUser);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      if (id) {
        try {
          let response = await getOneUser(id);
          setUser(response);
        } catch (e) {
          console.log(e);
        }
      }
    };
    getUser();
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
      const response = await updateUserLevel(user);
      if (response) {
        setAlertMessage(`User med ID: ${id} har blivit uppdaterad`);
      }
    }
    setUser(emptyUser);
    closeModal();
  };

  return (
    <Modal
      show={openModal}
      onHide={() => {
        closeModal();
        setId && setId(null);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>"Uppdatera behörighet"</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              xs="12"
              className="py-3"
              controlId="validationUser"
            >
              <Form.Label>Författare</Form.Label>
              <Form.Select
                isValid={
                  user.accountLevel === "user" || user.accountLevel === "admin"
                }
                required
                as={Col}
                value={user.accountLevel}
                onChange={(e) => {
                  setUser({ ...user, accountLevel: e.target.value });
                }}
              >
                <option>user</option>
                <option>admin</option>
              </Form.Select>
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Spara</Button>
          <Button
            variant="secondary"
            onClick={() => {
              closeModal();
              setUser(emptyUser);
            }}
          >
            Stäng
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
