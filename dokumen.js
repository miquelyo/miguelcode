import { supabase } from './supabase.js';

const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const tableBody = document.getElementById('dokumenTable');
const modal = document.getElementById('modal');
const previewModal = document.getElementById('previewModal');
const previewContent = document.getElementById('previewContent');
const closePreviewBtn = document.getElementById('closePreview');
let currentUser;

async function init() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    alert("Sesi habis");
    return window.location.href = 'login.html';
  }
  currentUser = data.user;
  loadDokumen();
}

async function uploadFile(file) {
  const ext = file.name.split('.').pop();
  const fname = `${Date.now()}.${ext}`;
  const path = `${currentUser.id}/${fname}`;
  const { error } = await supabase.storage.from('dokumen').upload(path, file);
  if (error) throw error;
  const { data: urlData } = supabase.storage.from('dokumen').getPublicUrl(path);
  return { name: file.name, url: urlData.publicUrl };
}

async function saveToDb(name, url) {
  const { error } = await supabase.from('dokumen').insert({
    user_id: currentUser.id,
    file_name: name,
    file_url: url
  });
  if (error) throw error;
}

function createPreview(file) {
  if (file.file_url.endsWith('.pdf')) {
    return `<button onclick="showPreview('${file.file_url}', 'pdf')" title="Preview" style="background:none;border:none;cursor:pointer;color:#1E40AF">
      <i class="fas fa-eye"></i>
    </button>`;
  } else if (/\.(jpg|jpeg|png)$/i.test(file.file_url)) {
    return `<img src="${file.file_url}" alt="Preview" style="max-height:40px;border-radius:4px;cursor:pointer" onclick="showPreview('${file.file_url}', 'image')">`;
  }
  return 'Tidak didukung';
}

function createActions(file) {
  return `
    <a href="${file.file_url}" download="${file.file_name}" title="Download" style="margin:0 0.5rem;color:#1E40AF">
      <i class="fas fa-download"></i>
    </a>
    <button onclick="deleteDokumen('${file.id}', '${file.file_url}')" title="Hapus" style="background:none;border:none;cursor:pointer;color:#DC2626">
      <i class="fas fa-trash-alt"></i>
    </button>
  `;
}

async function loadDokumen() {
  const { data, error } = await supabase.from('dokumen')
    .select('*').eq('user_id', currentUser.id)
    .order('created_at', { ascending: false });

  tableBody.innerHTML = '';
  if (error) return tableBody.innerHTML = '<tr><td colspan="4">Gagal memuat data.</td></tr>';
  if (data.length === 0) return tableBody.innerHTML = '<tr><td colspan="4">Belum ada dokumen.</td></tr>';

  data.forEach(file => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="padding:.75rem">${file.file_name}</td>
      <td style="padding:.75rem">${new Date(file.created_at).toLocaleDateString()}</td>
      <td style="padding:.75rem;text-align:center">${createPreview(file)}</td>
      <td style="padding:.75rem">${createActions(file)}</td>
    `;
    tableBody.appendChild(tr);
  });
}

window.showPreview = function (url, type) {
  if (type === 'pdf') {
    previewContent.innerHTML = `<iframe src="${url}" style="width:100%;height:80vh;border:none"></iframe>`;
  } else if (type === 'image') {
    previewContent.innerHTML = `<img src="${url}" style="max-width:100%;max-height:80vh;border-radius:8px">`;
  } else {
    previewContent.innerHTML = `<p>Tipe file tidak didukung.</p>`;
  }
  previewModal.style.display = 'flex';
};

closePreviewBtn.onclick = () => {
  previewModal.style.display = 'none';
  previewContent.innerHTML = '';
};

window.deleteDokumen = async function (id, fileUrl) {
  if (!confirm("Yakin ingin menghapus file ini?")) return;
  try {
    const path = fileUrl.split('/').slice(-2).join('/');
    await supabase.storage.from('dokumen').remove([path]);
    await supabase.from('dokumen').delete().eq('id', id);
    loadDokumen();
  } catch (err) {
    alert("Gagal menghapus dokumen.");
  }
};

uploadBtn.onclick = async () => {
  const file = fileInput.files[0];
  if (!file) return alert("Pilih file terlebih dahulu!");
  try {
    uploadBtn.disabled = true;
    uploadBtn.textContent = 'Uploading...';
    const { name, url } = await uploadFile(file);
    await saveToDb(name, url);
    await loadDokumen();
    fileInput.value = '';
    document.getElementById('previewText').textContent = '';
    modal.style.display = 'none';
  } catch (err) {
    alert("Error: " + err.message);
  } finally {
    uploadBtn.disabled = false;
    uploadBtn.textContent = 'Upload';
  }
};

init();
