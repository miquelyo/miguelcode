// src/pages/Login.jsx
import { useState } from 'react';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(password);
  };

  return (
    // DIUBAH: Tambahkan `px-4` untuk memberi padding horizontal di layar kecil
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      {/* DIUBAH: Padding disesuaikan, p-6 untuk mobile, p-8 untuk layar lebih besar */}
      <div className="p-6 sm:p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* DIUBAH: Ukuran teks disesuaikan, lebih kecil di mobile */}
          <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
            Area Pribadi
          </h1>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password Anda"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;