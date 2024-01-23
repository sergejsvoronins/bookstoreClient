import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../transport/books";
import { BooksOverview } from "../components/BooksOverview";
import { AxiosError } from "axios";
import { CartContext, ICartContext } from "../context/cartContext";
import { getCategoryBooks } from "../transport/categories";

export function CategoryBooks() {
  const { id } = useParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const cartContext = useContext<ICartContext>(CartContext);
  useEffect(() => {
    if (id) {
      const getBooks = async () => {
        try {
          let response = await getCategoryBooks(+id);
          setBooks(response.books);
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
