import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ProtectedRoute from "../components/protectedRoutes"; // Import ProtectedRoute
import MenuPage from "../pages/Menu/index";
import EditPage from "../pages/EditMenu/index";
import PaymentPage from "../pages/Payment/index";
import LoginPage from "../pages/Login/index";
import Payment2Page from "../pages/Payment2/index";
import SummaryPage from "../pages/Summery/index";
import Summary2Page from "../pages/Summery2/index";
import Summary3Page from "../pages/Summery3/index";
import Summary4Page from "../pages/Summery4/index";
//import Error404 from "../components/layouts/layout.error404";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <LoginPage />, // หน้า Login
      },
      {
        path: "Menu",
        element: (
          <ProtectedRoute>
            <MenuPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "EditMenu",
        element: (
          <ProtectedRoute>
            <EditPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "Payment",
        element: (
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "Payment2", 
        element: (
          <ProtectedRoute>
            <Payment2Page />
          </ProtectedRoute>
        ),
      },
      {
        path: "Summary1",
        element: (
          <ProtectedRoute>
            <SummaryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "Summary2",
        element: (
          <ProtectedRoute>
            <Summary2Page />
          </ProtectedRoute>
        ),
      },
      {
        path: "Summary3",
        element: (
          <ProtectedRoute>
            <Summary3Page />
          </ProtectedRoute>
        ),
      },
      {
        path: "Summary4",
        element: (
          <ProtectedRoute>
            <Summary4Page />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
