import { Main } from "./components/Main";
import { SearchResult } from "./components/SearchResult";
import { Confirmation } from "./components/stripe/Confirmation";
import { AdminPage } from "./pages/admin/AdminPage";
import { CategoryBooks } from "./pages/CategoryBooks";
import { CheckOut } from "./pages/CheckOut";
import { CreateAccountPage } from "./pages/user/CreateAccountPage";
import { LoginPage } from "./pages/user/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SingleBook } from "./pages/SingleBook";
import { StartPage } from "./pages/StartPage";
import { UserAccountConfirmation } from "./pages/user/userAccountConfirmation";
import App from "./App";
import { AdminBooksPage } from "./pages/admin/AdminBooksPage";
import { AdminCategoriesPage } from "./pages/admin/AdminCategoriesPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdminOrdersPage } from "./pages/admin/AdminOrdersPage";
import { AdminOrderInfoPage } from "./pages/admin/AdminOrderInfoPage";
import { AccountOrdersPage } from "./pages/user/AccountOrdersPage";
import { AccountUserDataPage } from "./pages/user/AccountUserDataPage";
import { AccountPage } from "./pages/user/AccountPage";
import { CheckOutForm } from "./components/CheckoutForm";
import { AdminAuthorsPage } from "./pages/admin/AdminAuthorsPage";
import { createBrowserRouter } from "react-router-dom";

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
            children: [
              {
                path: "/check-out",
                element: <CheckOutForm />,
              },
              {
                path: "/check-out/confirmation",
                element: <Confirmation />,
              },
            ],
          },
          // {
          //   path: "/confirmation",
          //   element: <Confirmation />,
          // },
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
                element: <AdminOrderInfoPage />,
              },
            ],
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/create",
            element: <CreateAccountPage />,
          },
          {
            path: "/account/:id/confirmation",
            element: <UserAccountConfirmation />,
          },
          {
            path: "/account",
            element: <AccountPage />,
            children: [
              {
                path: "/account/orders",
                element: <AccountOrdersPage />,
              },
              {
                path: "/account/profile",
                element: <AccountUserDataPage />,
              },
            ],
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
