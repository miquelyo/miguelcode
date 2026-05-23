import { Upload, HardDrive, FileText, FolderOpen, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

function Stat({ title, value, icon: Icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: `0 8px 24px ${color}15` }}
      className="p-5 rounded-2xl transition-all duration-300"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: `${color}18`,
          color: color,
        }}
      >
        <Icon size={18} />
      </div>
      <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>{title}</p>
      <h3 className="text-2xl font-bold tracking-tight mt-1" style={{ color: 'var(--color-text)' }}>{value}</h3>
    </motion.div>
  )
}

export default function DocumentsHero() {
  return (
    <div className="space-y-6">
      {/* STORAGE HERO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl p-6 lg:p-8"
        style={{
          background: 'var(--gradient-hero-bg)',
          border: '1px solid var(--color-hero-box-border)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Decorative backdrop glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: 'var(--gradient-secondary)' }} />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Personal Storage Connected
              </p>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-none" style={{ color: 'var(--color-hero-text)' }}>
              128 GB
            </h1>
            <p className="mt-3 text-sm max-w-md" style={{ color: 'var(--color-hero-sub)' }}>
              All your crucial documents, passport files, health certificates, and design projects safely encrypted in the MiguelCode cloud storage network.
            </p>

            {/* Storage Progress */}
            <div className="mt-5 w-full max-w-sm">
              <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--color-hero-sub)' }}>
                <span>84 GB used</span>
                <span>44 GB free</span>
              </div>
              <div className="h-2.5 rounded-full" style={{ background: 'var(--color-hero-box-bg)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '65.6%' }}
                  transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: 'var(--gradient-secondary)' }}
                />
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <motion.button
              whileHover={{ scale: 1.03, translateY: -2 }}
              whileTap={{ scale: 0.97 }}
              className="h-12 px-6 rounded-xl text-white flex items-center justify-center gap-2 font-medium"
              style={{
                background: 'var(--gradient-primary)',
                boxShadow: 'var(--shadow-glow-primary)',
              }}
            >
              <Upload size={16} />
              Upload Files
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="h-12 px-5 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors"
              style={{
                background: 'var(--color-hero-box-bg)',
                border: '1px solid var(--color-hero-box-border)',
                color: 'var(--color-hero-text)',
              }}
            >
              <ShieldCheck size={16} className="text-emerald-400" />
              Secure Vault
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat
          title="Total Documents"
          value="248"
          icon={FileText}
          color="#60a5fa"
        />
        <Stat
          title="Active Folders"
          value="12"
          icon={FolderOpen}
          color="#34d399"
        />
        <Stat
          title="Cloud Backup"
          value="84.2 GB"
          icon={HardDrive}
          color="#fb923c"
        />
        <Stat
          title="Recent uploads"
          value="32 files"
          icon={Upload}
          color="#f472b6"
        />
      </div>
    </div>
  )
}