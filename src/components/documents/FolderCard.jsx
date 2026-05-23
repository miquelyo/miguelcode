import { Folder, MoreVertical } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FolderCard({ name, files, color }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02, boxShadow: `0 12px 30px ${color}15` }}
      whileTap={{ scale: 0.98 }}
      className="p-5 rounded-3xl transition-all duration-300 cursor-pointer relative group"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        {/* ICON */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${color}18`,
            color: color,
            boxShadow: `0 4px 14px ${color}20`,
          }}
        >
          <Folder size={20} />
        </div>

        {/* MORE OPTIONS */}
        <button className="w-8 h-8 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center hover:bg-white/5">
          <MoreVertical size={14} style={{ color: 'var(--color-text-muted)' }} />
        </button>
      </div>

      {/* INFO */}
      <h3 className="text-lg font-bold tracking-tight truncate" style={{ color: 'var(--color-text)' }}>{name}</h3>
      <p className="text-xs mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
        {files} files
      </p>
    </motion.div>
  )
}