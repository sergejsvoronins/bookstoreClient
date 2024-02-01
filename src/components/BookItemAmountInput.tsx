import { Button } from "react-bootstrap";
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
      <div>
        <Button
          variant="secondary"
          className="px-3 m-0"
          style={{
            width: "40px",
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
      </div>
      <div>
        <input
          className="rounded-0 px-0 mx-0 text-center border-0"
          style={{ width: "40px" }}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onBlur={() => amount === "" && setAmount("1")}
        />
      </div>
      <div>
        <Button
          variant="secondary"
          className="px-3 m-0 w-100"
          style={{
            width: "40px",
            borderRadius: "50%",
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
          }}
          onClick={() => setAmount((+amount + 1).toString())}
        >
          +
        </Button>
      </div>
    </div>
  );
}
