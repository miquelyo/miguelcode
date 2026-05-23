import { Plus, FileText, Wallet, Utensils, Zap, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const actions = [
  { title: 'New Task',    icon: Plus,      gradient: 'from-violet-500 to-indigo-500', glow: 'rgba(139,92,246,0.4)' },
  { title: 'Add Expense', icon: Wallet,    gradient: 'from-rose-400 to-pink-500',     glow: 'rgba(244,114,182,0.4)' },
  { title: 'Upload File', icon: FileText,  gradient: 'from-sky-400 to-blue-500',      glow: 'rgba(56,189,248,0.4)' },
  { title: 'Meal Plan',   icon: Utensils,  gradient: 'from-emerald-400 to-teal-500',  glow: 'rgba(52,211,153,0.4)' },
]

export default function QuickActions() {
  return (
    <div>
      <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
        Quick Actions
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((action, i) => {
          const Icon = action.icon
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: `0 12px 30px ${action.glow}` }}
              whileTap={{ scale: 0.96 }}
              className="flex flex-col items-start p-4 rounded-2xl transition-all duration-300 text-left cursor-pointer"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br ${action.gradient}`}
                style={{ boxShadow: `0 4px 15px ${action.glow}` }}>
                <Icon size={18} className="text-white" />
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{action.title}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}