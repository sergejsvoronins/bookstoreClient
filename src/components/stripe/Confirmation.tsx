import { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { ChevronLeft } from "react-bootstrap-icons";
import { useNavigate, useOutletContext } from "react-router-dom";
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
  const navigate = useNavigate();
  window.scrollTo(0, 0);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    query.get("orderId") &&
      query.get("paymentId") &&
      setOrderId(query.get("orderId"));
  }, []);

  return (
    <>
      {orderId && orderIsCreated ? (
        <Container className="text-center">
          <div className="text-start mb-3">
            <Button variant="link" onClick={() => navigate("/")}>
              <ChevronLeft />
              Handla mer
            </Button>
          </div>
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
