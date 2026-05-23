import { TrendingUp, TrendingDown, PiggyBank, Wallet } from 'lucide-react'
import { motion } from 'framer-motion'

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: `0 8px 24px ${color}15` }}
      className="p-5 rounded-2xl transition-all duration-300"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: `${color}18`,
          color: color,
        }}
      >
        <Icon size={18} />
      </div>
      <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>{title}</p>
      <h3 className="text-2xl font-bold tracking-tight mt-1" style={{ color: 'var(--color-text)' }}>{value}</h3>
    </motion.div>
  )
}

export default function VaultHero() {
  return (
    <div className="space-y-6">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl p-6 lg:p-8"
        style={{
          background: 'var(--gradient-hero-bg)',
          border: '1px solid var(--color-hero-box-border)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Decorative backdrop glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{ background: 'var(--gradient-primary)' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Accounts Synced & Secure
            </p>
          </div>
          <p className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-hero-sub)' }}>
            Financial Vault Net Worth
          </p>
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-none mt-1" style={{ color: 'var(--color-hero-text)' }}>
            $24,920
          </h1>
          <p className="mt-4 text-xs max-w-md" style={{ color: 'var(--color-hero-sub)' }}>
            Consolidated net worth including savings goals, primary checking accounts, crypto portfolios, and investments. Updated seconds ago.
          </p>
        </div>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Monthly Income"
          value="+$4,200"
          icon={TrendingUp}
          color="#34d399"
        />
        <StatCard
          title="Monthly Expenses"
          value="-$1,840"
          icon={TrendingDown}
          color="#f472b6"
        />
        <StatCard
          title="Savings Pool"
          value="$12,430"
          icon={PiggyBank}
          color="#fb923c"
        />
        <StatCard
          title="Subscriptions"
          value="$72"
          icon={Wallet}
          color="#60a5fa"
        />
      </div>
    </div>
  )
}