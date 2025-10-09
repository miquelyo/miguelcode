// src/App.jsx

import { useState, useEffect } from 'react'; // DIUBAH: Tambahkan useEffect
import { Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient'; // BARU: Impor konektor Supabase

import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import PrivateData from './pages/PrivateData';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // --- KODE TES KONEKSI SUPABASE ---
  // BARU: Blok ini akan berjalan satu kali saat aplikasi pertama kali dimuat.
  useEffect(() => {
    const tesKoneksi = async () => {
      console.log("Mencoba mengambil data dari Supabase...");
      
      // Mengambil data dari tabel 'dokumen'
      const { data, error } = await supabase.from('dokumen').select('*');

      if (error) {
        console.error("Koneksi Gagal:", error.message);
      } else {
        console.log("Koneksi Berhasil! Data:", data);
      }
    };

    tesKoneksi(); // Jalankan fungsi tes
  }, []); // Array kosong berarti efek ini hanya berjalan sekali
  // --- AKHIR KODE TES ---

  // Logika login lama (tidak apa-apa biarkan saja untuk sekarang)
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