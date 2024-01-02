import { Outlet } from "react-router-dom";
import { Navigation } from "../navigation/Navigation";

export function Main() {
  return (
    <>
      <Navigation />
      <Outlet></Outlet>
    </>
  );
}
