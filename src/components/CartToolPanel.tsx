import { Col, Container, Row, Image } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";
import { useContext } from "react";
import { CartContext, ICartContext } from "../context/cartContext";
import { BookItemAmountInput } from "./BookItemAmountInput";

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
        <Row className="gap-2  flex-column">
          {cartContext.cart.map((item) => {
            return (
              <Row className="cart-item mb-4 flex-row">
                <Col className="px-0 d-flex" xs={4}>
                  <Image
                    src={item.item.imgUrl || ""}
                    className="rounded-0 mb-2 w-100"
                  />
                </Col>
                <Col xs={8}>
                  <Row className="justify-content-end">
                    <Col className="d-flex justify-content-end p-0 mb-2" xs={6}>
                      <Trash3
                        className="delete-item"
                        onClick={() => {
                          const index: number = cartContext.cart.indexOf(item);
                          removeItem(index);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <h6
                      style={{
                        fontSize: "0.8rem",
                        lineHeight: "18px",
                      }}
                      className="mb-3"
                    >
                      {item.item.title}
                    </h6>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        lineHeight: "18px",
                      }}
                      className="pe-0"
                    >
                      {item.item.author}
                    </p>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        lineHeight: "18px",
                      }}
                      className="mb-3 pe-0"
                    >
                      {item.item.year}
                    </p>
                  </Row>
                </Col>
                <Col
                  xs={12}
                  className="d-flex justify-content-between my-3 px-0"
                >
                  <Col xs={6}>
                    {/* <div className="d-flex align-items-center w-100">
                      <Col xs={3} className="p-0">
                        <Button
                          variant="secondary"
                          className="px-3 m-0 w-100"
                          style={{
                            borderStartStartRadius: "50%",
                            borderEndStartRadius: "50%",
                            borderEndEndRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                        >
                          -
                        </Button>
                      </Col>
                      <Col xs={6}>
                        <FormControl
                          className="rounded-0 px-0 text-center"
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
                          style={{
                            border: "0",
                            boxShadow: "none",
                          }}
                        />
                      </Col>
                      <Col xs={3} className="d-flex p-0">
                        <Button
                          variant="secondary"
                          className="px-3 m-0 w-100"
                          style={{
                            borderRadius: "50%",
                            borderTopLeftRadius: "0",
                            borderBottomLeftRadius: "0",
                          }}
                        >
                          +
                        </Button>
                      </Col>
                    </div> */}
                    <BookItemAmountInput cartItem={item} />
                  </Col>
                  <Col
                    xs={6}
                    className="d-flex justify-content-end align-items-center fw-bolder fs-4 px-0"
                  >
                    {item.item.price * item.amount} SEK
                  </Col>
                </Col>
                <hr />
              </Row>
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
