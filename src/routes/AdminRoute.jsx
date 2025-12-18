import React from "react";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";
import Loading from "../components/shared/Loading";

const AdminRoute = ({ children }) => {
  const { role, loading } = useRole();

  if (loading) {
    return <Loading />;
  }

  if (role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
