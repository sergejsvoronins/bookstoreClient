import { Container, Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { OrderDetailsPage } from "./OrderDetailsPage";
import { useEffect, useState } from "react";
import {
  OrderDetailsSchema,
  getClientOrderMetaData,
  getGuestOrderMetaData,
} from "../transport/orders";

export function AdminOrderInfoPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderDetailsSchema | null>(null);
  const query = new URLSearchParams(window.location.search);
  const type = query.get("type");
  useEffect(() => {
    if (id) {
      const getOrderDetails = async (id: string) => {
        if (type === "client") {
          const response = await getClientOrderMetaData(id);
          console.log(response);

          setOrder(response);
        } else {
          const response = await getGuestOrderMetaData(id);
          setOrder(response);
        }
      };
      getOrderDetails(id);
    }
  }, []);

  return (
    <Container>
      <Nav>
        <Nav.Link href="/admin/orders">Tillbaka</Nav.Link>
      </Nav>
      {order && (type === "guest" || type === "client") && (
        <OrderDetailsPage data={order} type={type} />
      )}
    </Container>
  );
}
