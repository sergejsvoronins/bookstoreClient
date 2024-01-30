import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { useContext, useEffect, useState } from "react";
import { CartContext, ICart } from "../context/cartContext";
import { CheckOutNav } from "./checkout/CheckOutNav";
import { LoginUser } from "../transport/user";
import { IUserContext, UserContext } from "../context/userContext";
import { Footer } from "./Footer";

export interface MainOutletContext {
  innerWidth: number;
  userIsCreated: boolean;
  setUserIsCreated: (status: boolean) => void;
}

export function Main() {
  const [cart, setCart] = useState<ICart[]>([]);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const location = useLocation();
  const userContext = useContext<IUserContext>(UserContext);
  const [userIsCreated, setUserIsCreated] = useState(false);
  const [orderIsCreated, setOrderIsCreated] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
        {location.pathname !== "/check-out" ? (
          <Navigation innerWidth={innerWidth} />
        ) : (
          <CheckOutNav />
        )}
        <section style={{ minHeight: "500px" }}>
          <Outlet
            context={{
              userIsCreated,
              setUserIsCreated,
              innerWidth,
              orderIsCreated,
              setOrderIsCreated,
            }}
          ></Outlet>
        </section>
        <Footer />
      </CartContext.Provider>
    </>
  );
}
