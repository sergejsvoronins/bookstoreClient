import { useEffect, useState } from "react";
import { Author, deleteAuthor, getAuthors } from "../../transport/authors";
import { AxiosError } from "axios";
import {
  Alert,
  Button,
  Container,
  Dropdown,
  Fade,
  Nav,
  Table,
} from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import { AuthorFormModal } from "../../components/AuthorFormModal";
import { ConfirmModal } from "../../components/ConfirmModal";

export function AdminAuthorsPage() {
  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [deleteAuthorId, setDeleteAuthorId] = useState<number | null>(null);
  useEffect(() => {
    const getAuthorsLIst = async () => {
      try {
        const response = await getAuthors();
        setAuthorsList(response);
        setIsLoaded(true);
      } catch (err) {
        if (err instanceof AxiosError) {
          setAuthorsList([]);
          console.log(err.message);
        }
      }
    };
    if (isLoaded) return;
    getAuthorsLIst();
    setAuthorId(null);
  }, [isLoaded]);
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
    setAuthorId(null);
  };
  const removeAuthor = async () => {
    if (deleteAuthorId) {
      try {
        await deleteAuthor(deleteAuthorId);
        setIsLoaded(false);
        setAlertMessage(`Förfatare med ID: ${deleteAuthorId} är borttagen`);
        setDeleteAuthorId(null);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <Container>
      <Nav className="mb-3 justify-content-between">
        <h3>Författare hantering</h3>
        <Button
          onClick={() => {
            setAlertMessage(null);
            setOpenModal(true);
          }}
        >
          Skapa ny
        </Button>
      </Nav>
      <Fade in={!!alertMessage}>
        <div id="alertMessage">
          <Alert variant="success">{alertMessage}</Alert>
        </div>
      </Fade>
      <AuthorFormModal
        openModal={openModal}
        id={authorId}
        closeModal={closeModal}
        setAlertMessage={setAlertMessage}
      />
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Namn</th>
            <th>Id</th>
            <th>Alternativ</th>
          </tr>
        </thead>
        <tbody>
          {authorsList.map((a, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{a.name}</td>
              <td>{a.id}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    <Gear />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        setAuthorId(a.id);
                        setOpenModal(true);
                        setAlertMessage(null);
                      }}
                    >
                      Ändra
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setDeleteAuthorId(a.id);
                      }}
                    >
                      Radera
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {deleteAuthorId && (
        <ConfirmModal
          openConfirmModal={!!deleteAuthorId}
          closeConfirmModal={() => {
            setDeleteAuthorId(null);
          }}
          action={removeAuthor}
        />
      )}
    </Container>
  );
}
