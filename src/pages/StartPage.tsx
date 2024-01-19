import { useContext, useEffect, useState } from "react";
import { Book, getAllBooks } from "../transport/books";
import { ICartContext, CartContext } from "../context/cartContext";
import { BooksOverview } from "../components/BooksOverview";
import { AxiosError } from "axios";
import { IUserContext, UserContext } from "../context/userContext";
import { Container } from "react-bootstrap";
import { StartPageCarousel } from "../components/startPageCarousel";

export function StartPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const cartContext = useContext<ICartContext>(CartContext);
  const userContext = useContext<IUserContext>(UserContext);
  console.log(userContext.user);

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
  }, [isLoaded]);

  return (
    <Container className="mt-3">
      {/* <StartPageCarousel /> */}
      <BooksOverview books={books} err={err} cartContext={cartContext} />;
    </Container>
  );
}
