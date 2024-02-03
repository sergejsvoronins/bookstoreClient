import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Book } from "../transport/books";
import { ICartContext } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface IBooksOverview {
  books: Book[];
  err?: string | null;
  cartContext?: ICartContext;
}

export function BooksOverview({ books, cartContext }: IBooksOverview) {
  const navigate = useNavigate();
  const [adding, setAdding] = useState<{ id: number; status: boolean } | null>(
    null
  );
  useEffect(() => {
    setTimeout(() => {
      setAdding(null);
    }, 1500);
  }, [adding]);

  return (
    <>
      <Row>
        {books.length !== 0 &&
          books.map((b, i) => {
            return (
              <Col key={i} xs={6} sm={4} md={3} lg={2}>
                <Card
                  className="p-0 rounded-0 shadow-none mb-5"
                  style={{ width: "136px" }}
                >
                  <div className="text-center">
                    <Card.Img
                      variant="top"
                      src={b.imgUrl || "/images/noImage.png"}
                      className="rounded-0"
                      style={{ height: "160px" }}
                    />
                  </div>
                  <Card.Body
                    className="p-0"
                    onClick={() => navigate(`/book/${b.id}`)}
                  >
                    <Card.Text
                      style={{
                        fontSize: "0.8rem",
                        lineHeight: "18px",
                        height: "75px",
                        overflow: "hidden",
                      }}
                      className="fw-bolder mt-2"
                    >
                      {b.title}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="p-0 border-0">
                    <Card.Title>{b.price} SEK</Card.Title>
                    <Button
                      variant="primary"
                      className="w-100 position-relative"
                      style={{ height: "37px" }}
                      onClick={() => {
                        setAdding({ id: b.id, status: true });

                        if (cartContext) {
                          let seenItem = cartContext.cart.find(
                            (f) => f.item.id === b.id
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
                        }
                      }}
                    >
                      {b.id === adding?.id && adding?.status ? (
                        <Spinner size="sm" />
                      ) : (
                        <>
                          <span>Köp</span>
                        </>
                      )}
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
}
