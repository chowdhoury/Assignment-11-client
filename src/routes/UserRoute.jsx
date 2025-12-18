import React from "react";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";
import Loading from "../components/shared/Loading";

const UserRoute = ({ children }) => {
  const { role, loading } = useRole();

  if (loading) {
    return <Loading />;
  }

  if (role !== "user") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default UserRoute;
