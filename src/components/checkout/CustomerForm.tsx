import { useContext, useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import {
  IShipmentContext,
  ShipmentContext,
} from "../../context/shipmentContext";
import { NewShipment } from "../../transport/orders";
import { getCityByZip, getOneUser } from "../../transport/user";
import { IUserContext, UserContext } from "../../context/userContext";

export function CustomerForm({
  setShipmentIsOk,
  setCartIsOk,
}: {
  setShipmentIsOk: (status: boolean) => void;
  setCartIsOk: (status: boolean) => void;
}) {
  const { user } = useContext<IUserContext>(UserContext);
  const shipmentContext = useContext<IShipmentContext>(ShipmentContext);
  const [validated, setValidated] = useState(false);
  const [postErr, setPostErr] = useState(false);
  const [userDataIsLoaded, setUserDataIsLoaded] = useState(false);
  const [userData, setUserData] = useState(false);
  const [shipment, setShipment] = useState<NewShipment>(
    shipmentContext.shipmentDetails || {
      firstName: "",
      lastName: "",
      address: "",
      zipCode: "",
      city: "",
      mobile: "",
      email: "",
    }
  );
  useEffect(() => {
    if (user) {
      const getUser = async () => {
        let response = await getOneUser(user.id);
        if (
          response.address &&
          response.city &&
          response.firstName &&
          response.lastName &&
          response.mobile &&
          response.zipCode
        ) {
          setShipment({
            firstName: response.firstName,
            lastName: response.lastName,
            address: response.address,
            zipCode: response.zipCode,
            city: response.city,
            mobile: response.mobile,
            email: response.email,
          });
          setUserData(true);
        }
        setUserDataIsLoaded(true);
      };
      if (userDataIsLoaded) return;
      getUser();
    }
  }, [userDataIsLoaded]);
  useEffect(() => {
    shipmentContext.updateShipment(shipment);
  }, [shipment]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() && checkMobilePattern(shipment.mobile)) {
      getCity(shipment.zipCode);
      setShipmentIsOk(true);
    }
  };
  const getCity = async (zipCode: string) => {
    try {
      let response = await getCityByZip(zipCode);
      setShipment({ ...shipment, city: response.results[0].city });
      setPostErr(false);
    } catch (err) {
      if (err) {
        setPostErr(true);
        setShipment({ ...shipment, city: "" });
      }
    }
  };
  const checkMobilePattern = (mobile: string) => {
    const regex = /^07\d{8}$/;
    return regex.test(mobile);
  };

  return (
    <>
      {user && userData && (
        <Row className="mt-3 justify-content-center">
          <Form.Group className="mb-3" as={Col} lg="6">
            <Form.Check
              label="Annan leveransadress"
              onChange={(e) =>
                e.target.checked
                  ? setShipment({
                      firstName: "",
                      lastName: "",
                      address: "",
                      zipCode: "",
                      city: "",
                      mobile: "",
                      email: "",
                    })
                  : setUserDataIsLoaded(false)
              }
            />
          </Form.Group>
        </Row>
      )}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="mb-3"
      >
        <Row className="justify-content-center">
          <Form.Group className="mb-3" as={Col} lg="6" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              aria-describedby="inputGroupPrepend"
              value={shipment.email || ""}
              onChange={(e) =>
                setShipment({ ...shipment, email: e.target.value })
              }
              required
            />
            <Form.Control.Feedback type="invalid">
              Ange din epost adress
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3" as={Col} lg="3" controlId="firstName">
            <Form.Label>Namn</Form.Label>
            <Form.Label>Namn</Form.Label>
            <Form.Control
              required
              type="text"
              value={shipment.firstName || ""}
              onChange={(e) =>
                setShipment({ ...shipment, firstName: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Ange namn
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" as={Col} lg="3" controlId="lastName">
            <Form.Label>Efternamn</Form.Label>
            <Form.Control
              required
              type="text"
              value={shipment.lastName || ""}
              onChange={(e) =>
                setShipment({ ...shipment, lastName: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Ange efternamn
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3" as={Col} lg="6" controlId="address">
            <Form.Label>Adress</Form.Label>
            <Form.Control
              type="text"
              required
              value={shipment.address || ""}
              onChange={(e) =>
                setShipment({ ...shipment, address: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Ange din adress
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3" as={Col} lg="3" controlId="zipCode">
            <Form.Label>Postnummer</Form.Label>
            <Form.Control
              type="number"
              required
              minLength={5}
              value={shipment.zipCode || ""}
              onChange={(e) =>
                setShipment({ ...shipment, zipCode: e.target.value })
              }
              onBlur={(e) => getCity(e.target.value)}
              isInvalid={postErr}
            />
            <Form.Control.Feedback type="invalid">
              Ange postnummer
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" as={Col} lg="3" controlId="city">
            <Form.Label>Ort</Form.Label>
            <Form.Control
              type="text"
              value={shipment.city || ""}
              required
              onChange={(e) => {
                setShipment({ ...shipment, city: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Ange ditt ort
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3" as={Col} lg="6" controlId="mobile">
            <Form.Label>Mobil</Form.Label>
            <Form.Control
              type="number"
              minLength={10}
              placeholder="07xxxxxxxx"
              required
              value={shipment.mobile || ""}
              isInvalid={
                !checkMobilePattern(shipment.mobile) && shipment.mobile !== ""
              }
              isValid={
                shipment.mobile.length === 10 &&
                checkMobilePattern(shipment.mobile)
              }
              onChange={(e) =>
                setShipment({ ...shipment, mobile: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Numret är i fel format
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="justify-content-center my-3">
          <Col lg={6} className="d-flex justify-content-between">
            <Button type="submit">Gå vidare</Button>
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
        </Row>
      </Form>
    </>
  );
}
