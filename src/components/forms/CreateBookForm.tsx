import { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import {
  Author,
  Category,
  CreateBookResponse,
  NewBook,
  addBook,
  getAuthors,
  getCategories,
} from "../../transport/books";
import { ConfirmModal } from "../ConfirmModal";
import axios from "axios";
import { getGoogleBooks } from "../../transport/googleBooks";

export function CreateBookForm() {
  const [validated, setValidated] = useState(false);
  const [newBook, setNewBook] = useState<NewBook>({
    title: "",
    description: null,
    imgUrl: null,
    pages: 0,
    year: 0,
    language: "",
    authorId: 0,
    categoryId: 0,
    price: 0,
    isbn: 0,
  });
  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [response, setResponse] = useState<CreateBookResponse>({
    id: null,
    message: "",
  });
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    let response = await addBook(newBook);
    console.log(response);

    // setResponse(response);
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            md="4"
            className="py-3"
            controlId="validationTitle"
          >
            <Form.Label>Titel</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Titel"
              isInvalid={!/\S/.test(newBook.title) || newBook.title[0] === " "}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
              //   defaultValue="Mark"
            />
            <Form.Control.Feedback type="invalid">
              Ange titel
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="4"
            className="py-3"
            controlId="validationDescription"
          >
            <Form.Label>Beskrivning</Form.Label>
            <Form.Control
              type="text"
              placeholder="Beskrivning"
              onChange={(e) =>
                setNewBook({ ...newBook, description: e.target.value })
              }
              //   defaultValue="Otto"
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="4"
            className="py-3"
            controlId="validationSmalImgUrl"
          >
            <Form.Label>Bild url(liten)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Bild url"
              onChange={(e) =>
                setNewBook({ ...newBook, imgUrl: e.target.value })
              }
              //   defaultValue="Otto"
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md="4"
            className="py-3"
            controlId="validationPages"
          >
            <Form.Label>Antal sidor</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Antal sidor"
              isInvalid={newBook.pages === 0}
              onChange={(e) =>
                setNewBook({ ...newBook, pages: +e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Ange antal sidor
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="4"
            className="py-3"
            controlId="validationYear"
          >
            <Form.Label>Publicerings år</Form.Label>
            <Form.Control
              type="number"
              placeholder="År"
              required
              isInvalid={newBook.year === 0}
              onChange={(e) =>
                setNewBook({ ...newBook, year: +e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Ange år
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="4"
            className="py-3"
            controlId="validationLanguage"
          >
            <Form.Label>Språk</Form.Label>
            <Form.Control
              type="text"
              placeholder="Språk"
              required
              isInvalid={
                !/\S/.test(newBook.language) || newBook.language[0] === " "
              }
              onChange={(e) =>
                setNewBook({ ...newBook, language: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Ange språk
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" className="py-3">
            <Form.Label>Författare</Form.Label>
            <Form.Select
              isInvalid={newBook.authorId === 0}
              isValid={newBook.authorId !== 0}
              required
              as={Col}
              aria-label="Default select example"
              onChange={(e) => {
                console.log(e.target.value);

                setNewBook({ ...newBook, authorId: +e.target.value });
              }}
            >
              <option>Välj författare</option>
              {authorsList.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="4" className="py-3">
            <Form.Label>Kategori</Form.Label>
            <Form.Select
              //   isInvalid
              as={Col}
              aria-label="Default select example"
              onChange={(e) =>
                setNewBook({ ...newBook, categoryId: +e.target.value })
              }
            >
              <option>Välj kategori</option>
              {categoriesList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group
            as={Col}
            md="4"
            className="py-3"
            controlId="validationPrice"
          >
            <Form.Label>Pris</Form.Label>
            <Form.Control
              type="number"
              isInvalid={newBook.price === 0}
              placeholder="Pris"
              required
              onChange={(e) =>
                setNewBook({ ...newBook, price: +e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Ange pris
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="4"
            className="py-3"
            controlId="validationIsbn"
          >
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              isInvalid={newBook.price === 0}
              type="number"
              placeholder="ISBN"
              required
              onChange={(e) =>
                setNewBook({ ...newBook, isbn: +e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Ange ISBN
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit">Skapa</Button>
      </Form>
      {response.id && <ConfirmModal message={response.message} />}
    </>
  );
}
