import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { StartPage } from "./pages/StartPage";
import { BooksOverview } from "./pages/booksoverview/BooksOverview";
import { Main } from "./components/main/Main";
import { SingleBook } from "./pages/SingleBook";
import { AdminPage } from "./pages/AdminPage";
import { BooksManager } from "./components/booksManager/BooksManager";
import { UsersManager } from "./components/userManager/UsersManager";
import { AuthorsManager } from "./components/authorsManager/AuthorsManager";
import { CategoriesManager } from "./components/categoriesManager/CategoriesManager";
import { UpdateItem } from "./components/updateItem/UpdateItem";
import { CreateItem } from "./components/createItem/CreateItem";

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
          {
            path: "/admin",
            element: <AdminPage />,
            children: [
              {
                path: "/admin/books",
                element: <BooksManager />,
                children: [
                  {
                    path: "/admin/books/create",
                    element: <CreateItem type="books" />,
                  },
                  {
                    path: "/admin/books/update",
                    element: <UpdateItem type="books" />,
                  },
                ],
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
        ],
      },
    ],
  },
]);
