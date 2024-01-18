import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  Form,
  Button,
} from "react-bootstrap";
import { useContext } from "react";
import { CartContext, ICartContext } from "../context/cartContext";

export function CartToolPanel() {
  const cartContext = useContext<ICartContext>(CartContext);

  function removeItem(index: number) {
    let temp = [...cartContext.cart];
    temp.splice(index, 1);
    cartContext.updateCart(temp);
  }
  return (
    <Container className="py-3">
      {cartContext.cart.length === 0 ? (
        <Row>Varukorg är tom</Row>
      ) : (
        <Row className="gap-2 flex-column">
          {cartContext.cart.map((item) => {
            return (
              <Col key={item.item.id}>
                <Card className="cart-item p-2 flex-row">
                  <Card.Img variant="start" src={item.item.imgUrl || ""} />
                  <CardBody>
                    <Row>
                      <Card.Title>{item.item.title}</Card.Title>
                      <Card.Text>{item.item.author}</Card.Text>
                      <Card.Text>{item.item.year}</Card.Text>
                    </Row>
                    <Row>
                      <Col className="w-50 p-0">
                        <Form.Control
                          className="form-control-sm text.center"
                          type="number"
                          value={item.amount}
                          onChange={(e) => {
                            cartContext.updateCart(
                              cartContext.cart.map((b) =>
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
                    <Row className="justify-content-end">
                      <Col className="fs-6 p-0 my-3" xs={6}>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            const index: number =
                              cartContext.cart.indexOf(item);
                            removeItem(index);
                          }}
                        >
                          Ta bort
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
          <Col className="fs-5">
            <span>Summa inkl moms: </span>
            {cartContext.cart.reduce((accumulator, item) => {
              return accumulator + item.amount * item.item.price;
            }, 0)}{" "}
            :-
          </Col>
        </Row>
      )}
    </Container>
  );
}
