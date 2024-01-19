import { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Author, Category, NewBook } from "../transport/books";
import { useParams } from "react-router-dom";

interface IBookForm {
  newBook: NewBook;
  setNewBook: (book: NewBook) => void;
  setFormIsValidated: (status: boolean) => void;
  authorsList: Author[];
  categoriesList: Category[];
}
export function BookForm({
  newBook,
  setNewBook,
  setFormIsValidated,
  authorsList,
  categoriesList,
}: IBookForm) {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setFormIsValidated(false);
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      setFormIsValidated(true);
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onChange={handleSubmit}>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            xs="12"
            className="py-3"
            controlId="validationTitle"
          >
            <Form.Label>Titel</Form.Label>
            <Form.Control
              required
              type="text"
              isInvalid={!/\S/.test(newBook.title) || newBook.title[0] === " "}
              isValid={id !== null}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
              value={newBook.title}
            />
            <Form.Control.Feedback type="invalid">
              Ange titel
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            xs="12"
            className="py-3"
            controlId="validationDescription"
          >
            <Form.Label>Beskrivning</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={3}
              onChange={(e) =>
                setNewBook({ ...newBook, description: e.target.value })
              }
              value={newBook.description || ""}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            xs="12"
            className="py-3"
            controlId="validationSmalImgUrl"
          >
            <Form.Label>Bild url</Form.Label>
            <Form.Control
              type="text"
              value={newBook.imgUrl || ""}
              isValid={id !== null}
              onChange={(e) =>
                setNewBook({ ...newBook, imgUrl: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group
            as={Col}
            xs="12"
            className="py-3"
            controlId="validationPages"
          >
            <Form.Label>Antal sidor</Form.Label>
            <Form.Control
              type="number"
              required
              isValid={id !== null}
              isInvalid={newBook.pages === 0}
              value={newBook.pages}
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
            xs="12"
            className="py-3"
            controlId="validationYear"
          >
            <Form.Label>Publicerings år</Form.Label>
            <Form.Control
              type="number"
              required
              isInvalid={newBook.year === 0}
              isValid={id !== null}
              value={newBook.year}
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
            xs="12"
            className="py-3"
            controlId="validationLanguage"
          >
            <Form.Label>Språk</Form.Label>
            <Form.Control
              type="text"
              required
              isValid={id !== null}
              value={newBook.language}
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
          <Form.Group as={Col} xs="12" className="py-3">
            <Form.Label>Författare</Form.Label>
            <Form.Select
              isInvalid={newBook.author === ""}
              isValid={newBook.author !== "" || id !== null}
              required
              as={Col}
              value={newBook.authorId}
              onChange={(e) => {
                setNewBook({ ...newBook, authorId: +e.target.value });
              }}
            >
              {!id && <option>Välj författare</option>}
              {authorsList.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} xs="12" className="py-3">
            <Form.Label>Kategori</Form.Label>
            <Form.Select
              isValid={newBook.category !== "" || id !== null}
              as={Col}
              aria-label="Default select example"
              value={newBook.categoryId}
              onChange={(e) =>
                setNewBook({ ...newBook, categoryId: +e.target.value })
              }
            >
              {!id && <option>Välj kategori</option>}
              {categoriesList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group
            as={Col}
            xs="12"
            className="py-3"
            controlId="validationPrice"
          >
            <Form.Label>Pris</Form.Label>
            <Form.Control
              type="number"
              isInvalid={newBook.price === 0}
              required
              isValid={id !== null}
              value={newBook.price}
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
            xs="12"
            className="py-3"
            controlId="validationIsbn"
          >
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              isInvalid={newBook.price === 0}
              type="number"
              value={newBook.isbn}
              isValid={id !== null}
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
      </Form>
    </>
  );
}
