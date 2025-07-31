// assets/js/auth-check.js
import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    // Tidak ada session → redirect ke login
    window.location.href = '../../login.html';
  }
});
