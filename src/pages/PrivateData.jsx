// src/pages/PrivateData.jsx
import { useState } from 'react';
import Dokumen from '../components/Dokumen';
import Sertifikat from '../components/Sertifikat';
import DashboardView from '../components/DashboardView';
import { FiGrid, FiFileText, FiAward, FiLogOut } from 'react-icons/fi';
import { motion as Motion, AnimatePresence } from 'framer-motion';

function PrivateData({ onLogout }) { 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0); 

  const handleDataChange = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <FiGrid size={24} /> },
    { id: 'dokumen', name: 'Dokumen', icon: <FiFileText size={24} /> },
    { id: 'sertifikat', name: 'Sertifikat', icon: <FiAward size={24} /> },
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
                ? 'bg-indigo-600 text-white' 
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
        <div className="flex justify-between items-center pb-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            {navItems.find(item => item.id === activeTab)?.name}
          </h1>
          <button onClick={onLogout} className="btn btn-ghost btn-sm hidden md:flex"><FiLogOut /></button>
        </div>
        
        <AnimatePresence mode="wait">
          <Motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && <DashboardView refreshKey={refreshKey} />}
            {activeTab === 'dokumen' && <Dokumen refreshKey={refreshKey} onDataChange={handleDataChange} />}
            {activeTab === 'sertifikat' && <Sertifikat refreshKey={refreshKey} onDataChange={handleDataChange} />}
          </Motion.div>
        </AnimatePresence>
      </main>

      {/* Navigasi Bawah Khusus Mobile */}
      <footer className="fixed bottom-4 inset-x-4 bg-gray-800/80 backdrop-blur-lg border border-white/10 p-2 flex justify-around items-center rounded-full shadow-lg md:hidden z-10">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-full rounded-lg py-2 transition-colors ${
              activeTab === item.id 
              ? 'text-indigo-400' 
              : 'text-gray-400 hover:bg-gray-700/50'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1 font-semibold">{item.name}</span>
          </button>
        ))}
      </footer>
    </div>
  );
}

export default PrivateData;
