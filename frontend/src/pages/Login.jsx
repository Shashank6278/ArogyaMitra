import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import VoiceAssistedRegistration from '../components/VoiceAssistedRegistration'
import FaceIDRegistration from '../components/FaceIDRegistration'

const Login = () => {

  const [state, setState] = useState('Sign Up')
  const [searchParams] = useSearchParams()
  const [showVoiceAssist, setShowVoiceAssist] = useState(false)
  const [showFaceID, setShowFaceID] = useState(false)
  const [faceIDMode, setFaceIDMode] = useState('register') // 'register' or 'login'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [aadhar, setAadhar] = useState('')
  const [faceData, setFaceData] = useState(null)
  const [isRuralUser, setIsRuralUser] = useState(false)
  const [uhid, setUhid] = useState('')
  const [hasUhid, setHasUhid] = useState(false)

  const navigate = useNavigate()
  const { backendUrl, token, setToken, userData } = useContext(AppContext)

  // Check URL params for user type
  useEffect(() => {
    const type = searchParams.get('type')
    if (type === 'rural') {
      setIsRuralUser(true)
    } else if (type === 'urban') {
      setIsRuralUser(false)
    }
  }, [searchParams])

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {
      // For rural users, require face data instead of email/password
      if (isRuralUser && !faceData) {
        toast.error('Please register your face ID')
        return
      }

      const { data } = await axios.post(backendUrl + '/api/user/register', { 
        name, 
        email: isRuralUser ? `${aadhar}@rural.arogyamitra.com` : email, // Auto-generate email for rural users
        password: isRuralUser ? aadhar : password, // Use aadhar as password for rural users
        isRuralUser, 
        aadhar,
        faceData: isRuralUser ? faceData : undefined,
        uhid: hasUhid ? uhid : undefined 
      })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        if (data.uhid) {
          toast.success(`Registration successful! Your UHID is: ${data.uhid}`, { autoClose: 10000 })
        }
      } else {
        toast.error(data.message)
      }

    } else {
      // Login
      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  const handleFaceIDCapture = async (capturedFaceData) => {
    if (faceIDMode === 'register') {
      // Store face data for registration
      setFaceData(capturedFaceData)
      setShowFaceID(false)
      toast.success('Face registered! Please complete the form.')
    } else {
      // Face login - need Aadhar number
      if (!aadhar || aadhar.length !== 12) {
        toast.error('Please enter your 12-digit Aadhar number first')
        setShowFaceID(false)
        return
      }

      try {
        const { data } = await axios.post(backendUrl + '/api/user/face-login', { 
          faceData: capturedFaceData,
          aadhar: aadhar
        })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Login successful!')
          setShowFaceID(false)
        } else {
          toast.error(data.message || 'Face not recognized. Please try again.')
        }
      } catch (error) {
        console.log(error)
        toast.error('Face login failed')
      }
    }
  }

  useEffect(() => {
    if (token && userData) {
      // Redirect based on user type
      if (userData.isRuralUser) {
        navigate('/rural-dashboard')
      } else {
        navigate('/')
      }
    }
  }, [token, userData])

  const handleVoiceRegistrationComplete = async (voiceData) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/register', { 
        name: voiceData.name,
        email: voiceData.email, 
        password: voiceData.password, 
        aadhar: voiceData.aadhar,
        isRuralUser: true,
        village: voiceData.village,
        district: voiceData.district,
        state: voiceData.state
      })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        if (data.uhid) {
          toast.success(`Registration successful! Your UHID is: ${data.uhid}`, { autoClose: 10000 })
        }
        setShowVoiceAssist(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Registration failed')
    }
  }

  // Show voice-assisted registration if requested
  if (showVoiceAssist && state === 'Sign Up' && isRuralUser) {
    return (
      <div className='min-h-[80vh] flex items-center py-8'>
        <VoiceAssistedRegistration 
          onComplete={handleVoiceRegistrationComplete}
          onCancel={() => setShowVoiceAssist(false)}
        />
      </div>
    )
  }

  // Show Face ID registration/login if requested
  if (showFaceID) {
    return (
      <div className='min-h-[80vh] flex items-center py-8'>
        <FaceIDRegistration 
          onCapture={handleFaceIDCapture}
          onCancel={() => setShowFaceID(false)}
          mode={faceIDMode}
        />
      </div>
    )
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
          {isRuralUser && <span className='text-green-600 text-base ml-2'>(Rural User)</span>}
        </p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} {isRuralUser ? 'to access health dashboard' : 'to book appointment'}</p>
        
        {/* Voice Assisted Registration Button for Rural Users */}
        {state === 'Sign Up' && isRuralUser && (
          <div className='w-full bg-green-50 border-2 border-green-300 rounded-lg p-4'>
            <p className='text-sm font-semibold text-green-800 mb-2'>
              Need help to register? / ನೋಂದಣಿಗೆ ಸಹಾಯ ಬೇಕೇ?
            </p>
            <button
              type='button'
              onClick={() => setShowVoiceAssist(true)}
              className='w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium flex items-center justify-center gap-2'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' />
              </svg>
              Voice Assisted Registration (Kannada)
            </button>
            <p className='text-xs text-green-700 mt-2 text-center'>
              ಧ್ವನಿ ಸಹಾಯದೊಂದಿಗೆ ನೋಂದಣಿ ಮಾಡಿ
            </p>
          </div>
        )}

        {state === 'Sign Up' && (
          <>
            <div className='w-full '>
              <p>Full Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
            </div>
            <div className='w-full'>
              <p>Aadhar Number (12 digits) *</p>
              <input 
                onChange={(e) => setAadhar(e.target.value)} 
                value={aadhar} 
                className='border border-[#DADADA] rounded w-full p-2 mt-1' 
                type="text" 
                maxLength="12"
                pattern="\d{12}"
                placeholder="Enter 12-digit Aadhar number"
                required
              />
              <p className='text-xs text-gray-500 mt-1'>Required for UHID generation</p>
            </div>
            <div className='w-full'>
              <div className='flex items-center gap-2 mb-2'>
                <input type='checkbox' id='hasUhid' checked={hasUhid} onChange={(e) => setHasUhid(e.target.checked)} />
                <label htmlFor='hasUhid' className='text-sm font-medium'>I have an existing UHID (Unique Health ID)</label>
              </div>
              {hasUhid ? (
                <div>
                  <p className='text-xs text-gray-600 mb-1'>Enter your 16-digit UHID</p>
                  <input 
                    onChange={(e) => setUhid(e.target.value)} 
                    value={uhid} 
                    className='border border-[#DADADA] rounded w-full p-2' 
                    type="text" 
                    maxLength="16"
                    pattern="[0-9]{12}(RH|UH)[0-9]{2}"
                    placeholder="e.g., 123456789012RH01"
                  />
                  <p className='text-xs text-gray-500 mt-1'>Format: 12-digit Aadhar + RH/UH + 2 digits</p>
                </div>
              ) : (
                <p className='text-xs text-gray-500'>A new 16-digit UHID will be generated: Aadhar(12) + {isRuralUser ? 'RH' : 'UH'}(2) + Random(2)</p>
              )}
            </div>

            {/* Face ID Registration for Rural Users */}
            {isRuralUser && (
              <div className='w-full bg-blue-50 border-2 border-blue-300 rounded-lg p-4'>
                <p className='text-sm font-semibold text-blue-800 mb-2'>
                  ಮುಖ ನೋಂದಣಿ (Face Registration) *
                </p>
                <button
                  type='button'
                  onClick={() => {
                    setFaceIDMode('register')
                    setShowFaceID(true)
                  }}
                  className={`w-full ${faceData ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded-md font-medium flex items-center justify-center gap-2`}
                >
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 13a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                  {faceData ? '✓ Face Registered' : 'Register Face ID'}
                </button>
                <p className='text-xs text-blue-700 mt-2 text-center'>
                  {faceData ? 'ಮುಖ ನೋಂದಾಯಿಸಲಾಗಿದೆ (Face Registered)' : 'ನಿಮ್ಮ ಮುಖವನ್ನು ನೋಂದಿಸಿ (Register your face)'}
                </p>
              </div>
            )}
          </>
        )}

        {/* Face ID Login for Rural Users */}
        {state === 'Login' && isRuralUser && (
          <>
            <div className='w-full'>
              <p>Aadhar Number (12 digits) *</p>
              <input 
                onChange={(e) => setAadhar(e.target.value)} 
                value={aadhar} 
                className='border border-[#DADADA] rounded w-full p-2 mt-1' 
                type="text" 
                maxLength="12"
                pattern="\d{12}"
                placeholder="Enter your 12-digit Aadhar number"
                required
              />
              <p className='text-xs text-gray-500 mt-1'>Required for Face ID login</p>
            </div>
            <div className='w-full bg-blue-50 border-2 border-blue-300 rounded-lg p-4'>
              <p className='text-sm font-semibold text-blue-800 mb-2'>
                ಮುಖ ಲಾಗಿನ್ (Face Login)
              </p>
              <button
                type='button'
                onClick={() => {
                  setFaceIDMode('login')
                  setShowFaceID(true)
                }}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium flex items-center justify-center gap-2'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 13a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Login with Face ID
              </button>
              <p className='text-xs text-blue-700 mt-2 text-center'>
                ಲಾಗಿನ್ ಮಾಡಲು ನಿಮ್ಮ ಮುಖವನ್ನು ತೋರಿಸಿ
              </p>
            </div>
          </>
        )}

        {/* Email and Password - Only for Urban Users */}
        {!isRuralUser && (
          <>
            <div className='w-full '>
              <p>Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
            </div>
            <div className='w-full '>
              <p>Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
            </div>
          </>
        )}
        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create account' : 'Login'}</button>
        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login