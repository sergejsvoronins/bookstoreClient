import axios from "axios";
import { Book } from "react-bootstrap-icons";
import { z } from "zod";

export const BASE_URL = "http://localhost/bookstore";

export const getAllBooks = async () => {
  let response = await axios.get<Book[]>(`${BASE_URL}/books`);
  return response.data;
};

export const getTopFive = async () => {
  let response = await axios.get<BookTop[]>(`${BASE_URL}/top-books`);
  return response.data;
};

export const getSearchResult = async (searchText: string) => {
  let response = await axios.get<Book[]>(`${BASE_URL}/search`, {
    params: {
      q: searchText,
    },
  });
  return response.data;
};
export const getOneBook = async (id: number) => {
  let response = await axios.get<Book>(`${BASE_URL}/books/${id}`);
  return response.data;
};

export const addBook = async (newBook: NewBook) => {
  try {
    let response = await axios.post(`${BASE_URL}/books`, newBook);
    if (response.status === 201) {
      const id = response.data.id;
      const message = {
        id,
        message: "Book added successfully",
      };
      return message;
    } else {
      throw new Error(`Error adding book: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error adding book:", error);
  }
};

export const updateBook = async (book: NewBook) => {
  let response = await axios.put(`${BASE_URL}/books/${book.id}`, book);
  return response.data;
};

export const deleteBook = async (id: number) => {
  let response = await axios.delete(`${BASE_URL}/books/${id}`);
  return response.data;
};

const BookTopSchema = z.object({
  id: z.number(),
  title: z.string(),
  imgUrl: z.nullable(z.string()),
  price: z.number(),
  amount: z.optional(z.number()),
});
export type BookTop = z.infer<typeof BookTopSchema>;

export const BookSchema = BookTopSchema.extend({
  description: z.nullable(z.string()),
  pages: z.number(),
  year: z.number(),
  language: z.string(),
  author: z.optional(z.string()),
  category: z.optional(z.string()),
  isbn: z.string(),
  authorId: z.number(),
  categoryId: z.number(),
});
export type Book = z.infer<typeof BookSchema>;

const NewBookSchema = BookSchema.extend({
  id: z.optional(z.number()),
});
export type NewBook = z.infer<typeof NewBookSchema>;

const CreateBookResponseSchema = z.object({
  id: z.nullable(z.number()),
  message: z.string(),
});

export type CreateBookResponse = z.infer<typeof CreateBookResponseSchema>;
