import { createBrowserRouter } from "react-router-dom";
import { Main } from "./components/Main";
import { SearchResult } from "./components/SearchResult";
import { Confirmation } from "./components/stripe/Confirmation";
import { AdminPage } from "./pages/AdminPage";
import { CategoryBooks } from "./pages/CategoryBooks";
import { CheckOut } from "./pages/CheckOut";
import { CreateAccountPage } from "./pages/CreateAccountPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SingleBook } from "./pages/SingleBook";
import { StartPage } from "./pages/StartPage";
import { UserAccountConfirmation } from "./pages/userAccountConfirmation";
import App from "./App";
import { AdminBooksPage } from "./pages/AdminBooksPage";
import { AdminCategoriesPage } from "./pages/AdminCategoriesPage";
import { AdminAuthorsPage } from "./pages/AdminAuthorsPage";
import { AdminUsersPage } from "./pages/AdminUsersPage";
import { AdminOrdersPage } from "./pages/AdminOrdersPage";

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
            path: "/book/:id",
            element: <SingleBook />,
          },
          {
            path: "/category/:id",
            element: <CategoryBooks />,
          },
          {
            path: "/search",
            element: <SearchResult />,
          },
          {
            path: "/check-out",
            element: <CheckOut />,
          },
          {
            path: "/confirmation",
            element: <Confirmation />,
          },
          {
            path: "/admin",
            element: <AdminPage />,
            children: [
              {
                path: "/admin/books",
                element: <AdminBooksPage />,
              },
              {
                path: "/admin/users",
                element: <AdminUsersPage />,
              },
              {
                path: "/admin/authors",
                element: <AdminAuthorsPage />,
              },
              {
                path: "/admin/categories",
                element: <AdminCategoriesPage />,
              },
              {
                path: "/admin/orders",
                element: <AdminOrdersPage />,
              },
              {
                path: "/admin/orders/:id",
                element: <AdminOrdersPage />,
              },
            ],
          },
          {
            path: "/account/login",
            element: <LoginPage />,
          },
          {
            path: "/account/create",
            element: <CreateAccountPage />,
          },
          {
            path: "/account/:id/confirmation",
            element: <UserAccountConfirmation />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
