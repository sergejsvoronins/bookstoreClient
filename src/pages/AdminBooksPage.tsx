import { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { Book, getAllBooks } from "../transport/books";
import { AxiosError } from "axios";

export function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [err, setErr] = useState<string | null>(null);
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
    <Container>
      <ListGroup>
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </Container>
  );
}
