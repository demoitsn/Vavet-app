import { useEffect, useRef, useCallback } from 'react'

const REMINDER_MESSAGES = [
  "💧 Time to hydrate! Your body will thank you.",
  "🌊 Drink some water — you're doing great!",
  "⚡ Boost your energy with a glass of water.",
  "💦 Don't forget to stay hydrated!",
  "🥤 Quick water break — your cells need it!",
  "🌿 Sip, sip, hooray! Time for water.",
  "✨ Hydration check! Drink up.",
  "🫧 Your hydration reminder is here!",
]

export function useReminders(settings, todayTotal, goal) {
  const timerRef = useRef(null)
  const notifCountRef = useRef(0)

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return 'not-supported'
    const permission = await Notification.requestPermission()
    return permission
  }, [])

  const sendNotification = useCallback(() => {
    if (Notification.permission !== 'granted') return

    const percentage = Math.min(100, Math.round((todayTotal / goal) * 100))
    const msgIndex = notifCountRef.current % REMINDER_MESSAGES.length
    const message = `${REMINDER_MESSAGES[msgIndex]} (${percentage}% of daily goal)`
    notifCountRef.current++

    try {
      const notif = new Notification('Vavet — Hydration Reminder', {
        body: message,
        icon: '/favicon.svg',
        badge: '/favicon.svg',
        tag: 'vavet-reminder',
        renotify: true,
        silent: false,
      })

      notif.onclick = () => {
        window.focus()
        notif.close()
      }

      setTimeout(() => notif.close(), 6000)
    } catch (e) {
      console.warn('Notification failed:', e)
    }
  }, [todayTotal, goal])

  const isWithinActiveHours = useCallback(() => {
    const now = new Date()
    const hour = now.getHours()
    return hour >= settings.startHour && hour < settings.endHour
  }, [settings.startHour, settings.endHour])

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)

    if (!settings.enabled || Notification.permission !== 'granted') return
    if (todayTotal >= goal) return // Goal reached, no more reminders

    const intervalMs = settings.intervalMinutes * 60 * 1000

    timerRef.current = setInterval(() => {
      if (isWithinActiveHours()) {
        sendNotification()
      }
    }, intervalMs)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [settings.enabled, settings.intervalMinutes, todayTotal, goal, sendNotification, isWithinActiveHours])

  return { requestPermission, sendNotification }
}
