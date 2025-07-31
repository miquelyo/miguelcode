import { supabase } from '../../supabase.js';

const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const tableBody = document.getElementById('sertifikatTable');
const modal = document.getElementById('modal');
const previewText = document.getElementById('previewText');

let currentUser = null;

// Tunggu session siap
async function waitForSession(timeout = 5000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const { data } = await supabase.auth.getSession();
    if (data.session) return data.session.user;
    await new Promise(res => setTimeout(res, 200));
  }
  return null;
}

// Cek login
async function getCurrentUser() {
  const user = await waitForSession();
  if (!user) {
    alert("Sesi login habis. Silakan login ulang.");
    window.location.href = 'login.html';
    return;
  }
  currentUser = user;
}

// Upload file
async function uploadFile(file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${currentUser.id}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('sertifikat')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from('sertifikat')
    .createSignedUrl(filePath, 60); // berlaku 60 detik

  if (signedUrlError) throw signedUrlError;

  return { fileName: file.name, url: signedUrlData.signedUrl, path: filePath };
}

// Simpan metadata
async function saveToDatabase(fileName, url, path) {
  const { error } = await supabase.from('sertifikat').insert({
    user_id: currentUser.id,
    file_name: fileName,
    file_url: url,
    file_path: path
  });
  if (error) throw error;
}

// Tampilkan data
async function loadSertifikat() {
  const { data, error } = await supabase
    .from('sertifikat')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('created_at', { ascending: false });

  tableBody.innerHTML = '';

  if (error) {
    tableBody.innerHTML = `<tr><td colspan="3">Gagal memuat data.</td></tr>`;
    return;
  }

  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="3">Belum ada sertifikat.</td></tr>`;
    return;
  }

  data.forEach(item => {
    const ext = item.file_name.split('.').pop().toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png'].includes(ext);
    const isPdf = ext === 'pdf';

    const row = document.createElement('tr');
    row.innerHTML = `
  <td style="padding: 0.75rem;">${item.file_name}</td>
  <td style="padding: 0.75rem;">${new Date(item.created_at).toLocaleDateString()}</td>
  <td style="padding: 0.75rem;">
    ${['jpg', 'jpeg', 'png'].some(ext => item.file_name.toLowerCase().endsWith(ext))
      ? `<img src="${item.file_url}" alt="Preview" style="width: 60px; height: auto; border-radius: 4px;" />`
      : `<span style="color: gray;">(PDF)</span>`}
  </td>
  <td style="padding: 0.75rem; display: flex; gap: 0.5rem;">
    <button class="btn-icon view-btn" data-url="${item.file_url}" title="Lihat">
      <i class="fas fa-eye"></i>
    </button>
    <a href="${item.file_url}" download class="btn-icon" title="Download">
      <i class="fas fa-download"></i>
    </a>
    <button class="btn-icon delete-btn" data-id="${item.id}" title="Hapus">
      <i class="fas fa-trash-alt"></i>
    </button>
  </td>
`;

    tableBody.appendChild(row);
  });

  // Klik thumbnail
  document.querySelectorAll('.img-thumb').forEach(img => {
    img.addEventListener('click', e => {
      previewFile(e.currentTarget.dataset.url);
    });
  });

  // Preview
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      previewFile(e.currentTarget.dataset.url);
    });
  });

  // Download
  document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
      const url = e.currentTarget.dataset.url;
      const filename = e.currentTarget.dataset.filename;
      try {
        const res = await fetch(url);
        const blob = await res.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (err) {
        alert("Gagal mengunduh file: " + err.message);
      }
    });
  });

  // Delete
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
      const id = e.currentTarget.dataset.id;
      const path = e.currentTarget.dataset.path;
      if (confirm("Yakin ingin menghapus sertifikat ini?")) {
        await deleteSertifikat(id, path);
        await loadSertifikat();
      }
    });
  });
}

// Preview file
function previewFile(url) {
  const ext = url.split('.').pop().toLowerCase();
  let previewHTML = '';

  if (ext === 'pdf') {
    previewHTML = `<iframe src="${url}" width="100%" height="500px" style="border: none;"></iframe>`;
  } else if (['jpg', 'jpeg', 'png'].includes(ext)) {
    previewHTML = `<img src="${url}" alt="Preview" style="max-width: 100%; height: auto;" />`;
  } else {
    previewHTML = `<p>Format file tidak dapat dipreview.</p>`;
  }

  const previewBox = document.createElement('div');
  previewBox.classList.add('modal-overlay');
  previewBox.style.display = 'flex';
  previewBox.innerHTML = `
    <div class="modal-box" style="max-width: 90%; max-height: 90%; overflow: auto;">
      <div style="text-align: right; margin-bottom: 0.5rem;">
        <button class="btn-cancel" id="closePreview">Tutup</button>
      </div>
      ${previewHTML}
    </div>
  `;
  document.body.appendChild(previewBox);

  document.getElementById('closePreview').onclick = () => previewBox.remove();
}

// Hapus sertifikat
async function deleteSertifikat(id, path) {
  const { error: dbErr } = await supabase.from('sertifikat').delete().eq('id', id);
  if (dbErr) {
    alert("Gagal menghapus metadata: " + dbErr.message);
    return;
  }

  const { error: storageErr } = await supabase.storage.from('sertifikat').remove([path]);
  if (storageErr) {
    alert("Metadata terhapus, tapi file gagal dihapus dari storage: " + storageErr.message);
  }
}

// Upload handler
uploadBtn.onclick = async () => {
  const file = fileInput.files[0];
  if (!file) return alert("Pilih file terlebih dahulu.");
  if (file.size > 2 * 1024 * 1024) return alert("Ukuran file maksimal 2MB.");

  try {
    uploadBtn.disabled = true;
    uploadBtn.textContent = "Mengupload...";

    const { fileName, url, path } = await uploadFile(file);
    await saveToDatabase(fileName, url, path);
    await loadSertifikat();

    fileInput.value = '';
    previewText.textContent = '';
    modal.style.display = 'none';
  } catch (err) {
    alert("Gagal upload: " + err.message);
  } finally {
    uploadBtn.disabled = false;
    uploadBtn.textContent = "Upload";
  }
};

// Inisialisasi
getCurrentUser().then(loadSertifikat);
