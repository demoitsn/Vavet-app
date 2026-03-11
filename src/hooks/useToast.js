import { useState, useCallback, useRef } from 'react'

let toastIdCounter = 0

export function useToast() {
  const [toasts, setToasts] = useState([])
  const timersRef = useRef({})

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id])
      delete timersRef.current[id]
    }
  }, [])

  const toast = useCallback(({ message, type = 'success', duration = 3000 }) => {
    const id = ++toastIdCounter
    setToasts(prev => [...prev.slice(-3), { id, message, type }])

    timersRef.current[id] = setTimeout(() => {
      dismiss(id)
    }, duration)

    return id
  }, [dismiss])

  return { toasts, toast, dismiss }
}
