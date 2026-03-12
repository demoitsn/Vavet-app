import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { format, isToday, isYesterday } from 'date-fns'
import { CheckCircle, XCircle, DropletIcon } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { StatsStrip } from '../components/StatsStrip'

function WeeklyBarChart({ days, goal, formatAmount }) {
  const maxVal = Math.max(...days.map(d => d.total), goal)

  return (
    <div
      className="w-full rounded-2xl p-5"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.09)',
      }}
    >
      <p
        style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          marginBottom: 16,
        }}
      >
        This Week
      </p>

      <div className="flex items-end gap-2 h-32">
        {days.map((day, i) => {
          const barHeight = maxVal > 0 ? (day.total / maxVal) * 100 : 0
          const goalLine = (goal / maxVal) * 100
          const dayLabel = isToday(day.date) ? 'Today'
            : isYesterday(day.date) ? 'Yest.'
            : format(day.date, 'EEE')

          return (
            <div key={day.key} className="flex-1 flex flex-col items-center gap-1.5">
              {/* Bar */}
              <div className="relative w-full flex items-end" style={{ height: 96 }}>
                {/* Goal line */}
                <div
                  className="absolute left-0 right-0 border-t border-dashed"
                  style={{
                    bottom: `${goalLine}%`,
                    borderColor: 'rgba(255,255,255,0.15)',
                    zIndex: 2,
                  }}
                />

                {/* Bar background */}
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                />

                {/* Filled bar */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 rounded-lg"
                  initial={{ height: 0 }}
                  animate={{ height: `${barHeight}%` }}
                  transition={{ delay: i * 0.06, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    background: day.goalMet
                      ? 'linear-gradient(180deg, #34d399, #059669)'
                      : day.isToday
                      ? 'linear-gradient(180deg, #60a5fa, #2563eb)'
                      : day.total > 0
                      ? 'linear-gradient(180deg, #93c5fd, #3b82f6)'
                      : 'rgba(255,255,255,0.06)',
                    boxShadow: day.goalMet
                      ? '0 0 12px rgba(52,211,153,0.3)'
                      : day.isToday
                      ? '0 0 12px rgba(96,165,250,0.3)'
                      : 'none',
                  }}
                />
              </div>

              {/* Amount label */}
              <span
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '0.58rem',
                  fontWeight: 600,
                  color: day.total > 0 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)',
                }}
              >
                {day.total > 0 ? (day.total >= 1000 ? `${(day.total / 1000).toFixed(1)}L` : `${day.total}`) : '—'}
              </span>

              {/* Day label */}
              <span
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.65rem',
                  color: day.isToday ? '#60a5fa' : 'rgba(255,255,255,0.35)',
                  fontWeight: day.isToday ? 600 : 400,
                }}
              >
                {dayLabel}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MonthGrid({ days }) {
  return (
    <div
      className="w-full rounded-2xl p-5"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.09)',
      }}
    >
      <p
        style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          marginBottom: 14,
        }}
      >
        30 Days
      </p>
      <div className="grid grid-cols-10 gap-1.5">
        {days.map((day, i) => (
          <motion.div
            key={day.key}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.015, type: 'spring', stiffness: 500, damping: 30 }}
            title={`${format(day.date, 'MMM d')}: ${day.total}ml`}
            className="rounded-md aspect-square"
            style={{
              background: day.goalMet
                ? 'linear-gradient(135deg, #34d399, #059669)'
                : day.total > 0
                ? `rgba(59,130,246,${0.15 + (day.percentage / 100) * 0.6})`
                : 'rgba(255,255,255,0.05)',
              boxShadow: day.goalMet ? '0 0 6px rgba(52,211,153,0.3)' : 'none',
            }}
          />
        ))}
      </div>
      <div className="flex items-center gap-3 mt-3 justify-end">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <span style={{ fontFamily: 'DM Sans', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>None</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(59,130,246,0.5)' }} />
          <span style={{ fontFamily: 'DM Sans', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>Partial</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#34d399' }} />
          <span style={{ fontFamily: 'DM Sans', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>Goal</span>
        </div>
      </div>
    </div>
  )
}

function RecentDays({ days, formatAmount, goal }) {
  return (
    <div className="space-y-2">
      {[...days].reverse().slice(0, 7).map((day, i) => {
        const label = isToday(day.date) ? 'Today'
          : isYesterday(day.date) ? 'Yesterday'
          : format(day.date, 'EEEE, MMM d')

        return (
          <motion.div
            key={day.key}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 400, damping: 28 }}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {day.goalMet
              ? <CheckCircle size={16} style={{ color: '#34d399', flexShrink: 0 }} />
              : day.total > 0
              ? <DropletIcon size={16} style={{ color: '#60a5fa', flexShrink: 0 }} />
              : <XCircle size={16} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
            }

            <div className="flex-1">
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.82rem', fontWeight: 600, color: 'white' }}>
                {label}
              </p>
              {/* Mini bar */}
              <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${day.percentage}%` }}
                  transition={{ delay: i * 0.05 + 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    background: day.goalMet
                      ? 'linear-gradient(90deg, #34d399, #059669)'
                      : 'linear-gradient(90deg, #60a5fa, #2563eb)',
                  }}
                />
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: day.goalMet ? '#34d399' : 'rgba(255,255,255,0.7)' }}>
                {day.total > 0 ? formatAmount(day.total) : '—'}
              </p>
              <p style={{ fontFamily: 'DM Sans', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>
                {day.total > 0 ? `${day.percentage}%` : ''}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export function HistoryPage() {
  const {
    last7Days,
    last30Days,
    profile,
    streak,
    weeklyAverage,
    allTimeStats,
    formatAmount,
  } = useApp()

  return (
    <div className="page-enter min-h-screen pb-28">
      {/* Header */}
      <div className="px-5 pt-14 pb-6">
        <p style={{ fontFamily: 'DM Sans', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.02em' }}>
          Your progress
        </p>
        <h1
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'white',
            letterSpacing: '-0.02em',
            marginTop: 2,
          }}
        >
          History
        </h1>
      </div>

      <div className="px-5 space-y-5">
        {/* Stats Strip */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <StatsStrip
            streak={streak}
            weeklyAverage={weeklyAverage}
            allTimeStats={allTimeStats}
            formatAmount={formatAmount}
          />
        </motion.div>

        {/* Weekly Chart */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <WeeklyBarChart days={last7Days} goal={profile.goal} formatAmount={formatAmount} />
        </motion.div>

        {/* Month Grid */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <MonthGrid days={last30Days} />
        </motion.div>

        {/* Recent Days */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: 12,
            }}
          >
            Recent Days
          </p>
          <RecentDays days={last7Days} formatAmount={formatAmount} goal={profile.goal} />
        </motion.div>
      </div>
    </div>
  )
}
