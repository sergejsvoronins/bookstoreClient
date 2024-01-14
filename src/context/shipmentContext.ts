import { createContext } from "react";
import { NewShipment } from "../transport/orders";

export interface IShipmentContext {
  shipmentDetails: NewShipment | null;
  updateShipment: (shipment: NewShipment) => void;
}

const startValue: IShipmentContext = {
  shipmentDetails: null,
  updateShipment: () => {},
};
export const ShipmentContext = createContext<IShipmentContext>(startValue);
