import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../transport/books";
import { BooksOverview } from "../components/BooksOverview";
import { AxiosError } from "axios";
import { CartContext, ICartContext } from "../context/cartContext";
import { getCategoryBooks } from "../transport/categories";
import { Container, Row, Spinner } from "react-bootstrap";

export function CategoryBooks() {
  const { id } = useParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const cartContext = useContext<ICartContext>(CartContext);

  useEffect(() => {
    if (id) {
      const getBooks = async () => {
        try {
          let response = await getCategoryBooks(+id);
          if (response) {
            setBooks(response.books);
          }
        } catch (err) {
          if (err instanceof AxiosError) {
            setErr(err.message);
          }
        }
        setDataIsLoaded(true);
      };
      getBooks();
    }
  }, [id, dataIsLoaded]);

  return (
    <Container>
      <h3>
        {books.length === 0
          ? "Det finns inga böcker i denna katerogi"
          : `Kategori: ${books[0].category}`}
      </h3>
      <hr className="mb-5" />
      {dataIsLoaded ? (
        <BooksOverview books={books} err={err} cartContext={cartContext} />
      ) : (
        <Row className="justify-content-center">
          <Spinner />
        </Row>
      )}
    </Container>
  );
}
