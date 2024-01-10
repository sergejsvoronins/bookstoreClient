import { createContext } from "react";
import { Book } from "../transport/books";

export interface ICart {
  item: Book;
  amount: number;
}
// export interface ICartOutletContext {
//   cart: ICart[];
//   updateCart: (cart: ICart[]) => void;
// }
export interface ICartContext {
  cart: ICart[];
  updateCart: (cart: ICart[]) => void;
}

const startValue: ICartContext = {
  cart: [],
  updateCart: () => {},
};
export const CartContext = createContext<ICartContext>(startValue);
