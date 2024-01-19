import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { useContext, useEffect, useState } from "react";
import { CartContext, ICart } from "../context/cartContext";
import { CheckOutNav } from "./checkout/CheckOutNav";
import { LoginUser } from "../transport/user";
import { IUserContext, UserContext } from "../context/userContext";
import { NavSearch } from "./NavSearch";
import { StartPageCarousel } from "./startPageCarousel";

export interface MainOutletContext {
  // searchText: string;
  // setSearchText: (text: string) => void;
  userIsCreated: boolean;
  setUserIsCreated: (status: boolean) => void;
}

export function Main() {
  const [cart, setCart] = useState<ICart[]>([]);
  const [innerWidth, setInnerWidth] = useState(0);
  const location = useLocation();
  const userContext = useContext<IUserContext>(UserContext);
  const [userIsCreated, setUserIsCreated] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      // const innerWidth = window.innerWidth;
      // setSmalScreen(innerWidth <= 768);
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
          <>
            <Navigation innerWidth={innerWidth} />
            {innerWidth > 768 && <StartPageCarousel />}
            {innerWidth < 768 && <NavSearch />}
          </>
        ) : (
          <CheckOutNav />
        )}
        <Outlet context={{ userIsCreated, setUserIsCreated }}></Outlet>
      </CartContext.Provider>
    </>
  );
}
