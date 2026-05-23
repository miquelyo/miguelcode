import Sidebar from './Sidebar'
import MobileNav from './MobileNav'
import Topbar from './Topbar'
import { motion } from 'framer-motion'

export default function PageWrapper({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR — desktop only */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-[260px]">
        {/* TOPBAR */}
        <Topbar />

        {/* PAGE CONTENT */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-20 pb-28 lg:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* MOBILE NAV — bottom floating */}
      <MobileNav />
    </div>
  )
}