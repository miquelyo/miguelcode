import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const bars = [
  { day: 'Mon', val: 40, height: '40%' },
  { day: 'Tue', val: 65, height: '65%' },
  { day: 'Wed', val: 55, height: '55%' },
  { day: 'Thu', val: 80, height: '80%' },
  { day: 'Fri', val: 60, height: '60%' },
  { day: 'Sat', val: 95, height: '95%' },
  { day: 'Sun', val: 70, height: '70%' },
]

export default function ExpenseChart() {
  return (
    <div
      className="p-5 rounded-3xl h-full flex flex-col justify-between transition-all duration-300"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
            Analytics
          </p>
          <h3 className="text-lg font-bold mt-0.5" style={{ color: 'var(--color-text)' }}>Spending Overview</h3>
        </div>

        <button
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-200"
          style={{ color: 'var(--color-primary)', background: 'rgba(120,90,255,0.12)', border: '1px solid rgba(120,90,255,0.25)' }}
        >
          Weekly <ArrowUpRight size={12} />
        </button>
      </div>

      {/* CHART BARS */}
      <div className="flex items-end justify-between gap-3 h-44 px-2">
        {bars.map((bar, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <div className="w-full bg-black/5 dark:bg-white/5 rounded-t-xl relative overflow-hidden h-full flex items-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: bar.height }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
                className="w-full rounded-t-xl"
                style={{
                  background: 'var(--gradient-primary)',
                  boxShadow: '0 -2px 10px rgba(120,90,255,0.3)',
                }}
              />
            </div>
            <span className="text-[10px] font-semibold" style={{ color: 'var(--color-text-muted)' }}>
              {bar.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}