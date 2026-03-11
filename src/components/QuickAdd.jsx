import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const PRESET_AMOUNTS = [
  { label: 'Sip', amount: 100, icon: '💧' },
  { label: 'Glass', amount: 250, icon: '🥛' },
  { label: 'Bottle', amount: 500, icon: '🍶' },
  { label: 'Large', amount: 750, icon: '🫗' },
]

function RippleButton({ onClick, children, className, style }) {
  const btnRef = useRef(null)

  const handleClick = (e) => {
    const btn = btnRef.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const ripple = document.createElement('span')
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      background: rgba(255,255,255,0.25);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `
    btn.style.position = 'relative'
    btn.style.overflow = 'hidden'
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 700)

    if (onClick) onClick(e)
  }

  return (
    <button ref={btnRef} onClick={handleClick} className={className} style={style}>
      {children}
    </button>
  )
}

export function QuickAddButtons({ onAdd, formatAmount }) {
  return (
    <div className="w-full">
      <p
        className="mb-3 text-center"
        style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
        }}
      >
        Quick Add
      </p>
      <div className="grid grid-cols-4 gap-2.5">
        {PRESET_AMOUNTS.map(({ label, amount, icon }, i) => (
          <motion.div
            key={amount}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 28 }}
          >
            <RippleButton
              onClick={() => onAdd(amount)}
              className="w-full flex flex-col items-center gap-1.5 py-3.5 rounded-2xl transition-all duration-200 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.10)',
                backdropFilter: 'blur(12px)',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(59,130,246,0.15)'
                e.currentTarget.style.borderColor = 'rgba(96,165,250,0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>{icon}</span>
              <span
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#93c5fd',
                }}
              >
                {formatAmount(amount)}
              </span>
              <span
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.62rem',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                {label}
              </span>
            </RippleButton>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function CustomAmountInput({ onAdd, formatAmount }) {
  const [value, setValueState] = React.useState(200)
  const [isFocused, setIsFocused] = React.useState(false)

  const step = 50
  const min = 50
  const max = 2000

  const increment = () => setValueState(v => Math.min(max, v + step))
  const decrement = () => setValueState(v => Math.max(min, v - step))

  return (
    <div
      className="w-full rounded-2xl p-4"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: `1px solid ${isFocused ? 'rgba(96,165,250,0.35)' : 'rgba(255,255,255,0.08)'}`,
        transition: 'border-color 0.2s ease',
      }}
    >
      <p
        className="mb-3 text-center"
        style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
        }}
      >
        Custom Amount
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={decrement}
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <Minus size={16} />
        </button>

        <div className="flex-1 text-center">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            onChange={e => {
              const v = parseInt(e.target.value)
              if (!isNaN(v)) setValueState(Math.min(max, Math.max(min, v)))
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full text-center bg-transparent outline-none"
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          />
          <p style={{ fontFamily: 'DM Sans', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
            ml
          </p>
        </div>

        <button
          onClick={increment}
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <Plus size={16} />
        </button>
      </div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => onAdd(value)}
        className="w-full mt-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'white',
          fontFamily: 'Sora, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.03em',
          boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
          cursor: 'pointer',
        }}
      >
        + Add {formatAmount(value)}
      </motion.button>
    </div>
  )
}
