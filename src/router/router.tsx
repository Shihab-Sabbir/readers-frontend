import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import React from "react";
import Home from "../pages/Home";
import AddProduct from "../components/AddProduct";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import BookDetails from "../pages/BookDetails";
import AllBooks from "../pages/AllBooks";
import WishList from "../pages/WishList";
import ReadList from "../pages/ReadList";
import ProtectedRoute from "./protectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: "",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "add-book",
        element: <AddProduct />,
      },
      {
        path: "edit-book/:id",
        element: <AddProduct />,
      },
      {
        path: "all-books",
        element: <AllBooks />,
      },
      {
        path: "wish-list",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "read-list",
        element: (
          <ProtectedRoute>
            <ReadList />
          </ProtectedRoute>
        ),
      },
      {
        path: "get-single-book/:id",
        element: <BookDetails />,
      },
      {
        path: "auth/signin",
        element: <SignIn />,
      },
      {
        path: "auth/signup",
        element: <SignUp />,
      },
    ],
  },
]);
