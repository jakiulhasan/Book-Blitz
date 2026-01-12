import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import Homepage from "../Components/Pages/Homepage";
import AllBooks from "../Components/Pages/AllBook/AllBooks";
import UserDashboard from "../Components/Pages/Dashboard/UserDashboard";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../Components/Pages/Dashboard/AdminDashboard";
import UserRoute from "./UserRoute";
import LibrarianRoute from "./LibrarianRoute";
import LibrarianDashboard from "../Components/Pages/Dashboard/LibrarianDashboard";
import { Book } from "lucide-react";
import BookDetails from "../Components/BookDetails/BookDetails";
import PaymentCancelled from "../Components/Pages/Dashboard/PaymentCancelled";
import PaymentSuccess from "../Components/Pages/Dashboard/PaymentSuccess";
import RequestBook from "../Components/RequestBook/RequestBook";
import { Wishlist } from "../Components/wishlist/Wishlist";

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
        path: "/books",
        Component: AllBooks,
      },
      {
        path: "/request-book",
        Component: RequestBook,
      },
      {
        path: "/wishlist",
        Component: Wishlist,
      },
      {
        path: "/books/:isbn",
        Component: BookDetails,
      },
      {
        path: "/user/dashboard",
        element: (
          <PrivateRoute>
            <UserRoute>
              <UserDashboard />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "/dashboard/payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "/librarian/dashboard",
        element: (
          <PrivateRoute>
            <LibrarianRoute>
              <LibrarianDashboard />
            </LibrarianRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
