import {
  Alert,
  Button,
  Collapse,
  Container,
  Dropdown,
  Fade,
  Nav,
  Table,
} from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import { BookFormModal } from "../components/BookFormModal";
import { useContext, useEffect, useState } from "react";
import { Book, getAllBooks } from "../transport/books";
import { AxiosError } from "axios";
import { ConfirmModal } from "../components/ConfirmModal";
import { IUserContext, UserContext } from "../context/userContext";
import { NotFoundPage } from "./NotFoundPage";

export function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bookId, setBookId] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [deleteBookId, setDeleteBookId] = useState<number | null>(null);
  const userContext = useContext<IUserContext>(UserContext);
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await getAllBooks();
        setBooks(response);
        setIsLoaded(true);
      } catch (err) {
        if (err instanceof AxiosError) {
          setBooks([]);
          setErr(err.message);
        }
      }
    };
    if (isLoaded) return;
    getBooks();
    setBookId(null);
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
    setBookId(null);
  };

  return (
    <Container>
      <Nav className="mb-3 justify-content-between">
        <h3>Bokhantering</h3>
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
      <BookFormModal
        openModal={openModal}
        closeModal={closeModal}
        setAlertMessage={setAlertMessage}
        id={bookId}
      />
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Titel</th>
            <th>BookId</th>
            <th>Alternativ</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{b.title}</td>
              <td>{b.id}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    <Gear />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        setBookId(b.id);
                        setOpenModal(true);
                        setAlertMessage(null);
                      }}
                    >
                      Ändra
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setDeleteBookId(b.id);
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
      {deleteBookId && (
        <ConfirmModal
          openConfirmModal={!!deleteBookId}
          closeConfirmModal={() => {
            setDeleteBookId(null);
          }}
          onConfirm={() => {
            setIsLoaded(false);
            setDeleteBookId(null);
          }}
          bookId={deleteBookId}
          setAlertMessage={setAlertMessage}
        />
      )}
    </Container>
  );
}
