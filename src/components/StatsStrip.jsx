import React from 'react'
import { motion } from 'framer-motion'
import { Flame, TrendingUp, Calendar, Award } from 'lucide-react'

function StatCard({ icon: Icon, label, value, sub, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 400, damping: 28 }}
      className="flex-1 rounded-2xl p-4"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.09)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
        style={{
          background: `${color}22`,
          border: `1px solid ${color}33`,
        }}
      >
        <Icon size={15} style={{ color }} />
      </div>
      <div
        style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'white',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.68rem',
          color: 'rgba(255,255,255,0.4)',
          marginTop: 4,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {label}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.25)',
            marginTop: 2,
          }}
        >
          {sub}
        </div>
      )}
    </motion.div>
  )
}

export function StatsStrip({ streak, weeklyAverage, allTimeStats, formatAmount }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 w-full">
      <StatCard
        icon={Flame}
        label="Day Streak"
        value={streak === 0 ? '—' : `${streak}d`}
        sub={streak > 0 ? 'Keep it up!' : 'Start today'}
        color="#fb923c"
        delay={0}
      />
      <StatCard
        icon={TrendingUp}
        label="7-Day Avg"
        value={weeklyAverage > 0 ? formatAmount(weeklyAverage) : '—'}
        sub="Daily average"
        color="#60a5fa"
        delay={0.06}
      />
      <StatCard
        icon={Calendar}
        label="Days Logged"
        value={allTimeStats.daysLogged}
        sub="Total days"
        color="#a78bfa"
        delay={0.12}
      />
      <StatCard
        icon={Award}
        label="Goals Met"
        value={allTimeStats.goalDays}
        sub={`of ${allTimeStats.daysLogged} days`}
        color="#34d399"
        delay={0.18}
      />
    </div>
  )
}
