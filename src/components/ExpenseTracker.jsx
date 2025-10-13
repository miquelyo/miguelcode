// src/components/ExpenseTracker.jsx
import { useState } from 'react';
import FinancialReport from './FinancialReport';
import TransactionList from './TransactionList';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FiList, FiPieChart } from 'react-icons/fi';

function ExpenseTracker({ refreshKey, onDataChange }) {
  const [activeView, setActiveView] = useState('transactions'); // 'transactions' atau 'report'

  const navItems = [
    { id: 'transactions', name: 'Transaksi', icon: <FiList /> },
    { id: 'report', name: 'Laporan', icon: <FiPieChart /> },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Switcher Kustom dengan Animasi Geser */}
      <div className="flex justify-center">
        <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 p-1 rounded-full flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-full ${
                activeView === item.id ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {/* "Pill" yang bergeser */}
              {activeView === item.id && (
                <Motion.div
                  layoutId="expense-active-pill"
                  className="absolute inset-0 bg-gray-700"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {item.icon}
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Konten Dinamis dengan Animasi Transisi */}
      <AnimatePresence mode="wait">
        <Motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeView === 'transactions' && <TransactionList refreshKey={refreshKey} onDataChange={onDataChange} />}
          {activeView === 'report' && <FinancialReport refreshKey={refreshKey} />}
        </Motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ExpenseTracker;