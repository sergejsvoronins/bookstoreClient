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
const NewShipmentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  zip: z.string(),
  city: z.string(),
  mobile: z.string(),
  email: z.string(),
});

export type NewShipment = z.infer<typeof NewShipmentSchema>;
