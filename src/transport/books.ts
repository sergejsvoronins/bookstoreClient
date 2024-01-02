import axios from "axios";
import { z } from "zod";

const BASE_URL = "http://localhost/bookstore";

export const getAllBooks = async () => {
  let response = await axios.get<Book[]>(`${BASE_URL}/books`);
  return response.data;
};

export const getAuthors = async () => {
  let response = await axios.get<Author[]>(`${BASE_URL}/authors`);
  return response.data;
};
export const getCategories = async () => {
  let response = await axios.get<Category[]>(`${BASE_URL}/categories`);
  return response.data;
};
const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Category = z.infer<typeof CategorySchema>;
const BookSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.nullable(z.string()),
  pages: z.nullable(z.number()),
  year: z.number(),
  language: z.string(),
  authorId: z.number(),
  categoryId: z.number(),
  price: z.number(),
  isbn: z.number(),
});

const AuthorSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
});
export type Author = z.infer<typeof AuthorSchema>;
const NewBookSchema = BookSchema.extend({
  id: z.nullable(z.number()),
});
export type Book = z.infer<typeof BookSchema>;
export type NewBook = z.infer<typeof NewBookSchema>;
