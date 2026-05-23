import { useState } from 'react'
import { Droplet, Plus, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'

export default function WaterTracker() {
  const [glasses, setGlasses] = useState(6)
  const target = 8
  const glassVolume = 375 // ml per glass (8 * 375ml = 3.0 Liters)

  const addGlass = () => {
    if (glasses < target) setGlasses(g => g + 1)
  }

  const resetTracker = () => setGlasses(0)

  const currentVolume = ((glasses * glassVolume) / 1000).toFixed(1)
  const percentage = (glasses / target) * 100

  return (
    <div
      className="p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between transition-all duration-300"
      style={{
        background: 'var(--gradient-water-bg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {/* Decorative glass glow */}
      <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-10 blur-3xl"
        style={{ background: 'var(--color-blue)' }} />

      <div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Hydration Analytics
            </p>
            <h2 className="text-3xl font-extrabold mt-1" style={{ color: 'var(--color-water-text)' }}>
              {currentVolume}L
            </h2>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
              of 3.0L daily health target
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={resetTracker}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 bg-white/5 dark:bg-black/10 hover:bg-white/10 text-white/50"
            >
              <RotateCcw size={12} style={{ color: 'var(--color-text-muted)' }} />
            </button>
            <button
              onClick={addGlass}
              disabled={glasses >= target}
              className="h-8 px-3 rounded-xl flex items-center justify-center gap-1 text-xs font-bold text-white transition-all duration-200"
              style={{
                background: glasses >= target ? 'rgba(0,0,0,0.05)' : 'var(--gradient-primary)',
                cursor: glasses >= target ? 'not-allowed' : 'pointer',
              }}
            >
              <Plus size={12} /> Add Glass
            </button>
          </div>
        </div>

        {/* WATER TANK FILL ANIMATION */}
        <div className="mt-8 relative h-36 rounded-2xl bg-white/5 border border-white/5 overflow-hidden flex items-end">
          <motion.div
            animate={{ height: `${percentage}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 60 }}
            className="w-full relative flex items-center justify-center"
            style={{
              background: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%)',
              boxShadow: '0 -4px 15px rgba(96,165,250,0.5)',
            }}
          >
            {/* Wave animation effect */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-white/20 animate-pulse" />
            <span className="text-white text-xs font-bold z-10">{Math.round(percentage)}%</span>
          </motion.div>
        </div>
      </div>

      {/* INDIVIDUAL GLASS UNITS */}
      <div className="mt-6">
        <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
          Glasses Tracked
        </p>
        <div className="flex gap-2">
          {Array.from({ length: target }).map((_, idx) => {
            const filled = idx < glasses
            return (
              <motion.button
                key={idx}
                onClick={() => setGlasses(idx + 1)}
                whileTap={{ scale: 0.9 }}
                className="flex-1 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: filled ? '#60a5fa' : 'var(--color-surface-2)',
                  boxShadow: filled ? '0 0 12px rgba(96,165,250,0.4)' : 'none',
                }}
              >
                <Droplet
                  size={14}
                  style={{
                    color: filled ? '#fff' : 'var(--color-text-muted)',
                    fill: filled ? '#fff' : 'none',
                  }}
                />
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}