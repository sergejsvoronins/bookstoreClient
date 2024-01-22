import axios from "axios";
import { Book } from "react-bootstrap-icons";
import { z } from "zod";

export const BASE_URL = "http://localhost/bookstore";

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
export const getCategoryBooks = async (id: number) => {
  let response = await axios.get<CategoryBooks>(`${BASE_URL}/categories/${id}`);
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
export const getOneCategory = async (id: number) => {
  let response = await axios.get<NewCategory>(`${BASE_URL}/categories/${id}`);
  return response.data;
};
export const getOneAuthor = async (id: number) => {
  let response = await axios.get<Author>(`${BASE_URL}/authors/${id}`);
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
export const addAuthor = async (newAuthor: NewAuthor) => {
  try {
    let response = await axios.post(`${BASE_URL}/authors`, newAuthor);
    if (response.status === 201) {
      const id = response.data.id;
      const message = {
        id,
        message: "Author added successfully",
      };
      return message;
    } else {
      throw new Error(`Error adding author: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error adding author:", error);
  }
};
export const addCategory = async (newCategory: NewCategory) => {
  try {
    let response = await axios.post(`${BASE_URL}/categories`, newCategory);
    if (response.status === 201) {
      const id = response.data.id;
      const message = {
        id,
        message: "Category added successfully",
      };
      return message;
    } else {
      throw new Error(`Error adding category: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error adding category:", error);
  }
};
export const updateCategory = async (category: NewCategory) => {
  let response = await axios.put(
    `${BASE_URL}/categories/${category.id}`,
    category
  );
  return response.data;
};
export const updateAuthor = async (author: NewAuthor) => {
  let response = await axios.put(`${BASE_URL}/authors/${author.id}`, author);
  return response.data;
};
export const deleteBook = async (id: number) => {
  let response = await axios.delete(`${BASE_URL}/books/${id}`);
  return response.data;
};
export const deleteCategory = async (id: number) => {
  let response = await axios.delete(`${BASE_URL}/categories/${id}`);
  return response.data;
};
export const deleteAuthor = async (id: number) => {
  let response = await axios.delete(`${BASE_URL}/authors/${id}`);
  return response.data;
};
const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  booksAmount: z.optional(z.number()),
});
const NewCategorySchema = CategorySchema.extend({
  id: z.optional(z.number()),
});
export type Category = z.infer<typeof CategorySchema>;

export type NewCategory = z.infer<typeof NewCategorySchema>;
const BookSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.nullable(z.string()),
  imgUrl: z.nullable(z.string()),
  pages: z.number(),
  year: z.number(),
  language: z.string(),
  author: z.string(),
  category: z.string(),
  price: z.number(),
  isbn: z.string(),
  authorId: z.number(),
  categoryId: z.number(),
});
export type Book = z.infer<typeof BookSchema>;

const CategoryBooksShecma = z.object({
  id: z.number(),
  name: z.string(),
  books: z.array(BookSchema),
});
export type CategoryBooks = z.infer<typeof CategoryBooksShecma>;
const AuthorSchema = z.object({
  id: z.number(),
  name: z.string(),
});
const NewAuthorSchema = AuthorSchema.extend({
  id: z.optional(z.number()),
});
export type Author = z.infer<typeof AuthorSchema>;
export type NewAuthor = z.infer<typeof NewAuthorSchema>;

const NewBookSchema = BookSchema.extend({
  id: z.optional(z.number()),
});
export type NewBook = z.infer<typeof NewBookSchema>;

const CreateBookResponseSchema = z.object({
  id: z.nullable(z.number()),
  message: z.string(),
});

export type CreateBookResponse = z.infer<typeof CreateBookResponseSchema>;
