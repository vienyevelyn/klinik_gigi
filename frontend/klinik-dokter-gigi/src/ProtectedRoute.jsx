import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { auth } = useAuth();
  
  if (auth.loading) return <div>Loading...</div>;
  
  if (!auth.isAuthed) return <Navigate to="/login" replace />;

  return children;
}
export default ProtectedRoute;