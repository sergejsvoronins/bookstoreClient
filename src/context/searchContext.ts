import { createContext } from "react";

export interface ISearchContext {
  searchText: string;
  setSearchText: (text: string) => void;
}

const startValue: ISearchContext = {
  searchText: "",
  setSearchText: () => {},
};
export const SearchContext = createContext<ISearchContext>(startValue);
