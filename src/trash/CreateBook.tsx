import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Toast,
} from "react-bootstrap";
import {
  Author,
  Book,
  Category,
  NewBook,
  addBook,
  getAllBooks,
  getAuthors,
  getCategories,
} from "../transport/books";
import { AxiosError } from "axios";
import { NavSearch } from "../components/NavSearch";
import { BookForm } from "./BookForm";
import { XLg } from "react-bootstrap-icons";
const emptyBook: NewBook = {
  title: "",
  description: null,
  imgUrl: null,
  pages: 0,
  year: 0,
  language: "",
  author: "",
  category: "",
  price: 0,
  isbn: "",
  categoryId: 0,
  authorId: 0,
};
export function CreateBook() {
  const [book, setBook] = useState<NewBook>(emptyBook);
  const [newBookId, setNewBookId] = useState<number | null>(null);
  const [bookIsCreated, setBookIsCreated] = useState(false);
  const [formIsValidated, setFormIsValidated] = useState(false);
  useEffect(() => {
    const createBook = async () => {
      if (formIsValidated) {
        const response = await addBook(book);
        setNewBookId(response?.id);
        setBook(emptyBook);
        window.scrollTo(0, 0);
        setBookIsCreated(true);
      }
    };
    createBook();
  }, [formIsValidated]);
  console.log(book);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          {bookIsCreated ? (
            <>
              <Alert variant="success">
                Boken med ID: {newBookId} är skapad
              </Alert>
              <Button
                variant="primary"
                onClick={() => {
                  setBookIsCreated(false);
                  setNewBookId(null);
                }}
              >
                Skapa en ny
              </Button>
            </>
          ) : (
            // <Card>
            //   <Card.Header>Skapa en ny book</Card.Header>
            //   <Card.Body>
            <BookForm
              newBook={book}
              setNewBook={setBook}
              setFormIsValidated={setFormIsValidated}
            />
            //   </Card.Body>
            // </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}
