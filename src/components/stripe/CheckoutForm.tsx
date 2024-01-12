import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";

export const CheckoutForm = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {}, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://127.0.0.1:5173/confirmation`,
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      error.message && setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };
  return (
    <Form className="my-3" onSubmit={handleSubmit}>
      <Row className="justify-content-center mb-5">
        <Col lg={6}>
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
      {/* {message && <div id="payment-message">{message}</div>} */}
    </Form>
  );
};
