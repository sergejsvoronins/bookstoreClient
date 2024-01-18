import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { useContext, useEffect, useState } from "react";
import { CartContext, ICart } from "../context/cartContext";
import { CheckOutNav } from "./checkout/CheckOutNav";
import { LoginUser } from "../transport/user";
import { IUserContext, UserContext } from "../context/userContext";

export interface MainOutletContext {
  // searchText: string;
  // setSearchText: (text: string) => void;
  userIsCreated: boolean;
  setUserIsCreated: (status: boolean) => void;
}

export function Main() {
  const [cart, setCart] = useState<ICart[]>([]);
  const location = useLocation();
  const userContext = useContext<IUserContext>(UserContext);
  const [userIsCreated, setUserIsCreated] = useState(false);
  useEffect(() => {
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const user: LoginUser = JSON.parse(userString);
        userContext.setUser(user);
      }
    } catch (error) {
      console.error("Error fetching cart from local storage:", error);
    }
  }, []);
  function updateCart(cart: ICart[]) {
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return (
    <>
      <CartContext.Provider value={{ cart, updateCart, freight: 39 }}>
        {location.pathname !== "/check-out" ? <Navigation /> : <CheckOutNav />}
        <Outlet context={{ userIsCreated, setUserIsCreated }}></Outlet>
      </CartContext.Provider>
    </>
  );
}
