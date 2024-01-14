import axios from "axios";
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
export const getCategoiesBooks = async (id: number) => {
  let response = await axios.get<Book[]>(`${BASE_URL}/categories/${id}`);
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
// export const addBook = async (newBook: NewBook) => {
//   try {
//     let response = await axios.post(
//       `${BASE_URL}/books`,
//       newBook
//     );
//     return response.data;
//   } catch (err) {
//     const axiosError = err as AxiosError<{ message: string; status: number }>;
//     const errorMessage = axiosError.message;
//     const error: CreateBookResponse = { id: null, message: errorMessage };
//     return err;
//   }
// };
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
  isbn: z.number(),
});

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
export type Book = z.infer<typeof BookSchema>;
export type NewBook = z.infer<typeof NewBookSchema>;

const CreateBookResponseSchema = z.object({
  id: z.nullable(z.number()),
  message: z.string(),
});

export type CreateBookResponse = z.infer<typeof CreateBookResponseSchema>;
