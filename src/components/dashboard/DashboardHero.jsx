import { CheckCircle2, Clock3, Wallet, Flame, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  { title: 'Tasks',      value: '24', sub: 'Active',      icon: CheckCircle2, color: '#a78bfa', glow: 'rgba(167,139,250,0.3)' },
  { title: 'Focus Time', value: '6h', sub: 'Today',       icon: Clock3,       color: '#60a5fa', glow: 'rgba(96,165,250,0.3)'  },
  { title: 'Balance',    value: '$24.5k', sub: 'Total',   icon: Wallet,       color: '#f472b6', glow: 'rgba(244,114,182,0.3)' },
  { title: 'Streak',     value: '12',  sub: 'Days',       icon: Flame,        color: '#fb923c', glow: 'rgba(251,146,60,0.3)'  },
]

export default function DashboardHero() {
  return (
    <div className="space-y-5">
      {/* HERO BANNER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl p-6 lg:p-8 transition-all duration-300"
        style={{
          background: 'var(--gradient-hero-bg)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10 animate-spin-slow"
          style={{ background: 'var(--gradient-primary)' }} />
        <div className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full opacity-5"
          style={{ background: 'var(--gradient-secondary)' }} />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* LEFT */}
          <div>
            <p className="text-sm mb-2" style={{ color: 'var(--color-primary)' }}>Welcome back,</p>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-none" style={{ color: 'var(--color-hero-text)' }}>
              Miguel.
            </h1>
            <p className="mt-3 text-sm font-medium" style={{ color: 'var(--color-hero-sub)' }}>
              Your workspace is ready. Let's make today count. ✨
            </p>

            {/* Productivity score */}
            <div className="mt-6 flex items-end gap-2">
              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--color-hero-sub)' }}>Productivity Score</p>
                <div className="flex items-end gap-1">
                  <span className="text-6xl font-bold leading-none" style={{ color: 'var(--color-hero-text)' }}>832</span>
                  <span className="text-lg mb-1" style={{ color: 'var(--color-hero-sub)' }}>/1000</span>
                </div>
              </div>
              <div className="ml-4 mb-1 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }}>
                <TrendingUp size={12} />
                +5% this week
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 w-full max-w-xs">
              <div className="h-2 rounded-full bg-black/5 dark:bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '83.2%' }}
                  transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: 'var(--gradient-primary)' }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT — mini stats */}
          <div className="grid grid-cols-2 gap-3 lg:w-64">
            {stats.slice(0,4).map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ scale: 1.04 }}
                  className="p-4 rounded-2xl cursor-default transition-all duration-300"
                  style={{
                    background: 'var(--color-hero-box-bg)',
                    border: '1px solid var(--color-hero-box-border)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${s.glow}`, boxShadow: `0 0 16px ${s.glow}` }}>
                    <Icon size={15} style={{ color: s.color }} />
                  </div>
                  <p className="text-xl font-bold" style={{ color: 'var(--color-hero-text)' }}>{s.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-hero-sub)' }}>{s.title}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}