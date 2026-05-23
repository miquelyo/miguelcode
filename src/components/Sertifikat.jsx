import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { FiExternalLink, FiDownload, FiEdit, FiTrash2, FiPlus, FiAward } from 'react-icons/fi';
import { motion as Motion } from 'framer-motion';
import UploadForm from './UploadForm';

function Sertifikat({ refreshKey, onDataChange }) {
  const [sertifikatList, setSertifikatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const uploadModal = useRef(null);

  const containerVariants = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } } 
  };
  const itemVariants = { 
    hidden: { opacity: 0, y: 20 }, 
    visible: { opacity: 1, y: 0, transition: { type: 'spring' } } 
  };

  async function fetchSertifikat() {
    setLoading(true);
    const { data, error } = await supabase.from('sertifikat').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching sertifikat:', error);
    else setSertifikatList(data);
    setLoading(false);
  }

  const handleDelete = async (sertifikatId, fileUrl) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus sertifikat ini?")) return;
    try {
      const fileName = fileUrl.split('/').pop();
      await supabase.storage.from('dokumen-pribadi').remove([fileName]);
      await supabase.from('sertifikat').delete().eq('id', sertifikatId);
      onDataChange(); // Panggil onDataChange untuk me-refresh
      alert('Sertifikat berhasil dihapus.');
    } catch (error) {
      alert(`Gagal menghapus: ${error.message}`);
    }
  };

  const handleUploadSuccess = () => {
    uploadModal.current.close();
    onDataChange();
  };

  useEffect(() => { 
    fetchSertifikat(); 
  }, [refreshKey]);

  if (loading) return <p className="text-gray-400">Memuat data sertifikat...</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Riwayat Sertifikat</h2>
        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white 
                     bg-white/5 backdrop-blur-sm border border-white/20 
                     hover:bg-white/10 transition-colors"
          onClick={() => uploadModal.current.showModal()}
        >
          <FiPlus /> Tambah Sertifikat
        </button>
      </div>

      {sertifikatList.length === 0 ? (
        <div className="text-center py-16 bg-gray-800/50 rounded-2xl border border-dashed border-gray-700">
            <FiAward size={40} className="mx-auto text-gray-600"/>
            <p className="mt-4 text-gray-400">Belum ada sertifikat. Mulai unggah sertifikat pertama Anda.</p>
        </div>
      ) : (
        <Motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          {sertifikatList.map((sertifikat) => (
            <Motion.div key={sertifikat.id} variants={itemVariants} className="relative pl-10">
              {/* Elemen Timeline: Garis dan Titik */}
              <div className="absolute left-4 top-1 h-full w-px bg-gray-700" />
              <div className="absolute left-[10px] top-2 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-gray-900" />
              
              {/* Konten Kartu */}
              <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div>
                    <p className="text-xs text-gray-400">
                      {new Date(sertifikat.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h3 className="font-semibold text-lg text-white mt-1">{sertifikat.nama_sertifikat}</h3>
                  </div>
                  <div className="btn-group">
                    <button className="btn btn-ghost btn-sm" onClick={() => alert('Fitur Edit segera hadir!')}><FiEdit /></button>
                    <a href={sertifikat.file_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm"><FiExternalLink /></a>
                    <a href={sertifikat.file_url} download className="btn btn-ghost btn-sm"><FiDownload /></a>
                    <button onClick={() => handleDelete(sertifikat.id, sertifikat.file_url)} className="btn btn-ghost btn-sm text-red-500 hover:bg-red-500/20"><FiTrash2 /></button>
                  </div>
                </div>
                <div className="mt-4">
                  <img src={sertifikat.file_url} alt={sertifikat.nama_sertifikat} className="w-full max-w-xs h-auto object-cover rounded-lg" />
                </div>
              </div>
            </Motion.div>
          ))}
        </Motion.div>
      )}
      
      <dialog id="sertifikat_modal" className="modal" ref={uploadModal}>
        <div className="modal-box bg-gray-800">
          <h3 className="font-bold text-lg">Unggah Sertifikat Baru</h3>
          <div className="py-4">
            <UploadForm bucketName="dokumen-pribadi" tableName="sertifikat" onUpload={handleUploadSuccess}/>
          </div>
          <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button></form>
        </div>
      </dialog>
    </>
  );
}
export default Sertifikat;