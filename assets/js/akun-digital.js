import { supabase } from './supabase.js';

// — Cek login
let currentUser = null;
supabase.auth.getSession().then(({ data }) => {
  if (!data.session) {
    window.location.href = 'login.html';
  } else {
    currentUser = data.session.user;
    loadDigitalData();
  }
});

// — Mapping ikon jenis akun
const akunIcons = {
  facebook: '<i class="fab fa-facebook text-blue-600"></i>',
  instagram: '<i class="fab fa-instagram text-pink-500"></i>',
  tiktok: '<i class="fab fa-tiktok text-black"></i>',
  twitter: '<i class="fab fa-twitter text-sky-500"></i>',
  gmail: '<i class="fas fa-envelope text-red-500"></i>',
  mobile: '<i class="fas fa-gamepad text-purple-500"></i>',
  youtube: '<i class="fab fa-youtube text-red-600"></i>',
  linkedin: '<i class="fab fa-linkedin text-blue-700"></i>',
  default: '<i class="fas fa-user-circle text-gray-500"></i>'
};

// — Modal tambah akun
const modal = document.getElementById('digitalModal');
document.getElementById('digitalAddBtn').onclick = () => modal.style.display = 'flex';
document.getElementById('digitalCloseModal').onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

// — Simpan akun digital
document.getElementById('digitalForm').addEventListener('submit', async e => {
  e.preventDefault();
  const u = {
    user_id: currentUser.id,
    email_username: document.getElementById('digitalEmail').value.trim(),
    password: document.getElementById('digitalPassword').value.trim(),
    jenis: document.getElementById('digitalJenis').value.trim(),
    catatan: document.getElementById('digitalCatatan').value.trim()
  };
  if (!u.email_username || !u.password || !u.jenis) {
    return alert('Email, Password, dan Jenis harus diisi.');
  }
  const { error } = await supabase.from('digital_accounts').insert([u]);
  if (error) {
    console.error(error);
    return alert('Gagal menyimpan akunnya.');
  }
  modal.style.display = 'none';
  e.target.reset();
  loadDigitalData();
});

// — Load dan tampilkan data
async function loadDigitalData() {
  const { data, error } = await supabase
    .from('digital_accounts')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('created_at', { ascending: false });
  if (error) return console.error(error);

  const tbody = document.getElementById('digitalTableBody');
  tbody.innerHTML = '';

  data.forEach(item => {
    const iconHTML = akunIcons[item.jenis.toLowerCase()] || akunIcons.default;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${iconHTML} ${item.email_username}</td>
      <td>${item.jenis}</td>
      <td><span class="hidden-password">••••••••</span></td>
      <td>${item.catatan || '-'}</td>
      <td>${new Date(item.created_at).toLocaleDateString('id-ID')}</td>
      <td>
        <button class="eye-btn" data-pw="${item.password}" title="Lihat Password">👁️</button>
        <button class="delete-btn" data-id="${item.id}" title="Hapus">🗑️</button>
      </td>`;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = async () => {
      if (confirm('Yakin ingin menghapus akun ini?')) {
        await supabase.from('digital_accounts').delete().eq('id', btn.dataset.id);
        loadDigitalData();
      }
    };
  });

  document.querySelectorAll('.eye-btn').forEach(btn => {
    btn.onclick = () => showPasswordAccess(btn.dataset.pw, btn.closest('tr'));
  });
}

// — Modal akses untuk lihat password
function showPasswordAccess(pw, row) {
  const modal = document.createElement('div');
  modal.className = 'digital-password-modal';
  modal.innerHTML = `
    <div class="digital-password-modal-content">
      <h3>Masukkan Kode Akses</h3>
      <input type="password" id="accessPwInput" placeholder="Kode akses (010520)" />
      <div class="digital-password-modal-actions">
        <button id="accessConfirm">Lihat</button>
        <button id="accessCancel">Batal</button>
      </div>
    </div>`;
  document.body.appendChild(modal);

  document.getElementById('accessConfirm').onclick = () => {
    const code = document.getElementById('accessPwInput').value;
    if (code === '010520') {
      row.querySelector('.hidden-password').textContent = pw;
      modal.remove();
    } else {
      alert('Kode akses salah.');
    }
  };
  document.getElementById('accessCancel').onclick = () => modal.remove();
}
