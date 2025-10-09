// src/App.jsx

import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import PrivateData from './pages/PrivateData';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // Cek localStorage saat pertama kali dimuat untuk menjaga sesi login
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  
  const navigate = useNavigate();

  // Fungsi untuk menangani proses login
  const handleLogin = (password) => {
    // Ganti 'rahasia123' dengan password Anda
    const correctPassword = 'migel69';

    if (password === correctPassword) {
      // Simpan status login ke localStorage
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      navigate('/privatedata');
    } else {
      alert('Password salah!');
    }
  };
  
  // Fungsi untuk menangani proses logout
  const handleLogout = () => {
    // Hapus status login dari localStorage
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      
      <Route
        path="/privatedata"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            {/* Kirim fungsi handleLogout ke PrivateData */}
            <PrivateData onLogout={handleLogout} /> 
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;