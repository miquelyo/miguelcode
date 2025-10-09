// src/pages/Login.jsx
import { useState } from 'react';

// Terima props onLogin dari App.jsx
function Login({ onLogin }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Panggil fungsi onLogin dan kirim password yang diinput
    onLogin(password);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Area Pribadi</h1>
      <p>Silakan masukkan password untuk melanjutkan.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password Anda"
          style={{ marginRight: '8px' }}
        />
        <button type="submit">Masuk</button>
      </form>
    </div>
  );
}

export default Login;