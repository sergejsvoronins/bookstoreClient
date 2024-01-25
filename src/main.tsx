import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { UserProvider } from "./components/UserProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <UserProvider>
    <RouterProvider router={router}></RouterProvider>
  </UserProvider>
  // </React.StrictMode>
);
