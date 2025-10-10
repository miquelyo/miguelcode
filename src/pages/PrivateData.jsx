// src/pages/PrivateData.jsx
import { useState, useRef } from 'react'; // DIUBAH: useEffect dihapus dari sini
import Dokumen from '../components/Dokumen';
import Sertifikat from '../components/Sertifikat';
import DashboardView from '../components/DashboardView';
import UploadForm from '../components/UploadForm';
import { FiGrid, FiFileText, FiAward, FiLogOut, FiPlus, FiMenu, FiX } from 'react-icons/fi';

function PrivateData({ onLogout }) { 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadTarget, setUploadTarget] = useState('dokumen');
  const [refreshKey, setRefreshKey] = useState(0); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const uploadModal = useRef(null);

  const handleUploadSuccess = () => {
    uploadModal.current.close();
    setRefreshKey(prevKey => prevKey + 1);
  };

  const openUploadModal = (target) => {
    setUploadTarget(target);
    uploadModal.current.showModal();
  }

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <FiGrid size={20} /> },
    { id: 'dokumen', name: 'Dokumen', icon: <FiFileText size={20} /> },
    { id: 'sertifikat', name: 'Sertifikat', icon: <FiAward size={20} /> },
  ];

  return (
    <div className="relative flex min-h-screen bg-gray-900 text-white font-sans">
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>}
      <aside className={`fixed inset-y-0 left-0 z-30 flex flex-col w-64 bg-gray-800 text-gray-300 shadow-lg transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <span className="font-bold text-2xl text-white">MiguelCode</span>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ease-in-out ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-gray-700 hover:text-white'}`}
            >
              {item.icon}<span className="font-semibold">{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-red-700 hover:text-white transition-colors">
            <FiLogOut size={20} /><span className="font-semibold">Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <div className="flex justify-between items-center pb-4 mb-6">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <h1 className="text-2xl md:text-3xl font-bold">
              {navItems.find(item => item.id === activeTab)?.name}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {activeTab !== 'dashboard' && (
              <button className="btn btn-primary btn-sm" onClick={() => openUploadModal(activeTab)}>
                <FiPlus /> Tambah Baru
              </button>
            )}
            <button onClick={onLogout} className="btn btn-ghost btn-sm hidden md:flex"><FiLogOut /></button>
          </div>
        </div>
        <div>
          {activeTab === 'dashboard' && <DashboardView refreshKey={refreshKey} />}
          {activeTab === 'dokumen' && <Dokumen refreshKey={refreshKey} />}
          {activeTab === 'sertifikat' && <Sertifikat refreshKey={refreshKey} />}
        </div>
      </main>
      <dialog id="upload_modal" className="modal" ref={uploadModal}>
        <div className="modal-box bg-gray-800">
          <h3 className="font-bold text-lg">Unggah {uploadTarget === 'dokumen' ? 'Dokumen' : 'Sertifikat'} Baru</h3>
          <div className="py-4">
            <UploadForm bucketName="dokumen-pribadi" tableName={uploadTarget} onUpload={handleUploadSuccess}/>
          </div>
          <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button></form>
        </div>
      </dialog>
    </div>
  );
}
export default PrivateData;