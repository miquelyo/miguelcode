import { motion } from 'framer-motion'

export default function SubscriptionCard({ name, price, renewal, color }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex items-center justify-between p-4 rounded-2xl transition-all duration-300 cursor-pointer"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-4 min-w-0">
        <div
          className="w-11 h-11 rounded-xl flex-shrink-0"
          style={{
            background: color,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        />

        <div className="min-w-0">
          <h4 className="font-bold text-sm truncate" style={{ color: 'var(--color-text)' }}>{name}</h4>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Renews {renewal}
          </p>
        </div>
      </div>

      {/* PRICE */}
      <div className="text-right">
        <h4 className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{price}</h4>
        <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
          /mo
        </p>
      </div>
    </motion.div>
  )
}