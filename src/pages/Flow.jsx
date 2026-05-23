import { useState } from 'react'
import PageWrapper from '../components/layout/PageWrapper'
import { Plus, Search, Zap, CheckCircle2, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import FlowColumn from '../components/flow/FlowColumn'
import TaskCard from '../components/flow/TaskCard'

export default function Flow() {
  const [searchQuery, setSearchQuery] = useState('')
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Finish MiguelCode UI",
      desc: "Create responsive dashboard layout and interactions.",
      priority: "High",
      date: "May 24",
      color: "#f472b6",
      status: "Todo"
    },
    {
      id: 2,
      title: "Prepare Meal Plan",
      desc: "Healthy weekly food schedule and calorie tracking.",
      priority: "Medium",
      date: "May 25",
      color: "#fb923c",
      status: "Todo"
    },
    {
      id: 3,
      title: "Vault Analytics",
      desc: "Track subscriptions and spending habits.",
      priority: "High",
      date: "May 26",
      color: "#34d399",
      status: "In Progress"
    },
    {
      id: 4,
      title: "Responsive Layout",
      desc: "Sidebar and mobile navigation completed.",
      priority: "Done",
      date: "Completed",
      color: "#60a5fa",
      status: "Completed"
    }
  ])

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const columns = ["Todo", "In Progress", "Completed"]

  return (
    <PageWrapper>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Productivity Workspace
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1">
              Flow<span style={{ color: 'var(--color-primary)' }}>.</span>
            </h1>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {/* SEARCH */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <Search size={16} style={{ color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-full text-white placeholder-gray-500"
              />
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              className="h-11 px-5 rounded-xl text-white flex items-center justify-center gap-2 font-medium"
              style={{
                background: 'var(--gradient-primary)',
                boxShadow: 'var(--shadow-glow-primary)',
              }}
            >
              <Plus size={16} />
              Add Task
            </motion.button>
          </div>
        </div>

        {/* BOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((colName) => {
            const colTasks = filteredTasks.filter(t => t.status === colName)
            return (
              <FlowColumn
                key={colName}
                title={colName}
                count={colTasks.length.toString()}
              >
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {colTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        title={task.title}
                        desc={task.desc}
                        priority={task.priority}
                        date={task.date}
                        color={task.color}
                      />
                    ))}
                  </AnimatePresence>
                  {colTasks.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center text-xs"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      No tasks in this column
                    </motion.div>
                  )}
                </div>
              </FlowColumn>
            )
          })}
        </div>
      </div>
    </PageWrapper>
  )
}