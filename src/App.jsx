import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider, useApp } from './context/AppContext'
import { Navigation } from './components/Navigation'
import { ToastContainer } from './components/Toast'
import { Onboarding } from './components/Onboarding'
import { HomePage } from './pages/Home'
import { HistoryPage } from './pages/History'
import { SettingsPage } from './pages/Settings'

function AppBackground() {
  return (
    <div className="app-bg" aria-hidden="true">
      {/* Floating orbs */}
      <motion.div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(29,78,216,0.12) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
          bottom: '10%',
          right: '-5%',
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, 25, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
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
            transition={{ duration: 0.2, ease: 'easeOut' }}
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
