import React, { useRef, useState, useEffect } from 'react'
import { Camera, CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'react-toastify'

const FaceIDRegistration = ({ onCapture, onCancel, mode = 'register' }) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [captured, setCaptured] = useState(false)
  const [faceImage, setFaceImage] = useState(null)
  const [countdown, setCountdown] = useState(null)

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error('Camera access error:', error)
      toast.error('Unable to access camera. Please grant camera permissions.')
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
  }

  const captureImage = () => {
    // Start countdown
    let count = 3
    setCountdown(count)
    
    const countdownInterval = setInterval(() => {
      count--
      setCountdown(count)
      
      if (count === 0) {
        clearInterval(countdownInterval)
        setCountdown(null)
        performCapture()
      }
    }, 1000)
  }

  const performCapture = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    
    if (video && canvas) {
      const context = canvas.getContext('2d')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      // Convert to base64
      const imageData = canvas.toDataURL('image/jpeg', 0.8)
      setFaceImage(imageData)
      setCaptured(true)
      stopCamera()
      
      toast.success('Face captured successfully!')
    }
  }

  const retake = () => {
    setCaptured(false)
    setFaceImage(null)
    startCamera()
  }

  const confirmCapture = () => {
    if (faceImage) {
      onCapture(faceImage)
    }
  }

  return (
    <div className='bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto'>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          {mode === 'register' ? 'ಮುಖ ನೋಂದಣಿ (Face Registration)' : 'ಮುಖ ಲಾಗಿನ್ (Face Login)'}
        </h2>
        <p className='text-sm text-gray-600'>
          {mode === 'register' 
            ? 'ನಿಮ್ಮ ಮುಖವನ್ನು ಕ್ಯಾಮೆರಾದ ಮುಂದೆ ಇರಿಸಿ (Position your face in front of the camera)'
            : 'ಲಾಗಿನ್ ಮಾಡಲು ನಿಮ್ಮ ಮುಖವನ್ನು ತೋರಿಸಿ (Show your face to login)'}
        </p>
      </div>

      {/* Camera/Image Display */}
      <div className='relative bg-gray-900 rounded-lg overflow-hidden mb-4' style={{ aspectRatio: '4/3' }}>
        {!captured ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className='w-full h-full object-cover'
            />
            {countdown !== null && (
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <div className='text-white text-8xl font-bold animate-pulse'>
                  {countdown}
                </div>
              </div>
            )}
            {/* Face guide overlay */}
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
              <div className='border-4 border-green-500 rounded-full' style={{ width: '60%', height: '80%' }}>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded'>
                  ಮುಖವನ್ನು ಇಲ್ಲಿ ಇರಿಸಿ
                </div>
              </div>
            </div>
          </>
        ) : (
          <img src={faceImage} alt='Captured face' className='w-full h-full object-cover' />
        )}
      </div>

      <canvas ref={canvasRef} className='hidden' />

      {/* Instructions */}
      <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
        <h3 className='font-semibold text-blue-900 mb-2'>ಸೂಚನೆಗಳು (Instructions):</h3>
        <ul className='text-sm text-blue-800 space-y-1'>
          <li>• ಚೆನ್ನಾಗಿ ಬೆಳಕಿನಲ್ಲಿ ಇರಿ (Ensure good lighting)</li>
          <li>• ಕ್ಯಾಮೆರಾವನ್ನು ನೇರವಾಗಿ ನೋಡಿ (Look directly at the camera)</li>
          <li>• ಮುಖವನ್ನು ಹಸಿರು ವೃತ್ತದಲ್ಲಿ ಇರಿಸಿ (Keep face within green circle)</li>
          <li>• ಕನ್ನಡಕ ಅಥವಾ ಮುಖವಾಡವನ್ನು ತೆಗೆಯಿರಿ (Remove glasses or mask)</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-3'>
        {!captured ? (
          <>
            <button
              onClick={captureImage}
              disabled={countdown !== null}
              className='flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Camera className='w-5 h-5' />
              {mode === 'register' ? 'ಮುಖವನ್ನು ನೋಂದಿಸಿ (Capture Face)' : 'ಲಾಗಿನ್ ಮಾಡಿ (Login)'}
            </button>
            <button
              onClick={onCancel}
              className='px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50'
            >
              ರದ್ದುಮಾಡಿ (Cancel)
            </button>
          </>
        ) : (
          <>
            <button
              onClick={confirmCapture}
              className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2'
            >
              <CheckCircle className='w-5 h-5' />
              ದೃಢೀಕರಿಸಿ (Confirm)
            </button>
            <button
              onClick={retake}
              className='flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2'
            >
              <XCircle className='w-5 h-5' />
              ಮತ್ತೆ ತೆಗೆಯಿರಿ (Retake)
            </button>
          </>
        )}
      </div>

      {/* Browser Compatibility Note */}
      <div className='mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3'>
        <p className='text-xs text-yellow-800'>
          <strong>ಗಮನಿಸಿ (Note):</strong> ಕ್ಯಾಮೆರಾ ಪ್ರವೇಶಕ್ಕಾಗಿ ಅನುಮತಿ ನೀಡಿ (Please allow camera access when prompted)
        </p>
      </div>
    </div>
  )
}

export default FaceIDRegistration
