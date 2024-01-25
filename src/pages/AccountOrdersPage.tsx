import { useContext, useEffect, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { IUserContext, UserContext } from "../context/userContext";
import { OrderDetails, getOneUserOrders } from "../transport/orders";

export function AccountOrdersPage() {
  const { user } = useContext<IUserContext>(UserContext);
  const [orders, setOrders] = useState<OrderDetails[]>([]);

  useEffect(() => {
    if (user) {
      const getAllUserOrders = async () => {
        const response = await getOneUserOrders(user?.id);
        setOrders(response);
      };
      getAllUserOrders();
    }
  }, []);
  return (
    <Container>
      <Accordion>
        {orders.map((o, i) => (
          <Accordion.Item key={o.id} eventKey={i.toString()}>
            <Accordion.Header>
              <Row className="w-100">
                <Col xs={6}>Order: {o.id}</Col>
                <Col xs={6}>
                  <span>{o.orderStatus}</span>
                </Col>
              </Row>
            </Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}
