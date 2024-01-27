import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { CartContext, ICart, ICartContext } from "../../context/cartContext";
import { useContext, useEffect } from "react";
import { BookItemAmountInput } from "../BookItemAmountInput";
import { Trash3 } from "react-bootstrap-icons";

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
    <>
      {cartContext.cart.map((item) => {
        return (
          // <Row key={book.item.id} className="justify-content-center p-5">
          //   <Col className="d-flex justify-content-center">
          //     <section className="w-100">
          //       <article className="d-flex flex-row gap-4">
          //         <Col xs={4} md={2} lg={1}>
          //           <Image className="w-100" src={book.item.imgUrl || ""} />
          //         </Col>
          //         <Col xs={8} md={10} lg={11} className="d-flex flex-column">
          //           <p>{book.item.title}</p>
          //           <p>{book.item.author}</p>
          //           <p>{book.item.year}</p>
          //         </Col>
          //       </article>
          //       <article className="d-flex flex-row gap-4">
          //         <Col xs={4} md={2} lg={1}></Col>
          //         <Row className="w-100 fs-5 fs-md-1">
          //           <Form.Label
          //             column
          //             xs={4}
          //             sm={3}
          //             md={2}
          //             lg={1}
          //             className="m-0 p-0 mr-1"
          //           >
          //             Antal:
          //           </Form.Label>
          //           <Col xs={3} sm={2} lg={1} className="d-flex m-0 p-0">
          //             <Form.Control
          //               type="number"
          //               className="p-0 m-0 text-center"
          //               value={book.amount}
          //               onChange={(e) => {
          //                 cartContext.updateCart(
          //                   cartContext.cart.map((b) =>
          //                     b.item.id === book.item.id
          //                       ? { ...b, amount: +e.target.value }
          //                       : b
          //                   )
          //                 );
          //               }}
          //             />
          //           </Col>
          //           <Col
          //             xs={5}
          //             sm={7}
          //             md={8}
          //             lg={10}
          //             className="d-flex justify-content-end align-items-center m-0 p-0"
          //           >
          //             {book.amount * book.item.price} :-
          //           </Col>
          //         </Row>
          //       </article>
          //     </section>
          //   </Col>
          // </Row>
          <Row className="cart-item mb-4 flex-row mx-0 p-5">
            <Col className="px-0 d-flex" xs={4} md={3}>
              <Image
                src={item.item.imgUrl || ""}
                className="rounded-0 mb-2 w-100"
              />
            </Col>
            <Col xs={9}>
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
            <Col xs={12} className="d-flex justify-content-between my-3 px-0">
              <Col xs={6}>
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
      <Row className="fs-3 fw-bolder justify-content-between px-5">
        <Col xs={3}>Frakt:</Col>
        <Col xs={9} className="text-end">
          {cartContext.freight}
          :-
        </Col>
      </Row>
      <Row className="fs-1 fw-bolder justify-content-between px-5 py-3">
        <Col xs={3}>Totalt:</Col>
        <Col xs={9} className="text-end">
          {cartContext.cart.reduce((accumulator, item) => {
            return accumulator + item.amount * item.item.price;
          }, 0) + cartContext.freight}
          :-
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <a href="#customerForm">
            <Button type="button" onClick={() => setCartIsOk(true)}>
              Gå vidare
            </Button>
          </a>
        </Col>
      </Row>
    </>
  );
}
