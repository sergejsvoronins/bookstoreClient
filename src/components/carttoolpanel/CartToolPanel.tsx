import { Col, Container, Row, Card, CardBody, Form } from "react-bootstrap";
import "../carttoolpanel/CartToolPanel.scss";
import { useContext, useEffect, useState } from "react";
import { CartContext, ICart, ICartContext } from "../../context/cartContext";

export function CartToolPanel() {
  const cartContext = useContext<ICartContext>(CartContext);
  const [cart, setCart] = useState<ICart[]>(cartContext.cart);
  useEffect(() => {
    cartContext.updateCart(cart);
  }, [cart]);

  return (
    <Container className="py-3">
      <Row className="gap-2 flex-column">
        {cart.map((item) => {
          return (
            <Col>
              <Card className="cart-item p-2 flex-row">
                <Card.Img variant="start" src={item.item.imgUrl || ""} />
                <CardBody>
                  <Row>
                    <Card.Title className="fs-6">{item.item.title}</Card.Title>
                  </Row>
                  <Row>
                    <Col className="w-50 p-0">
                      <Form.Control
                        className="form-control-sm text.center"
                        type="number"
                        value={item.amount}
                        onChange={(e) => {
                          setCart((oldstate) =>
                            oldstate.map((b) =>
                              b.item.id === item.item.id
                                ? { ...b, amount: +e.target.value }
                                : b
                            )
                          );
                        }}
                      />
                    </Col>
                    <Col className="w-50 text-center p-0">
                      {item.item.price * item.amount} kr
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          );
        })}
        <Col>
          Summa:{" "}
          {cart.reduce((accumulator, item) => {
            return accumulator + item.amount * item.item.price;
          }, 0)}
        </Col>
      </Row>
    </Container>
  );
}
