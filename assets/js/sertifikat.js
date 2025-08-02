import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('sertifikatTable');
  const modalSertifikat = document.querySelector('.modal-sertifikat');
  const formSertifikat = document.getElementById('formSertifikat');
  const namaSertifikatInput = document.getElementById('namaSertifikat');
  const fileSertifikatInput = document.getElementById('fileSertifikat');
  const pagination = document.getElementById('pagination');

  let currentUser = null;
  let sertifikatData = [];
  let currentPage = 1;
  const rowsPerPage = 5;

  // ======= Cek Session Login =======
  async function waitForSession(timeout = 5000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const { data } = await supabase.auth.getSession();
      if (data.session) return data.session.user;
      await new Promise(res => setTimeout(res, 200));
    }
    return null;
  }

  async function getCurrentUser() {
    const user = await waitForSession();
    if (!user) {
      alert("Sesi login habis. Silakan login ulang.");
      window.location.href = '../../login.html';
      return;
    }
    currentUser = user;
  }

  // ======= Upload File =======
  async function uploadFile(file) {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const filePath = `${currentUser.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('sertifikat')
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data, error: publicUrlError } = supabase.storage
      .from('sertifikat')
      .getPublicUrl(filePath);

    if (publicUrlError || !data || !data.publicUrl) {
      throw new Error("Gagal mendapatkan public URL. Pastikan bucket 'sertifikat' sudah di-set ke public.");
    }

    return { url: data.publicUrl, path: filePath };
  }

  // ======= Simpan ke Database =======
  async function saveToDatabase(fileName, url, path) {
    const { error } = await supabase.from('sertifikat').insert({
      user_id: currentUser.id,
      file_name: fileName,
      file_url: url,
      file_path: path
    });
    if (error) throw error;
  }

  // ======= Load Sertifikat =======
  async function loadSertifikat() {
    const { data, error } = await supabase
      .from('sertifikat')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false });

    sertifikatData = data || [];
    renderTable();
    setupPagination();
  }

  // ======= Render Table =======
  function renderTable() {
    tableBody.innerHTML = '';
    if (!sertifikatData || sertifikatData.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4">Belum ada sertifikat.</td></tr>`;
      return;
    }

    const start = (currentPage - 1) * rowsPerPage;
    const paginatedItems = sertifikatData.slice(start, start + rowsPerPage);

    paginatedItems.forEach(item => {
      const ext = item.file_name.split('.').pop().toLowerCase();
      const isImage = ['jpg', 'jpeg', 'png'].includes(ext);
      const isPdf = ext === 'pdf';

      // Debug log
      console.log('Preview URL:', item.file_url);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.file_name}</td>
        <td>${new Date(item.created_at).toLocaleDateString()}</td>
        <td>
          ${isImage && item.file_url
            ? `<img src="${item.file_url}" alt="Preview" class="img-thumb" data-url="${item.file_url}" style="width: 60px; border-radius: 4px;">`
            : isPdf && item.file_url
            ? `<button class="btn-icon view-btn" data-url="${item.file_url}" title="Lihat PDF"><i class='fas fa-file-pdf'></i></button>`
            : `<span style="color:red;">Tidak ada preview</span>`}
        </td>
        <td style="display: flex; gap: 0.5rem;">
          <button class="btn-icon view-btn" data-url="${item.file_url}" title="Lihat">
            <i class="fas fa-eye"></i>
          </button>
          <a href="${item.file_url}" download class="btn-icon" title="Download">
            <i class="fas fa-download"></i>
          </a>
          <button class="btn-icon delete-btn" data-id="${item.id}" data-path="${item.file_path}" title="Hapus">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    document.querySelectorAll('.view-btn, .img-thumb').forEach(el => {
      el.addEventListener('click', () => previewFile(el.dataset.url));
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const path = btn.dataset.path;
        const confirmDelete = confirm("Yakin ingin menghapus sertifikat ini?");
        if (confirmDelete) {
          await deleteSertifikat(id, path);
          await loadSertifikat();
        }
      });
    });
  }

  function setupPagination() {
    pagination.innerHTML = '';
    const pageCount = Math.ceil(sertifikatData.length / rowsPerPage);
    if (pageCount <= 1) return;
    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement("button");
      btn.innerText = i;
      btn.classList.toggle("active", i === currentPage);
      btn.addEventListener("click", () => {
        currentPage = i;
        renderTable();
        setupPagination();
      });
      pagination.appendChild(btn);
    }
  }

  // ======= Preview File =======
  function previewFile(url) {
  const modal = document.getElementById("modal-preview-sertifikat");
  const previewContainer = document.getElementById("preview-container-sertifikat");

  // Bersihkan isi sebelumnya
  previewContainer.innerHTML = '';

  if (!url) {
    previewContainer.innerHTML = '<p style="color:red;">URL tidak valid.</p>';
    modal.classList.add('active');
    return;
  }

  const isPDF = url.toLowerCase().endsWith('.pdf');
  const isImage = /\.(jpg|jpeg|png|webp)$/i.test(url);

  if (isPDF) {
    previewContainer.innerHTML = `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`;
  } else if (isImage) {
    previewContainer.innerHTML = `<img src="${url}" alt="Preview File">`;
  } else {
    previewContainer.innerHTML = `<p>Tipe file tidak didukung untuk preview.</p>`;
  }

  modal.classList.add("active"); // Tampilkan modal
}

// Tutup modal saat klik tombol X
document.querySelector(".close-preview").addEventListener("click", () => {
  document.getElementById("modal-preview-sertifikat").classList.remove("active");
});


  document.querySelector(".close-preview").addEventListener("click", () => {
    document.getElementById("modal-preview-sertifikat").classList.remove("active");
  });

  // ======= Hapus Sertifikat =======
  async function deleteSertifikat(id, path) {
    const { error: dbError } = await supabase.from('sertifikat').delete().eq('id', id);
    if (dbError) {
      alert("Gagal menghapus dari database: " + dbError.message);
      return;
    }
    const { error: storageError } = await supabase.storage.from('sertifikat').remove([path]);
    if (storageError) {
      alert("File tidak terhapus dari storage: " + storageError.message);
    }
  }

  // ======= Form Handler =======
  if (formSertifikat) {
    formSertifikat.addEventListener('submit', async (e) => {
      e.preventDefault();
      const namaFile = namaSertifikatInput.value.trim();
      const file = fileSertifikatInput.files[0];

      if (!namaFile) {
        alert('Nama sertifikat wajib diisi!');
        return;
      }
      if (!file) {
        alert('File sertifikat wajib diupload!');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file maksimal 2MB!');
        return;
      }

      try {
        formSertifikat.querySelector('button[type="submit"]').disabled = true;
        formSertifikat.querySelector('button[type="submit"]').innerHTML = '<span class="spinner"></span> Mengupload...';

        const { url, path } = await uploadFile(file);
        await saveToDatabase(namaFile, url, path);
        await loadSertifikat();

        formSertifikat.reset();
        modalSertifikat.style.display = 'none';
        alert('Sertifikat berhasil ditambahkan!');
      } catch (err) {
        alert('Gagal upload: ' + err.message);
      } finally {
        formSertifikat.querySelector('button[type="submit"]').disabled = false;
        formSertifikat.querySelector('button[type="submit"]').textContent = "Simpan";
      }
    });
  }

  // ======= Inisialisasi =======
  getCurrentUser().then(loadSertifikat);
});
