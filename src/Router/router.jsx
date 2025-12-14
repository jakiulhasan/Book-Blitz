import React from "react";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello</div>,
  },
  {
    path: "/add",
    element: <div>Hi</div>,
  },
]);

export default router;
