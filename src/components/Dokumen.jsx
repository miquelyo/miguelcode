import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { FiExternalLink, FiDownload, FiEdit, FiTrash2, FiPlus, FiFile } from 'react-icons/fi';
import { motion as Motion } from 'framer-motion';
import UploadForm from './UploadForm';

function Dokumen({ refreshKey, onDataChange }) {
  const [dokumenList, setDokumenList] = useState([]);
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

  async function fetchDokumen() {
    setLoading(true);
    const { data, error } = await supabase.from('dokumen').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching dokumen:', error);
    else setDokumenList(data);
    setLoading(false);
  }

  const handleDelete = async (dokumenId, fileUrl) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus dokumen ini?")) return;
    try {
      const fileName = fileUrl.split('/').pop();
      await supabase.storage.from('dokumen-pribadi').remove([fileName]);
      await supabase.from('dokumen').delete().eq('id', dokumenId);
      onDataChange(); // Panggil onDataChange untuk me-refresh
      alert('Dokumen berhasil dihapus.');
    } catch (error) {
      alert(`Gagal menghapus: ${error.message}`);
    }
  };

  const handleUploadSuccess = () => {
    uploadModal.current.close();
    onDataChange();
  };

  useEffect(() => { 
    fetchDokumen(); 
  }, [refreshKey]);

  if (loading) return <p className="text-gray-400">Memuat data dokumen...</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Riwayat Dokumen</h2>
        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white 
                     bg-white/5 backdrop-blur-sm border border-white/20 
                     hover:bg-white/10 transition-colors"
          onClick={() => uploadModal.current.showModal()}
        >
          <FiPlus /> Tambah Dokumen
        </button>
      </div>

      {dokumenList.length === 0 ? (
        <div className="text-center py-16 bg-gray-800/50 rounded-2xl border border-dashed border-gray-700">
            <FiFile size={40} className="mx-auto text-gray-600"/>
            <p className="mt-4 text-gray-400">Belum ada dokumen. Mulai unggah file pertama Anda.</p>
        </div>
      ) : (
        <Motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          {dokumenList.map((dokumen) => (
            <Motion.div key={dokumen.id} variants={itemVariants} className="relative pl-10">
              {/* Elemen Timeline: Garis dan Titik */}
              <div className="absolute left-4 top-1 h-full w-px bg-gray-700" />
              <div className="absolute left-[10px] top-2 w-3 h-3 rounded-full bg-cyan-500 ring-4 ring-gray-900" />
              
              {/* Konten Kartu */}
              <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div>
                    <p className="text-xs text-gray-400">
                      {new Date(dokumen.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h3 className="font-semibold text-lg text-white mt-1">{dokumen.nama_dokumen}</h3>
                  </div>
                  <div className="btn-group">
                    <button className="btn btn-ghost btn-sm" onClick={() => alert('Fitur Edit segera hadir!')}><FiEdit /></button>
                    <a href={dokumen.file_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm"><FiExternalLink /></a>
                    <a href={dokumen.file_url} download className="btn btn-ghost btn-sm"><FiDownload /></a>
                    <button onClick={() => handleDelete(dokumen.id, dokumen.file_url)} className="btn btn-ghost btn-sm text-red-500 hover:bg-red-500/20"><FiTrash2 /></button>
                  </div>
                </div>
                <div className="mt-4">
                  <img src={dokumen.file_url} alt={dokumen.nama_dokumen} className="w-full max-w-xs h-auto object-cover rounded-lg" />
                </div>
              </div>
            </Motion.div>
          ))}
        </Motion.div>
      )}
      
      <dialog id="dokumen_modal" className="modal" ref={uploadModal}>
        <div className="modal-box bg-gray-800">
          <h3 className="font-bold text-lg">Unggah Dokumen Baru</h3>
          <div className="py-4">
            <UploadForm bucketName="dokumen-pribadi" tableName="dokumen" onUpload={handleUploadSuccess}/>
          </div>
          <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button></form>
        </div>
      </dialog>
    </>
  );
}
export default Dokumen;