// script.js

// Inisialisasi Supabase client ada di supabase.js
// Pastikan file ini sudah diload di HTML setelah supabase.js

// 🔒 Mendapatkan user yang sedang login dan info profilnya
async function getUser() {
  const { data, error } = await supabaseClient.auth.getUser();
  if (error || !data.user) {
    window.location.href = "login.html";
    return;
  }

  const userId = data.user.id;

  const { data: profile, error: profileError } = await supabaseClient
    .from("profiles")
    .select("username, full_name")
    .eq("id", userId)
    .single();

  if (profileError || !profile) {
    document.getElementById("user-info").innerText = "Gagal memuat profil.";
  } else {
    document.getElementById("user-info").innerText = 
      `Halo, ${profile.full_name || profile.username}!`;
  }

  // Setelah user berhasil, panggil fungsi untuk ambil data lainnya
  getCertificates(userId);
  getDocuments(userId);
}

// 📜 Ambil data sertifikat dari tabel `certificates`
async function getCertificates(userId) {
  const { data, error } = await supabaseClient
    .from("certificates")
    .select("title, issuer, date_issued")
    .eq("user_id", userId)
    .order("date_issued", { ascending: false });

  const list = document.getElementById("certificates-list");
  if (error || !data || data.length === 0) {
    list.innerText = "Belum ada data sertifikat.";
    return;
  }

  list.innerHTML = data.map(item => `
    <div class="card">
      <h4>${item.title}</h4>
      <p>${item.issuer}</p>
      <small>Diterbitkan: ${item.date_issued}</small>
    </div>
  `).join('');
}

// 📄 Ambil data dokumen pribadi dari tabel `personal_documents`
async function getDocuments(userId) {
  const { data, error } = await supabaseClient
    .from("personal_documents")
    .select("type, number, issued_date")
    .eq("user_id", userId)
    .order("issued_date", { ascending: false });

  const list = document.getElementById("documents-list");
  if (error || !data || data.length === 0) {
    list.innerText = "Belum ada dokumen pribadi.";
    return;
  }

  list.innerHTML = data.map(item => `
    <div class="card">
      <h4>${item.type}</h4>
      <p>Nomor: ${item.number}</p>
      <small>Diterbitkan: ${item.issued_date}</small>
    </div>
  `).join('');
}

// 🚪 Fungsi logout
async function logout() {
  await supabaseClient.auth.signOut();
  window.location.href = "login.html";
}

// Saat halaman dibuka
if (window.location.pathname.includes("dashboard.html")) {
  getUser();
}

// 🔐 Lupa Password
const forgotLink = document.getElementById('forgot-password');
if (forgotLink) {
  forgotLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = prompt("Masukkan email kamu untuk reset password:");
    if (!email) return;

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email);

    if (error) {
      alert('Gagal mengirim link reset password: ' + error.message);
    } else {
      alert('Link reset password telah dikirim ke email kamu.');
    }
  });
}
