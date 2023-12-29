import axios from "axios";

export interface IBook {
  id: number;
  title: string;
  description: string | null;
  pages: number | null;
  year: number;
  language: string;
  price: number;
  isbn: number;
}
const BASE_URL = "http://localhost/bookstore";
export const getAllBooks = async () => {
  let response = await axios.get<IBook[]>(`${BASE_URL}/books`);
  return response.data;
};
