import { createContext } from "react";
import { LoginUser } from "../transport/user";

export interface IUserContext {
  user: LoginUser | null;
  setUser: (user: LoginUser | null) => void;
}

const startValue: IUserContext = {
  user: null,
  setUser: () => {},
};

export const UserContext = createContext<IUserContext>(startValue);
