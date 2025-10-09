// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // Jika belum login, "tendang" pengguna ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika sudah login, tampilkan halaman yang diminta
  return children;
}

export default ProtectedRoute;