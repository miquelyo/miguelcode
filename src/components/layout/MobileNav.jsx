import { LayoutDashboard, UtensilsCrossed, FolderOpen, Wallet, Zap } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const menus = [
  { icon: LayoutDashboard, path: '/dashboard',   label: 'Home',  color: '#a78bfa' },
  { icon: Zap,             path: '/flow',         label: 'Flow',  color: '#fb923c' },
  { icon: UtensilsCrossed, path: '/meal-planner', label: 'Meals', color: '#34d399' },
  { icon: FolderOpen,      path: '/documents',    label: 'Docs',  color: '#60a5fa' },
  { icon: Wallet,          path: '/vault',        label: 'Vault', color: '#f472b6' },
]

export default function MobileNav() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
      className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-50"
    >
      <div
        className="flex items-center justify-around py-3 px-2 rounded-3xl transition-all duration-300"
        style={{
          background: 'var(--color-sidebar-bg)',
          backdropFilter: 'blur(24px)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {menus.map((menu, i) => {
          const Icon = menu.icon
          return (
            <NavLink
              key={i}
              to={menu.path}
              className="flex flex-col items-center gap-1"
            >
              {({ isActive }) => (
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isActive ? `${menu.color}22` : 'transparent',
                      boxShadow: isActive ? `0 0 20px ${menu.color}44` : 'none',
                    }}
                  >
                    <Icon
                      size={20}
                      style={{ color: isActive ? menu.color : 'var(--color-text-muted)' }}
                    />
                  </div>
                  <span
                    className="text-[9px] font-medium transition-colors duration-300"
                    style={{ color: isActive ? menu.color : 'var(--color-text-muted)' }}
                  >
                    {menu.label}
                  </span>
                </motion.div>
              )}
            </NavLink>
          )
        })}
      </div>
    </motion.div>
  )
}