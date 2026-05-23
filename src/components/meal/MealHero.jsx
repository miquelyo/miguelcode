import { Flame, Droplets, Dumbbell, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'

function Stat({ title, value, icon: Icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: `0 8px 24px ${color}15` }}
      className="p-5 rounded-2xl transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
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
      <h3 className="text-2xl font-bold text-white tracking-tight mt-1">{value}</h3>
    </motion.div>
  )
}

export default function MealHero() {
  return (
    <div className="space-y-6">
      {/* HERO BANNER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl p-6 lg:p-8"
        style={{
          background: 'linear-gradient(135deg, hsl(160,50%,15%) 0%, hsl(200,60%,14%) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Decorative backdrop glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: 'var(--gradient-secondary)' }} />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Nutritional Engine Active
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
                2,140
              </h1>
              <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>kcal consumed today</span>
            </div>
            <p className="mt-4 text-sm max-w-md" style={{ color: 'var(--color-text-muted)' }}>
              Fueling your body with optimal macros. You've met 85% of your target daily active energy needs. Keep up the clean diet!
            </p>

            {/* Calories progress */}
            <div className="mt-5 w-full max-w-sm">
              <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                <span>2,140 kcal consumed</span>
                <span>2,500 kcal target</span>
              </div>
              <div className="h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '85.6%' }}
                  transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: 'var(--gradient-secondary)' }}
                />
              </div>
            </div>
          </div>

          {/* Quick streak info */}
          <div
            className="p-5 rounded-2xl flex items-center gap-4 self-start md:self-auto"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-500/20 text-orange-400">
              <Trophy size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>Streak Champion</p>
              <h4 className="text-lg font-bold text-white mt-0.5">18 Days On Track</h4>
            </div>
          </div>
        </div>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat
          title="Daily Calories"
          value="2140 kcal"
          icon={Flame}
          color="#fb923c"
        />
        <Stat
          title="Water Hydration"
          value="2.4 Liters"
          icon={Droplets}
          color="#60a5fa"
        />
        <Stat
          title="Clean Protein"
          value="122 grams"
          icon={Dumbbell}
          color="#34d399"
        />
        <Stat
          title="Calorie Deficit"
          value="360 kcal"
          icon={Trophy}
          color="#f472b6"
        />
      </div>
    </div>
  )
}