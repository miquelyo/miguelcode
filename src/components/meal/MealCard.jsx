import { Clock, Flame, Award } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MealCard({ title, calories, protein, time, color }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="p-5 rounded-3xl transition-all duration-300 relative group overflow-hidden"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* GLOW DECORATIVE */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-all duration-300"
        style={{ background: color }} />

      <div className="flex items-center justify-between mb-4">
        {/* Color indicator tag */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white" style={{ background: color }}>
            <Award size={14} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
            Meal Block
          </span>
        </div>

        {/* Time info */}
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <Clock size={13} />
          {time}
        </div>
      </div>

      {/* Info title */}
      <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>{title}</h3>

      {/* Stats container */}
      <div className="flex items-center gap-4 mt-5">
        <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full text-orange-400"
          style={{ background: 'rgba(251,146,96,0.12)' }}>
          <Flame size={13} />
          {calories}
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-full text-emerald-400"
          style={{ background: 'rgba(52,211,153,0.12)' }}>
          {protein} protein
        </div>
      </div>
    </motion.div>
  )
}