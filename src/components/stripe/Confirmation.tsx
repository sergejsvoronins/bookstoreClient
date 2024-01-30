import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import {
  IShipmentContext,
  ShipmentContext,
} from "../../context/shipmentContext";
import { ICheckOutOutletContext } from "../../pages/CheckOut";
import { NotFoundPage } from "../../pages/NotFoundPage";

export function Confirmation() {
  const [orderId, setOrderId] = useState<string | null>();
  const { orderIsCreated } = useOutletContext<ICheckOutOutletContext>();
  const { shipmentDetails } = useContext<IShipmentContext>(ShipmentContext);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    query.get("orderId") &&
      query.get("paymentId") &&
      setOrderId(query.get("orderId"));
  }, []);
  console.log(shipmentDetails);

  return (
    <>
      {orderId && orderIsCreated ? (
        <Container className="text-center">
          <h1>Tack för din beställning! 🎉</h1>
          <h6>
            Din order med ordernummer: {orderId} är registrerad. Inom kort får
            du ett orderkvitto till: {shipmentDetails?.email}
          </h6>
        </Container>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}
