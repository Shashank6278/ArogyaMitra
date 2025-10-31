import React, { useState, useEffect } from 'react'

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    const handleConnectionChange = (event) => {
      setIsOnline(event.detail.online)
      setShowNotification(true)
      
      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false)
      }, 5000)
    }

    window.addEventListener('connectionStatus', handleConnectionChange)

    return () => {
      window.removeEventListener('connectionStatus', handleConnectionChange)
    }
  }, [])

  if (!showNotification) return null

  return (
    <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all ${
      isOnline ? 'bg-green-500' : 'bg-orange-500'
    } text-white`}>
      <div className='flex items-center gap-2'>
        <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-white' : 'bg-white animate-pulse'}`}></div>
        <p className='font-medium'>
          {isOnline 
            ? 'Back online! Syncing data...' 
            : 'You are offline. Changes will be saved locally and synced when connection is restored.'}
        </p>
      </div>
    </div>
  )
}

export default ConnectionStatus

