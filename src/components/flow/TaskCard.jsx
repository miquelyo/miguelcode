import { motion } from 'framer-motion'
import { Calendar, Flag } from 'lucide-react'

const priorityConfig = {
  High:   { color: '#f472b6', bg: 'rgba(244,114,182,0.12)', label: 'High'   },
  Medium: { color: '#fb923c', bg: 'rgba(251,146,60,0.12)',  label: 'Medium' },
  Low:    { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)',  label: 'Low'    },
  Done:   { color: '#34d399', bg: 'rgba(52,211,153,0.12)',  label: 'Done'   },
}

export default function TaskCard({ title, desc, priority, date, color }) {
  const p = priorityConfig[priority] || priorityConfig.Low

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, boxShadow: `0 8px 30px ${color}25` }}
      transition={{ duration: 0.3 }}
      className="p-4 rounded-2xl cursor-grab active:cursor-grabbing transition-all duration-300"
      style={{
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border)',
        borderLeft: `3px solid ${color}`,
      }}
    >
      {/* Priority badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
          style={{ background: p.bg, color: p.color }}
        >
          <Flag size={9} />
          {p.label}
        </span>
        <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold leading-snug mb-1" style={{ color: 'var(--color-text)' }}>{title}</h3>

      {/* Description */}
      <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>

      {/* Footer */}
      <div className="flex items-center gap-1.5 mt-3 pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Calendar size={11} style={{ color: 'var(--color-text-muted)' }} />
        <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{date}</span>
      </div>
    </motion.div>
  )
}