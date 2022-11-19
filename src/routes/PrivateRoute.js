import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SpinnerComponent } from "../components/SpinnerComponent";
import { useAuthStatus } from "../hooks/useAuthStatus";

export const PrivateRoute = () => {
  const { isLoggedIn, loading } = useAuthStatus();
  if (loading) {
    return (
      <div className="flex justify-center items-center bg-black bg-opacity-50 fixed left-0 right-0 top-0 bottom-0">
        <SpinnerComponent />
      </div>
    );
  }
  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</>;
};
