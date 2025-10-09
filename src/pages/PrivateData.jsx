// src/pages/PrivateData.jsx
import { useState, useRef } from 'react';
import Dokumen from '../components/Dokumen';
import Sertifikat from '../components/Sertifikat';
import UploadForm from '../components/UploadForm';

function PrivateData({ onLogout }) { 
  const [activeTab, setActiveTab] = useState('dokumen');
  const [refreshKey, setRefreshKey] = useState(0); 
  const uploadModal = useRef(null);

  const handleUploadSuccess = () => {
    uploadModal.current.close();
    setRefreshKey(prevKey => prevKey + 1);
  };

  const tabBaseClass = "py-2 px-4 font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 focus:outline-none";
  const tabActiveClass = "text-indigo-600 border-indigo-500";

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* === HEADER BARU === */}
        <div className="flex justify-between items-center pb-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Dashboard Pribadi
          </h1>
          {/* Grup Tombol Aksi */}
          <div className="flex items-center gap-4">
            <button className="btn btn-primary btn-sm" onClick={() => uploadModal.current.showModal()}>
              Tambah Baru
            </button>
            <button onClick={onLogout} className="btn btn-error btn-sm">
              Logout
            </button>
          </div>
        </div>

        {/* === KONTEN UTAMA DALAM CARD === */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-6">
            Selamat datang di area rahasia Anda, Miguel!
          </p>
          
          {/* Navigasi Tab */}
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('dokumen')}
              className={`${tabBaseClass} ${activeTab === 'dokumen' ? tabActiveClass : ''}`}
            >
              Dokumen Pribadi
            </button>
            <button 
              onClick={() => setActiveTab('sertifikat')}
              className={`${tabBaseClass} ${activeTab === 'sertifikat' ? tabActiveClass : ''}`}
            >
              Sertifikat
            </button>
          </div>
          
          {/* Konten Tab */}
          <div className="mt-6">
            {activeTab === 'dokumen' && <Dokumen refreshKey={refreshKey} />}
            {activeTab === 'sertifikat' && <Sertifikat refreshKey={refreshKey} />}
          </div>
        </div>

        {/* Modal dari daisyUI (tidak berubah) */}
        <dialog id="upload_modal" className="modal" ref={uploadModal}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Unggah {activeTab === 'dokumen' ? 'Dokumen' : 'Sertifikat'} Baru</h3>
            <div className="py-4">
              <UploadForm
                bucketName="dokumen-pribadi"
                tableName={activeTab}
                onUpload={handleUploadSuccess}
              />
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Tutup</button>
              </form>
            </div>
          </div>
        </dialog>
        
      </div>
    </div>
  );
}

export default PrivateData;