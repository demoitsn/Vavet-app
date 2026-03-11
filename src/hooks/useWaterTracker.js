import { useState, useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { format, isToday, parseISO, subDays, startOfDay } from 'date-fns'

const DEFAULT_GOAL = 2500 // ml
const TODAY_KEY = () => format(new Date(), 'yyyy-MM-dd')

export function useWaterTracker() {
  const [profile, setProfile] = useLocalStorage('vavet_profile', {
    name: '',
    weight: 70,
    goal: DEFAULT_GOAL,
    unit: 'ml',
    setupDone: false,
  })

  const [logs, setLogs] = useLocalStorage('vavet_logs', {})
  // logs: { 'yyyy-MM-dd': [{ id, amount, time, note }] }

  const [reminderSettings, setReminderSettings] = useLocalStorage('vavet_reminders', {
    enabled: false,
    intervalMinutes: 60,
    startHour: 8,
    endHour: 22,
    permission: 'default',
  })

  // ─── Today's Data ───
  const todayKey = TODAY_KEY()
  const todayEntries = logs[todayKey] || []
  const todayTotal = useMemo(() =>
    todayEntries.reduce((sum, e) => sum + e.amount, 0),
    [todayEntries]
  )
  const percentage = Math.min(100, Math.round((todayTotal / profile.goal) * 100))

  // ─── Add Water ───
  const addWater = useCallback((amount, note = '') => {
    const entry = {
      id: Date.now().toString(),
      amount,
      time: new Date().toISOString(),
      note,
    }
    setLogs(prev => ({
      ...prev,
      [todayKey]: [...(prev[todayKey] || []), entry],
    }))
    return entry
  }, [todayKey, setLogs])

  // ─── Remove Entry ───
  const removeEntry = useCallback((entryId) => {
    setLogs(prev => ({
      ...prev,
      [todayKey]: (prev[todayKey] || []).filter(e => e.id !== entryId),
    }))
  }, [todayKey, setLogs])

  // ─── Edit Entry ───
  const editEntry = useCallback((entryId, newAmount) => {
    setLogs(prev => ({
      ...prev,
      [todayKey]: (prev[todayKey] || []).map(e =>
        e.id === entryId ? { ...e, amount: newAmount } : e
      ),
    }))
  }, [todayKey, setLogs])

  // ─── History (last 7 days) ───
  const last7Days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i)
      const key = format(date, 'yyyy-MM-dd')
      const entries = logs[key] || []
      const total = entries.reduce((s, e) => s + e.amount, 0)
      return {
        date,
        key,
        entries,
        total,
        percentage: Math.min(100, Math.round((total / profile.goal) * 100)),
        isToday: isToday(date),
        goalMet: total >= profile.goal,
      }
    })
  }, [logs, profile.goal])

  // ─── Last 30 Days ───
  const last30Days = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), 29 - i)
      const key = format(date, 'yyyy-MM-dd')
      const entries = logs[key] || []
      const total = entries.reduce((s, e) => s + e.amount, 0)
      return {
        date,
        key,
        total,
        percentage: Math.min(100, Math.round((total / profile.goal) * 100)),
        goalMet: total >= profile.goal,
      }
    })
  }, [logs, profile.goal])

  // ─── Streak ───
  const streak = useMemo(() => {
    let count = 0
    let d = new Date()
    // If today not done yet, start from yesterday for streak
    // But if today is done, count today
    const todayDone = todayTotal >= profile.goal
    if (!todayDone) d = subDays(d, 1)

    while (true) {
      const key = format(d, 'yyyy-MM-dd')
      const dayTotal = (logs[key] || []).reduce((s, e) => s + e.amount, 0)
      if (dayTotal >= profile.goal) {
        count++
        d = subDays(d, 1)
      } else {
        break
      }
    }
    return count
  }, [logs, profile.goal, todayTotal])

  // ─── Weekly Average ───
  const weeklyAverage = useMemo(() => {
    const totals = last7Days.map(d => d.total).filter(t => t > 0)
    if (totals.length === 0) return 0
    return Math.round(totals.reduce((s, t) => s + t, 0) / totals.length)
  }, [last7Days])

  // ─── All Time Stats ───
  const allTimeStats = useMemo(() => {
    const allDays = Object.entries(logs)
    const daysLogged = allDays.filter(([, entries]) => entries.length > 0).length
    const totalConsumed = allDays.reduce((s, [, entries]) =>
      s + entries.reduce((ss, e) => ss + e.amount, 0), 0
    )
    const goalDays = allDays.filter(([, entries]) =>
      entries.reduce((s, e) => s + e.amount, 0) >= profile.goal
    ).length
    return { daysLogged, totalConsumed, goalDays }
  }, [logs, profile.goal])

  // ─── Update Profile ───
  const updateProfile = useCallback((updates) => {
    setProfile(prev => ({ ...prev, ...updates }))
  }, [setProfile])

  // ─── Update Goal ───
  const updateGoal = useCallback((goal) => {
    setProfile(prev => ({ ...prev, goal }))
  }, [setProfile])

  // ─── Recommended Goal Based on Weight ───
  const recommendedGoal = useMemo(() => {
    return Math.round(profile.weight * 35) // 35ml per kg
  }, [profile.weight])

  // ─── Format Display ───
  const formatAmount = useCallback((ml) => {
    if (profile.unit === 'oz') {
      return `${(ml / 29.5735).toFixed(1)} oz`
    }
    if (ml >= 1000) {
      return `${(ml / 1000).toFixed(1)} L`
    }
    return `${ml} ml`
  }, [profile.unit])

  // ─── Hydration Status ───
  const hydrationStatus = useMemo(() => {
    if (percentage >= 100) return { label: 'Goal Reached! 🎉', color: '#34d399', level: 4 }
    if (percentage >= 75) return { label: 'Almost there!', color: '#60a5fa', level: 3 }
    if (percentage >= 50) return { label: 'Halfway!', color: '#93c5fd', level: 2 }
    if (percentage >= 25) return { label: 'Good start', color: '#bfdbfe', level: 1 }
    return { label: 'Start hydrating', color: '#e0f2fe', level: 0 }
  }, [percentage])

  // ─── Reset Today (dev/debug) ───
  const resetToday = useCallback(() => {
    setLogs(prev => ({ ...prev, [todayKey]: [] }))
  }, [todayKey, setLogs])

  // ─── Clear All Data ───
  const clearAllData = useCallback(() => {
    setLogs({})
  }, [setLogs])

  return {
    // Profile
    profile,
    updateProfile,
    updateGoal,
    recommendedGoal,

    // Today
    todayEntries,
    todayTotal,
    percentage,
    hydrationStatus,

    // Actions
    addWater,
    removeEntry,
    editEntry,
    resetToday,
    clearAllData,

    // History
    last7Days,
    last30Days,
    streak,
    weeklyAverage,
    allTimeStats,

    // Reminders
    reminderSettings,
    setReminderSettings,

    // Helpers
    formatAmount,
  }
}
