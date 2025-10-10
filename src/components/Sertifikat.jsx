// src/components/Sertifikat.jsx
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { FiExternalLink, FiDownload, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { motion as Motion } from 'framer-motion';
import UploadForm from './UploadForm';

function Sertifikat({ refreshKey, onDataChange }) {
  const [sertifikatList, setSertifikatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const uploadModal = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
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
      setSertifikatList(sertifikatList.filter(s => s.id !== sertifikatId));
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
      <div className="flex justify-end mb-4">
        <button className="btn btn-primary btn-sm" onClick={() => uploadModal.current.showModal()}>
          <FiPlus /> Tambah Sertifikat
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-gray-800/50 shadow-lg backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-white/5">
              <tr>
                <th scope="col" className="px-6 py-3">Pratinjau</th>
                <th scope="col" className="px-6 py-3">Nama Sertifikat</th>
                <th scope="col" className="px-6 py-3">Tanggal Unggah</th>
                <th scope="col" className="px-6 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <Motion.tbody variants={containerVariants} initial="hidden" animate="visible" className="divide-y divide-white/10">
              {sertifikatList.length === 0 ? (
                <Motion.tr variants={itemVariants}>
                  <td colSpan="4" className="px-6 py-4 text-center">Belum ada sertifikat.</td>
                </Motion.tr>
              ) : (
                sertifikatList.map((sertifikat) => (
                  <Motion.tr key={sertifikat.id} variants={itemVariants} className="hover:bg-white/5">
                    <td className="p-4">
                      <img src={sertifikat.file_url} alt={sertifikat.nama_sertifikat} className="w-20 h-12 object-cover rounded-md" />
                    </td>
                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                      {sertifikat.nama_sertifikat}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(sertifikat.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button className="btn btn-ghost btn-xs" onClick={() => alert('Fitur Edit segera hadir!')}><FiEdit /></button>
                        <a href={sertifikat.file_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-xs"><FiExternalLink /></a>
                        <a href={sertifikat.file_url} download className="btn btn-ghost btn-xs"><FiDownload /></a>
                        <button onClick={() => handleDelete(sertifikat.id, sertifikat.file_url)} className="btn btn-ghost btn-xs text-red-500 hover:bg-red-500 hover:text-white"><FiTrash2 /></button>
                      </div>
                    </td>
                  </Motion.tr>
                ))
              )}
            </Motion.tbody>
          </table>
        </div>
      </div>

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
