import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const travelId = params.get('id');

  if (!travelId) {
    document.getElementById('deskripsi').textContent = "ID perjalanan tidak ditemukan.";
    return;
  }

  const { data, error } = await supabase
    .from('travel_plans')
    .select('*')
    .eq('id', travelId)
    .single();

  if (error || !data) {
    document.getElementById('deskripsi').textContent = "Gagal memuat detail perjalanan.";
    return;
  }

  document.getElementById('judul').textContent = `Trip: ${data.tujuan}`;
  document.getElementById('deskripsi').textContent = `Perjalanan selama ${data.jumlah_hari} hari dan ${data.jumlah_malam} malam.`;

  document.getElementById('detailTujuan').textContent = data.tujuan || '-';
  document.getElementById('detailDurasi').textContent = `${data.jumlah_hari} hari / ${data.jumlah_malam} malam`;
  document.getElementById('detailCatatan').textContent = data.catatan || '-';
});


  document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'travel-budget.html';
  });



