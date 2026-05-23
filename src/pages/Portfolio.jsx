import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  ExternalLink,
  Lock,
  Code2,
  Server,
  Database,
  Sparkles,
  Cpu,
  ArrowRight,
  Send,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react'

// Custom SVG components for social icons since they aren't available in this version of lucide-react
function GithubIcon({ size = 20, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon({ size = 20, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


// Dummy projects representing the portfolio
const PROJECTS = [
  {
    title: "Personal Workspace OS",
    description: "A premium productivity hub featuring interactive flowcharts, encrypted financial vaults, secure document systems, and smart meal planners. Built for seamless personal life organization.",
    tech: ["React", "Firebase Auth", "Firestore", "Tailwind CSS", "Framer Motion"],
    category: "Web Application",
    liveUrl: "/login" // Internal link to the private dashboard
  },
  {
    title: "Aether Flow Automation",
    description: "An interactive, node-based workflow builder designed to visualize and automate logical pipelines, background processes, and system integrations with real-time feedback loops.",
    tech: ["React Flow", "Express.js", "MongoDB", "WebSockets"],
    category: "System Dev",
    liveUrl: "#"
  },
  {
    title: "Nova Crypt Vault",
    description: "A highly secure digital vault with client-side encryption, allowing users to safely store financial ledgers, sensitive documents, and credentials with real-time analytics.",
    tech: ["Web Crypto API", "Node.js", "Redis", "PostgreSQL"],
    category: "Cybersecurity",
    liveUrl: "#"
  }
]

// Skill categories
const SKILLS = [
  {
    category: "Frontend",
    icon: Code2,
    items: ["React", "Vite", "Tailwind CSS", "Framer Motion", "JavaScript (ES6+)", "HTML5/CSS3"]
  },
  {
    category: "Backend & Cloud",
    icon: Server,
    items: ["Node.js", "Express.js", "Firebase", "REST APIs", "GraphQL", "WebSockets"]
  },
  {
    category: "Database & Tools",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Firestore", "Git & GitHub", "Docker", "Vite & ESLint"]
  }
]

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleContactSubmit = (e) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.email || !contactForm.message) return
    setSubmitting(true)
    // Simulate API submission
    setTimeout(() => {
      setSubmitting(false)
      setIsSubmitted(true)
      setContactForm({ name: '', email: '', message: '' })
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 1200)
  }

  // Smooth scroll helper
  const scrollToSection = (id) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-gray-100 font-sans selection:bg-[#00e5ff] selection:text-[#07090e] relative overflow-hidden">
      
      {/* Background Neon Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/10 to-teal-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-purple-500/10 to-blue-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#00e5ff]/5 blur-[160px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-20" />

      {/* FLOATING GLASS NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-[#07090e]/70 border border-white/5 rounded-2xl px-6 py-3.5 shadow-2xl">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-teal-400 flex items-center justify-center font-bold text-[#07090e] text-lg shadow-lg shadow-cyan-400/20">
              M
            </div>
            <span className="font-bold tracking-wider text-xl bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
              MIGUELCODE
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">About</button>
            <button onClick={() => scrollToSection('skills')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">Contact</button>
          </div>

          {/* Action Button - Subtle Workspace Key Link */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/login"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-cyan-400 hover:text-[#07090e] bg-cyan-500/10 hover:bg-[#00e5ff] border border-cyan-400/20 hover:border-transparent rounded-xl transition-all duration-300 shadow-lg shadow-cyan-400/5 group"
            >
              <Lock size={12} className="transition-transform group-hover:rotate-12" />
              <span>Workspace</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-gray-400 hover:text-white rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-3 backdrop-blur-xl bg-[#07090e]/95 border border-white/5 rounded-2xl p-6 flex flex-col gap-5 shadow-2xl"
          >
            <button onClick={() => scrollToSection('about')} className="text-left font-medium text-gray-300 hover:text-cyan-400 py-1">About</button>
            <button onClick={() => scrollToSection('skills')} className="text-left font-medium text-gray-300 hover:text-cyan-400 py-1">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="text-left font-medium text-gray-300 hover:text-cyan-400 py-1">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="text-left font-medium text-gray-300 hover:text-cyan-400 py-1">Contact</button>
            <div className="h-[1px] bg-white/5 my-1" />
            <a
              href="/login"
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold bg-cyan-500 text-[#07090e] rounded-xl font-semibold shadow-lg shadow-cyan-400/20"
            >
              <Lock size={14} />
              <span>Admin Workspace</span>
            </a>
          </motion.div>
        )}
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-36 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          
          {/* Sparkles tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-400 text-xs font-semibold mb-6 shadow-sm shadow-cyan-400/5"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>Available for innovative projects</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-8xl font-extrabold tracking-tight leading-none mb-6 max-w-5xl"
          >
            <span className="block text-white">Engineering Digital</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00e5ff] via-teal-300 to-[#b388ff]">
              Masterpieces.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10"
          >
            I am Miguel, a Full-Stack Engineer and Software Architect dedicated to crafting ultra-performant web systems, clean workflows, and rich user experiences.
          </motion.p>

          {/* Call To Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 h-14 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-[#07090e] font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/15 cursor-pointer transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Explore My Work</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 h-14 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl flex items-center justify-center border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <span>Get in Touch</span>
            </button>
          </motion.div>

        </div>
      </header>

      {/* ABOUT / PHILOSOPHY SECTION */}
      <section id="about" className="py-24 px-6 relative border-t border-white/[0.03] bg-gradient-to-b from-transparent to-[#0a0c14]/50">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
            
            {/* Left side text */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3">About Me</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                My Philosophy on Building Software
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                I believe that programming is not just about writing code that works—it is about creating high-fidelity art that bridges human intuition and system efficiency. Every application I design is centered around robust architecture, clean maintainable codebases, and intuitive interactions.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Whether deploying cloud services or orchestrating complex relational databases, I strive to achieve peak visual excellence and technical precision.
              </p>
            </div>

            {/* Right side value cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-xl hover:border-cyan-400/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                  <Cpu size={20} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">Performance First</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Optimized for fast rendering speeds, smooth dynamic layout layouts, and low bundle sizes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-xl hover:border-teal-400/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">Premium UI</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Stunning visual aesthetics, modern grids, cohesive HSL color sets, and responsive views.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-xl hover:border-purple-400/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                  <Lock size={20} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">Secured Core</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Deep focus on credential vaulting, user session control, database schemas, and cryptographic safety.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-xl hover:border-pink-400/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-4">
                  <Code2 size={20} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">Architectural Integrity</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Highly clean React patterns, reusable modular hooks, robust RESTful APIs, and responsive design systems.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* TECH SKILLS SECTION */}
      <section id="skills" className="py-24 px-6 relative border-t border-white/[0.03]">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3">Expertise</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Technological Stack
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mt-4">
              My structured approach uses modern languages, frameworks, and database mechanisms to achieve flawless integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {SKILLS.map((skillGroup, idx) => {
              const Icon = skillGroup.icon
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#0c0f17] border border-white/5 shadow-2xl hover:border-cyan-400/10 transition-all duration-300 relative group flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-cyan-400/5 blur-xl group-hover:bg-cyan-400/10 transition-all duration-300" />
                  
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform duration-300">
                      <Icon size={24} />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4">{skillGroup.category}</h3>

                    <div className="flex flex-col gap-2.5">
                      {skillGroup.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-2 text-gray-400 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/[0.04] text-xs text-gray-500 font-medium tracking-wider group-hover:text-cyan-400/80 transition-colors duration-300">
                    PROFICIENT & SECURED
                  </div>
                </div>
              )
            })}

          </div>

        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 px-6 relative border-t border-white/[0.03] bg-gradient-to-b from-[#0a0c14]/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3">Portfolio</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Featured Work
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mt-4">
              Here are some of the cutting-edge systems and applications I have researched, designed, and deployed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {PROJECTS.map((project, idx) => (
              <div
                key={idx}
                className="group rounded-3xl bg-[#0c0f17] border border-white/5 overflow-hidden flex flex-col justify-between hover:border-cyan-400/25 transition-all duration-300 shadow-2xl relative"
              >
                {/* Visual Cover Placeholder with gradient */}
                <div className="h-48 w-full bg-gradient-to-tr from-gray-900 via-[#131926] to-[#0a0c14] border-b border-white/5 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-gray-500 font-mono text-xs uppercase tracking-widest select-none group-hover:scale-105 transition-transform duration-500">
                    {project.category}
                  </div>
                  
                  {/* Subtle Tech Stack floating tags */}
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 text-[10px] font-medium bg-[#07090e]/80 border border-white/5 rounded text-cyan-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                    <span className="text-xs text-gray-500 font-mono">{project.category}</span>
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group/link transition-colors duration-300"
                    >
                      <span>Explore</span>
                      <ExternalLink size={12} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-6 relative border-t border-white/[0.03]">
        <div className="max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12">
            
            {/* Left - Contact form */}
            <div className="p-8 rounded-3xl bg-[#0c0f17] border border-white/5 shadow-2xl relative">
              <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-gray-400 text-sm mb-6">Have an idea or need custom architecture? Reach out today.</p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-cyan-400 text-white placeholder-gray-500 text-sm outline-none transition-colors duration-300"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-cyan-400 text-white placeholder-gray-500 text-sm outline-none transition-colors duration-300"
                  />
                </div>

                <div>
                  <textarea
                    required
                    placeholder="Message"
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-cyan-400 text-white placeholder-gray-500 text-sm outline-none transition-colors duration-300 resize-none"
                  />
                </div>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold"
                  >
                    <CheckCircle2 size={16} />
                    <span>Thank you! Your message was sent successfully.</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-800 text-[#07090e] font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/15 cursor-pointer transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50 transition-all duration-300"
                >
                  {submitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send size={14} />
                    </>
                  )}
                </button>

              </form>
            </div>

            {/* Right - Contact Info */}
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3">Connect</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
                Let's Build Something Awesome.
              </h2>
              
              <p className="text-gray-400 leading-relaxed mb-8">
                I am actively looking for full-stack engineering contracts, startup advisory roles, or collaboration opportunities on secure dashboard panels.
              </p>

              {/* Direct links */}
              <div className="space-y-4">
                <a
                  href="mailto:contact@miguelcode.com"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  <Mail size={16} />
                  <span>contact@miguelcode.com</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  <GithubIcon size={16} />
                  <span>github.com/miguelcode</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  <LinkedinIcon size={16} />
                  <span>linkedin.com/in/miguelcode</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/[0.03] text-center relative bg-[#05070a]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} MIGUELCODE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/login" className="hover:text-cyan-400 transition-colors duration-300 flex items-center gap-1 font-medium">
              <Lock size={10} />
              <span>Workspace Portal</span>
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
