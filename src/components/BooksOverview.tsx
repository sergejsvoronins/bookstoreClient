import { Row, Col, Card, Button } from "react-bootstrap";
import { Book } from "../transport/books";
import { ICartContext } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

interface IBooksOverview {
  books: Book[];
  err: string | null;
  cartContext?: ICartContext;
}

export function BooksOverview({ books, err, cartContext }: IBooksOverview) {
  const navigate = useNavigate();
  return (
    <>
      <Row className="mt-3">
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
                      src={b.imgUrl || ""}
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
                      className="fw-bolder"
                    >
                      {b.title}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="p-0 border-0">
                    <Card.Title>{b.price} SEK</Card.Title>
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={() => {
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
                      Köp
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
