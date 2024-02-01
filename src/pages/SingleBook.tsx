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
    window.scrollTo(0, 0);
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
                    <Nav.Link onClick={() => navigate("/")}>Tillbaka</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
            </Col>
            <Col xs={6} sm={5} lg={3} className="p-3">
              <Card.Img
                variant="top"
                src={book?.imgUrl || ""}
                className="p-3"
              />
            </Col>
            <Col xs={12} md={8} lg={9}>
              <Card.Body>
                <article className="d-flex flex-row gap-4">
                  <Col xs={8} md={10} lg={11} className="d-flex flex-column">
                    <p>{book.title}</p>
                    <p>{book.author}</p>
                    <p>{book.year}</p>
                    <h2>{book.price} SEK</h2>
                  </Col>
                </article>
                <Row className="mb-3">
                  <Col
                    xs={12}
                    sm={6}
                    lg={4}
                    xl={3}
                    className="d-flex mb-3 gap-1 justify-content-end"
                    style={{ maxWidth: "200px" }}
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
                  <Col xs={12} sm={6} lg={4} xl={3}>
                    <Button
                      className="w-100"
                      onClick={() => {
                        if (
                          cartContext.cart.find((b) => b.item.id === book.id)
                        ) {
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
                  </Col>
                </Row>
              </Card.Body>
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
