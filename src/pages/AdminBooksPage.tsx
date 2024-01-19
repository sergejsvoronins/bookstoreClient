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
import { BookForm } from "../components/BookForm";
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
  isbn: 0,
  categoryId: 0,
  authorId: 0,
};
export function AdminBooksPage() {
  const [book, setBook] = useState<NewBook>(emptyBook);
  const [toastBook, setToastBook] = useState<number | null>(null);
  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [formIsValidated, setFormIsValidated] = useState(false);
  const [bookIsCreated, setBookIsCreated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const getLists = async () => {
      const authors = await getAuthors();
      const categories = await getCategories();
      setAuthorsList(authors);
      setCategoriesList(categories);
      setIsLoaded(true);
    };
    if (isLoaded) return;
    getLists();
  }, [isLoaded]);
  const handleSubmit = async () => {
    if (formIsValidated) {
      const response = await addBook(book);
      setToastBook(response?.id);
      setBook(emptyBook);
      setBookIsCreated(true);
    }
  };
  console.log(book);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Toast
            className="d-inline-block m-1"
            bg="secondary"
            onClose={() => {
              setBook(emptyBook);
              setToastBook(null);
            }}
            show={toastBook !== null}
          >
            <Toast.Header className="justify-content-end">
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Boken är skapad</strong>
              {/* <small>11 mins ago</small> */}
            </Toast.Header>
            <Toast.Body className="dark text-white">
              BookID: {toastBook}
            </Toast.Body>
          </Toast>
          <Card>
            <Card.Header>Skapa en ny book</Card.Header>
            <Card.Body>
              <BookForm
                newBook={book}
                setNewBook={setBook}
                authorsList={authorsList}
                categoriesList={categoriesList}
                setFormIsValidated={setFormIsValidated}
              />
            </Card.Body>
            <Card.Footer>
              <Button onClick={handleSubmit}>Skapa</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
