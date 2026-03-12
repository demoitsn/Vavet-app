import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target, Bell, BellOff, User, Trash2, ChevronRight,
  Moon, Sun, Droplets, Scale, Volume2, Shield, Info
} from 'lucide-react'
import { useApp } from '../context/AppContext'

function SectionHeader({ title }) {
  return (
    <p
      style={{
        fontFamily: 'Sora, sans-serif',
        fontSize: '0.65rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.35)',
        marginBottom: 8,
        marginTop: 4,
      }}
    >
      {title}
    </p>
  )
}

function SettingRow({ icon: Icon, iconColor, title, subtitle, children, danger }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-4 rounded-xl"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: `1px solid ${danger ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: danger ? 'rgba(239,68,68,0.1)' : `${iconColor}18`,
          border: `1px solid ${danger ? 'rgba(239,68,68,0.2)' : `${iconColor}25`}`,
        }}
      >
        <Icon size={15} style={{ color: danger ? '#f87171' : iconColor }} />
      </div>

      <div className="flex-1 min-w-0">
        <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: danger ? '#f87171' : 'white' }}>
          {title}
        </p>
        {subtitle && (
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  )
}

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className="relative transition-all duration-300"
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: enabled
          ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
          : 'rgba(255,255,255,0.12)',
        border: enabled ? '1px solid rgba(96,165,250,0.4)' : '1px solid rgba(255,255,255,0.15)',
        cursor: 'pointer',
        boxShadow: enabled ? '0 0 12px rgba(59,130,246,0.4)' : 'none',
      }}
    >
      <motion.div
        animate={{ x: enabled ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          position: 'absolute',
          top: 2,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }}
      />
    </button>
  )
}

