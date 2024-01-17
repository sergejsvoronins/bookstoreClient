import { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { login } from "../transport/user";
import { AxiosError } from "axios";
import { IUserContext, UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
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
        navigate("/");
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data);
      }
    }
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
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
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
                <Button variant="primary" type="submit">
                  Logga in
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
