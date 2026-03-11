import React, { useRef, useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

function WaterWaves({ percentage }) {
  const fillHeight = Math.min(100, percentage)

  return (
    <div
      className="absolute inset-0 rounded-full overflow-hidden"
      style={{ borderRadius: '50%' }}
    >
      {/* Base deep water color */}
      <div className="absolute inset-0" style={{ background: 'rgba(10,25,60,0.8)' }} />

      {/* Water fill */}
      <motion.div
        className="absolute left-0 right-0 bottom-0"
        initial={{ height: '0%' }}
        animate={{ height: `${fillHeight}%` }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        style={{ overflow: 'hidden' }}
      >
        {/* Wave 1 */}
        <svg
          className="absolute -top-4 left-0 w-full"
          viewBox="0 0 240 40"
          preserveAspectRatio="none"
          style={{ height: '32px', minWidth: '200%' }}
        >
          <motion.path
            fill="rgba(96,165,250,0.35)"
            animate={{
              d: [
                "M0,20 C30,5 60,35 90,20 C120,5 150,35 180,20 C210,5 230,25 240,20 L240,40 L0,40 Z",
                "M0,25 C30,40 60,10 90,25 C120,40 150,10 180,25 C210,40 230,15 240,25 L240,40 L0,40 Z",
                "M0,20 C30,5 60,35 90,20 C120,5 150,35 180,20 C210,5 230,25 240,20 L240,40 L0,40 Z",
              ],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        {/* Wave 2 */}
        <svg
          className="absolute -top-2 left-0 w-full"
          viewBox="0 0 240 40"
          preserveAspectRatio="none"
          style={{ height: '28px', minWidth: '200%' }}
        >
          <motion.path
            fill="rgba(59,130,246,0.5)"
            animate={{
              d: [
                "M0,28 C40,12 80,40 120,28 C160,12 200,40 240,28 L240,40 L0,40 Z",
                "M0,18 C40,32 80,8 120,18 C160,32 200,8 240,18 L240,40 L0,40 Z",
                "M0,28 C40,12 80,40 120,28 C160,12 200,40 240,28 L240,40 L0,40 Z",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </svg>

        {/* Water body */}
        <div
          className="absolute inset-0 top-4"
          style={{
            background: 'linear-gradient(180deg, rgba(59,130,246,0.55) 0%, rgba(29,78,216,0.75) 100%)',
          }}
        />

        {/* Inner highlight */}
        <div
          className="absolute top-8 left-4 right-4 h-1/3 rounded-full opacity-20"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.4), transparent)' }}
        />
      </motion.div>
    </div>
  )
}

function Bubbles({ percentage, active }) {
  if (!active || percentage === 0) return null
  const bubbles = [
    { size: 4, left: '30%', delay: 0, duration: 2.5 },
    { size: 6, left: '55%', delay: 0.8, duration: 3 },
    { size: 3, left: '45%', delay: 1.5, duration: 2 },
    { size: 5, left: '68%', delay: 0.3, duration: 3.5 },
    { size: 4, left: '25%', delay: 2, duration: 2.8 },
  ]

  return (
    <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none" style={{ borderRadius: '50%' }}>
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            bottom: `${percentage * 0.8}%`,
            background: 'rgba(255,255,255,0.25)',
          }}
          animate={{
            y: [-0, -(60 + Math.random() * 40)],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

export function WaterCircle({ percentage, total, goal, formatAmount }) {
  const [prevPercentage, setPrevPercentage] = useState(percentage)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (percentage > prevPercentage) {
      setJustAdded(true)
      setTimeout(() => setJustAdded(false), 1000)
    }
    setPrevPercentage(percentage)
  }, [percentage])

  const radius = 108
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const glowColor = percentage >= 100
    ? 'rgba(52,211,153,0.5)'
    : percentage >= 75
    ? 'rgba(59,130,246,0.5)'
    : 'rgba(59,130,246,0.3)'

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 260,
          height: 260,
          background: 'transparent',
          boxShadow: `0 0 60px ${glowColor}, 0 0 120px ${glowColor.replace('0.5', '0.15')}`,
        }}
        animate={{
          boxShadow: justAdded
            ? [`0 0 60px ${glowColor}`, `0 0 100px ${glowColor}`, `0 0 60px ${glowColor}`]
            : `0 0 60px ${glowColor}`,
        }}
        transition={{ duration: 0.8 }}
      />

      {/* SVG Ring */}
      <svg
        width="264"
        height="264"
        className="absolute"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx="132" cy="132" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
        />
        {/* Progress */}
        <motion.circle
          cx="132" cy="132" r={radius}
          fill="none"
          stroke={percentage >= 100 ? '#34d399' : 'url(#ringGradient)'}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>

      {/* Inner Circle with Water */}
      <motion.div
        className="relative overflow-hidden"
        style={{
          width: 228,
          height: 228,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(8,20,50,0.9)',
        }}
        animate={{ scale: justAdded ? [1, 1.02, 1] : 1 }}
        transition={{ duration: 0.4 }}
      >
        <WaterWaves percentage={percentage} />
        <Bubbles percentage={percentage} active={percentage > 0} />

        {/* Center Text */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
          style={{ pointerEvents: 'none' }}
        >
          <motion.div
            key={total}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div
              className="text-center leading-none"
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '2.4rem',
                fontWeight: 700,
                color: 'white',
                textShadow: '0 2px 20px rgba(96,165,250,0.6)',
                letterSpacing: '-0.02em',
              }}
            >
              {formatAmount(total)}
            </div>
          </motion.div>
          <div
            className="mt-1"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            of {formatAmount(goal)}
          </div>
          <motion.div
            className="mt-3 px-3 py-1 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              fontFamily: 'Sora, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: percentage >= 100 ? '#34d399' : '#93c5fd',
            }}
          >
            {percentage}%
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
