import { Bell, Search, LogOut, Menu, X, Command, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { ThemeContext } from '../../context/ThemeContext'
import LogoutModal from './LogoutModal'

export default function Topbar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const { logout } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()

  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })

  const handleConfirmLogout = async () => {
    try { await logout(); navigate('/login') }
    catch (err) { console.error(err); alert('Logout gagal') }
  }

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 130, damping: 20 }}
        className="fixed top-0 right-0 left-0 lg:left-[260px] z-40 px-4 sm:px-6 lg:px-8 py-3"
      >
        <div
          className="flex items-center justify-between gap-4 px-4 sm:px-5 py-3 rounded-2xl transition-all duration-300"
          style={{
            background: 'var(--color-surface)',
            backdropFilter: 'blur(24px)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* LEFT — greeting */}
          <div className="hidden sm:block">
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{formattedDate}</p>
            <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--color-text)' }}>
              Welcome back, <span style={{ color: 'var(--color-primary)' }}>Miguel</span> 👋
            </p>
          </div>

          {/* LOGO on mobile */}
          <div className="sm:hidden flex items-center gap-2">
            <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>MiguelCode</span>
          </div>

          {/* CENTER — search bar (desktop) */}
          <div className="flex-1 max-w-xs hidden md:block">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${searchFocused ? 'var(--color-primary)' : 'var(--color-border)'}`,
                boxShadow: searchFocused ? 'var(--shadow-glow-primary)' : 'none',
              }}
            >
              <Search size={15} style={{ color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search anything..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="bg-transparent outline-none text-sm w-full placeholder-gray-400"
                style={{ color: 'var(--color-text)' }}
              />
              <div className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded-md" style={{ background: 'var(--color-border)' }}>
                <Command size={10} style={{ color: 'var(--color-text-muted)' }} />
                <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>K</span>
              </div>
            </div>
          </div>

          {/* RIGHT — actions */}
          <div className="flex items-center gap-2">
            {/* Mobile search toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
            >
              <Search size={16} style={{ color: 'var(--color-text-muted)' }} />
            </motion.button>

            {/* LIGHT / DARK THEME TOGGLE */}
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.93 }}
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
              }}
            >
              {theme === 'light' ? (
                <Moon size={16} className="text-slate-700" />
              ) : (
                <Sun size={16} className="text-amber-400 animate-spin-slow" style={{ animationDuration: '20s' }} />
              )}
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.93 }}
              className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
            >
              <Bell size={16} style={{ color: 'var(--color-text-muted)' }} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2"
                style={{ background: 'var(--color-rose)', borderColor: 'var(--color-surface-2)' }}
              />
            </motion.button>

            {/* Avatar + Logout */}
            <div className="flex items-center gap-2 pl-2 border-l" style={{ borderColor: 'var(--color-border)' }}>
              <img src="https://i.pravatar.cc/100" alt="avatar" className="w-8 h-8 rounded-xl object-cover" />
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setShowLogoutModal(true)}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ background: 'rgba(255,80,80,0.12)', border: '1px solid rgba(255,80,80,0.2)', color: '#f87171' }}
              >
                <LogOut size={15} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile search dropdown */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 px-4 py-3 rounded-2xl md:hidden"
              style={{
                background: 'var(--color-surface-2)',
                backdropFilter: 'blur(24px)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center gap-3">
                <Search size={16} style={{ color: 'var(--color-text-muted)' }} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search anything..."
                  className="bg-transparent outline-none text-sm flex-1 placeholder-gray-400"
                  style={{ color: 'var(--color-text)' }}
                />
                <button onClick={() => setShowSearch(false)}>
                  <X size={16} style={{ color: 'var(--color-text-muted)' }} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <LogoutModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={handleConfirmLogout} />
    </>
  )
}