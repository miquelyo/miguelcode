import { useState } from 'react';
import Dokumen from '../components/Dokumen';
import Sertifikat from '../components/Sertifikat';
import DashboardView from '../components/DashboardView';
import Projects from '../components/Projects';
import ExpenseTracker from '../components/ExpenseTracker'; // Pastikan file ini ada
import { FiGrid, FiFileText, FiAward, FiLogOut, FiClipboard, FiDollarSign } from 'react-icons/fi';
import { motion as Motion, AnimatePresence } from 'framer-motion';

function PrivateData({ onLogout }) { 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0); 

  const handleDataChange = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <FiGrid size={22} /> },
    { id: 'projects', name: 'Projects', icon: <FiClipboard size={22} /> },
    { id: 'finance', name: 'Keuangan', icon: <FiDollarSign size={22} /> },
    { id: 'dokumen', name: 'Documents', icon: <FiFileText size={22} /> },
    { id: 'sertifikat', name: 'Certificates', icon: <FiAward size={22} /> },
  ];
  
  return (
    <div className="relative flex min-h-screen bg-gray-900 text-white font-sans">
      
      {/* Sidebar untuk Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-gray-800 text-gray-300 shadow-lg">
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <span className="font-bold text-2xl text-white">MiguelCode</span>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {item.icon}<span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-red-700 hover:text-white transition-colors">
            <FiLogOut size={20} /><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto pb-24 md:pb-8">
        
        {/* Header Baru */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-gray-800">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {navItems.find(item => item.id === activeTab)?.name}
            </h1>

            {activeTab === 'dashboard' && (
              <p className="text-gray-400 mt-1 flex items-center gap-2">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} 🤘
              </p>
            )}

            {activeTab !== 'dashboard' && (
              <p className="text-gray-400 mt-1">
                Kelola data {navItems.find(item => item.id === activeTab)?.name.toLowerCase()} Anda
              </p>
            )}
          </div>

          <button 
            onClick={onLogout} 
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-all"
          >
            <FiLogOut /> Logout
          </button>
        </div>

        {/* Konten Halaman Animasi */}
        <AnimatePresence mode="wait">
          <Motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && <DashboardView refreshKey={refreshKey} />}
            {activeTab === 'projects' && <Projects refreshKey={refreshKey} onDataChange={handleDataChange} />}
            {activeTab === 'finance' && <ExpenseTracker refreshKey={refreshKey} onDataChange={handleDataChange} />}
            {activeTab === 'dokumen' && <Dokumen refreshKey={refreshKey} onDataChange={handleDataChange} />}
            {activeTab === 'sertifikat' && <Sertifikat refreshKey={refreshKey} onDataChange={handleDataChange} />}
          </Motion.div>
        </AnimatePresence>
      </main>

      {/* Navigasi Bawah */}
      <footer className="fixed bottom-4 inset-x-4 bg-gray-900/70 backdrop-blur-lg border border-white/10 p-2 flex justify-around items-center rounded-full shadow-lg md:hidden z-10">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center justify-center w-full rounded-full py-3 transition-colors relative ${
              activeTab === item.id ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {activeTab === item.id && (
              <Motion.div
                layoutId="active-bottom-nav-pill"
                className="absolute inset-0 bg-white/10"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <div className="relative z-10">{item.icon}</div>
          </button>
        ))}
      </footer>
    </div>
  );
}

export default PrivateData;