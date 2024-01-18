import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NewUser, createUser } from "../transport/user";
import { useNavigate, useOutletContext } from "react-router-dom";
import { AxiosError } from "axios";
import { MainOutletContext } from "../components/Main";
const emptyUser: NewUser = {
  email: "",
  password: "",
  samePassword: "",
};

export function CreateAccountPage() {
  const [newUser, setNewUser] = useState<NewUser>(emptyUser);
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setUserIsCreated } = useOutletContext<MainOutletContext>();
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    if (form.checkValidity() === true) {
      try {
        let response = await createUser(newUser);
        if (response) {
          setUserIsCreated(true);
          navigate(`/account/${response.id}/confirmation`);
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          setErrorMessage(e.response?.data.error);
        }
      }
    }
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header className="py-3 fs-2">Skapa ett konto</Card.Header>
            <Card.Body>
              {errorMessage && (
                <Row>
                  <Col style={{ color: "red" }}>{errorMessage}</Col>
                </Row>
              )}
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Epost</Form.Label>
                  <Form.Control
                    type="email"
                    value={newUser.email}
                    required
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                  <Form.Control.Feedback
                    className="position-static"
                    type="invalid"
                  >
                    Ange giltig epost
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Lösenord</Form.Label>
                  <Form.Control
                    type="password"
                    value={newUser.password}
                    min={6}
                    required
                    isValid={newUser.password.length > 5}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                  />
                  <Form.Control.Feedback
                    className="position-static"
                    type="invalid"
                  >
                    Lösenordet måste vara minst 6 tecken
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="samePassword">
                  <Form.Label>Upprepa lösenord</Form.Label>
                  <Form.Control
                    type="password"
                    value={newUser.samePassword}
                    min={6}
                    required
                    isValid={
                      newUser.password.length === 0
                        ? undefined
                        : newUser.samePassword === newUser.password
                    }
                    onChange={(e) =>
                      setNewUser({ ...newUser, samePassword: e.target.value })
                    }
                  />
                  <Form.Control.Feedback
                    className="position-static"
                    type="invalid"
                  >
                    Lösenordet stämmer inte
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    label={
                      <a href="#">
                        Jag godkänner alla köp- och användarvillkor
                      </a>
                    }
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Button variant="primary" type="submit">
                      Skapa
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
