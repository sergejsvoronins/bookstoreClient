import { useContext, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { CustomerForm } from "../components/checkout/CustomerForm";
import { Payment } from "../components/stripe/Payment";
import { CartContext, ICartContext } from "../context/cartContext";
import { ShipmentContext } from "../context/shipmentContext";
import { NewShipment } from "../transport/orders";
import { CheckOutCart } from "../components/checkout/CheckOutCart";

export function CheckOut() {
  const cartContext = useContext<ICartContext>(CartContext);
  const [successPayment, setSuccessPayment] = useState(false);
  const [theCartIsOk, setCartIsOk] = useState(false);
  const [shipmentDetails, setShipmentDetails] = useState<NewShipment | null>(
    null
  );
  const updateShipment = (shipment: NewShipment) => {
    setShipmentDetails(shipment);
  };

  const acceptCartItems = () => {
    setCartIsOk(true);
  };

  return (
    <Container className="my-3">
      <ListGroup>
        <ListGroup.Item action className="fs-2">
          Steg 1 - Varukorg
        </ListGroup.Item>
        <CheckOutCart setCartIsOk={acceptCartItems} />
        {/* <ListGroup.Item className="fs-2">Steg 2 - Leveranssätt</ListGroup.Item> */}
        <ListGroup.Item className="fs-2" id="customerForm">
          Steg 3 - Leveransinformation
        </ListGroup.Item>
        <ShipmentContext.Provider value={{ shipmentDetails, updateShipment }}>
          {theCartIsOk && <CustomerForm />}
          <ListGroup.Item className="fs-2" id="paymentForm">
            Steg 4 - Betalning
          </ListGroup.Item>
          {shipmentDetails && <Payment />}
        </ShipmentContext.Provider>
      </ListGroup>
    </Container>
  );
}
