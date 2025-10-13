// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import PrivateData from './pages/PrivateData';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // --- Logika Login & Sesi ---
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const navigate = useNavigate();

  const handleLogin = (password) => {
    const correctPassword = 'migel69';
    if (password === correctPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      navigate('/privatedata');
    } else {
      alert('Password salah!');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  // --- Logika Tema ---
  // DIUBAH: setTheme diganti _setTheme untuk menandakan tidak terpakai
  const [theme, _setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const themeColor = theme === 'dark' ? '#111827' : '#f9fafb'; // Warna disesuaikan
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor);
    }
  }, [theme]);


  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route
        path="/privatedata"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <PrivateData onLogout={handleLogout} /> 
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;