import { supabase } from './supabase.js'; // Pastikan path sesuai

// DOM Elements
const form = document.getElementById('travelForm');
const tableBody = document.getElementById('travelTableBody');

// Saat halaman dibuka, load data dari Supabase
window.addEventListener('DOMContentLoaded', async () => {
  await loadTravelPlans();
});

// Saat form disubmit, simpan ke Supabase
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const tujuan = document.getElementById('tujuan').value.trim();
  const hari = parseInt(document.getElementById('hari').value);
  const malam = parseInt(document.getElementById('malam').value);
  const catatan = document.getElementById('catatan').value.trim();

  if (!tujuan || isNaN(hari) || isNaN(malam)) {
    alert('Semua field wajib diisi!');
    return;
  }

  const { error } = await supabase
    .from('travel_plans')
    .insert([{ 
      tujuan,
      jumlah_hari: hari,
      jumlah_malam: malam,
      catatan 
    }]);

  if (error) {
    console.error('Gagal menyimpan:', error);
    alert('Gagal menyimpan ke Supabase');
  } else {
    await loadTravelPlans(); // Ambil ulang dari database
    form.reset();
  }
});


// Load semua travel plan dari Supabase
async function loadTravelPlans() {
  const { data, error } = await supabase
    .from('travel_plans')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('Gagal mengambil data:', error);
    return;
  }

  tableBody.innerHTML = ''; // Kosongkan tabel
  data.forEach(addRowToTable);
}

// Tambahkan baris ke tabel HTML
function addRowToTable(plan) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td data-label="Tujuan">${plan.tujuan}</td>
    <td data-label="Durasi">${plan.jumlah_hari} hari / ${plan.jumlah_malam} malam</td>
    <td data-label="Catatan">${plan.catatan || '-'}</td>
    <td data-label="Aksi">
      <button class="lihat" data-id="${plan.id}">Lihat</button>
    </td>
  `;
  tableBody.appendChild(tr);
}


// Modal handler
const modal = document.getElementById('travelModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

openModalBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// Event listener untuk tombol "Lihat"
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('lihat')) {
    const travelId = e.target.getAttribute('data-id');
    if (travelId) {
      window.location.href = `travel-detail.html?id=${travelId}`;
    }
  }
});
