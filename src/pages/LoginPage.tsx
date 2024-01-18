import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { login } from "../transport/user";
import { AxiosError } from "axios";
import { IUserContext, UserContext } from "../context/userContext";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MainOutletContext } from "../components/Main";

export function LoginPage() {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [saveLogin, setSaveLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setUserIsCreated } = useOutletContext<MainOutletContext>();
  const userContext = useContext<IUserContext>(UserContext);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(user);
      if (response) {
        userContext.setUser(response);
        setUser({
          email: "",
          password: "",
        });
        console.log(saveLogin);

        saveLogin
          ? localStorage.setItem("user", JSON.stringify(response))
          : localStorage.removeItem("user");
        navigate("/");
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorMessage(e.response?.data.error);
      }
    }
  };
  useEffect(() => {
    setUserIsCreated(false);
  }, []);
  useEffect(() => {
    userContext.user && navigate("/");
  }, []);
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              {errorMessage && (
                <Row>
                  <Col style={{ color: "red" }}>{errorMessage}</Col>
                </Row>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Epost</Form.Label>
                  <Form.Control
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Lösenord</Form.Label>
                  <Form.Control
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Håll mig inloggad"
                    checked={saveLogin}
                    onChange={(e) => setSaveLogin(e.target.checked)}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Button variant="primary" type="submit">
                      Logga in
                    </Button>
                  </Col>
                  <Col className="text-end">
                    <a href="/account/create">Registrera dig</a>
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
