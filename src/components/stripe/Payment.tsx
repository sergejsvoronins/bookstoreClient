import { Stripe, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { PaymentForm } from "./PaymentForm";
import { ICartContext, CartContext } from "../../context/cartContext";
import { Spinner } from "react-bootstrap";
interface IPayment {
  setOrderIsCreated: (status: boolean) => void;
}
export function Payment({ setOrderIsCreated }: IPayment) {
  const cartContext = useContext<ICartContext>(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    fetch("http://localhost:5252/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);
  useEffect(() => {
    if (isLoading) return;
    fetch("http://localhost:5252/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount:
          cartContext.cart.reduce((accumulator, item) => {
            return accumulator + item.amount * item.item.price;
          }, 0) + cartContext.freight,
      }),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
      setIsLoading(true);
    });
  }, []);
  return (
    <>
      {stripePromise && clientSecret && isLoading ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm setOrderIsCreated={setOrderIsCreated} />
        </Elements>
      ) : (
        <Spinner />
      )}
    </>
  );
}
