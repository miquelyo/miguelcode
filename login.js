const supabase = window.supabase.createClient(
  'https://stlmvxnmscdqlmgeatlx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0bG12eG5tc2NkcWxtZ2VhdGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MTAxMDksImV4cCI6MjA2NDQ4NjEwOX0.gWqbTikgN2ot3JY7k7OWMmk9_Xj0f30NoRWGt3XL31c'
);

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const errorDiv = document.getElementById('error');

loginBtn.addEventListener('click', async () => {
  errorDiv.textContent = '';

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    errorDiv.textContent = 'Email dan password wajib diisi';
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    errorDiv.textContent = 'Login gagal: ' + error.message;
  } else {
    // Login berhasil, redirect ke dashboard
    window.location.href = 'dashboard.html';
  }
});
