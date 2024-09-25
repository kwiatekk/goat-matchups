import React, { useState, useEffect } from 'react'

interface ToastProps {
  message: string
  duration?: number
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg">
      {message}
    </div>
  )
}

export const useToast = () => {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false })

  const showToast = (message: string) => {
    setToast({ message, visible: true })
  }

  const hideToast = () => {
    setToast({ message: '', visible: false })
  }

  return { toast, showToast, hideToast }
}