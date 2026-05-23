import { LayoutDashboard, UtensilsCrossed, FolderOpen, Wallet, Zap, LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { AuthContext } from '../../context/authContext'
import LogoutModal from './LogoutModal'

const menus = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard',  gradient: 'from-violet-500 to-indigo-500' },
  { name: 'Flow',      icon: Zap,             path: '/flow',        gradient: 'from-yellow-400 to-orange-500' },
  { name: 'Meals',     icon: UtensilsCrossed, path: '/meal-planner',gradient: 'from-emerald-400 to-teal-500'  },
  { name: 'Documents', icon: FolderOpen,      path: '/documents',   gradient: 'from-sky-400 to-blue-500'     },
  { name: 'Vault',     icon: Wallet,          path: '/vault',       gradient: 'from-rose-400 to-pink-500'    },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleConfirmLogout = async () => {
    try { await logout(); navigate('/login') }
    catch (err) { console.error(err) }
  }

  return (
    <>
      <aside
        className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-[260px] z-50 transition-all duration-300"
        style={{
          background: 'var(--color-sidebar-bg)',
          backdropFilter: 'blur(24px)',
          borderRight: '1px solid var(--color-border)',
        }}
      >
        {/* LOGO */}
        <div className="px-6 py-7 mb-2">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-sm font-bold tracking-widest uppercase" style={{ color: 'var(--color-text)' }}>MiguelCode</h1>
              <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>Personal Workspace</p>
            </div>
          </div>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-3 space-y-1">
          {menus.map((menu, i) => {
            const Icon = menu.icon
            return (
              <NavLink
                key={i}
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                    isActive ? 'active-nav' : 'hover-nav'
                  }`
                }
                style={({ isActive }) => isActive ? {
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                } : {
                  background: 'transparent',
                  border: '1px solid transparent',
                }}
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 bg-gradient-to-br ${menu.gradient} ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'}`}
                    >
                      <Icon size={15} className="text-white" />
                    </div>
                    <span
                      className="text-sm font-medium transition-colors duration-300"
                      style={{ color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)' }}
                    >
                      {menu.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-white"
                      />
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* FOOTER */}
        <div className="px-4 py-5 space-y-3">
          {/* User card */}
          <div
            className="flex items-center gap-3 p-3 rounded-2xl"
            style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
          >
            <img src="https://i.pravatar.cc/100" alt="avatar" className="w-9 h-9 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>Miguel</p>
              <p className="text-[11px] truncate" style={{ color: 'var(--color-text-muted)' }}>Personal Workspace</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300"
            style={{ color: 'rgba(255,100,100,0.8)', background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.15)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,80,80,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,80,80,0.08)'}
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      <LogoutModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={handleConfirmLogout} />
    </>
  )
}