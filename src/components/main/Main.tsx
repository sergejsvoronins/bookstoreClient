import { Outlet } from "react-router-dom";
import { Navigation } from "../navigation/Navigation";
import { useState } from "react";
import { Book } from "../../transport/books";
import { CartContext, ICart } from "../../context/cartContext";

export function Main() {
  const [cart, setCart] = useState<ICart[]>([]);

  function updateCart(cart: ICart[]) {
    setCart(cart);
  }
  console.log(cart);

  return (
    <>
      <CartContext.Provider value={{ cart, updateCart }}>
        <Navigation />
        <Outlet></Outlet>
      </CartContext.Provider>
    </>
  );
}
