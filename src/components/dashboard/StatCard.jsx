import React from 'react';
import { LayoutDashboard, Zap, UtensilsCrossed, Wallet, ChartPie } from 'lucide-react';
import { motion } from 'framer-motion';

// Map icon name strings to actual icon components
const iconMap = {
  LayoutDashboard: LayoutDashboard,
  Zap: Zap,
  UtensilsCrossed: UtensilsCrossed,
  Wallet: Wallet,
  ChartPie: ChartPie,
};

/**
 * StatCard – reusable card displaying a title, value, and an icon.
 * Uses glass‑morphism via the .glass-card class and subtle entrance animation.
 */
export default function StatCard({ title, value, icon }) {
  const Icon = iconMap[icon] || LayoutDashboard;
  return (
    <motion.div
      className="glass-card flex items-center space-x-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-3 bg-white/30 rounded-lg backdrop-blur-sm">
        <Icon size={24} className="text-gray-800" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </motion.div>
  );
}
