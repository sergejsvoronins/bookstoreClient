import { Row, Col, Image, Button } from "react-bootstrap";
import { CartContext, ICart, ICartContext } from "../../context/cartContext";
import { useContext, useEffect } from "react";
import { BookItemAmountInput } from "../BookItemAmountInput";

export function CheckOutCart({
  setCartIsOk,
}: {
  setCartIsOk: (status: boolean) => void;
}) {
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
  function removeItem(index: number) {
    let temp = [...cartContext.cart];
    temp.splice(index, 1);
    cartContext.updateCart(temp);
  }
  return (
    <Col lg={12}>
      {cartContext.cart.map((item, i) => {
        return (
          <Row
            key={i}
            className="cart-item flex-row mx-0 pt-3 px-1 justify-content-between"
          >
            <Col className="px-0" xs={4} sm={3} md={2} lg={2}>
              <Image
                src={item.item.imgUrl || ""}
                className="rounded-0 mb-2 w-100 p-3"
              />
            </Col>
            <Col
              xs={8}
              sm={9}
              md={10}
              lg={9}
              className="d-flex flex-column justify-content-between mt-3"
            >
              <Row>
                <h6
                  style={{
                    lineHeight: "1rem",
                    fontSize: "1rem",
                  }}
                  className="mb-3  pe-0"
                >
                  {item.item.title}
                </h6>
                <p
                  style={{
                    lineHeight: "1rem",
                    fontSize: "0.8rem",
                  }}
                  className="pe-0"
                >
                  {item.item.author}
                </p>
                <p
                  style={{
                    lineHeight: "1rem",
                    fontSize: "0.8rem",
                  }}
                  className="mb-3 pe-0"
                >
                  {item.item.year}
                </p>
              </Row>
              <Row className="justify-content-end mb-3">
                <Col
                  xs={6}
                  className="d-flex justify-content-end align-items-center fw-bolder fs-4 px-0"
                >
                  <span>{item.item.price * item.amount + " SEK"}</span>
                </Col>
              </Row>
            </Col>
            <Col
              xs={12}
              className="d-flex justify-content-between my-3 w-100 px-0"
            >
              <Col xs={4} sm={3} md={2} lg={2}>
                <BookItemAmountInput cartItem={item} />
              </Col>
              <Col className="d-flex justify-content-end p-0" xs={6}>
                <Button
                  className="rounded-pill"
                  variant="outline-danger"
                  onClick={() => {
                    const index: number = cartContext.cart.indexOf(item);
                    removeItem(index);
                  }}
                >
                  Ta bort
                </Button>
              </Col>
            </Col>
            <hr />
          </Row>
        );
      })}
      <Row className="fs-5 justify-content-between">
        <Col xs={3}>Frakt:</Col>
        <Col xs={9} className="text-end">
          {cartContext.freight}
          :-
        </Col>
      </Row>
      <Row className="fw-bolder justify-content-between py-3">
        <Col xs={6} className="fs-5">
          Totalt ink moms:
        </Col>
        <Col xs={6} className="text-end fs-4">
          {cartContext.cart.reduce((accumulator, item) => {
            return accumulator + item.amount * item.item.price;
          }, 0) +
            cartContext.freight +
            " SEK"}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Button type="button" onClick={() => setCartIsOk(true)}>
            Gå vidare
          </Button>
        </Col>
      </Row>
    </Col>
  );
}
