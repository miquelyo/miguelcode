import PageWrapper from '../components/layout/PageWrapper'
import VaultHero from '../components/vault/VaultHero'
import BankCard from '../components/vault/BankCard'
import ExpenseChart from '../components/vault/ExpenseChart'
import SubscriptionList from '../components/vault/SubscriptionList'
import { Plus, ArrowRight, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Vault() {
  return (
    <PageWrapper>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Personal Finance
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight mt-1" style={{ color: 'var(--color-text)' }}>
              Vault<span style={{ color: 'var(--color-primary)' }}>.</span>
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
            Link Bank
          </motion.button>
        </div>

        {/* VAULT HERO METRICS */}
        <VaultHero />

        {/* BANK CARDS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>Bank Accounts</h2>
            <button className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
              View All <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <BankCard
              bank="BCA Gold Card"
              balance="$8,420"
              number="•••• 2931"
              color="linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)"
            />

            <BankCard
              bank="Bank Jago Premium"
              balance="$12,100"
              number="•••• 1029"
              color="linear-gradient(135deg, #111827 0%, #374151 100%)"
            />

            <BankCard
              bank="SeaBank Active"
              balance="$4,400"
              number="•••• 8831"
              color="linear-gradient(135deg, #ea580c 0%, #ff6b00 100%)"
            />
          </div>
        </div>

        {/* ANALYTICS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <ExpenseChart />
          <SubscriptionList />
        </div>
      </div>
    </PageWrapper>
  )
}