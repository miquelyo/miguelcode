import { FileText, MoreVertical, Eye, Download, Trash } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function RecentFileCard({ name, size, date }) {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div
      className="flex items-center justify-between p-4 rounded-2xl transition-all duration-300 relative group"
      style={{
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'rgba(96,165,250,0.12)',
            color: '#60a5fa',
          }}
        >
          <FileText size={18} />
        </div>

        <div className="min-w-0">
          <h4 className="font-bold text-sm truncate" style={{ color: 'var(--color-text)' }}>{name}</h4>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
            {size} • {date}
          </p>
        </div>
      </div>

      {/* OPTIONS TRIGGER */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
          }}
        >
          <Eye size={12} />
          View
        </motion.button>

        <button
          onClick={() => setShowOptions(!showOptions)}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 hover:bg-white/5 cursor-pointer"
        >
          <MoreVertical size={16} style={{ color: 'var(--color-text-muted)' }} />
        </button>
      </div>

      {/* DROP DOWN MENU */}
      {showOptions && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowOptions(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute right-4 top-14 z-50 py-1.5 rounded-xl shadow-xl w-36"
            style={{
              background: 'var(--color-surface-2)',
              backdropFilter: 'blur(24px)',
              border: '1px solid var(--color-border)',
            }}
          >
            <button className="w-full px-4 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-white/5 transition-colors cursor-pointer" style={{ color: 'var(--color-text)' }}>
              <Eye size={13} /> View File
            </button>
            <button className="w-full px-4 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-white/5 transition-colors cursor-pointer" style={{ color: 'var(--color-text)' }}>
              <Download size={13} /> Download
            </button>
            <button className="w-full px-4 py-2 text-left text-xs font-semibold text-rose-400 flex items-center gap-2 hover:bg-rose-500/10 transition-colors cursor-pointer">
              <Trash size={13} /> Delete
            </button>
          </motion.div>
        </>
      )}
    </div>
  )
}