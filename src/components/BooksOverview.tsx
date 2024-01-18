import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Accordion,
} from "react-bootstrap";
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
    <Container>
      <Row>
        {books.length !== 0 ? (
          books.map((b) => {
            return (
              <Col key={b.id} xs={6} md={4} lg={3}>
                <Card>
                  <Card.Body onClick={() => navigate(`/book/${b.id}`)}>
                    <div className="card-img p-4">
                      <Card.Img
                        variant="top"
                        src={b.imgUrl || ""}
                        className="image"
                      />
                    </div>
                    <Card.Title className="h6">{b.title}</Card.Title>
                  </Card.Body>
                  <Card.Footer>
                    <Card.Title>{b.price} SEK</Card.Title>
                    <Button
                      variant="primary"
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
          })
        ) : err === null ? (
          <Col className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Sidan laddas...</span>
            </Spinner>
          </Col>
        ) : (
          <Col>Det finns inga böcker i denna kategori</Col>
        )}
      </Row>
      {/* <LoadGoogleBooks /> */}
    </Container>
  );
}
