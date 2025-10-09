// src/components/Sertifikat.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Sertifikat({ refreshKey }) {
  const [sertifikatList, setSertifikatList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSertifikat() {
      setLoading(true);
      const { data, error } = await supabase.from('sertifikat').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching sertifikat:', error);
      } else {
        setSertifikatList(data);
      }
      setLoading(false);
    }
    fetchSertifikat();
  }, [refreshKey]);

  if (loading) return <p>Memuat data sertifikat...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {sertifikatList.length === 0 ? (
        <p className="col-span-full">Belum ada sertifikat.</p>
      ) : (
        sertifikatList.map((sertifikat) => (
          <div key={sertifikat.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={sertifikat.file_url} 
              alt={sertifikat.nama_sertifikat} 
              className="h-48 w-full object-cover" 
            />
            <div className="p-4">
              {/* DIUBAH: Tambahkan 'text-gray-800' untuk memastikan teks berwarna gelap */}
              <h3 className="font-semibold text-lg truncate text-gray-800">{sertifikat.nama_sertifikat}</h3>
              <a 
                href={sertifikat.file_url} 
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
export default Sertifikat;