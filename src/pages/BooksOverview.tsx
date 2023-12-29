import { useEffect, useState } from "react";
import { IBook, getAllBooks } from "../transport/books";

export function BooksOverview() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const getBooks = async () => {
      const response = await getAllBooks();
      setBooks(response);
      setIsLoaded(true);
    };
    if (isLoaded) return;
    getBooks();
  }, [isLoaded]);
  console.log(books);

  return (
    <div>
      <ol>
        {books.map((b) => (
          <li>{b.title}</li>
        ))}
      </ol>
    </div>
  );
}
