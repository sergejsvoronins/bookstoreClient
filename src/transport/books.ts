import axios from "axios";
export interface IBook {
  id: number;
  title: string;
}
// interface IBookResponse {
//   books: IBook[];
// }
const BASE_URL = "http://localhost/bookstore";
export const getAllBooks = async () => {
  let response = await axios.get<IBook[]>(`${BASE_URL}/books`);
  return response.data;
};
