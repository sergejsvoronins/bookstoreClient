import axios from "axios";
import { z } from "zod";
import { BASE_URL } from "./books";

const PostCodeApiKey = "541c3af8f6c34a3f9c8149af4b08d31779da49a5";
export const getCityByZip = async (zip: string) => {
  let response = await axios.get<PostApi>(
    `https://api.papapi.se/lite/?query=${zip}&format=json&apikey=${PostCodeApiKey}`
  );
  return response.data;
};

export const login = async (userInput: { email: string; password: string }) => {
  let response = await axios.post<LoginUser>(`${BASE_URL}/login`, userInput);
  return response.data;
};

export const getAllUsers = async () => {
  let response = await axios.get<UserData[]>(`${BASE_URL}/users`);
  return response.data;
};
export const getOneUser = async (id: number) => {
  let response = await axios.get<UserData>(`${BASE_URL}/users/${id}`);
  return response.data;
};

export const createUser = async (user: NewUser) => {
  let response = await axios.post(`${BASE_URL}/users`, {
    email: user.email,
    password: user.password,
  });
  return response.data;
};
const LoginUserSchema = z.object({
  id: z.number(),
  accountLevel: z.string(),
});
export const updateUserLevel = async (user: NewUser) => {
  let response = await axios.put<NewUser>(
    `${BASE_URL}/user-level/${user.id}`,
    user
  );
  return response.data;
};

export const deleteUser = async (id: number) => {
  await axios.delete(`${BASE_URL}/users/${id}`);
};

export const updateUserData = async (user: UserData) => {
  let response = await axios.put<UserData>(
    `${BASE_URL}/users/${user.id}`,
    user
  );
  return response.data;
};

export const updatePassword = async (object: UpdatePassword) => {
  let response = await axios.put<boolean>(
    `${BASE_URL}/user-password/${object.id}`,
    object
  );
  return response.data;
};
export type LoginUser = z.infer<typeof LoginUserSchema>;

export const UserDataSchema = z.object({
  id: z.number(),
  firstName: z.optional(z.nullable(z.string())),
  lastName: z.optional(z.nullable(z.string())),
  accountLevel: z.string(),
  password: z.string(),
  address: z.optional(z.nullable(z.string())),
  zipCode: z.optional(z.nullable(z.string())),
  city: z.optional(z.nullable(z.string())),
  mobile: z.optional(z.nullable(z.string())),
  email: z.string(),
});

export type UserData = z.infer<typeof UserDataSchema>;

const NewUserSchema = UserDataSchema.extend({
  id: z.optional(z.number()),
  email: z.string(),
  password: z.string(),
  samePassword: z.optional(z.string()),
});

export type NewUser = z.infer<typeof NewUserSchema>;

const PostApiResultSchema = z.object({
  city: z.string(),
});
const PostApiSchema = z.object({
  results: z.array(PostApiResultSchema),
});

export type PostApi = z.infer<typeof PostApiSchema>;

const UpdatePasswordSchema = z.object({
  id: z.number(),
  password: z.string(),
  oldPassword: z.string(),
});
export type UpdatePassword = z.infer<typeof UpdatePasswordSchema>;
