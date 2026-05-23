import { motion } from 'framer-motion'
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const initialTasks = [
  { id: 1, title: 'Finish MiguelCode UI',   sub: 'Dashboard development',      tag: 'Dev',     tagColor: '#a78bfa', priority: 'High',   done: false },
  { id: 2, title: 'Meal Prep Planning',     sub: 'Weekly healthy meals',        tag: 'Health',  tagColor: '#34d399', priority: 'Medium', done: false },
  { id: 3, title: 'Review Expenses',        sub: 'Monthly spending analysis',   tag: 'Finance', tagColor: '#60a5fa', priority: 'Medium', done: true  },
  { id: 4, title: 'Update Portfolio Site',  sub: 'Add new project showcase',    tag: 'Design',  tagColor: '#fb923c', priority: 'Low',    done: false },
]

const priorityColor = { High: '#f472b6', Medium: '#fb923c', Low: '#60a5fa', Done: '#34d399' }

export default function FocusSection() {
  const [tasks, setTasks] = useState(initialTasks)

  const toggle = (id) => setTasks(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x))

  return (
    <div
      className="p-5 rounded-3xl h-full transition-all duration-300"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Today's Focus</p>
          <h2 className="text-lg font-bold mt-0.5" style={{ color: 'var(--color-text)' }}>Main Priorities</h2>
        </div>
        <button
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-200"
          style={{ color: 'var(--color-primary)', background: 'rgba(120,90,255,0.12)', border: '1px solid rgba(120,90,255,0.25)' }}
        >
          View All <ArrowRight size={12} />
        </button>
      </div>

      {/* TASKS */}
      <div className="space-y-3">
        {tasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer group transition-all duration-200"
            style={{
              background: task.done ? 'rgba(52,211,153,0.06)' : 'var(--color-surface-2)',
              border: `1px solid ${task.done ? 'rgba(52,211,153,0.15)' : 'var(--color-border)'}`,
            }}
            onClick={() => toggle(task.id)}
          >
            {/* Checkbox */}
            <button className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
              {task.done
                ? <CheckCircle2 size={20} style={{ color: '#34d399' }} />
                : <Circle size={20} style={{ color: 'var(--color-text-muted)', opacity: 0.5 }} />
              }
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${task.done ? 'line-through' : ''}`}
                style={{ color: task.done ? 'var(--color-text-muted)' : 'var(--color-text)' }}>
                {task.title}
              </p>
              <p className="text-xs truncate mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{task.sub}</p>
            </div>

            {/* Tag + Priority */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${task.tagColor}18`, color: task.tagColor }}>
                {task.tag}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${priorityColor[task.priority]}15`, color: priorityColor[task.priority] }}>
                {task.priority}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
          <span>Progress</span>
          <span>{tasks.filter(t => t.done).length}/{tasks.length} completed</span>
        </div>
        <div className="h-1.5 rounded-full" style={{ background: 'var(--color-border)' }}>
          <motion.div
            animate={{ width: `${(tasks.filter(t => t.done).length / tasks.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{ background: 'var(--gradient-secondary)' }}
          />
        </div>
      </div>
    </div>
  )
}