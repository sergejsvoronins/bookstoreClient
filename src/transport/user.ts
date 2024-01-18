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
export const createUser = async (user: NewUser) => {
  let response = await axios.post<LoginUser>(`${BASE_URL}/users`, {
    email: user.email,
    password: user.password,
  });
  return response.data;
};
const LoginUserSchema = z.object({
  id: z.number(),
  accountLevel: z.string(),
});

export type LoginUser = z.infer<typeof LoginUserSchema>;

const UserDataSchema = z.object({
  id: z.number(),
  firstName: z.nullable(z.string()),
  lastName: z.nullable(z.string()),
  accountLevel: z.nullable(z.string()),
  password: z.nullable(z.string()),
  address: z.nullable(z.string()),
  zipCode: z.nullable(z.string()),
  city: z.nullable(z.string()),
  mobile: z.nullable(z.string()),
  email: z.nullable(z.string()),
});

export type UserData = z.infer<typeof UserDataSchema>;

const NewUserSchema = z.object({
  email: z.string(),
  password: z.string(),
  samePassword: z.string(),
});

export type NewUser = z.infer<typeof NewUserSchema>;

const PostApiResultSchema = z.object({
  city: z.string(),
});
const PostApiSchema = z.object({
  results: z.array(PostApiResultSchema),
});

export type PostApi = z.infer<typeof PostApiSchema>;
