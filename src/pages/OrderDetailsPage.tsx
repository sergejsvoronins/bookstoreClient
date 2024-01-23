import { Container } from "react-bootstrap";
import { OrderDetailsSchema } from "../transport/orders";
import { useState } from "react";

interface IOrderDetailsPage {
  type: "guest" | "client";
  data: OrderDetailsSchema;
}

export function OrderDetailsPage({ type, data }: IOrderDetailsPage) {
  const [order, setOrder] = useState<OrderDetailsSchema>(data);
  return <Container>Order details</Container>;
}
