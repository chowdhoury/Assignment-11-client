import React from "react";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";
import Loading from "../components/shared/Loading";

const LibrariansRoute = ({ children }) => {
  const { role, loading } = useRole();

  if (loading) {
    return <Loading />;
  }

  if (role !== "librarian") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default LibrariansRoute;
