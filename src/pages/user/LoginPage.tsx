import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { login } from "../../transport/user";
import { AxiosError } from "axios";
import { IUserContext, UserContext } from "../../context/userContext";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MainOutletContext } from "../../components/Main";
import { NotFoundPage } from "../NotFoundPage";

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

        saveLogin
          ? localStorage.setItem("user", JSON.stringify(response))
          : localStorage.removeItem("user");
        navigate("/");
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e);

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
    <>
      {!userContext.user ? (
        <Container className="mb-5">
          <Row className="justify-content-center">
            <Col sm={8} md={6} xl={4}>
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
                        <a href="/create">Registrera dig</a>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}
