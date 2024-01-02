import { useEffect, useState } from "react";
import { Book, getAllBooks } from "../transport/books";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

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
        {books.map((b) => (
          <Col xs={12} md={6} lg={4} xl={3}>
            <Card>
              <Card.Img variant="top" />
              <Card.Body>
                <Card.Title>{b.title}</Card.Title>
                <Card.Text>{b.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Card.Title>{b.price}</Card.Title>
                <Button variant="primary">Köp</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
