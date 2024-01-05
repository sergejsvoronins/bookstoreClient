import { useContext, useEffect, useState } from "react";
import { Book, getAllBooks } from "../../transport/books";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../booksoverview/BooksOverview.scss";
import { ICartContext, CartContext } from "../../context/cartContext";

interface ICart {
  item: Book;
  amount: number;
}

export function BooksOverview() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const cartContext = useContext<ICartContext>(CartContext);
  useEffect(() => {
    const getBooks = async () => {
      const response = await getAllBooks();
      setBooks(response);
      setIsLoaded(true);
    };
    if (isLoaded) return;
    getBooks();
  }, [isLoaded]);
  useEffect(() => {
    const query = window.location.search;
    const searchParams = new URLSearchParams(query);
    const categoryNumber = searchParams.get("category");
    categoryNumber && setCategoryId(+categoryNumber);
  }, []);

  return (
    <Container>
      <Row>
        {books.length !== 0 &&
          books
            .filter((f) => (categoryId ? f.categoryId === categoryId : f))
            .map((b) => {
              return (
                <Col key={b.id} xs={6} md={4} lg={3}>
                  <Card>
                    <div className="card-img p-4">
                      <Card.Img
                        variant="top"
                        src={b.imgUrl || ""}
                        className="image"
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className="h6">{b.title}</Card.Title>
                    </Card.Body>
                    <Card.Footer>
                      <Card.Title>{b.price} SEK</Card.Title>
                      <Button
                        variant="primary"
                        onClick={() => {
                          let seenItem = cartContext.cart.find(
                            (f) => f.item === b
                          );
                          if (seenItem) {
                            const temp = [...cartContext.cart];
                            temp.map((book) =>
                              book === seenItem ? book.amount++ : null
                            );
                            cartContext.updateCart(temp);
                          } else {
                            cartContext.updateCart([
                              ...cartContext.cart,
                              { item: b, amount: 1 },
                            ]);
                          }
                        }}
                      >
                        Köp
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
      </Row>
      {/* <LoadGoogleBooks /> */}
    </Container>
  );
}
