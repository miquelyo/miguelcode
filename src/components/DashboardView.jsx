// src/components/DashboardView.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import StatCard from './StatCard';
// DIUBAH: Impor 'motion' sebagai 'Motion' (dengan huruf besar)
import { motion as Motion } from 'framer-motion';

function DashboardView({ refreshKey }) {
  const [dokumenCount, setDokumenCount] = useState(0);
  const [sertifikatCount, setSertifikatCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Varian animasi untuk kontainer
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Varian animasi untuk setiap item
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  useEffect(() => {
    async function fetchAllCounts() {
      setLoading(true);
      const { count: docCount } = await supabase.from('dokumen').select('*', { count: 'exact', head: true });
      const { count: certCount } = await supabase.from('sertifikat').select('*', { count: 'exact', head: true });
      setDokumenCount(docCount);
      setSertifikatCount(certCount);
      setLoading(false);
    }
    fetchAllCounts();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg animate-pulse h-[108px]"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg animate-pulse h-[100px]"></div>
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg animate-pulse h-[100px]"></div>
        </div>
      </div>
    );
  }

  return (
    // DIUBAH: Gunakan Motion.div
    <Motion.div 
      className="flex flex-col gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* DIUBAH: Gunakan Motion.div */}
      <Motion.div 
        className="bg-indigo-600 p-6 rounded-xl shadow-lg text-white"
        variants={itemVariants}
      >
        <h2 className="text-xl font-bold">Welcome Back, Miguel!</h2>
        <p className="mt-1 text-indigo-200">How are you today?</p>
      </Motion.div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Total Dokumen" value={dokumenCount} subtitle="Dokumen" />
        <StatCard title="Total Sertifikat" value={sertifikatCount} subtitle="Sertifikat" />
      </div>
    </Motion.div>
  );
}

export default DashboardView;