import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import Homepage from "../Components/Pages/Homepage";
import AllBooks from "../Components/Pages/AllBook/AllBooks";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Homepage,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/all-books",
        Component: AllBooks,
      },
    ],
  },
]);

export default router;
