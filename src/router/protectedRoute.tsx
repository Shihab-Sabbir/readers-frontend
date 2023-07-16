import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = JSON.parse(localStorage.getItem('readers-current-user') || 'null');
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to='/auth/signin' replace />;
  }
}
