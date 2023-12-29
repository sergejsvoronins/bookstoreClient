import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { StartPage } from "./pages/StartPage";
import { BooksOverview } from "./pages/BooksOverview";
import { Main } from "./components/Main";
import { SingleBook } from "./pages/SingleBook";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
        children: [
          {
            path: "/",
            element: <StartPage />,
            index: true,
          },
          {
            path: "/books",
            element: <BooksOverview />,
          },
          {
            path: "/books/:id",
            element: <SingleBook />,
          },
        ],
      },
    ],
  },
]);
