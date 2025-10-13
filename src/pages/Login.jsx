// src/pages/Login.jsx
import { useState } from 'react';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(password);
  };

  return (
    // Latar Belakang Gelap dengan Gradasi
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      
      {/* Kartu Kaca (Glass Card) */}
      <div 
        className="w-full max-w-sm p-8 space-y-8 rounded-2xl shadow-lg
                   bg-black/30 backdrop-blur-lg border border-white/20"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            Welcome back Miguel
          </h1>
          <p className="text-gray-300 mt-2">
            Sign in to your private dashboard
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Form Kustom */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm 
                         bg-gray-700/50 border border-gray-600 text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-md shadow-sm font-semibold text-white
                       bg-cyan-500 hover:bg-cyan-600 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Masuk
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default Login;