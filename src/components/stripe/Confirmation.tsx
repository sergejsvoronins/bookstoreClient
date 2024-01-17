import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export function Confirmation() {
  const [orderId, setOrderId] = useState<string | null>();
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    query.get("orderId") &&
      query.get("paymentId") &&
      setOrderId(query.get("orderId"));
  }, []);

  return (
    <>
      {orderId ? (
        <Container className="text-center">
          <h1>Tack för din beställning! 🎉</h1>
          <h6>
            Din order med ordernummer: {orderId} är registrerad. Inom kort får
            du ett orderkvitto till:{" "}
          </h6>
        </Container>
      ) : (
        <h1>Page is not found</h1>
      )}
    </>
  );
}
