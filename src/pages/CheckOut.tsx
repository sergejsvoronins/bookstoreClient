import { useState } from "react";
import { Collapse, Container, ListGroup } from "react-bootstrap";
import { CustomerForm } from "../components/checkout/CustomerForm";
import { Payment } from "../components/stripe/Payment";
import { ShipmentContext } from "../context/shipmentContext";
import { NewShipment } from "../transport/orders";
import { CheckOutCart } from "../components/checkout/CheckOutCart";

export function CheckOut() {
  const [cartIsOk, setCartIsOk] = useState(false);
  const [shipmentIsOk, setShipmentIsOk] = useState(false);
  const [shipmentDetails, setShipmentDetails] = useState<NewShipment | null>(
    null
  );
  const updateShipment = (shipment: NewShipment) => {
    setShipmentDetails(shipment);
  };

  return (
    <Container className="my-3">
      <ListGroup>
        <ListGroup.Item
          action
          className="fs-2"
          active={!cartIsOk && !shipmentIsOk}
        >
          Steg 1 - Varukorg
        </ListGroup.Item>
        <Collapse in={!cartIsOk}>
          <div>
            <CheckOutCart setCartIsOk={setCartIsOk} />
          </div>
        </Collapse>
        <ListGroup.Item
          className="fs-2"
          id="customerForm"
          active={!shipmentIsOk && cartIsOk}
        >
          Steg 2 - Leveransinformation
        </ListGroup.Item>
        <ShipmentContext.Provider value={{ shipmentDetails, updateShipment }}>
          <Collapse in={cartIsOk && !shipmentIsOk}>
            <div>
              <CustomerForm
                setShipmentIsOk={setShipmentIsOk}
                setCartIsOk={setCartIsOk}
              />
            </div>
          </Collapse>
          {/* )} */}
          <ListGroup.Item
            className="fs-2"
            id="paymentForm"
            active={cartIsOk && shipmentIsOk}
          >
            Steg 3 - Betalning
          </ListGroup.Item>
          <Collapse in={shipmentDetails !== null && cartIsOk && shipmentIsOk}>
            <div>
              <Payment />
            </div>
          </Collapse>
        </ShipmentContext.Provider>
      </ListGroup>
    </Container>
  );
}
