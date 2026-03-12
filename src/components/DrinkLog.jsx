import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Clock, Droplet, ChevronDown, ChevronUp } from 'lucide-react'
import { format, parseISO } from 'date-fns'

function EntryRow({ entry, onRemove, formatAmount }) {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = () => {
    setDeleting(true)
    setTimeout(() => onRemove(entry.id), 300)
  }

  const timeStr = (() => {
    try { return format(parseISO(entry.time), 'HH:mm') }
    catch { return '--:--' }
  })()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -16, height: 0 }}
      animate={{ opacity: deleting ? 0 : 1, x: 0, height: 'auto' }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className="overflow-hidden"
    >
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1.5"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: 'rgba(59,130,246,0.15)',
            border: '1px solid rgba(96,165,250,0.2)',
          }}
        >
          <Droplet size={14} style={{ color: '#60a5fa' }} />
        </div>

        <div className="flex-1 min-w-0">
          <span
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            {formatAmount(entry.amount)}
          </span>
          {entry.note && (
            <p
              className="truncate"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.4)',
                marginTop: 1,
              }}
            >
              {entry.note}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className="flex items-center gap-1"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            <Clock size={11} />
            {timeStr}
          </div>

          <button
            onClick={handleDelete}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 opacity-40 hover:opacity-100"
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.1)',
              color: '#f87171',
              cursor: 'pointer',
            }}
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export function DrinkLog({ entries, onRemove, formatAmount }) {
  const [expanded, setExpanded] = useState(false)
  const displayEntries = expanded ? [...entries].reverse() : [...entries].reverse().slice(0, 3)
  const hasMore = entries.length > 3

  if (entries.length === 0) {
    return (
      <div
        className="w-full rounded-2xl py-8 flex flex-col items-center gap-2"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px dashed rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ fontSize: '2rem' }}>💧</div>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.82rem',
          color: 'rgba(255,255,255,0.3)',
        }}>
          No drinks logged yet today
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <p
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          Today's Log
        </p>
        <span
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      <AnimatePresence mode="popLayout">
        {displayEntries.map(entry => (
          <EntryRow
            key={entry.id}
            entry={entry}
            onRemove={onRemove}
            formatAmount={formatAmount}
          />
        ))}
      </AnimatePresence>

      {hasMore && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setExpanded(v => !v)}
          className="w-full mt-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.76rem',
            color: 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
          }}
        >
          {expanded ? (
            <><ChevronUp size={14} /> Show less</>
          ) : (
            <><ChevronDown size={14} /> Show {entries.length - 3} more</>
          )}
        </motion.button>
      )}
    </div>
  )
}
