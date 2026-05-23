import { Wifi, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BankCard({ bank, balance, number, color }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl min-h-[220px] flex flex-col justify-between"
      style={{
        background: color,
        border: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      {/* Decorative blurred background orb */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {/* TOP */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight text-white/95">{bank}</h3>
        <Wifi size={18} className="text-white/80" />
      </div>

      {/* BALANCE */}
      <div className="my-4">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
          Available Balance
        </p>
        <h2 className="text-4xl font-extrabold tracking-tight text-white">
          {balance}
        </h2>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
        <div>
          <p className="text-white/50 text-[9px] font-semibold uppercase tracking-wider mb-0.5">
            Card Number
          </p>
          <p className="tracking-[3px] text-xs font-bold text-white/90">
            {number}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white"
        >
          <ArrowUpRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  )
}