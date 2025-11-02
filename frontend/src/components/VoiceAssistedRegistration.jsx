import React, { useState, useEffect } from 'react'
import { Mic, MicOff, Volume2 } from 'lucide-react'
import { toast } from 'react-toastify'

const VoiceAssistedRegistration = ({ onComplete, onCancel }) => {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    village: '',
    district: '',
    state: '',
    aadhar: '',
    email: '',
    password: ''
  })

  // Kannada prompts for each field
  const steps = [
    {
      field: 'name',
      promptKannada: 'ನಿಮ್ಮ ಹೆಸರು ಏನು? (Nimma hesaru enu?)',
      promptEnglish: 'What is your name?'
    },
    {
      field: 'village',
      promptKannada: 'ನಿಮ್ಮ ಗ್ರಾಮದ ಹೆಸರು ಏನು? (Nimma gramada hesaru enu?)',
      promptEnglish: 'What is your village name?'
    },
    {
      field: 'district',
      promptKannada: 'ನಿಮ್ಮ ಜಿಲ್ಲೆಯ ಹೆಸರು ಏನು? (Nimma jilleya hesaru enu?)',
      promptEnglish: 'What is your district name?'
    },
    {
      field: 'state',
      promptKannada: 'ನಿಮ್ಮ ರಾಜ್ಯದ ಹೆಸರು ಏನು? (Nimma rajyada hesaru enu?)',
      promptEnglish: 'What is your state name?'
    },
    {
      field: 'aadhar',
      promptKannada: 'ನಿಮ್ಮ ಆಧಾರ್ ಸಂಖ್ಯೆ ಹನ್ನೆರಡು ಅಂಕಿಗಳು (Nimma Aadhaar sankhye hanneradu ankigalu)',
      promptEnglish: 'Your Aadhar number - 12 digits'
    },
    {
      field: 'email',
      promptKannada: 'ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸ (Nimma email vilaasa)',
      promptEnglish: 'Your email address'
    },
    {
      field: 'password',
      promptKannada: 'ನಿಮ್ಮ ಪಾಸ್ವರ್ಡ್ ಆಯ್ಕೆ ಮಾಡಿ (Nimma password ayke maadi)',
      promptEnglish: 'Choose your password'
    }
  ]

  // Speech synthesis for Kannada
  const speak = (text, lang = 'kn-IN') => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 0.9
      utterance.pitch = 1
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      
      window.speechSynthesis.speak(utterance)
    } else {
      toast.error('Speech synthesis not supported in this browser')
    }
  }

  // Speech recognition
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Speech recognition not supported in this browser')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.lang = 'kn-IN' // Kannada
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      const currentField = steps[currentStep].field
      
      setFormData(prev => ({
        ...prev,
        [currentField]: transcript
      }))
      
      toast.success(`Captured: ${transcript}`)
      
      // Move to next step
      if (currentStep < steps.length - 1) {
        setTimeout(() => {
          setCurrentStep(currentStep + 1)
        }, 1000)
      }
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      toast.error('Could not understand. Please try again.')
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  // Auto-speak prompt and start listening when step changes
  useEffect(() => {
    if (currentStep < steps.length) {
      // Speak the question
      setTimeout(() => {
        speak(steps[currentStep].promptKannada, 'kn-IN')
      }, 500)
      
      // Auto-start listening after speech completes (give 3 seconds for speech)
      setTimeout(() => {
        startListening()
      }, 3500)
    }
  }, [currentStep])

  const handleManualInput = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    const currentField = steps[currentStep].field
    if (!formData[currentField]) {
      toast.error('Please provide a value for this field')
      return
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Validate all fields
    const missingFields = steps.filter(step => !formData[step.field])
    if (missingFields.length > 0) {
      toast.error('Please complete all fields')
      return
    }

    // Add isRuralUser flag
    onComplete({ ...formData, isRuralUser: true })
  }

  const currentStepData = steps[currentStep]

  const handleNextStep = () => {
    const currentField = steps[currentStep].field
    if (!formData[currentField]) {
      toast.error('Please provide a value for this field')
      return
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <div className='bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          Voice Assisted Registration
        </h2>
        <p className='text-sm text-gray-600'>
          ಧ್ವನಿ ಸಹಾಯದೊಂದಿಗೆ ನೋಂದಣಿ (Voice Assisted Registration in Kannada)
        </p>
      </div>

      {/* Progress Bar */}
      <div className='mb-6'>
        <div className='flex justify-between text-xs text-gray-600 mb-2'>
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div 
            className='bg-green-600 h-2 rounded-full transition-all duration-300'
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Question */}
      <div className='bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6'>
        <div className='flex items-start gap-3 mb-4'>
          <Volume2 className='w-6 h-6 text-green-600 flex-shrink-0 mt-1' />
          <div>
            <p className='text-lg font-semibold text-gray-800 mb-1'>
              {currentStepData.promptKannada}
            </p>
            <p className='text-sm text-gray-600'>
              {currentStepData.promptEnglish}
            </p>
          </div>
        </div>

        {/* Voice Input Status */}
        <div className='flex gap-3 mb-4'>
          {isListening ? (
            <div className='flex-1 bg-red-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 animate-pulse'>
              <Mic className='w-5 h-5' />
              ಕೇಳುತ್ತಿದೆ... (Listening...)
            </div>
          ) : isSpeaking ? (
            <div className='flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2'>
              <Volume2 className='w-5 h-5 animate-pulse' />
              ಮಾತನಾಡುತ್ತಿದೆ... (Speaking...)
            </div>
          ) : (
            <div className='flex-1 bg-green-100 border-2 border-green-500 text-green-800 py-3 rounded-lg font-medium flex items-center justify-center gap-2'>
              <Mic className='w-5 h-5' />
              ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಕೇಳುತ್ತಿದೆ (Auto-listening enabled)
            </div>
          )}

          <button
            onClick={() => speak(currentStepData.promptKannada, 'kn-IN')}
            disabled={isSpeaking}
            className='flex items-center gap-2 px-4 py-3 border-2 border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 disabled:opacity-50'
          >
            <Volume2 className='w-5 h-5' />
            Repeat
          </button>
        </div>

        {/* Manual Input */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Or type manually:
          </label>
          <input
            type={currentStepData.field === 'password' ? 'password' : 'text'}
            value={formData[currentStepData.field]}
            onChange={(e) => handleManualInput(currentStepData.field, e.target.value)}
            className='w-full border-2 border-gray-300 rounded-lg p-3 focus:border-green-500 focus:outline-none'
            placeholder={currentStepData.promptEnglish}
          />
        </div>
      </div>

      {/* All Collected Data */}
      <div className='bg-gray-50 rounded-lg p-4 mb-6'>
        <h3 className='font-semibold text-gray-800 mb-3'>Collected Information:</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm'>
          {steps.map((step, idx) => (
            <div key={step.field} className={idx <= currentStep ? '' : 'opacity-40'}>
              <span className='text-gray-600'>{step.promptEnglish}:</span>
              <span className='ml-2 font-medium'>
                {formData[step.field] || '-'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className='flex gap-3'>
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className='px-6 py-2 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Previous
        </button>
        
        {currentStep < steps.length - 1 ? (
          <button
            onClick={handleNext}
            className='flex-1 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium'
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className='flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium'
          >
            Complete Registration
          </button>
        )}

        <button
          onClick={onCancel}
          className='px-6 py-2 border-2 border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50'
        >
          Cancel
        </button>
      </div>

      {/* Browser Compatibility Note */}
      <div className='mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3'>
        <p className='text-xs text-yellow-800'>
          <strong>Note:</strong> Voice recognition works best in Chrome browser. 
          Please allow microphone access when prompted.
        </p>
      </div>
    </div>
  )
}

export default VoiceAssistedRegistration
