import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = document.cookie.split("; ").find(row => row.startsWith("token="));

  // หากไม่มี token ให้รีไดเร็กต์ไปหน้า login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
