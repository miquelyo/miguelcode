// src/components/ProtectedRoute.jsx
import React from 'react'; // Impor React
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Meneruskan props 'onLogout' ke children (PrivateData)
  return React.cloneElement(children, { onLogout: children.props.onLogout });
}

export default ProtectedRoute;