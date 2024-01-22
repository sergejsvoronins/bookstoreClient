import { createBrowserRouter } from "react-router-dom";
import { AuthorsManager } from "./components/AuthorsManager";
import { BooksManager } from "./components/BooksManager";
import { CategoriesManager } from "./components/CategoriesManager";
import { CreateItem } from "./components/CreateItem";
import { Main } from "./components/Main";
import { SearchResult } from "./components/SearchResult";
import { UpdateItem } from "./components/UpdateItem";
import { UsersManager } from "./components/UsersManager";
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
import { CreateBook } from "./trash/CreateBook";
import { AdminBooksPage } from "./pages/AdminBooksPage";

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
                element: <UsersManager />,
                children: [
                  {
                    path: "/admin/users/create",
                    element: <CreateItem type="users" />,
                  },
                  {
                    path: "/admin/users/update",
                    element: <UpdateItem type="users" />,
                  },
                ],
              },
              {
                path: "/admin/authors",
                element: <AuthorsManager />,
                children: [
                  {
                    path: "/admin/authors/create",
                    element: <CreateItem type="authors" />,
                  },
                  {
                    path: "/admin/authors/update",
                    element: <UpdateItem type="authors" />,
                  },
                ],
              },
              {
                path: "/admin/categories",
                element: <CategoriesManager />,
                children: [
                  {
                    path: "/admin/categories/create",
                    element: <CreateItem type="categories" />,
                  },
                  {
                    path: "/admin/categories/update",
                    element: <UpdateItem type="categories" />,
                  },
                ],
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
          // {
          //   path: "/admin/books",
          //   element: <AdminBooksPage />,
          // },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
