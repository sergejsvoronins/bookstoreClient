import { useEffect, useState } from "react";
import {
  Book,
  NewAuthor,
  addAuthor,
  addBook,
  getAllBooks,
} from "../transport/books";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { getGoogleBooks } from "../transport/googleBooks";
import { LoadGoogleBooks } from "../components/LoadGoogleBooks";

export function BooksOverview() {
  const [books, setBooks] = useState<Book[]>([]);
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
    <Container>
      <Row>
        {books.length !== 0 &&
          books.map((b) => {
            return (
              <Col key={b.id} xs={12} md={6} lg={4} xl={3}>
                <Card>
                  <Card.Img variant="top" src={b.imgUrl || ""} />
                  <Card.Body>
                    <Card.Title>{b.title}</Card.Title>
                  </Card.Body>
                  <Card.Footer>
                    <Card.Title>{b.price} SEK</Card.Title>
                    <Button variant="primary">Köp</Button>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
      </Row>
      {/* <LoadGoogleBooks amount={30} /> */}
    </Container>
  );
}
