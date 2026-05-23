// src/components/UploadForm.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';

function UploadForm({ bucketName, tableName, onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [namaFile, setNamaFile] = useState('');

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !namaFile.trim()) {
      alert('Nama file dan pilihan file tidak boleh kosong!');
      return;
    }

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const uniqueFileName = `${Date.now()}.${fileExt}`;

      // 1. Upload file
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(uniqueFileName, file);

      if (uploadError) throw uploadError;

      // 2. Dapatkan URL
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(uniqueFileName);

      const fileUrl = publicUrlData.publicUrl;

      // BARU: Kita siapkan data dan tampilkan di console untuk debugging
      const dataUntukDikirim = {
        [tableName === 'dokumen' ? 'nama_dokumen' : 'nama_sertifikat']: namaFile,
        file_url: fileUrl
      };
      
      console.log("Mencoba mengirim data ini ke Supabase:", dataUntukDikirim);

      // 3. Simpan informasi ke database
      const { error: insertError } = await supabase
        .from(tableName)
        .insert([dataUntukDikirim]);

      if (insertError) throw insertError;

      alert('Upload berhasil!');
      onUpload();
      setFile(null);
      setNamaFile('');
      event.target.reset();
      
    } catch (error) {
      // BARU: Tampilkan detail error yang lebih lengkap di console
      console.error("Detail Error Lengkap:", error);
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ border: '2px dashed #ccc', padding: '1rem', marginTop: '2rem', marginBottom: '2rem' }}>
      <h4>Unggah Baru</h4>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Nama / Judul Dokumen:</label><br/>
          <input
            type="text"
            value={namaFile}
            onChange={(e) => setNamaFile(e.target.value)}
            disabled={uploading}
            style={{ width: '95%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Pilih File:</label><br/>
          <input
            type="file"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>
        <button type="submit" disabled={uploading} style={{ padding: '8px 16px' }}>
          {uploading ? 'Mengunggah...' : 'Unggah'}
        </button>
      </form>
    </div>
  );
}

export default UploadForm;