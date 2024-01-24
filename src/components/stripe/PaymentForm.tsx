import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import {
  IShipmentContext,
  ShipmentContext,
} from "../../context/shipmentContext";
import { addOrder, addShipment } from "../../transport/orders";
import { CartContext, ICartContext } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";

export const PaymentForm = () => {
  const shipmentContext = useContext<IShipmentContext>(ShipmentContext);
  const cartContext = useContext<ICartContext>(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://127.0.0.1:5173/confirmation`,
      },
      redirect: "if_required",
    });
    if (error) {
      error.message && console.log(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      if (shipmentContext.shipmentDetails) {
        try {
          const responseShipment = await addShipment(
            shipmentContext.shipmentDetails
          );

          if (responseShipment) {
            try {
              const responseOrder = await addOrder({
                totalPrice:
                  cartContext.cart.reduce((accumulator, item) => {
                    return accumulator + item.amount * item.item.price;
                  }, 0) + cartContext.freight,
                shipmentId: +responseShipment.id,
                books: cartContext.cart.map((b) => {
                  return { bookId: b.item.id, amount: b.amount };
                }),
              });
              localStorage.removeItem("cart");
              cartContext.updateCart([]);
              navigate(
                `/confirmation?paymentId=${paymentIntent.id}&orderId=${responseOrder?.id}`
              );
            } catch (e) {
              console.log(e);
              navigate("/");
            }
          }
        } catch (e) {
          console.log(e);
          navigate("/");
        }
      }
    } else {
      console.log("An unexpected error occured.");
    }
    setIsProcessing(false);
  };

  return (
    <Form className="my-3" onSubmit={handleSubmit}>
      <Row className="justify-content-center mb-5">
        <Col md={8} lg={6}>
          <PaymentElement />
        </Col>
      </Row>
      <Button
        type="submit"
        variant="primary"
        disabled={isProcessing || !stripe || !elements}
      >
        {isProcessing ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </>
        ) : (
          <>Betala</>
        )}
      </Button>
    </Form>
  );
};
