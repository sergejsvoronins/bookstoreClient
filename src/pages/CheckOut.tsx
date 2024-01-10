import { useContext, useEffect } from "react";
import { Col, Container, ListGroup, Row, Image, Form } from "react-bootstrap";
import { CartContext, ICart, ICartContext } from "../context/cartContext";

export function CheckOut() {
  const cartContext = useContext<ICartContext>(CartContext);
  useEffect(() => {
    try {
      const cartString = localStorage.getItem("cart");
      if (cartString) {
        const cartData: ICart[] = JSON.parse(cartString);
        cartContext.updateCart(cartData);
      }
    } catch (error) {
      console.error("Error fetching cart from local storage:", error);
    }
  }, []);
  return (
    <Container className="my-3">
      <ListGroup>
        <ListGroup.Item action className="fs-2">
          Steg 1 - Varukrog
        </ListGroup.Item>
        {cartContext.cart.map((book) => {
          return (
            <Row key={book.item.id} className="justify-content-center my-3">
              <Col className="d-flex justify-content-center">
                <section className="w-100">
                  <article className="d-flex flex-row gap-4">
                    <div className="w-25 text-end">
                      <Image className="w-100" src={book.item.imgUrl || ""} />
                    </div>
                    <div className="d-flex flex-column">
                      <p>{book.item.title}</p>
                      <p>{book.item.author}</p>
                      <p>{book.item.year}</p>
                    </div>
                  </article>
                  <article className="d-flex flex-row gap-4">
                    <div className="w-25"></div>
                    <div className="d-flex">
                      <Row>
                        <Form.Label className="fs-2 fw-bolder" column xs={3}>
                          Antal:
                        </Form.Label>
                        <Col xs={3}>
                          <Form.Control
                            type="number"
                            value={book.amount}
                            onChange={(e) => {
                              cartContext.updateCart(
                                cartContext.cart.map((b) =>
                                  b.item.id === book.item.id
                                    ? { ...b, amount: +e.target.value }
                                    : b
                                )
                              );
                            }}
                          />
                        </Col>
                        <Col xs={5} className="text-end fs-2 fw-bolder">
                          {book.amount * book.item.price} :-
                        </Col>
                      </Row>
                    </div>
                  </article>
                </section>
              </Col>
            </Row>
          );
        })}
        <ListGroup.Item className="fs-2">Steg 2 - Leveranssätt</ListGroup.Item>
        <ListGroup.Item className="fs-2">
          Steg 3 - Kund information
        </ListGroup.Item>
        <ListGroup.Item className="fs-2">Steg 4 - Betalning</ListGroup.Item>
      </ListGroup>
    </Container>
  );
}
