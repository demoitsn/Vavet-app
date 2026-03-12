import React, { createContext, useContext } from 'react'
import { useWaterTracker } from '../hooks/useWaterTracker'
import { useToast } from '../hooks/useToast'
import { useReminders } from '../hooks/useReminders'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const tracker = useWaterTracker()
  const { toasts, toast, dismiss } = useToast()
  const { requestPermission, sendNotification } = useReminders(
    tracker.reminderSettings,
    tracker.todayTotal,
    tracker.profile.goal
  )

  const value = {
    ...tracker,
    toasts,
    toast,
    dismissToast: dismiss,
    requestPermission,
    sendTestNotification: sendNotification,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
