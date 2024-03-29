import axios from "axios";
import { z } from "zod";
import { BASE_URL } from "./books";
import { UserDataSchema } from "./user";

export const getAllGuestOrders = async () => {
  let response = await axios.get<OrderOverview[]>(`${BASE_URL}/orders`);
  return response.data;
};
export const getAllUserOrders = async () => {
  let response = await axios.get<OrderOverview[]>(`${BASE_URL}/user-orders`);
  return response.data;
};
export const getGuestOrderMetaData = async (id: string) => {
  let response = await axios.get<OrderDetails>(`${BASE_URL}/orders/${id}`);
  return response.data;
};
export const getClientOrderMetaData = async (id: string) => {
  let response = await axios.get<OrderDetails>(`${BASE_URL}/user-order/${id}`);
  return response.data;
};
export const addShipment = async (shipment: NewShipment) => {
  let response = await axios.post(`${BASE_URL}/shipments`, shipment);
  return response.data;
};
export const deleteShipment = async (id: number) => {
  await axios.delete(`${BASE_URL}/shipments/${id}`);
  return;
};
export const getOneUserOrders = async (id: number) => {
  let response = await axios.get<OrderDetails[]>(
    `${BASE_URL}/user-orders/${id}`
  );
  return response.data;
};
export const addOrder = async (order: NewOrder) => {
  let response = await axios.post(`${BASE_URL}/orders`, order);
  return response.data;
};
export const addUserOrder = async (order: NewOrder) => {
  let response = await axios.post(`${BASE_URL}/user-orders`, order);
  return response.data;
};
export const updateGuestOrder = async (order: OrderOverview) => {
  let response = await axios.put<boolean>(
    `${BASE_URL}/orders/${order.id}`,
    order
  );
  return response.data;
};
export const updateClientOrder = async (order: OrderOverview) => {
  let response = await axios.put<boolean>(
    `${BASE_URL}/user-orders/${order.id}`,
    order
  );
  return response.data;
};
const NewShipmentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  zipCode: z.string(),
  city: z.string(),
  mobile: z.string(),
  email: z.string(),
});

export type NewShipment = z.infer<typeof NewShipmentSchema>;

const BooksSchema = z.object({
  bookId: z.number(),
  imgUrl: z.optional(z.nullable(z.string())),
  amount: z.number(),
  title: z.optional(z.string()),
  bookPrice: z.optional(z.number()),
});

const NewOrderSchema = z.object({
  id: z.optional(z.number()),
  totalPrice: z.number(),
  userId: z.optional(z.nullable(z.number())),
  shipmentId: z.number(),
  books: z.array(BooksSchema),
});
export type NewOrder = z.infer<typeof NewOrderSchema>;

const OrderStatusesSchema = z.enum([
  "new",
  "processing",
  "shipped",
  "completed",
  "canceled",
  "returned",
]);

const OrderOverviewSchema = z.object({
  id: z.number(),
  orderStatus: OrderStatusesSchema,
  orderDate: z.optional(z.number()),
});
export type OrderOverview = z.infer<typeof OrderOverviewSchema>;
export type OrderStatuses = z.infer<typeof OrderStatusesSchema>;
const OrderDetailsSchema = OrderOverviewSchema.extend({
  totalPrice: z.number(),
  shipmentId: z.number(),
  shipmentDetails: NewShipmentSchema,
  books: z.array(BooksSchema),
  userId: z.optional(z.number()),
  userinfo: z.optional(UserDataSchema),
});
export type OrderDetails = z.infer<typeof OrderDetailsSchema>;
