// login.js
import { supabase } from './supabase.js';

async function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("email")
    .eq("username", username)
    .single();

  if (profileError || !profile) {
    alert("Username tidak ditemukan");
    return;
  }

  const { error: loginError } = await supabase.auth.signInWithPassword({
    email: profile.email,
    password: password,
  });

  if (loginError) {
    alert("Password salah");
  } else {
    window.location.href = "../../pages/dashboard.html";
  }
}

window.login = login;
