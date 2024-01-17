import { Button, Modal } from "react-bootstrap";
import {
  Author,
  Book,
  Category,
  NewBook,
  getAuthors,
  getCategories,
  getOneBook,
  updateBook,
} from "../transport/books";
import { BookForm } from "./forms/BookForm";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface IBookModal {
  openModal: boolean;
  closeModal: () => void;
}

export function BookModal({ openModal, closeModal }: IBookModal) {
  const { id } = useParams();
  const [formIsValidated, setFormIsValidated] = useState(id ? true : false);
  const navigate = useNavigate();
  const [book, setBook] = useState<NewBook>({
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
  });
  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const getBook = async () => {
      if (id) {
        try {
          let response = await getOneBook(+id);
          setBook({
            title: response.title,
            description: response.description,
            imgUrl: response.imgUrl,
            pages: response.pages,
            year: response.year,
            language: response.language,
            author: response.author,
            category: response.category,
            price: response.price,
            isbn: response.isbn,
          });
        } catch (e) {
          console.log(e);
        }
      }
    };
    getBook();
  }, []);
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
  const submitBookForm = async () => {
    if (id && formIsValidated) {
      const response = await updateBook({
        ...book,
        id: +id,
        authorId: authorsList.find((a) => a.name === book.author)?.id,
        categoryId: categoriesList.find((c) => c.name === book.category)?.id,
      });
      closeModal();
    }
  };
  console.log(formIsValidated);

  return (
    <>
      <Modal show={openModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {id ? "Uppdatera information" : "Skapa en ny bok"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookForm
            newBook={book}
            setNewBook={setBook}
            setFormIsValidated={setFormIsValidated}
            authorsList={authorsList}
            categoriesList={categoriesList}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Stäng
          </Button>
          <Button variant="primary" onClick={submitBookForm}>
            Spara
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
