import { Col, Form, Row } from "react-bootstrap";

export function UpdateUserDataForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {};
  return (
    <Form
      noValidate
      // validated={validated}
      onSubmit={handleSubmit}
      className="my-3"
    >
      <Row className="justify-content-center">
        <Form.Group className="mb-3" as={Col} lg="6" controlId="email">
          <Form.Control
            type="email"
            placeholder="Email"
            aria-describedby="inputGroupPrepend"
            //   value={shipment.email || ""}
            //   onChange={(e) =>
            //     setShipment({ ...shipment, email: e.target.value })
            //   }
            //   required
          />
          <Form.Control.Feedback type="invalid">
            Ange din epost adress
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="justify-content-center">
        <Form.Group className="mb-3" as={Col} lg="6" controlId="zipCode">
          <Form.Control
            type="number"
            placeholder="Postnummer"
            required
            className="rounded-pill"
            //   value={shipment.zipCode || ""}
            //   onChange={(e) =>
            //     setShipment({ ...shipment, zipCode: e.target.value })
            //   }
            //   onBlur={(e) => getCity(e.target.value)}
            //   isInvalid={postErr}
          />
          <Form.Control.Feedback type="invalid">
            Ange postnummer
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="justify-content-center">
        <Form.Group className="mb-3" as={Col} lg="3" controlId="firstName">
          <Form.Control
            required
            type="text"
            //   value={shipment.firstName || ""}
            //   placeholder="First name"
            //   onChange={(e) =>
            //     setShipment({ ...shipment, firstName: e.target.value })
            //   }
          />
          <Form.Control.Feedback type="invalid">
            Ange namn
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" as={Col} lg="3" controlId="lastName">
          <Form.Control
            required
            type="text"
            //   value={shipment.lastName || ""}
            //   placeholder="Last name"
            //   onChange={(e) =>
            //     setShipment({ ...shipment, lastName: e.target.value })
            //   }
          />
          <Form.Control.Feedback type="invalid">
            Ange efternamn
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="justify-content-center">
        <Form.Group className="mb-3" as={Col} lg="6" controlId="address">
          <Form.Control
            type="text"
            placeholder="Adress"
            required
            //   value={shipment.address || ""}
            //   onChange={(e) =>
            //     setShipment({ ...shipment, address: e.target.value })
            //   }
          />
          <Form.Control.Feedback type="invalid">
            Ange din adress
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="justify-content-center">
        <Form.Group className="mb-3" as={Col} lg="6" controlId="city">
          <Form.Control
            type="text"
            placeholder="Ort"
            disabled
            //   value={shipment.city || ""}
          />
          <Form.Control.Feedback type="invalid">
            Ange ditt ort
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="justify-content-center">
        <Form.Group className="mb-3" as={Col} lg="6" controlId="mobile">
          <Form.Control
            type="number"
            placeholder="Mobilnummer"
            required
            //   value={shipment.mobile || ""}
            //   onChange={(e) =>
            //     setShipment({ ...shipment, mobile: e.target.value })
            //   }
          />
          <Form.Control.Feedback type="invalid">
            Ange ditt mobilnummer
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      {/* <Row>
          <Col className="text-start">
            <Button type="submit">Gå vidare</Button>
          </Col>
          <Col className="text-end">
            <Button
              type="button"
              onClick={() => {
                setValidated(false);
                setCartIsOk(false);
              }}
            >
              Tillbaka
            </Button>
          </Col>
        </Row> */}
    </Form>
  );
}
