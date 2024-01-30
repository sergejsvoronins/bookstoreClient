import { useState } from "react";
import { ShipmentContext } from "../context/shipmentContext";
import { NewShipment } from "../transport/orders";
import { Outlet } from "react-router-dom";

export interface ICheckOutOutletContext {
  orderIsCreated: boolean;
  setOrderIsCreated: (status: boolean) => void;
}
export function CheckOut() {
  const [shipmentDetails, setShipmentDetails] = useState<NewShipment | null>(
    null
  );
  const [orderIsCreated, setOrderIsCreated] = useState(false);
  const updateShipment = (shipment: NewShipment) => {
    setShipmentDetails(shipment);
  };
  return (
    <>
      <ShipmentContext.Provider value={{ shipmentDetails, updateShipment }}>
        <Outlet context={{ orderIsCreated, setOrderIsCreated }}></Outlet>
      </ShipmentContext.Provider>
    </>
  );
}
