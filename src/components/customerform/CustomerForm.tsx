import { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { NewUser, getCityByZip } from "../../transport/user";

export function CustomerForm() {
  const [validated, setValidated] = useState(false);
  const [postErr, setPostErr] = useState(false);
  const [user, setUser] = useState<NewUser>({
    firstName: "",
    lastName: "",
    address: "",
    zip: "",
    city: "",
    mobile: "",
    email: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const getCity = async (zip: string) => {
    try {
      let response = await getCityByZip(zip);
      setUser({ ...user, city: response.results[0].city });
      setPostErr(false);
    } catch (err) {
      if (err) {
        setPostErr(true);
        setUser({ ...user, city: "" });
      }
    }
  };
  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="my-3"
    >
      <Row>
        <Form.Group className="mb-3" as={Col} md="6" controlId="email">
          <Form.Control
            type="email"
            placeholder="Email"
            aria-describedby="inputGroupPrepend"
            value={user.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <Form.Control.Feedback type="invalid">
            Ange din epost adress
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3" as={Col} md="6" controlId="zip">
          <Form.Control
            type="number"
            placeholder="Postnummer"
            required
            value={user.zip || ""}
            onChange={(e) => setUser({ ...user, zip: e.target.value })}
            onBlur={(e) => getCity(e.target.value)}
            isInvalid={postErr}
          />
          <Form.Control.Feedback type="invalid">
            Ange postnummer
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3" as={Col} md="3" controlId="firstName">
          {/* <Form.Label>First name</Form.Label> */}
          <Form.Control
            required
            type="text"
            value={user.firstName || ""}
            placeholder="First name"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" as={Col} md="3" controlId="lastName">
          {/* <Form.Label>Last name</Form.Label> */}
          <Form.Control
            required
            type="text"
            value={user.lastName || ""}
            placeholder="Last name"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3" as={Col} md="6" controlId="address">
          {/* <Form.Label>Adress</Form.Label> */}
          <Form.Control
            type="text"
            placeholder="Adress"
            required
            value={user.address || ""}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          />
          <Form.Control.Feedback type="invalid">
            Ange din adress
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3" as={Col} md="6" controlId="city">
          {/* <Form.Label>Adress</Form.Label> */}
          <Form.Control
            type="text"
            placeholder="Ort"
            disabled
            value={user.city || ""}
          />
          <Form.Control.Feedback type="invalid">
            Ange ditt ort
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3" as={Col} md="6" controlId="mobile">
          {/* <Form.Label>Adress</Form.Label> */}
          <Form.Control
            type="number"
            placeholder="Mobilnummer"
            required
            value={user.mobile || ""}
            onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          />
          <Form.Control.Feedback type="invalid">
            Ange ditt mobilnummer
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="my-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Gå vidare</Button>
    </Form>
  );
}
