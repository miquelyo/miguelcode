import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const colColors = {
  'Todo':        { dot: '#fb923c', badge: 'rgba(251,146,60,0.15)',  text: '#fb923c' },
  'In Progress': { dot: '#a78bfa', badge: 'rgba(167,139,250,0.15)', text: '#a78bfa' },
  'Completed':   { dot: '#34d399', badge: 'rgba(52,211,153,0.15)',  text: '#34d399' },
}

export default function FlowColumn({ title, count, children }) {
  const col = colColors[title] || colColors['Todo']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col rounded-3xl p-4 min-h-[480px] transition-all duration-300"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: col.dot, boxShadow: `0 0 8px ${col.dot}` }} />
          <h2 className="font-bold text-base" style={{ color: 'var(--color-text)' }}>{title}</h2>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: col.badge, color: col.text }}
          >
            {count}
          </span>
        </div>
        <button
          className="w-7 h-7 rounded-xl flex items-center justify-center transition-colors duration-200"
          style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-surface-2)'}
        >
          <Plus size={13} style={{ color: 'var(--color-text-muted)' }} />
        </button>
      </div>

      {/* CARDS */}
      <div className="space-y-3 flex-1">{children}</div>

      {/* ADD TASK button */}
      <button
        className="mt-4 w-full py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
        style={{
          background: 'var(--color-surface-2)',
          border: '1px dashed var(--color-border)',
          color: 'var(--color-text-muted)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-surface)'; e.currentTarget.style.color = 'var(--color-text)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-surface-2)'; e.currentTarget.style.color = 'var(--color-text-muted)' }}
      >
        <Plus size={12} /> Add Task
      </button>
    </motion.div>
  )
}