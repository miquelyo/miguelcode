import { supabase } from './supabase.js';

let travelId = null;
let currentCurrency = 'Rp';

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  travelId = params.get("id");
  if (!travelId) return alert("ID Travel tidak ditemukan.");

  // Ambil data travel
  const { data: travelData, error } = await supabase
    .from("travel_plans")
    .select("*")
    .eq("id", travelId)
    .single();
  if (error) return alert("Gagal mengambil data.");

  const jumlahHari = parseInt(travelData.jumlah_hari) || 1;
  const tujuanElem = document.getElementById("tujuan");
  if (tujuanElem) tujuanElem.textContent = `Tujuan: ${travelData.tujuan}`;

  const head = document.getElementById("travelTableHead");
  const body = document.getElementById("travelTableBody");
  const foot = document.getElementById("travelTableFoot");

  // Buat daftar jam
  const jamList = [];
  for (let h = 7; h <= 23; h++) {
    const start = `${h.toString().padStart(2, '0')}:00`;
    const end = `${((h + 1) % 24).toString().padStart(2, '0')}:00`;
    jamList.push(`${start} - ${end}`);
  }

  // Table head
  let headHTML = `<tr><th>Jam</th>`;
  for (let i = 1; i <= jumlahHari; i++) {
    headHTML += `<th>Day ${i}</th>`;
  }
  headHTML += `</tr>`;
  head.innerHTML = headHTML;

  // Table body
  let bodyHTML = "";
  for (let jam of jamList) {
    bodyHTML += `<tr><td>${jam}</td>`;
    for (let i = 1; i <= jumlahHari; i++) {
      bodyHTML += `<td contenteditable="true" data-type="activity" data-day="${i}" data-jam="${jam}"></td>`;
    }
    bodyHTML += `</tr>`;
  }
  body.innerHTML = bodyHTML;

  // Table foot (Budget + Total)
  let budgetRow = `<tr><td><strong>Budget:</strong></td>`;
  for (let i = 1; i <= jumlahHari; i++) {
    budgetRow += `<td contenteditable="true" class="budget-cell" data-day="${i}"></td>`;
  }
  budgetRow += `</tr>`;

  let totalRow = `<tr><td><strong>Total Budget:</strong></td>`;
  totalRow += `<td colspan="${jumlahHari}" id="total-budget">Rp0</td></tr>`;

  foot.innerHTML = budgetRow + totalRow;

  // Load existing detail (aktivitas & budget)
  const { data: detailData } = await supabase
    .from("travel_details")
    .select("*")
    .eq("travel_id", travelId);

  detailData.forEach(({ day, time, activity, budget }) => {
    if (time && activity) {
      const td = body.querySelector(`td[data-day="${day}"][data-jam="${time}"]`);
      if (td) td.textContent = activity;
    }
    if (budget !== null) {
      const cell = foot.querySelector(`td.budget-cell[data-day="${day}"]`);
      if (cell) cell.textContent = budget;
    }
  });

  updateTotalBudget(); // total awal

  // Autosave aktivitas & budget saat blur
  document.querySelector("main").addEventListener("blur", async (e) => {
    const td = e.target.closest("td");
    if (!td || !td.dataset.day) return;

    const day = parseInt(td.dataset.day);

    // Save aktivitas
    if (td.dataset.type === "activity") {
      const activity = td.textContent.trim();
      const jam = td.dataset.jam;

      await supabase.from("travel_details").upsert({
        travel_id: travelId,
        day,
        time: jam,
        activity
      }, { onConflict: ['travel_id', 'day', 'time'] });

    } else if (td.classList.contains("budget-cell")) {
      // Save budget
      const cleaned = td.textContent.replace(/[^\d]/g, '');
      const parsed = parseInt(cleaned) || 0;
      td.textContent = parsed;

      await supabase.from("travel_details").upsert({
        travel_id: travelId,
        day,
        budget: parsed
      }, { onConflict: ['travel_id', 'day'] });

      updateTotalBudget();
    }
  }, true); // pakai true agar event blur bisa ditangkap di bubbling phase

  // Currency dropdown (jika ada)
  const currencySelector = document.getElementById("currencySelector");
  if (currencySelector) {
    currencySelector.addEventListener("change", () => {
      currentCurrency = currencySelector.value;
      updateTotalBudget();
    });
  }
});

// Hitung total budget
function updateTotalBudget() {
  const budgetCells = document.querySelectorAll("td.budget-cell");
  let total = 0;
  budgetCells.forEach(cell => {
    const value = parseInt(cell.textContent) || 0;
    total += value;
  });

  const totalBudgetElem = document.getElementById("total-budget");
  if (totalBudgetElem) {
    totalBudgetElem.textContent = `${currentCurrency}${total.toLocaleString('id-ID')}`;
  }
}
