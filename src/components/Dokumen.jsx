// src/components/Dokumen.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Dokumen({ refreshKey }) {
  const [dokumenList, setDokumenList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDokumen() {
      setLoading(true);
      const { data, error } = await supabase.from('dokumen').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching dokumen:', error);
      } else {
        setDokumenList(data);
      }
      setLoading(false);
    }
    fetchDokumen();
  }, [refreshKey]);

  if (loading) return <p>Memuat data dokumen...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {dokumenList.length === 0 ? (
        <p className="col-span-full">Belum ada dokumen.</p>
      ) : (
        dokumenList.map((dokumen) => (
          <div key={dokumen.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={dokumen.file_url} 
              alt={dokumen.nama_dokumen} 
              className="h-48 w-full object-cover" 
            />
            <div className="p-4">
              {/* DIUBAH: Tambahkan 'text-gray-800' untuk memastikan teks berwarna gelap */}
              <h3 className="font-semibold text-lg truncate text-gray-800">{dokumen.nama_dokumen}</h3>
              <a 
                href={dokumen.file_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-indigo-600 hover:text-indigo-800 mt-2 inline-block"
              >
                Lihat Detail
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default Dokumen;