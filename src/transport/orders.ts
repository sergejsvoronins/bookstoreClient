import axios from "axios";
import { z } from "zod";
import { BASE_URL } from "./books";

export const addShipment = async (shipment: NewShipment) => {
  try {
    let response = await axios.post(`${BASE_URL}/shipments`, shipment);
    if (response.status === 201) {
      const id = response.data.id;
      const message = {
        id,
        message: "Shipment created successfully",
      };
      return message;
    } else {
      throw new Error(`Error adding shipment: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error adding shipment:", error);
  }
};
export const addOrder = async (order: NewOrder) => {
  try {
    let response = await axios.post(`${BASE_URL}/orders`, order);
    if (response.status === 201) {
      const id = response.data.id;
      const message = {
        id,
        message: "Order created successfully",
      };
      return message;
    } else {
      throw new Error(`Error adding order: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error adding order:", error);
  }
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
  amount: z.number(),
});

const NewOrderSchema = z.object({
  id: z.optional(z.number()),
  totalPrice: z.number(),
  shipmentId: z.number(),
  books: z.array(BooksSchema),
});
export type NewOrder = z.infer<typeof NewOrderSchema>;