import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MenuPage from "../pages/Menu/index";
import EditPage from "../pages/EditMenu/index";
import PaymentPage from "../pages/Payment/index";
import Payment2Page from "../pages/Payment2/index";
import SummaryPage from "../pages/Summery/index";
import Summary2Page from "../pages/Summery2/index";
import Summary3Page from "../pages/Summery3/index";
import Summary4Page from "../pages/Summery4/index";


import Error404 from "../components/layouts/layout.error404";
import React from 'react';


const router = createBrowserRouter([
  {
    path: "/", // เส้นทางหลัก
    children: [
      {
        path: "Menu", // ใช้ตัวพิมพ์เล็กทั้งหมด
        element: <MenuPage />,
      },
      {
        path: "EditMenu", 
        element: <EditPage />,
      },
      {
        path: "Payment", 
        element: <PaymentPage />,
      },
      {
        path: "Payment2", 
        element: <Payment2Page />,
      },
      {
        path: "Summary1",
        element: <SummaryPage />,
      },
      {
        path: "Summary2",
        element: <Summary2Page />,
      },
      {
        path: "Summary3",
        element: <Summary3Page />,
      },
      {
        path: "Summary4",
        element: <Summary4Page />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />, // หน้า Error สำหรับเส้นทางที่ไม่ตรงกัน
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
