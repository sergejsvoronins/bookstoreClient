import { useContext, useEffect, useState } from "react";
import { Collapse, Container, ListGroup } from "react-bootstrap";
import { CustomerForm } from "../components/checkout/CustomerForm";
import { Payment } from "../components/stripe/Payment";
import { IShipmentContext, ShipmentContext } from "../context/shipmentContext";
import { CheckOutCart } from "../components/checkout/CheckOutCart";
import { CartContext, ICartContext } from "../context/cartContext";
import { useOutletContext } from "react-router-dom";
import { ICheckOutOutletContext } from "../pages/CheckOut";

export function CheckOutForm() {
  const [cartIsOk, setCartIsOk] = useState(false);
  const [shipmentIsOk, setShipmentIsOk] = useState(false);
  const shipmentContext = useContext<IShipmentContext>(ShipmentContext);
  const { setOrderIsCreated } = useOutletContext<ICheckOutOutletContext>();
  const cartContext = useContext<ICartContext>(CartContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cartIsOk, shipmentIsOk]);

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
        <Collapse in={!cartIsOk} timeout={100}>
          <div className="mx-auto">
            <CheckOutCart setCartIsOk={setCartIsOk} />
          </div>
        </Collapse>
        <ListGroup.Item className="fs-2" active={!shipmentIsOk && cartIsOk}>
          Steg 2 - Leveransinformation
        </ListGroup.Item>
        <Collapse in={cartIsOk && !shipmentIsOk} timeout={100}>
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
        {shipmentContext.shipmentDetails !== null &&
          cartIsOk &&
          shipmentIsOk && (
            <Collapse
              in={
                shipmentContext.shipmentDetails !== null &&
                cartIsOk &&
                shipmentIsOk
              }
            >
              <div>
                <Payment setOrderIsCreated={setOrderIsCreated} />
              </div>
            </Collapse>
          )}
      </ListGroup>
      <h3 className="text-center mt-3">Att betala:</h3>
      <h1 className="text-center mb-5 fw-bolder">
        {cartContext.cart.reduce((accumulator, item) => {
          return accumulator + item.amount * item.item.price;
        }, 0) + cartContext.freight}
        <span> SEK</span>
      </h1>
    </Container>
  );
}
