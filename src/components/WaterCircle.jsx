import React, { useState, useEffect } from 'react'

// CSS-only waves: wide SVG tiles scroll via CSS translateX (GPU transform only, zero JS).
const WAVE1_PATH =
  "M0,20 C30,5 60,35 90,20 C120,5 150,35 180,20 C210,5 240,35 " +
  "270,20 C300,5 330,35 360,20 C390,5 420,35 450,20 C480,5 510,35 540,20 L540,50 L0,50 Z"

const WAVE2_PATH =
  "M0,26 C40,10 80,40 120,26 C160,10 200,40 240,26 C280,10 320,40 " +
  "360,26 C400,10 440,40 480,26 C520,10 560,40 600,26 L600,50 L0,50 Z"

function WaterWaves({ percentage }) {
  const fillHeight = Math.min(100, percentage)

  return (
    <div className="absolute inset-0" style={{ borderRadius: '50%', overflow: 'hidden' }}>
      <div className="absolute inset-0" style={{ background: 'rgba(8,20,50,0.9)' }} />

      <div
        className="absolute left-0 right-0 bottom-0"
        style={{
          height: `${fillHeight}%`,
          transitionProperty: 'height',
          transitionDuration: '1.2s',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
        }}
      >
        {/* Wave 1 */}
        <div style={{ position: 'absolute', top: -24, left: 0, right: 0, height: 32, overflow: 'hidden' }}>
          <svg
            viewBox="0 0 540 50"
            preserveAspectRatio="none"
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '300%', height: '100%',
              animation: 'waveScroll1 4s linear infinite',
              willChange: 'transform',
            }}
          >
            <path d={WAVE1_PATH} fill="rgba(96,165,250,0.4)" />
          </svg>
        </div>

        {/* Wave 2 */}
        <div style={{ position: 'absolute', top: -16, left: 0, right: 0, height: 28, overflow: 'hidden' }}>
          <svg
            viewBox="0 0 600 50"
            preserveAspectRatio="none"
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '300%', height: '100%',
              animation: 'waveScroll2 6s linear infinite',
              willChange: 'transform',
            }}
          >
            <path d={WAVE2_PATH} fill="rgba(59,130,246,0.55)" />
          </svg>
        </div>

        {/* Water body */}
        <div
          style={{
            position: 'absolute', top: 12, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(180deg, rgba(59,130,246,0.55) 0%, rgba(29,78,216,0.8) 100%)',
          }}
        />
      </div>
    </div>
  )
}

// Pure CSS bubbles — no JS, no Framer Motion
function Bubbles({ percentage }) {
  if (percentage === 0) return null
  const bottom = Math.min(80, percentage * 0.75)
  const bubbles = [
    { size: 4, left: '28%', delay: '0s',   dur: '2.8s' },
    { size: 6, left: '52%', delay: '1.1s', dur: '3.4s' },
    { size: 3, left: '44%', delay: '0.5s', dur: '2.2s' },
    { size: 5, left: '66%', delay: '1.8s', dur: '3.8s' },
    { size: 3, left: '35%', delay: '2.3s', dur: '2.5s' },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', pointerEvents: 'none' }}>
      {bubbles.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: b.size,
            height: b.size,
            left: b.left,
            bottom: `${bottom}%`,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.22)',
            animation: `bubbleRise ${b.dur} ${b.delay} ease-out infinite`,
            willChange: 'transform, opacity',
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
      const t = setTimeout(() => setJustAdded(false), 700)
      return () => clearTimeout(t)
    }
    setPrevPercentage(percentage)
  }, [percentage]) // eslint-disable-line

  const radius = 108
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  const isComplete = percentage >= 100

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none' }}>
      {/* Static glow ring — CSS transition only, no JS animation */}
      <div
        style={{
          position: 'absolute',
          width: 260, height: 260,
          borderRadius: '50%',
          boxShadow: isComplete
            ? '0 0 55px rgba(52,211,153,0.35), 0 0 100px rgba(52,211,153,0.10)'
            : '0 0 55px rgba(59,130,246,0.28), 0 0 100px rgba(59,130,246,0.08)',
          transition: 'box-shadow 1s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Progress ring — CSS transition on strokeDashoffset */}
      <svg
        width="264" height="264"
        style={{ position: 'absolute', transform: 'rotate(-90deg)' }}
      >
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <circle cx="132" cy="132" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle
          cx="132" cy="132" r={radius}
          fill="none"
          stroke={isComplete ? '#34d399' : 'url(#ringGradient)'}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1), stroke 0.5s ease' }}
        />
      </svg>

      {/* Inner circle */}
      <div
        style={{
          position: 'relative',
          width: 228, height: 228,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.10)',
          overflow: 'hidden',
          transform: justAdded ? 'scale(1.018)' : 'scale(1)',
          transition: justAdded ? 'transform 0.15s ease-out' : 'transform 0.3s ease-in',
          willChange: 'transform',
        }}
      >
        <WaterWaves percentage={percentage} />
        <Bubbles percentage={percentage} />

        {/* Text overlay */}
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            zIndex: 10, pointerEvents: 'none',
          }}
        >
          <div
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '2.4rem', fontWeight: 700,
              color: 'white',
              textShadow: '0 2px 20px rgba(96,165,250,0.5)',
              letterSpacing: '-0.02em', lineHeight: 1,
              animation: justAdded ? 'popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
            }}
          >
            {formatAmount(total)}
          </div>

          <div
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.73rem',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginTop: 4,
            }}
          >
            of {formatAmount(goal)}
          </div>

          <div
            style={{
              marginTop: 12, padding: '4px 12px',
              borderRadius: 9999,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              fontFamily: 'Sora, sans-serif',
              fontSize: '0.78rem', fontWeight: 600,
              color: isComplete ? '#34d399' : '#93c5fd',
            }}
          >
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  )
}
