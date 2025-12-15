import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
  },
  {
    path: "/auth",
    element: <div>Hi</div>,
  },
]);

export default router;
