// src/components/FinancialReport.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function FinancialReport({ refreshKey }) {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      setLoading(true);
      const { data, error } = await supabase.from('transactions').select('category, amount').eq('type', 'expense');

      if (error) {
        console.error(error);
      } else {
        const summary = data.reduce((acc, curr) => {
          acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
          return acc;
        }, {});

        setReportData({
          labels: Object.keys(summary),
          datasets: [{
            data: Object.values(summary),
            backgroundColor: ['#34d399', '#f87171', '#60a5fa', '#fbbf24', '#a78bfa', '#ec4899'],
            borderColor: '#1f2937', // Warna background
            borderWidth: 2,
          }],
        });
      }
      setLoading(false);
    }
    fetchReport();
  }, [refreshKey]);

  if (loading) return <p className="text-gray-400">Memuat laporan...</p>;

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-6">
      <h3 className="font-semibold text-white mb-4">Laporan Pengeluaran per Kategori</h3>
      {reportData && reportData.labels.length > 0 ? (
        <div className="max-w-sm mx-auto">
            <Doughnut 
              data={reportData} 
              options={{ plugins: { legend: { labels: { color: 'white' } } } }}
            />
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">Belum ada data untuk ditampilkan.</p>
      )}
    </div>
  );
}

export default FinancialReport;