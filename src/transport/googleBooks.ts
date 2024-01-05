import axios from "axios";

interface IIsbnType {
  type: string;
  identifier: string;
}

interface IGoogleBook {
  title: string;
  authors: string[];
  publishedDate: string;
  description: string;
  industryIdentifiers: IIsbnType[];
  pageCount: number;
  categories: string[];
  imageLinks: { smallThumbnail: string; thumbnail: string };
  language: string;
}
export interface IGoogleBookInfo {
  volumeInfo: IGoogleBook;
  saleInfo: { listPrice: { amount: number } };
}
interface IGoogleResponse {
  kind: string;
  totalItems: number;
  items: IGoogleBookInfo[];
}

export const getGoogleBooks = async (amount: number, index: number) => {
  let response = await axios.get<IGoogleResponse>(
    `https://www.googleapis.com/books/v1/volumes?q=lang:sv&maxResults=${amount}&startIndex=${index}`
  );
  return response.data;
};
