import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { FiExternalLink, FiDownload, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { motion as Motion } from 'framer-motion';
import UploadForm from './UploadForm';

function Dokumen({ refreshKey, onDataChange }) {
  const [dokumenList, setDokumenList] = useState([]);
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
      setDokumenList(dokumenList.filter(d => d.id !== dokumenId));
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
      <div className="flex justify-end mb-4">
        <button className="btn btn-primary btn-sm" onClick={() => uploadModal.current.showModal()}>
          <FiPlus /> Tambah Dokumen
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-gray-800/50 shadow-lg backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-white/5">
              <tr>
                <th scope="col" className="px-6 py-3">Pratinjau</th>
                <th scope="col" className="px-6 py-3">Nama Dokumen</th>
                <th scope="col" className="px-6 py-3">Tanggal Unggah</th>
                <th scope="col" className="px-6 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <Motion.tbody variants={containerVariants} initial="hidden" animate="visible" className="divide-y divide-white/10">
              {dokumenList.length === 0 ? (
                <Motion.tr variants={itemVariants}>
                  <td colSpan="4" className="px-6 py-4 text-center">Belum ada dokumen.</td>
                </Motion.tr>
              ) : (
                dokumenList.map((dokumen) => (
                  <Motion.tr key={dokumen.id} variants={itemVariants} className="hover:bg-white/5">
                    <td className="p-4">
                      <img src={dokumen.file_url} alt={dokumen.nama_dokumen} className="w-20 h-12 object-cover rounded-md" />
                    </td>
                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                      {dokumen.nama_dokumen}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(dokumen.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button className="btn btn-ghost btn-xs" onClick={() => alert('Fitur Edit segera hadir!')}><FiEdit /></button>
                        <a href={dokumen.file_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-xs"><FiExternalLink /></a>
                        <a href={dokumen.file_url} download className="btn btn-ghost btn-xs"><FiDownload /></a>
                        <button onClick={() => handleDelete(dokumen.id, dokumen.file_url)} className="btn btn-ghost btn-xs text-red-500 hover:bg-red-500 hover:text-white"><FiTrash2 /></button>
                      </div>
                    </td>
                  </Motion.tr>
                ))
              )}
            </Motion.tbody>
          </table>
        </div>
      </div>

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