export function SettingsPage() {
  const {
    profile,
    updateProfile,
    updateGoal,
    recommendedGoal,
    reminderSettings,
    setReminderSettings,
    clearAllData,
    toast,
    requestPermission,
    sendTestNotification,
    formatAmount,
  } = useApp()

  const [showDangerZone, setShowDangerZone] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)

  const handleGoalChange = (val) => updateGoal(parseInt(val))

  const handleReminderToggle = async (enabled) => {
    if (enabled && Notification.permission !== 'granted') {
      const perm = await requestPermission()
      if (perm !== 'granted') {
        toast({ message: 'Please allow notifications to enable reminders', type: 'error' })
        return
      }
    }
    setReminderSettings(prev => ({ ...prev, enabled }))
    toast({ message: enabled ? 'Reminders enabled 🔔' : 'Reminders paused', type: 'info' })
  }

  const handleClearData = () => {
    if (confirmClear) {
      clearAllData()
      setConfirmClear(false)
      setShowDangerZone(false)
      toast({ message: 'All data cleared', type: 'info' })
    } else {
      setConfirmClear(true)
      setTimeout(() => setConfirmClear(false), 4000)
    }
  }

  return (
    <div className="page-enter min-h-screen pb-28">
      {/* Header */}
      <div className="px-5 pt-14 pb-6">
        <p style={{ fontFamily: 'DM Sans', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
          Customize your experience
        </p>
        <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', marginTop: 2 }}>
          Settings
        </h1>
      </div>

      <div className="px-5 space-y-4">
        {/* Profile */}
        <SectionHeader title="Profile" />
        <div className="space-y-2.5">
          <div
            className="px-4 py-4 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <label style={{ fontFamily: 'Sora', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={e => updateProfile({ name: e.target.value })}
              placeholder="Your name"
              className="w-full bg-transparent outline-none"
              style={{ fontFamily: 'DM Sans', fontSize: '0.95rem', color: 'white' }}
            />
          </div>

          <div
            className="px-4 py-4 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <label style={{ fontFamily: 'Sora', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Weight
              </label>
              <span style={{ fontFamily: 'Sora', fontSize: '0.9rem', fontWeight: 600, color: '#60a5fa' }}>
                {profile.weight} kg
              </span>
            </div>
            <input
              type="range"
              min={30} max={160}
              value={profile.weight}
              onChange={e => updateProfile({ weight: parseInt(e.target.value) })}
              className="w-full"
            />
            <p style={{ fontFamily: 'DM Sans', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>
              Recommended goal: {Math.round(profile.weight * 35)} ml/day
            </p>
          </div>
        </div>

        {/* Daily Goal */}
        <SectionHeader title="Daily Goal" />
        <div
          className="px-4 py-4 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target size={16} style={{ color: '#60a5fa' }} />
              <span style={{ fontFamily: 'Sora', fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>
                Daily Target
              </span>
            </div>
            <span style={{ fontFamily: 'Sora', fontSize: '1rem', fontWeight: 700, color: '#60a5fa' }}>
              {formatAmount(profile.goal)}
            </span>
          </div>
          <input
            type="range"
            min={500} max={5000} step={100}
            value={profile.goal}
            onChange={e => handleGoalChange(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between mt-2">
            <span style={{ fontFamily: 'DM Sans', fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)' }}>500 ml</span>
            <button
              onClick={() => updateGoal(recommendedGoal)}
              style={{ fontFamily: 'DM Sans', fontSize: '0.7rem', color: 'rgba(96,165,250,0.7)', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Use recommended
            </button>
            <span style={{ fontFamily: 'DM Sans', fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)' }}>5 L</span>
          </div>
        </div>

        {/* Reminders */}
        <SectionHeader title="Reminders" />
        <div className="space-y-2.5">
          <SettingRow
            icon={reminderSettings.enabled ? Bell : BellOff}
            iconColor="#60a5fa"
            title="Hydration Reminders"
            subtitle={reminderSettings.enabled ? `Every ${reminderSettings.intervalMinutes} min` : 'Paused'}
          >
            <Toggle enabled={reminderSettings.enabled} onChange={handleReminderToggle} />
          </SettingRow>

          <AnimatePresence>
            {reminderSettings.enabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden space-y-2.5"
              >
                {/* Interval */}
                <div
                  className="px-4 py-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontFamily: 'Sora', fontSize: '0.82rem', fontWeight: 600, color: 'white' }}>
                      Interval
                    </span>
                    <span style={{ fontFamily: 'Sora', fontSize: '0.9rem', fontWeight: 700, color: '#60a5fa' }}>
                      {reminderSettings.intervalMinutes} min
                    </span>
                  </div>
                  <input
                    type="range"
                    min={15} max={180} step={15}
                    value={reminderSettings.intervalMinutes}
                    onChange={e => setReminderSettings(prev => ({ ...prev, intervalMinutes: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-1">
                    {[15, 30, 60, 90, 120].map(v => (
                      <button
                        key={v}
                        onClick={() => setReminderSettings(prev => ({ ...prev, intervalMinutes: v }))}
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '0.65rem',
                          color: reminderSettings.intervalMinutes === v ? '#60a5fa' : 'rgba(255,255,255,0.3)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: reminderSettings.intervalMinutes === v ? 600 : 400,
                        }}
                      >
                        {v}m
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Hours */}
                <div
                  className="px-4 py-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <p style={{ fontFamily: 'Sora', fontSize: '0.82rem', fontWeight: 600, color: 'white', marginBottom: 12 }}>
                    Active Hours
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label style={{ fontFamily: 'DM Sans', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>
                        <Sun size={11} style={{ display: 'inline', marginRight: 4 }} />Start
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={4} max={12}
                          value={reminderSettings.startHour}
                          onChange={e => setReminderSettings(prev => ({ ...prev, startHour: parseInt(e.target.value) }))}
                          className="flex-1"
                        />
                        <span style={{ fontFamily: 'Sora', fontSize: '0.8rem', fontWeight: 600, color: '#60a5fa', minWidth: 32 }}>
                          {reminderSettings.startHour}:00
                        </span>
                      </div>
                    </div>
                    <div>
                      <label style={{ fontFamily: 'DM Sans', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>
                        <Moon size={11} style={{ display: 'inline', marginRight: 4 }} />End
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={16} max={24}
                          value={reminderSettings.endHour}
                          onChange={e => setReminderSettings(prev => ({ ...prev, endHour: parseInt(e.target.value) }))}
                          className="flex-1"
                        />
                        <span style={{ fontFamily: 'Sora', fontSize: '0.8rem', fontWeight: 600, color: '#60a5fa', minWidth: 32 }}>
                          {reminderSettings.endHour}:00
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Test notification */}
                <button
                  onClick={() => { sendTestNotification(); toast({ message: 'Test notification sent!', type: 'info' }) }}
                  className="w-full py-3 rounded-xl transition-all duration-200"
                  style={{
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    fontFamily: 'DM Sans',
                    fontSize: '0.82rem',
                    color: '#93c5fd',
                    cursor: 'pointer',
                  }}
                >
                  Send test notification
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Units */}
        <SectionHeader title="Units" />
        <div
          className="flex gap-2 p-1 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {['ml', 'oz'].map(unit => (
            <button
              key={unit}
              onClick={() => updateProfile({ unit })}
              className="flex-1 py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: profile.unit === unit ? 'rgba(59,130,246,0.25)' : 'transparent',
                border: `1px solid ${profile.unit === unit ? 'rgba(96,165,250,0.3)' : 'transparent'}`,
                fontFamily: 'Sora',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: profile.unit === unit ? '#93c5fd' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
              }}
            >
              {unit}
            </button>
          ))}
        </div>

        {/* About */}
        <SectionHeader title="App" />
        <div className="space-y-2">
          <div
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(96,165,250,0.2)' }}>
              <Droplets size={15} style={{ color: '#60a5fa' }} />
            </div>
            <div className="flex-1">
              <p style={{ fontFamily: 'Sora', fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>Vavet</p>
              <p style={{ fontFamily: 'DM Sans', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>Version 1.0.0</p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-2">
          <button
            onClick={() => setShowDangerZone(v => !v)}
            style={{
              fontFamily: 'DM Sans',
              fontSize: '0.75rem',
              color: 'rgba(239,68,68,0.5)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 0',
            }}
          >
            <Shield size={12} />
            {showDangerZone ? 'Hide' : 'Show'} danger zone
          </button>

          <AnimatePresence>
            {showDangerZone && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <button
                  onClick={handleClearData}
                  className="w-full flex items-center gap-3 px-4 py-4 rounded-xl mt-2 transition-all duration-200"
                  style={{
                    background: confirmClear ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.25)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.15)' }}>
                    <Trash2 size={15} style={{ color: '#f87171' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Sora', fontSize: '0.85rem', fontWeight: 600, color: '#f87171' }}>
                      {confirmClear ? '⚠️ Tap again to confirm' : 'Clear all data'}
                    </p>
                    <p style={{ fontFamily: 'DM Sans', fontSize: '0.72rem', color: 'rgba(239,68,68,0.5)' }}>
                      This cannot be undone
                    </p>
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  )
}
