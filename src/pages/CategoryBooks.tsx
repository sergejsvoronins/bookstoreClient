import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book, getCategoiesBooks } from "../transport/books";
import { BooksOverview } from "../components/booksoverview/BooksOverview";
import { AxiosError } from "axios";
import { CartContext, ICartContext } from "../context/cartContext";

export function CategoryBooks() {
  const { id } = useParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const cartContext = useContext<ICartContext>(CartContext);
  useEffect(() => {
    if (id) {
      const getBooks = async () => {
        try {
          let response = await getCategoiesBooks(+id);
          setBooks(response);
        } catch (err) {
          if (err instanceof AxiosError) {
            setErr(err.message);
          }
        }
      };
      getBooks();
    }
  }, []);

  return <BooksOverview books={books} err={err} cartContext={cartContext} />;
}
