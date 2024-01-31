import axios from "axios";
import { z } from "zod";
import { BASE_URL, BookSchema } from "./books";

export const getCategories = async () => {
  let response = await axios.get<Category[]>(`${BASE_URL}/categories`);
  return response.data;
};
export const getCategoryBooks = async (id: number) => {
  let response = await axios.get<CategoryBooks>(`${BASE_URL}/categories/${id}`);
  return response.data;
};
export const addCategory = async (newCategory: NewCategory) => {
  let response = await axios.post(`${BASE_URL}/categories`, newCategory);
  return response.data;
};
export const updateCategory = async (category: NewCategory) => {
  let response = await axios.put(
    `${BASE_URL}/categories/${category.id}`,
    category
  );
  return response.data;
};
export const deleteCategory = async (id: number) => {
  await axios.delete(`${BASE_URL}/categories/${id}`);
  return;
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

const CategoryBooksShecma = z.object({
  id: z.number(),
  name: z.string(),
  books: z.array(BookSchema),
});
export type CategoryBooks = z.infer<typeof CategoryBooksShecma>;
