import PageWrapper from '../components/layout/PageWrapper'
import MealHero from '../components/meal/MealHero'
import MealCard from '../components/meal/MealCard'
import WaterTracker from '../components/meal/WaterTracker'
import { Plus, HelpCircle, Utensils } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MealPlanner() {
  return (
    <PageWrapper>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Nutrition & Health
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight mt-1" style={{ color: 'var(--color-text)' }}>
              Meal Planner<span style={{ color: 'var(--color-primary)' }}>.</span>
            </h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, translateY: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
          >
            <Plus size={14} />
            Log Meal
          </motion.button>
        </div>

        {/* HERO METRICS */}
        <MealHero />

        {/* MEALS AND HYDRATION CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          {/* LEFT: Meal List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>Daily Meals</h2>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>3 meals planned</span>
            </div>

            <MealCard
              title="Breakfast"
              calories="540 kcal"
              protein="32g"
              time="08:00 AM"
              color="hsl(35, 100%, 62%)"
            />

            <MealCard
              title="Lunch"
              calories="820 kcal"
              protein="48g"
              time="01:00 PM"
              color="hsl(160, 75%, 50%)"
            />

            <MealCard
              title="Dinner"
              calories="610 kcal"
              protein="42g"
              time="07:00 PM"
              color="hsl(211, 100%, 60%)"
            />
          </div>

          {/* RIGHT: Hydration and Nutrients Info */}
          <div className="space-y-6">
            <WaterTracker />

            {/* Nutrients Tip Box */}
            <div
              className="p-5 rounded-3xl space-y-3"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center gap-2">
                <Utensils size={18} className="text-emerald-400" />
                <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Dietitian Intelligence</h3>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Consuming high protein today ensures muscle synthesis keeps up during focus study sessions. Avoid processed sugar post 6 PM to maintain restful REM cycles.
              </p>
              <div className="flex items-center gap-2 mt-4 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                <HelpCircle size={14} />
                <span>Tip: Stay hydrated by setting reminders!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}