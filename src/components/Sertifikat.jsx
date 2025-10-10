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
    <div className="flex flex-col gap-4">
      {sertifikatList.length === 0 ? (
        <p>Belum ada sertifikat.</p>
      ) : (
        sertifikatList.map((sertifikat) => (
          <div key={sertifikat.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row items-center transition-all hover:shadow-lg hover:scale-[1.02]">
            <img 
              src={sertifikat.file_url} 
              alt={sertifikat.nama_sertifikat} 
              className="h-32 w-full sm:w-40 object-cover flex-shrink-0"
            />
            <div className="p-4 flex flex-col justify-between flex-grow w-full">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{sertifikat.nama_sertifikat}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Diunggah: {new Date(sertifikat.created_at).toLocaleDateString('id-ID')}
                </p>
              </div>
              <a 
                href={sertifikat.file_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-indigo-600 hover:text-indigo-800 mt-3 self-start"
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