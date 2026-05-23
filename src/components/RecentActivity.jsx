import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FiFileText, FiAward } from 'react-icons/fi';
import { motion as Motion } from 'framer-motion';

function RecentActivity({ refreshKey }) {
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentItems() {
      setLoading(true);

      const { data: docs } = await supabase.from('dokumen').select('*').order('created_at', { ascending: false }).limit(3);
      const { data: certs } = await supabase.from('sertifikat').select('*').order('created_at', { ascending: false }).limit(3);

      const combined = [
        ...(docs || []).map(d => ({ ...d, type: 'dokumen' })),
        ...(certs || []).map(c => ({ ...c, type: 'sertifikat' }))
      ];
      
      combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
      setRecentItems(combined.slice(0, 5));
      setLoading(false);
    }

    fetchRecentItems();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="mt-4 p-6 rounded-2xl shadow-lg bg-white/10 backdrop-blur-lg border border-white/20 animate-pulse h-48"></div>
    );
  }

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-6 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 h-full"
    >
      <h3 className="font-semibold text-white mb-4">Aktivitas Terbaru</h3>
      <div className="space-y-4">
        {recentItems.length === 0 ? (
          <p className="text-sm text-gray-400">Belum ada aktivitas.</p>
        ) : (
          recentItems.map(item => (
            <div key={`${item.type}-${item.id}`} className="flex items-center justify-between hover:bg-white/5 p-2 rounded-md transition-colors">
              <div className="flex items-center gap-4">
                {item.type === 'dokumen' 
                  ? <FiFileText className="text-cyan-400" /> 
                  : <FiAward className="text-amber-400" />
                }
                <span className="text-sm text-gray-200 truncate">{item.nama_dokumen || item.nama_sertifikat}</span>
              </div>
              <span className="text-xs text-gray-500 flex-shrink-0">
                {new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
              </span>
            </div>
          ))
        )}
      </div>
    </Motion.div>
  );
}

export default RecentActivity;