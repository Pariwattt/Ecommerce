import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRoles = ["USER"] }) => {
  const token = document.cookie.split("; ").find(row => row.startsWith("token="));

  if (!token) {
    return <Navigate to="/" replace />;
  }

  // ดึงค่าจาก token และ decode (ถ้าใช้ JWT)
  const tokenValue = token.split("=")[1];
  let decodedToken;

  try {
    decodedToken = JSON.parse(atob(tokenValue.split('.')[1])); // Decode JWT token
  } catch (e) {
    console.error("Token is invalid or corrupted.");
    return <Navigate to="/Menu" replace />;
  }

  // ตรวจสอบว่าผู้ใช้มี role ที่อยู่ใน requiredRoles
  if (!requiredRoles.includes(decodedToken.role)) {
    return <Navigate to="/Menu" replace />;
  }

  return children;
};

export default ProtectedRoute;