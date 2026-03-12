import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider, useApp } from './context/AppContext'
import { Navigation } from './components/Navigation'
import { ToastContainer } from './components/Toast'
import { Onboarding } from './components/Onboarding'
import { HomePage } from './pages/Home'
import { HistoryPage } from './pages/History'
import { SettingsPage } from './pages/Settings'

// CSS-animated background — no Framer Motion loops
function AppBackground() {
  return (
    <div className="app-bg" aria-hidden="true">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
    </div>
  )
}

function AppInner() {
  const [activeTab, setActiveTab] = useState('home')
  const { profile, updateProfile, recommendedGoal, toasts, dismissToast } = useApp()

  if (!profile.setupDone) {
    return (
      <>
        <AppBackground />
        <Onboarding
          onComplete={() => {}}
          updateProfile={updateProfile}
          recommendedGoal={recommendedGoal}
        />
      </>
    )
  }

  const pages = {
    home: <HomePage />,
    history: <HistoryPage />,
    settings: <SettingsPage />,
  }

  return (
    <>
      <AppBackground />

      <div className="relative z-10 max-w-sm mx-auto w-full min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {pages[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <ToastContainer toasts={toasts} dismiss={dismissToast} />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
