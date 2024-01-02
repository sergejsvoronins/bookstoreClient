import { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import {
  Author,
  Category,
  NewBook,
  getAuthors,
  getCategories,
} from "../../transport/books";

export function CreateBookForm() {
  const [validated, setValidated] = useState(false);
  const [newBook, setNewBook] = useState<NewBook>({
    id: null,
    title: "",
    description: null,
    pages: null,
    year: 2023,
    language: "",
    authorId: 0,
    categoryId: 0,
    price: 0,
    isbn: 0,
  });
  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    console.log(event.currentTarget);

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  console.log(newBook);

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
            controlId="validationPages"
          >
            <Form.Label>Antal sidor</Form.Label>
            <Form.Control
              type="number"
              placeholder="Antal sidor"
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
              as={Col}
              aria-label="Default select example"
              onChange={(e) =>
                setNewBook({ ...newBook, authorId: +e.target.value })
              }
            >
              <option>Välj författare</option>
              {authorsList.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.firstName + " " + a.lastName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="4" className="py-3">
            <Form.Label>Kategori</Form.Label>
            <Form.Select
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
            <Form.Control type="number" placeholder="Pris" required />
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
            <Form.Control type="number" placeholder="ISBN" required />
            <Form.Control.Feedback type="invalid">
              Ange ISBN
            </Form.Control.Feedback>
          </Form.Group>
          {/* <Form.Group as={Col} md="4" controlId="validationLanguage">
            <Form.Label>Språk</Form.Label>
            <Form.Control type="text" placeholder="Språk" required />
            <Form.Control.Feedback type="invalid">
              Ange språk
            </Form.Control.Feedback>
          </Form.Group> */}
        </Row>
        {/* <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group> */}
        <Button type="submit">Skapa</Button>
      </Form>
    </>
  );
}
