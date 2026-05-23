// src/components/TransactionList.jsx
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { FiPlus, FiShoppingBag, FiBriefcase, FiHome, FiHeart, FiMoreHorizontal, FiCreditCard, FiPlay, FiCoffee, FiScissors, FiBook, FiTrendingUp, FiTruck } from 'react-icons/fi';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// DIUBAH: Kategori sekarang adalah objek dengan ikon
const categories = [
  { name: "Makan & Minum", icon: <FiCoffee /> },
  { name: "Belanja", icon: <FiShoppingBag /> },
  { name: "Transportasi", icon: <FiTruck /> },
  { name: "Tagihan", icon: <FiCreditCard /> },
  { name: "Rumah", icon: <FiHome /> },
  { name: "Kesehatan", icon: <FiHeart /> },
  { name: "Perawatan", icon: <FiScissors /> },
  { name: "Main", icon: <FiPlay /> },
  { name: "Langganan", icon: <FiBook /> },
  { name: "Bisnis", icon: <FiBriefcase /> },
  { name: "Dapur", icon: <FiTrendingUp />},
  { name: "Lain-lain", icon: <FiMoreHorizontal /> },
];

function TransactionList({ refreshKey, onDataChange }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const modal = useRef(null);

  // State untuk form
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0].name);
  const [type, setType] = useState('expense');

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      const { data, error } = await supabase.from('transactions').select('*').order('created_at', { ascending: false });
      if (error) console.error(error);
      else setTransactions(data);
      setLoading(false);
    }
    fetchTransactions();
  }, [refreshKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('transactions').insert([{ description, amount: Number(amount), category, type }]);
    if (error) {
      alert(error.message);
    } else {
      setDescription(''); setAmount('');
      modal.current.close();
      onDataChange();
    }
  };
  
  const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

  if (loading) return <p className="text-gray-400">Memuat transaksi...</p>;

  return (
    <div className="relative">
      {/* Kontainer daftar transaksi */}
      <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-4 space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Belum ada transaksi.</p>
          </div>
        ) : (
          transactions.map(tx => (
            <Motion.div key={tx.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
            >
              <div>
                <p className="font-semibold text-white">{tx.description}</p>
                <p className="text-xs text-gray-400">{tx.category}</p>
              </div>
              <p className={`font-bold ${tx.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>
                {tx.type === 'expense' ? '-' : '+'} {formatCurrency(tx.amount)}
              </p>
            </Motion.div>
          ))
        )}
        
        {/* DIUBAH: Tombol Tambah sekarang ada di dalam daftar, dengan gaya baru */}
        <button 
            onClick={() => modal.current.showModal()}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-gray-700 hover:border-gray-600 hover:bg-white/5 transition-colors"
        >
            <FiPlus className="text-gray-500" />
            <span className="text-sm font-semibold text-gray-500">Tambah Transaksi</span>
        </button>
      </div>

      <dialog ref={modal} className="modal">
        <div className="modal-box bg-gray-800">
          <h3 className="font-bold text-lg">Transaksi Baru</h3>
          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            <div className="join w-full">
              <button type="button" onClick={() => setType('expense')} className={`btn join-item w-1/2 ${type === 'expense' ? 'btn-primary' : ''}`}>Pengeluaran</button>
              <button type="button" onClick={() => setType('income')} className={`btn join-item w-1/2 ${type === 'income' ? 'btn-primary' : ''}`}>Pemasukan</button>
            </div>
            
            {/* DIUBAH: Urutan form dirombak */}
            <div>
              <label className="label"><span className="label-text text-gray-300">Kategori</span></label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="select select-bordered w-full">
                {categories.map(cat => <option key={cat.name}>{cat.name}</option>)}
              </select>
            </div>

            <div>
              <label className="label"><span className="label-text text-gray-300">Jumlah</span></label>
              <label className="input input-bordered flex items-center gap-2">
                <span className="text-gray-400">Rp</span>
                <input type="number" className="grow" placeholder="25000" value={amount} onChange={e => setAmount(e.target.value)} required />
              </label>
            </div>

            <div>
              <label className="label"><span className="label-text text-gray-300">Notes (Opsional)</span></label>
              <textarea className="textarea textarea-bordered w-full" placeholder="Contoh: Makan siang di kantor" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            
            <div className="modal-action mt-6">
              <button type="button" className="btn btn-ghost" onClick={() => modal.current.close()}>Batal</button>
              <button type="submit" className="btn btn-primary">Simpan</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default TransactionList;