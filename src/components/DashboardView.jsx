import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import StatCard from './StatCard';
import { motion as Motion } from 'framer-motion';

function DashboardView({ refreshKey }) {
  const [dokumenCount, setDokumenCount] = useState(0);
  const [sertifikatCount, setSertifikatCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Varian animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
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
    <Motion.div 
      className="flex flex-col gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* DIUBAH: Welcome Card sekarang menggunakan efek kaca */}
      <Motion.div 
        className="p-6 rounded-xl shadow-lg bg-white/5 backdrop-blur-lg border border-white/10"
        variants={itemVariants}
      >
        <h2 className="text-xl font-bold text-white">Selamat Datang, Miguel!</h2>
        <p className="mt-1 text-gray-400">Always Try Hard bruhhh.</p>
      </Motion.div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Total Dokumen" value={dokumenCount} subtitle="Dokumen terverifikasi" />
        <StatCard title="Total Sertifikat" value={sertifikatCount} subtitle="Sertifikat didapatkan" />
      </div>
    </Motion.div>
  );
}

export default DashboardView;
