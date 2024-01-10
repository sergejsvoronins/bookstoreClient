import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "../navigation/Navigation";
import { useState } from "react";
import { CartContext, ICart } from "../../context/cartContext";
import { CheckOutNav } from "../checkout/CheckOutNav";

export interface MainOutletContext {
  searchText: string;
  setSearchText: (text: string) => void;
}

export function Main() {
  const [cart, setCart] = useState<ICart[]>([]);
  const location = useLocation();

  function updateCart(cart: ICart[]) {
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return (
    <>
      <CartContext.Provider value={{ cart, updateCart }}>
        {location.pathname !== "/check-out" ? <Navigation /> : <CheckOutNav />}
        <Outlet></Outlet>
      </CartContext.Provider>
    </>
  );
}
