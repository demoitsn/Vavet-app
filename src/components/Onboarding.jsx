import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Droplets, User, Target } from 'lucide-react'

const STEPS = ['welcome', 'profile', 'goal']

export function Onboarding({ onComplete, updateProfile, recommendedGoal }) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [weight, setWeight] = useState(70)
  const [goal, setGoal] = useState(recommendedGoal || 2500)
  const [useRecommended, setUseRecommended] = useState(true)

  const currentRecommended = Math.round(weight * 35)

  const handleWeightChange = (val) => {
    setWeight(val)
    if (useRecommended) setGoal(Math.round(val * 35))
  }

  const handleFinish = () => {
    updateProfile({
      name: name.trim() || 'Friend',
      weight,
      goal: useRecommended ? currentRecommended : goal,
      setupDone: true,
    })
    onComplete()
  }

  const stepVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-10 relative z-10"
      style={{ maxWidth: 420, margin: '0 auto' }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10 text-center"
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(29,78,216,0.2))',
            border: '1px solid rgba(96,165,250,0.3)',
            boxShadow: '0 0 40px rgba(59,130,246,0.2)',
          }}
        >
          <Droplets size={28} style={{ color: '#60a5fa' }} />
        </div>
        <h1
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '1.8rem',
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.03em',
          }}
        >
          vavet
        </h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
          your hydration companion
        </p>
      </motion.div>

      {/* Step Indicator */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i === step ? 24 : 8 }}
            className="h-1.5 rounded-full"
            style={{
              background: i <= step ? '#3b82f6' : 'rgba(255,255,255,0.15)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        ))}
      </div>

      {/* Step Content */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {/* Step 0: Welcome */}
          {step === 0 && (
            <motion.div
              key="welcome"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="text-center"
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💧</div>
              <h2
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.02em',
                }}
              >
                Stay perfectly hydrated
              </h2>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.6,
                  maxWidth: 280,
                  margin: '0 auto',
                }}
              >
                Track your daily water intake, set personal goals, and build healthy hydration habits.
              </p>
            </motion.div>
          )}

          {/* Step 1: Profile */}
          {step === 1 && (
            <motion.div
              key="profile"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(96,165,250,0.25)' }}
                >
                  <User size={18} style={{ color: '#60a5fa' }} />
                </div>
                <div>
                  <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>
                    Tell us about you
                  </h2>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                    We'll personalize your experience
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                    Your name (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'white',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.95rem',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                  />
                </div>

                {/* Weight */}
                <div>
                  <label style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                    Weight: <span style={{ color: '#60a5fa' }}>{weight} kg</span>
                  </label>
                  <input
                    type="range"
                    min={30}
                    max={160}
                    value={weight}
                    onChange={e => handleWeightChange(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: 6 }}>
                    Recommended: {currentRecommended} ml/day (35ml × {weight}kg)
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Goal */}
          {step === 2 && (
            <motion.div
              key="goal"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(96,165,250,0.25)' }}
                >
                  <Target size={18} style={{ color: '#60a5fa' }} />
                </div>
                <div>
                  <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>
                    Set your daily goal
                  </h2>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                    You can change this anytime
                  </p>
                </div>
              </div>

              {/* Recommended option */}
              <button
                onClick={() => { setUseRecommended(true); setGoal(currentRecommended) }}
                className="w-full p-4 rounded-xl mb-3 text-left transition-all duration-200"
                style={{
                  background: useRecommended ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${useRecommended ? 'rgba(96,165,250,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  cursor: 'pointer',
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>
                      Recommended for me
                    </p>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
                      Based on your weight
                    </p>
                  </div>
                  <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#60a5fa' }}>
                    {currentRecommended} ml
                  </span>
                </div>
              </button>

              {/* Custom option */}
              <button
                onClick={() => setUseRecommended(false)}
                className="w-full p-4 rounded-xl mb-4 text-left transition-all duration-200"
                style={{
                  background: !useRecommended ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${!useRecommended ? 'rgba(96,165,250,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  cursor: 'pointer',
                }}
              >
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>
                  Custom goal
                </p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
                  Set your own target
                </p>
              </button>

              {!useRecommended && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-4"
                >
                  <label style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                    Goal: <span style={{ color: '#60a5fa' }}>{goal} ml</span>
                  </label>
                  <input
                    type="range"
                    min={500}
                    max={5000}
                    step={100}
                    value={goal}
                    onChange={e => setGoal(parseInt(e.target.value))}
                    className="w-full"
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="mt-10 w-full space-y-3">
        {step < STEPS.length - 1 ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setStep(s => s + 1)}
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 4px 24px rgba(59,130,246,0.35)',
              fontFamily: 'Sora, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'white',
              cursor: 'pointer',
              letterSpacing: '0.02em',
            }}
          >
            Continue <ChevronRight size={18} />
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleFinish}
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 4px 24px rgba(59,130,246,0.35)',
              fontFamily: 'Sora, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'white',
              cursor: 'pointer',
              letterSpacing: '0.02em',
            }}
          >
            Start tracking 💧
          </motion.button>
        )}

        {step > 0 && (
          <button
            onClick={() => setStep(s => s - 1)}
            style={{
              width: '100%',
              padding: '10px',
              background: 'transparent',
              border: 'none',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.35)',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Back
          </button>
        )}
      </div>
    </div>
  )
}
