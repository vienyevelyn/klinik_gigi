import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children, role }) {
  const { auth } = useAuth();
  
  if (auth.loading) return <div>Loading...</div>;
  
  if (!auth.isAuthed || auth.role !== role) return <Navigate to="/loginpatient" replace />;

  return children;
}
export default ProtectedRoute;