// NOTED: Script reset password setelah redirect email Supabase

import { supabase } from './supabase.js';

const form = document.getElementById('reset-form');
const passwordInput = document.getElementById('new-password');
const statusMessage = document.getElementById('status-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newPassword = passwordInput.value.trim();

  if (!newPassword) {
    statusMessage.textContent = "Password tidak boleh kosong.";
    return;
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error(error.message);
    statusMessage.textContent = "Gagal reset password: " + error.message;
  } else {
    statusMessage.textContent = "Password berhasil diubah. Silakan login kembali.";
    form.reset();
  }
});
