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
    // Kontainer utama sekarang adalah flex column dengan jarak antar item
    <div className="flex flex-col gap-4">
      {dokumenList.length === 0 ? (
        <p>Belum ada dokumen.</p>
      ) : (
        dokumenList.map((dokumen) => (
          // Setiap item adalah sebuah baris dengan hover effect
          <div key={dokumen.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row items-center transition-all hover:shadow-lg hover:scale-[1.02]">
            {/* Gambar Thumbnail di Kiri */}
            <img 
              src={dokumen.file_url} 
              alt={dokumen.nama_dokumen} 
              // Ukuran gambar lebih kecil dan tetap
              className="h-32 w-full sm:w-40 object-cover flex-shrink-0"
            />
            {/* Konten Teks di Kanan */}
            <div className="p-4 flex flex-col justify-between flex-grow w-full">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{dokumen.nama_dokumen}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Diunggah: {new Date(dokumen.created_at).toLocaleDateString('id-ID')}
                </p>
              </div>
              <a 
                href={dokumen.file_url} 
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
export default Dokumen;