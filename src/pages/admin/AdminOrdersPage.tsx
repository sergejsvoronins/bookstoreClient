import { Container, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import {
  OrderOverview,
  getAllGuestOrders,
  getAllUserOrders,
} from "../../transport/orders";
import { OrdersOverview } from "../../components/OrdersOverview";

export function AdminOrdersPage() {
  const [guestOrders, setGuestOrders] = useState<OrderOverview[]>([]);
  const [userOrders, setUserOrders] = useState<OrderOverview[]>([]);
  const [showGuestsOrders, setShowGuestOrders] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  useEffect(() => {
    const getGuestOrders = async () => {
      try {
        const response = await getAllGuestOrders();
        setGuestOrders(response);
      } catch (err) {
        if (err instanceof AxiosError) {
          setGuestOrders([]);
          console.log(err.message);
        }
      }
    };
    const getUserOrders = async () => {
      try {
        const response = await getAllUserOrders();
        setUserOrders(response);
      } catch (err) {
        if (err instanceof AxiosError) {
          setUserOrders([]);
          console.log(err.message);
        }
      }
    };

    getGuestOrders();
    getUserOrders();
  }, []);
  useEffect(() => {
    if (alertMessage) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
    }
  }, [alertMessage]);

  return (
    <Container>
      <Nav className="mb-3 justify-content-between">
        <h3>Order hantering</h3>
      </Nav>
      <Nav fill variant="pills" defaultActiveKey="client">
        <Nav.Item onClick={() => setShowGuestOrders(false)}>
          <Nav.Link eventKey="client">
            {" "}
            <span>Kundbeställningar </span>
            <span className="text-success">
              ({userOrders.filter((o) => o.orderStatus === "new").length} nya)
            </span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => setShowGuestOrders(true)}>
          <Nav.Link eventKey="guest">
            <span>Gästbesällningar </span>
            <span className="text-success">
              ({guestOrders.filter((o) => o.orderStatus === "new").length} nya)
            </span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <OrdersOverview
        data={showGuestsOrders ? guestOrders : userOrders}
        type={showGuestsOrders ? "guest" : "client"}
      />
    </Container>
  );
}
