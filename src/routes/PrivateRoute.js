import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

export const PrivateRoute = () => {
  const { isLoggedIn, loading } = useAuthStatus();
  if (loading) {
    return <p>Loading...</p>;
  }
  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</>;
};
