import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut } from 'lucide-react';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative rounded-3xl p-6 w-full max-w-sm mx-4 shadow-2xl z-10"
            style={{
              background: 'rgba(25, 25, 35, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors duration-200"
            >
              <X size={16} />
            </button>

            {/* Icon decoration */}
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-rose-500/20 text-rose-400 mb-4">
              <LogOut size={22} />
            </div>

            <h2 className="text-xl font-bold text-white mb-2">
              Konfirmasi Keluar
            </h2>
            <p className="text-xs leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
              Apakah Anda yakin ingin keluar dari MiguelCode? Semua sesi kerja Anda saat ini akan diakhiri secara aman.
            </p>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-200"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 transition-all duration-200 shadow-lg shadow-rose-500/20"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
