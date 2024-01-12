import { useContext, useEffect } from "react";
import {
  Col,
  Container,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { CartContext, ICart, ICartContext } from "../context/cartContext";
import { CustomerForm } from "../components/customerform/CustomerForm";
import { CheckoutForm } from "../components/stripe/CheckoutForm";
import { Payment } from "../components/stripe/Payment";

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
          Steg 1 - Varukorg
        </ListGroup.Item>
        {cartContext.cart.map((book) => {
          return (
            <Row key={book.item.id} className="justify-content-center p-5">
              <Col className="d-flex justify-content-center">
                <section className="w-100">
                  <article className="d-flex flex-row gap-4">
                    <Col xs={4} md={2} lg={1}>
                      <Image className="w-100" src={book.item.imgUrl || ""} />
                    </Col>
                    <Col xs={8} md={10} lg={11} className="d-flex flex-column">
                      <p>{book.item.title}</p>
                      <p>{book.item.author}</p>
                      <p>{book.item.year}</p>
                    </Col>
                  </article>
                  <article className="d-flex flex-row gap-4">
                    <Col xs={4} md={2} lg={1}></Col>
                    <Row className="w-100 fs-5 fs-md-1">
                      <Form.Label
                        column
                        xs={4}
                        sm={3}
                        md={2}
                        lg={1}
                        className="m-0 p-0 mr-1"
                      >
                        Antal:
                      </Form.Label>
                      <Col xs={3} sm={2} lg={1} className="d-flex m-0 p-0">
                        <Form.Control
                          type="number"
                          className="p-0 m-0 text-center"
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
                      <Col
                        xs={5}
                        sm={7}
                        md={8}
                        lg={10}
                        className="d-flex justify-content-end align-items-center m-0 p-0"
                      >
                        {book.amount * book.item.price} :-
                      </Col>
                    </Row>
                  </article>
                </section>
              </Col>
            </Row>
          );
        })}
        <Row className="fs-1 fw-bolder justify-content-between p-5">
          <Col xs={3}>Totalt:</Col>
          <Col xs={9} className="text-end">
            {cartContext.cart.reduce((accumulator, item) => {
              return accumulator + item.amount * item.item.price;
            }, 0)}{" "}
            :-
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Button type="button">Gå vidare</Button>
          </Col>
        </Row>
        <ListGroup.Item className="fs-2">Steg 2 - Leveranssätt</ListGroup.Item>
        <ListGroup.Item className="fs-2">
          Steg 3 - Kund information
        </ListGroup.Item>
        <CustomerForm />
        <ListGroup.Item className="fs-2">Steg 4 - Betalning</ListGroup.Item>
        <Payment />
      </ListGroup>
    </Container>
  );
}
