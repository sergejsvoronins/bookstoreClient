import { Button, Col, FormControl } from "react-bootstrap";
import { CartContext, ICart, ICartContext } from "../context/cartContext";
import { useContext, useEffect, useState } from "react";

export function BookItemAmountInput({ cartItem }: { cartItem: ICart }) {
  const [amount, setAmount] = useState(cartItem.amount.toString());
  const cartContext = useContext<ICartContext>(CartContext);

  useEffect(() => {
    cartContext.updateCart(
      cartContext.cart.map((b) =>
        b.item.id === cartItem.item.id ? { ...b, amount: +amount } : b
      )
    );
  }, [amount]);
  return (
    <div className="d-flex align-items-center w-100">
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
          disabled={amount === "1"}
          onClick={() => setAmount((+amount - 1).toString())}
        >
          -
        </Button>
      </Col>
      <Col xs={6}>
        <FormControl
          className="rounded-0 px-0 text-center"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onBlur={() => amount === "" && setAmount("1")}
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
          onClick={() => setAmount((+amount + 1).toString())}
        >
          +
        </Button>
      </Col>
    </div>
  );
}
