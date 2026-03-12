import React from 'react'
import { motion } from 'framer-motion'
import { Droplets, BarChart2, Settings } from 'lucide-react'

const tabs = [
  { id: 'home', label: 'Hydrate', Icon: Droplets },
  { id: 'history', label: 'History', Icon: BarChart2 },
  { id: 'settings', label: 'Settings', Icon: Settings },
]

export function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 safe-bottom"
      style={{
        background: 'rgba(6, 15, 30, 0.85)',
        backdropFilter: 'blur(30px)',
        borderTop: '1px solid rgba(255,255,255,0.10)',
      }}
    >
      <div className="flex items-center justify-around px-4 pt-3 pb-5 max-w-sm mx-auto">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="relative flex flex-col items-center gap-1.5 px-5 py-2 rounded-2xl transition-all duration-200"
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(29,78,216,0.15))'
                  : 'transparent',
                border: isActive
                  ? '1px solid rgba(96,165,250,0.25)'
                  : '1px solid transparent',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active-bg"
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(29,78,216,0.1))' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                animate={{
                  scale: isActive ? 1 : 0.9,
                  y: isActive ? -1 : 0,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.2 : 1.7}
                  style={{
                    color: isActive ? '#60a5fa' : 'rgba(255,255,255,0.4)',
                    filter: isActive ? 'drop-shadow(0 0 8px rgba(96,165,250,0.6))' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                />
              </motion.div>
              <span
                className="text-xs font-medium relative z-10"
                style={{
                  fontFamily: 'Sora, sans-serif',
                  color: isActive ? '#93c5fd' : 'rgba(255,255,255,0.35)',
                  fontSize: '10px',
                  letterSpacing: '0.03em',
                }}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
