import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Book, getOneBook } from "../transport/books";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Row,
} from "react-bootstrap";
import { ICartContext, CartContext } from "../context/cartContext";

export function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [amount, setAmount] = useState("1");
  const cartContext = useContext<ICartContext>(CartContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getBook = async () => {
      if (id) {
        try {
          let response = await getOneBook(+id);
          setBook(response);
        } catch (e) {
          console.log(e);
        }
      }
    };
    getBook();
  }, []);
  return (
    <Container>
      {book && (
        <Card>
          <Row className="justify-content-center">
            <Col xs={12}>
              <Card.Header>
                <Nav defaultActiveKey="/" as="ul">
                  <Nav.Item as="li">
                    <Nav.Link
                      // href="/"
                      onClick={() => navigate("/")}
                    >
                      Tillbaka
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
            </Col>
            <Col xs={6} md={4} lg={3} className="p-5">
              <Card.Img
                variant="top"
                src={book?.imgUrl || ""}
                className="p-1"
              />
            </Col>
            <Col xs={12} md={8} lg={9}>
              <Card.Body>
                <article className="d-flex flex-row gap-4">
                  <Col xs={8} md={10} lg={11} className="d-flex flex-column">
                    <p>{book.title}</p>
                    <p>{book.author}</p>
                    <p>{book.year}</p>
                    <h2>{book.price}</h2>
                  </Col>
                </article>
                <article className="d-flex flex-row gap-4">
                  <Row className="w-100 justify-content-between">
                    <Form.Label
                      column
                      xs={4}
                      sm={3}
                      md={2}
                      lg={1}
                      className="d-flex"
                    >
                      Antal:
                    </Form.Label>
                    <Col
                      xs={8}
                      sm={6}
                      // md={5}
                      lg={4}
                      className="d-flex gap-1 justify-content-end"
                    >
                      <Button
                        variant="secondary"
                        disabled={amount === "1"}
                        onClick={() => setAmount((+amount - 1).toString())}
                      >
                        -
                      </Button>
                      <Form.Control
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        onBlur={() => amount === "" && setAmount("1")}
                        className="text-center w-50"
                      />
                      <Button
                        variant="secondary"
                        onClick={() => setAmount((+amount + 1).toString())}
                      >
                        +
                      </Button>
                    </Col>
                  </Row>
                </article>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Button
                    onClick={() => {
                      if (cartContext.cart.find((b) => b.item.id === book.id)) {
                        cartContext.updateCart(
                          cartContext.cart.map((b) =>
                            b.item.id === book.id
                              ? {
                                  ...b,
                                  amount: +amount + b.amount,
                                }
                              : b
                          )
                        );
                      } else {
                        cartContext.updateCart([
                          ...cartContext.cart,
                          { item: book, amount: +amount },
                        ]);
                      }
                    }}
                  >
                    Lägg till varukorg
                  </Button>
                </Row>
              </Card.Footer>
              <Accordion>
                {book.description && (
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Beskrivning</Accordion.Header>
                    <Accordion.Body>{book.description}</Accordion.Body>
                  </Accordion.Item>
                )}
                <Accordion.Item eventKey="1">
                  <Accordion.Header>ProduktInfo</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col xs={4}>Författare:</Col>
                      <Col xs={8}>{book.author}</Col>
                    </Row>
                    <Row>
                      <Col xs={4}>Språk:</Col>
                      <Col xs={8}>{book.language}</Col>
                    </Row>
                    <Row>
                      <Col xs={4}>Utgiven:</Col>
                      <Col xs={8}>{book.year}</Col>
                    </Row>
                    <Row>
                      <Col xs={4}>Antal sidor:</Col>
                      <Col xs={8}>{book.pages}</Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Card>
      )}
    </Container>
  );
}
