import PageWrapper from '../components/layout/PageWrapper'
import DocumentsHero from '../components/documents/DocumentsHero'
import FolderCard from '../components/documents/FolderCard'
import RecentFileCard from '../components/documents/RecentFileCard'
import { Plus, ArrowRight, ShieldAlert } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Documents() {
  return (
    <PageWrapper>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Personal Cloud
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1">
              Documents<span style={{ color: 'var(--color-primary)' }}>.</span>
            </h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, translateY: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Plus size={14} />
            New Folder
          </motion.button>
        </div>

        {/* HERO STORAGE */}
        <DocumentsHero />

        {/* FOLDERS GRID */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Folders</h2>
            <button className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
              View All <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <FolderCard name="Personal" files="24" color="#34d399" />
            <FolderCard name="Finance" files="18" color="#60a5fa" />
            <FolderCard name="Projects" files="52" color="#fb923c" />
            <FolderCard name="Identity" files="12" color="#f472b6" />
            <FolderCard name="Travel" files="9" color="#a78bfa" />
          </div>
        </div>

        {/* RECENT FILES SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          {/* LEFT: Recent Files */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Files</h2>
              <button
                className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  background: 'rgba(52,211,153,0.12)',
                  color: '#34d399',
                  border: '1px solid rgba(52,211,153,0.25)',
                }}
              >
                Open Vault
              </button>
            </div>

            <div className="space-y-3">
              <RecentFileCard name="Passport.pdf" size="2.4 MB" date="Today" />
              <RecentFileCard name="Bank Statement.pdf" size="8.1 MB" date="Yesterday" />
              <RecentFileCard name="MiguelCode_UI.fig" size="24.0 MB" date="2 days ago" />
              <RecentFileCard name="Travel Ticket.pdf" size="3.2 MB" date="Last week" />
            </div>
          </div>

          {/* RIGHT: Security Tips / Vault status */}
          <div
            className="p-5 rounded-3xl self-start space-y-4"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex items-center gap-2">
              <ShieldAlert size={18} className="text-rose-400" />
              <h3 className="text-sm font-semibold text-white">Security Intelligence</h3>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Your workspace folders are encrypted with AES-256 standard protocols. The last active session was initiated from Jakarta, Indonesia. Keep your recovery phrase secured.
            </p>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span style={{ color: 'var(--color-text-muted)' }}>Vault Status</span>
                <span className="text-emerald-400 font-semibold">Protected</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span style={{ color: 'var(--color-text-muted)' }}>Auto-Backup</span>
                <span className="text-emerald-400 font-semibold">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}