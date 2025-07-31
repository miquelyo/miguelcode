// login.js
import { supabase } from './supabase.js';

async function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // Tampilkan loading SweetAlert
  Swal.fire({
    title: 'Logging in...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  // Cari email berdasarkan username
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("email")
    .eq("username", username)
    .single();

  if (profileError || !profile) {
    Swal.fire({
      icon: 'error',
      title: 'Username tidak ditemukan',
      text: 'Silakan periksa kembali username Anda.'
    });
    return;
  }

  // Login dengan email yang ditemukan
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email: profile.email,
    password: password,
  });

  if (loginError) {
    Swal.fire({
      icon: 'error',
      title: 'Password salah',
      text: 'Silakan coba lagi.'
    });
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Berhasil Login!',
      text: 'Mengalihkan ke dashboard...',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      window.location.href = "../../pages/dashboard.html";
    });
  }
}

window.login = login;

  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  togglePassword.addEventListener("click", () => {
    const isVisible = passwordInput.type === "text";
    passwordInput.type = isVisible ? "password" : "text";
    togglePassword.classList.toggle("bx-hide", isVisible);
    togglePassword.classList.toggle("bx-show", !isVisible);
  });

