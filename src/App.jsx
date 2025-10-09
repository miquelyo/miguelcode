// src/App.jsx
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import PrivateData from './pages/PrivateData';
import ProtectedRoute from './components/ProtectedRoute'; // <-- Impor satpamnya

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (password) => {
    const correctPassword = 'rahasia123';

    if (password === correctPassword) {
      setIsLoggedIn(true);
      navigate('/privatedata');
    } else {
      alert('Password salah!');
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      
      {/* Terapkan ProtectedRoute di sini */}
      <Route
        path="/privatedata"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <PrivateData />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;