import { CheckCircle2, Wallet, FileText, Utensils, Zap, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

const activities = [
  { title: 'Task Completed',    desc: 'Dashboard UI finished',     icon: CheckCircle2, color: '#34d399', time: '2m ago'    },
  { title: 'Expense Added',     desc: 'Spotify · $9.99',           icon: Wallet,       color: '#f472b6', time: '1h ago'    },
  { title: 'Document Uploaded', desc: 'Passport.pdf · 2.4 MB',    icon: FileText,     color: '#60a5fa', time: '3h ago'    },
  { title: 'Meal Planned',      desc: 'Healthy lunch · 540 kcal',  icon: Utensils,     color: '#fb923c', time: 'Yesterday' },
  { title: 'Flow Updated',      desc: '3 tasks moved to Done',     icon: Zap,          color: '#a78bfa', time: 'Yesterday' },
]

export default function RecentActivity() {
  return (
    <div
      className="p-5 rounded-3xl h-full transition-all duration-300"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Activity Feed</p>
          <h2 className="text-lg font-bold mt-0.5" style={{ color: 'var(--color-text)' }}>Recent Activity</h2>
        </div>
        <button
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-200"
          style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
        >
          <ArrowUpRight size={14} style={{ color: 'var(--color-text-muted)' }} />
        </button>
      </div>

      {/* TIMELINE */}
      <div className="space-y-1 relative">
        {/* vertical line */}
        <div className="absolute left-5 top-5 bottom-5 w-px" style={{ background: 'var(--color-border)' }} />

        {activities.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.09 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 p-2.5 rounded-2xl cursor-pointer transition-all duration-200"
              style={{ position: 'relative' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Icon bubble */}
              <div
                className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center z-10"
                style={{
                  background: `${item.color}18`,
                  border: `1px solid ${item.color}30`,
                  boxShadow: `0 0 16px ${item.color}20`,
                }}
              >
                <Icon size={15} style={{ color: item.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>{item.title}</p>
                <p className="text-xs truncate mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
              </div>

              <span className="text-[10px] flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>{item.time}</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}