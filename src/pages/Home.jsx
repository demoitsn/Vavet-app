import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { Droplets, Zap } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { WaterCircle } from '../components/WaterCircle'
import { QuickAddButtons, CustomAmountInput } from '../components/QuickAdd'
import { DrinkLog } from '../components/DrinkLog'

export function HomePage() {
  const {
    profile,
    todayEntries,
    todayTotal,
    percentage,
    hydrationStatus,
    addWater,
    removeEntry,
    formatAmount,
    toast,
    streak,
  } = useApp()

  const [showCustom, setShowCustom] = useState(false)

  const handleAdd = (amount) => {
    addWater(amount)
    toast({
      message: `+ ${formatAmount(amount)} logged!`,
      type: 'success',
      duration: 2000,
    })
  }

  const today = format(new Date(), 'EEEE, MMMM d')
  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 18) return 'Good afternoon'
    return 'Good evening'
  })()

  return (
    <div className="page-enter min-h-screen flex flex-col pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-14 pb-2"
      >
        <div className="flex items-start justify-between">
          <div>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.02em',
              }}
            >
              {today}
            </p>
            <h1
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'white',
                letterSpacing: '-0.02em',
                marginTop: 2,
              }}
            >
              {greeting}{profile.name ? `, ${profile.name}` : ''}
            </h1>
          </div>

          {/* Streak badge */}
          {streak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.3 }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
              style={{
                background: 'rgba(251,146,60,0.15)',
                border: '1px solid rgba(251,146,60,0.25)',
              }}
            >
              <span className="flicker" style={{ fontSize: '1rem' }}>🔥</span>
              <div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#fdba74', lineHeight: 1 }}>
                  {streak}
                </div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', color: 'rgba(251,146,60,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  streak
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Status message */}
        <motion.div
          key={hydrationStatus.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 flex items-center gap-2"
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: hydrationStatus.color, boxShadow: `0 0 6px ${hydrationStatus.color}` }}
          />
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: hydrationStatus.color }}>
            {hydrationStatus.label}
          </p>
        </motion.div>
      </motion.div>

      {/* Main Circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 28 }}
        className="flex justify-center py-8"
      >
        <WaterCircle
          percentage={percentage}
          total={todayTotal}
          goal={profile.goal}
          formatAmount={formatAmount}
        />
      </motion.div>

      {/* Content */}
      <div className="px-5 space-y-5 flex-1">
        {/* Quick Add */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <QuickAddButtons onAdd={handleAdd} formatAmount={formatAmount} />
        </motion.div>

        {/* Custom / Log Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="flex gap-2.5"
        >
          <button
            onClick={() => setShowCustom(v => !v)}
            className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
            style={{
              background: showCustom ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${showCustom ? 'rgba(96,165,250,0.3)' : 'rgba(255,255,255,0.09)'}`,
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.8rem',
              color: showCustom ? '#93c5fd' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
            }}
          >
            <Zap size={14} />
            Custom amount
          </button>
        </motion.div>

        {/* Custom Amount Panel */}
        <AnimatePresence>
          {showCustom && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              style={{ overflow: 'hidden' }}
            >
              <CustomAmountInput onAdd={(amount) => { handleAdd(amount); setShowCustom(false) }} formatAmount={formatAmount} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drink Log */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <DrinkLog
            entries={todayEntries}
            onRemove={removeEntry}
            formatAmount={formatAmount}
          />
        </motion.div>
      </div>
    </div>
  )
}
