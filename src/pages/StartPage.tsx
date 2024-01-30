import { useContext, useEffect, useState } from "react";
import { Book, getAllBooks } from "../transport/books";
import { ICartContext, CartContext } from "../context/cartContext";
import { BooksOverview } from "../components/BooksOverview";
import { AxiosError } from "axios";
import { Container } from "react-bootstrap";
import { StartPageCarousel } from "../components/startPageCarousel";
import { useOutletContext } from "react-router-dom";
import { MainOutletContext } from "../components/Main";
import { NavSearch } from "../components/NavSearch";
import { TopBooks } from "../components/TopBooks";

export function StartPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const cartContext = useContext<ICartContext>(CartContext);
  const { innerWidth } = useOutletContext<MainOutletContext>();
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
    <>
      {innerWidth > 768 && <StartPageCarousel />}
      {innerWidth < 768 && <NavSearch />}

      <Container className="mt-3">
        <h3 className="mb-5">Top böcker</h3>
        <hr className="mb-5" />
        <TopBooks />
        <h3 className="mb-5">Upptäck vårt sortiment</h3>
        <hr className="mb-5" />
        <BooksOverview books={books} err={err} cartContext={cartContext} />
      </Container>
    </>
  );
}
