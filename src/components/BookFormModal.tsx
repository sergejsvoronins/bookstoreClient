import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import {
  Author,
  Category,
  NewBook,
  addBook,
  getAuthors,
  getCategories,
  getOneBook,
  updateBook,
} from "../transport/books";
import { useState, useEffect } from "react";

interface IBookModal {
  id?: number | null;
  openModal: boolean;
  closeModal: () => void;
  setId?: (id: number | null) => void;
  setAlertMessage: (message: string) => void;
}
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

export function BookFormModal({
  openModal,
  closeModal,
  setAlertMessage,
  id,
  setId,
}: IBookModal) {
  const [newBook, setNewBook] = useState<NewBook>(emptyBook);
  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const getBook = async () => {
      if (id) {
        try {
          let response = await getOneBook(id);

          setNewBook(response);
        } catch (e) {
          console.log(e);
        }
      }
    };
    getBook();
  }, [id]);
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
    if (form.checkValidity() === true) {
      if (!id) {
        const response = await addBook(newBook);
        setAlertMessage(`Bok med ID: ${response?.id} har skapats`);
      } else {
        const response = await updateBook(newBook);
        if (response) {
          setAlertMessage(`Bok med ID: ${id} har blivit uppdaterad`);
        }
      }
      setNewBook(emptyBook);
      closeModal();
    }
  };

  return (
    <>
      <Modal
        show={openModal}
        onHide={() => {
          setNewBook(emptyBook);
          closeModal();
          setId && setId(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {id ? "Uppdatera information" : "Skapa en ny bok"}
          </Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
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
                  // isInvalid={!/\S/.test(newBook.title) || newBook.title[0] === " "}
                  isValid={!!id}
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
                  isValid={!!id}
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
                  isValid={!!id}
                  // isInvalid={newBook.pages === 0}
                  value={newBook.pages ? newBook.pages : ""}
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
                  // isInvalid={newBook.year === 0}
                  // isValid={id !== null}
                  value={newBook.year ? newBook.year : ""}
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
                  isValid={!!id}
                  value={newBook.language}
                  // isInvalid={
                  //   !/\S/.test(newBook.language) || newBook.language[0] === " "
                  // }
                  onChange={(e) =>
                    setNewBook({ ...newBook, language: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Ange språk
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                xs="12"
                className="py-3"
                controlId="validationAuthor"
              >
                <Form.Label>Författare</Form.Label>
                <Form.Select
                  // isInvalid={newBook.author === ""}
                  isValid={newBook.authorId !== 0}
                  required
                  as={Col}
                  value={newBook.authorId}
                  onChange={(e) => {
                    const authorId = +e.target.value;
                    setNewBook({
                      ...newBook,
                      authorId,
                      author:
                        authorId === 0
                          ? ""
                          : authorsList.find((a) => a.id === authorId)?.name ||
                            "",
                    });
                  }}
                >
                  {!id && <option value={0}>Välj författare</option>}
                  {authorsList.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group
                as={Col}
                xs="12"
                className="py-3"
                controlId="validationCategory"
              >
                <Form.Label>Kategori</Form.Label>
                <Form.Select
                  isInvalid={newBook.category === ""}
                  // isValid={newBook.categoryId > 0}
                  as={Col}
                  aria-label="Default select example"
                  value={newBook.categoryId}
                  onChange={(e) => {
                    const categoryId = +e.target.value;
                    setNewBook({
                      ...newBook,
                      categoryId,
                      category:
                        categoryId === 0
                          ? ""
                          : categoriesList.find((c) => c.id === categoryId)
                              ?.name || "",
                    });
                  }}
                >
                  {!id && <option value={0}>Välj kategori</option>}
                  {categoriesList.map((c) => (
                    <option
                      key={c.id}
                      value={c.id}
                      onChange={(e) => console.log(e)}
                    >
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
                  // isInvalid={newBook.price === 0}
                  required
                  isValid={!!id}
                  value={newBook.price ? newBook.price : ""}
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
                  // isInvalid={newBook.price === 0}
                  value={newBook.isbn}
                  type="number"
                  isValid={!!id}
                  required
                  onChange={(e) =>
                    setNewBook({ ...newBook, isbn: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Ange ISBN
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Spara</Button>
            <Button variant="secondary" onClick={closeModal}>
              Stäng
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
