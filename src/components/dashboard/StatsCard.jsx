import { motion } from 'framer-motion'

export default function StatsCard({ title, value, subtitle, icon, color = '#a78bfa' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: `0 12px 30px ${color}30` }}
      transition={{ duration: 0.4 }}
      className="p-5 rounded-2xl transition-all duration-300 cursor-default"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* ICON */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${color}20`, boxShadow: `0 0 20px ${color}30` }}
      >
        <div style={{ color }}>{icon}</div>
      </div>

      {/* VALUE */}
      <h3 className="text-2xl font-bold tracking-tight animate-fade-in-up" style={{ color: 'var(--color-text)' }}>{value}</h3>

      {/* TITLE */}
      <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{title}</p>

      {/* SUBTITLE */}
      {subtitle && (
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)', opacity: 0.7 }}>{subtitle}</p>
      )}
    </motion.div>
  )
}