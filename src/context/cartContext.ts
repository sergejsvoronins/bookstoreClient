import { createContext } from "react";
import { Book } from "../transport/books";

export interface ICart {
  item: Book;
  amount: number;
}
export interface ICartContext {
  cart: ICart[];
  freight: number;
  updateCart: (cart: ICart[]) => void;
}

const startValue: ICartContext = {
  cart: [],
  freight: 0,
  updateCart: () => {},
};
export const CartContext = createContext<ICartContext>(startValue);
