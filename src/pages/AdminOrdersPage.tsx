import { Alert, Container, Dropdown, Fade, Nav, Table } from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ConfirmModal } from "../components/ConfirmModal";
import { UserData, deleteUser, getAllUsers } from "../transport/user";
import { UserFormModal } from "../components/UserFormModal";
import { Outlet } from "react-router-dom";
import {
  OrderOverview,
  getAllGuestOrders,
  getAllUserOrders,
} from "../transport/orders";
import { format, parseISO } from "date-fns";
import { OrdersOverview } from "../components/OrdersOverview";

export function AdminOrdersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [guestOrders, setGuestOrders] = useState<OrderOverview[]>([]);
  const [userOrders, setUserOrders] = useState<OrderOverview[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showGuestsOrders, setShowGuestOrders] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
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
        console.log("timeout");
      }, 3000);
    }
  }, [alertMessage]);
  const closeModal = () => {
    setOpenModal(false);
    setIsLoaded(false);
    setUserId(null);
  };

  const removeUser = async () => {
    if (deleteUserId) {
      try {
        await deleteUser(deleteUserId);
        setIsLoaded(false);
        setAlertMessage(`User med ID: ${deleteUserId} är borttagen`);
        setDeleteUserId(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

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
      {/* <Fade in={!!alertMessage}>
        <div id="alertMessage">
          <Alert variant="success">{alertMessage}</Alert>
        </div>
      </Fade> */}
      {/* <UserFormModal
        openModal={openModal}
        id={userId}
        closeModal={closeModal}
        setAlertMessage={setAlertMessage}
      /> */}
      <OrdersOverview
        data={showGuestsOrders ? guestOrders : userOrders}
        type={showGuestsOrders ? "guest" : "client"}
      />
      {deleteUserId && (
        <ConfirmModal
          openConfirmModal={!!deleteUserId}
          closeConfirmModal={() => {
            setDeleteUserId(null);
          }}
          action={removeUser}
        />
      )}
    </Container>
  );
}
