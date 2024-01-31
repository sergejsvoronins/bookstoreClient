import axios from "axios";
import { z } from "zod";
import { BASE_URL } from "./books";

export const getAuthors = async () => {
  let response = await axios.get<Author[]>(`${BASE_URL}/authors`);
  return response.data;
};
export const getOneAuthor = async (id: number) => {
  let response = await axios.get<Author>(`${BASE_URL}/authors/${id}`);
  return response.data;
};
export const addAuthor = async (newAuthor: NewAuthor) => {
  let response = await axios.post<{ id: number; message: string }>(
    `${BASE_URL}/authors`,
    newAuthor
  );
  return response.data;
};
export const updateAuthor = async (author: NewAuthor) => {
  let response = await axios.put(`${BASE_URL}/authors/${author.id}`, author);
  return response.data;
};
export const deleteAuthor = async (id: number) => {
  let response = await axios.delete(`${BASE_URL}/authors/${id}`);
  return response.data;
};
const AuthorSchema = z.object({
  id: z.number(),
  name: z.string(),
});
const NewAuthorSchema = AuthorSchema.extend({
  id: z.optional(z.number()),
});
export type Author = z.infer<typeof AuthorSchema>;
export type NewAuthor = z.infer<typeof NewAuthorSchema>;
