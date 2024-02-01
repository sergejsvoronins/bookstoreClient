import { Alert, Container, Dropdown, Fade, Nav, Table } from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ConfirmModal } from "../../components/ConfirmModal";
import { UserData, deleteUser, getAllUsers } from "../../transport/user";
import { UserFormModal } from "../../components/user/UserFormModal";

export function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
        setIsLoaded(true);
      } catch (err) {
        if (err instanceof AxiosError) {
          setUsers([]);
          console.log(err.message);
        }
      }
    };
    if (isLoaded) return;
    getUsers();
    setUserId(null);
  }, [isLoaded]);
  useEffect(() => {
    if (alertMessage) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        setAlertMessage(null);
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
        <h3>Användare hantering</h3>
      </Nav>
      <Fade in={!!alertMessage}>
        <div id="alertMessage">
          <Alert variant="success">{alertMessage}</Alert>
        </div>
      </Fade>
      <UserFormModal
        openModal={openModal}
        id={userId}
        closeModal={closeModal}
        setAlertMessage={setAlertMessage}
      />
      <Table bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Epost</th>
            <th>Behörighet</th>
            <th>Alternativ</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.accountLevel}</td>
              <td>
                {u.id !== 1 && (
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      <Gear />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setUserId(u.id);
                          setOpenModal(true);
                          setAlertMessage(null);
                        }}
                      >
                        Ändra
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setDeleteUserId(u.id);
                        }}
                      >
                        Radera
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
