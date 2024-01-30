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
import {
  addOrder,
  addShipment,
  addUserOrder,
  deleteShipment,
} from "../../transport/orders";
import { CartContext, ICartContext } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";
import { IUserContext, UserContext } from "../../context/userContext";

export const PaymentForm = ({
  setOrderIsCreated,
}: {
  setOrderIsCreated: (status: boolean) => void;
}) => {
  const shipmentContext = useContext<IShipmentContext>(ShipmentContext);
  const { user } = useContext<IUserContext>(UserContext);
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
    if (shipmentContext.shipmentDetails) {
      try {
        const responseShipment = await addShipment(
          shipmentContext.shipmentDetails
        );
        if (responseShipment?.id) {
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
            if (responseShipment.id) {
              try {
                if (user) {
                  const responseOrder = await addUserOrder({
                    totalPrice:
                      cartContext.cart.reduce((accumulator, item) => {
                        return accumulator + item.amount * item.item.price;
                      }, 0) + cartContext.freight,
                    userId: user.id,
                    shipmentId: responseShipment.id,
                    books: cartContext.cart.map((b) => {
                      return {
                        bookId: b.item.id,
                        amount: b.amount,
                      };
                    }),
                  });
                  setOrderIsCreated(true);
                  navigate(
                    `/check-out/confirmation?paymentId=${paymentIntent.id}&orderId=${responseOrder?.id}`
                  );
                } else {
                  const responseOrder = await addOrder({
                    totalPrice:
                      cartContext.cart.reduce((accumulator, item) => {
                        return accumulator + item.amount * item.item.price;
                      }, 0) + cartContext.freight,
                    shipmentId: responseShipment.id,
                    books: cartContext.cart.map((b) => {
                      return { bookId: b.item.id, amount: b.amount };
                    }),
                  });
                  setOrderIsCreated(true);
                  navigate(
                    `/check-out/confirmation?paymentId=${paymentIntent.id}&orderId=${responseOrder?.id}`
                  );
                }
                localStorage.removeItem("cart");
                cartContext.updateCart([]);
              } catch (e) {
                console.log(e);
                navigate("/");
              }
            }
          } else {
            const removeShipment = async () => {
              await deleteShipment(responseShipment.id);
            };
            removeShipment();
          }
        }
      } catch (e) {
        if (e) return;
      }
    }

    setIsProcessing(false);
  };

  return (
    <Form className="my-3" onSubmit={handleSubmit}>
      <Row className="justify-content-center mt-5">
        <Col md={8} lg={6} xl={5} xxl={4}>
          <PaymentElement />
          <Button
            type="submit"
            variant="success"
            disabled={isProcessing || !stripe || !elements}
            className="w-100 my-3"
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
        </Col>
      </Row>
    </Form>
  );
};
