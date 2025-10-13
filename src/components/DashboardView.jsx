import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import StatCard from './StatCard';
import ProgressStatCard from './ProgressStatCard';
import RecentActivity from './RecentActivity';
import { motion as Motion } from 'framer-motion';
import { FileText, Award, ClipboardCheck, Briefcase } from 'lucide-react';

function DashboardView({ refreshKey }) {
  const [dokumenCount, setDokumenCount] = useState(0);
  const [sertifikatCount, setSertifikatCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [avgProjectProgress, setAvgProjectProgress] = useState(0);
  const [activitiesDone, setActivitiesDone] = useState(0);
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };
  const itemVariants = { 
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      const [
        { count: docCount },
        { count: certCount },
        { count: activityCount },
        { data: projectsData, error: projError }
      ] = await Promise.all([
        supabase.from('dokumen').select('*', { count: 'exact', head: true }),
        supabase.from('sertifikat').select('*', { count: 'exact', head: true }),
        supabase.from('daily_activities').select('*', { count: 'exact', head: true }).eq('is_completed', true),
        supabase.from('projects').select('progress').eq('status', 'In Progress')
      ]);

      if (!projError && projectsData) {
        const projCount = projectsData.length;
        setProjectCount(projCount);
        if (projCount > 0) {
          const totalProgress = projectsData.reduce((sum, p) => sum + p.progress, 0);
          setAvgProjectProgress(Math.round(totalProgress / projCount));
        } else {
          setAvgProjectProgress(0);
        }
      }

      setDokumenCount(docCount || 0);
      setSertifikatCount(certCount || 0);
      setActivitiesDone(activityCount || 0);
      setLoading(false);
    }
    fetchAllData();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="bg-white/10 rounded-2xl h-[108px]" />
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-2xl h-24" />
            <div className="bg-white/10 rounded-2xl h-24" />
            <div className="bg-white/10 rounded-2xl h-24" />
            <div className="bg-white/10 rounded-2xl h-24" />
        </div>
        <div className="h-4 bg-white/10 rounded-md w-1/3 mt-4" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/10 rounded-2xl h-[116px]" />
            <div className="bg-white/10 rounded-2xl h-48" />
          </div>
          <div className="space-y-6">
            <div className="bg-white/10 rounded-2xl h-[100px]" />
            <div className="bg-white/10 rounded-2xl h-[100px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Motion.div 
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <Motion.div variants={itemVariants}>
        <div className="relative p-6 rounded-2xl shadow-xl 
                       bg-white/10 backdrop-blur-lg border border-white/20
                       overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl" />
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            Welcome Back, Miguel 🤘
          </h2>
          <p className="mt-1 text-gray-300 text-sm">
            Semoga harimu menyenangkan — tetap produktif & semangat!
          </p>
        </div>
      </Motion.div>

      {/* Main Stats Section */}
      <Motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Activity"
            value={activitiesDone}
            icon={<ClipboardCheck className="w-5 h-5 text-green-500" />}
          />
          <StatCard
            title="Projects"
            value={projectCount}
            icon={<Briefcase className="w-5 h-5 text-pink-400" />}
          />
          <StatCard
            title="Dokumen"
            value={dokumenCount}
            icon={<FileText className="w-5 h-5 text-blue-400" />}
          />
          <StatCard
            title="Total Sertifikat"
            value={sertifikatCount}
            icon={<Award className="w-5 h-5 text-yellow-400" />}
          />
        </div>
      </Motion.div>

      {/* Section Divider */}
      <Motion.div variants={itemVariants}>
        <h3 className="text-gray-300 text-sm font-semibold tracking-wide mt-4 uppercase">
          Detail Progres & Aktivitas
        </h3>
        <div className="border-b border-gray-700 mt-1 mb-4"></div>
      </Motion.div>

      {/* Lower Section */}
      <Motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Kiri */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ProgressStatCard 
            title="Rata-rata Progres Proyek" 
            value={avgProjectProgress}
            subtitle={`${projectCount} proyek berjalan`} 
          />
          <RecentActivity refreshKey={refreshKey} />
        </div>

        {/* Kanan */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-xl">
            <h4 className="text-white font-semibold text-sm mb-2">Catatan Cepat</h4>
            <p className="text-gray-400 text-sm">Tambahkan catatan harianmu di sini nanti (fitur coming soon)</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-xl">
            <h4 className="text-white font-semibold text-sm mb-2">Agenda Mendatang</h4>
            <p className="text-gray-400 text-sm">Tidak ada jadwal baru hari ini.</p>
          </div>
        </div>
      </Motion.div>
    </Motion.div>
  );
}

export default DashboardView;