// src/App.jsx

import { useState, useEffect } from 'react'; // Pastikan useEffect diimpor
import { Routes, Route, useNavigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import PrivateData from './pages/PrivateData';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // --- Logika Login & Sesi (Tidak Berubah) ---
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const navigate = useNavigate();

  const handleLogin = (password) => {
    const correctPassword = 'migel69'; // Password Anda
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

  // --- BAGIAN BARU UNTUK TEMA (LIGHT/DARK MODE) ---
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // 1. Mengubah class 'dark' pada elemen <html>
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 2. Mengubah warna bar browser di HP
    const themeColor = theme === 'dark' ? '#111827' : '#ffffff';
    document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
  }, [theme]); // Efek ini akan berjalan setiap kali 'theme' berubah

  // Fungsi untuk mengganti tema
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  // --- AKHIR BAGIAN TEMA ---

  return (
    // Gunakan Fragment (<>) untuk membungkus Routes dan tombol tema
    <>
      {/* Tombol ini hanya untuk contoh agar kita bisa tes ganti tema */}
      {/* Anda bisa memindahkannya nanti */}
      <button 
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 z-50 btn btn-primary btn-circle shadow-lg"
      >
        🎨
      </button>

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
    </>
  );
}

export default App;