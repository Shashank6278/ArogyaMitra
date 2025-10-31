import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRuralUser, setIsRuralUser] = useState(false)
  const [uhid, setUhid] = useState('')
  const [hasUhid, setHasUhid] = useState(false)

  const navigate = useNavigate()
  const { backendUrl, token, setToken, userData } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {

      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password, isRuralUser, uhid: hasUhid ? uhid : undefined })

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

      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
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

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        <div className='w-full bg-blue-50 border border-blue-200 text-blue-700 rounded p-3 text-xs'>
          Looking for ASHA Registration/Login? <span onClick={() => navigate('/asha-login')} className='text-primary underline cursor-pointer'>Go to ASHA</span>
        </div>
        {state === 'Sign Up' && (
          <>
            <div className='w-full '>
              <p>Full Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
            </div>
            <div className='w-full flex items-center gap-2'>
              <input type='checkbox' id='ruralUser' checked={isRuralUser} onChange={(e) => setIsRuralUser(e.target.checked)} />
              <label htmlFor='ruralUser' className='text-sm'>I am a rural user (will get health dashboard)</label>
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
                    pattern="\d{16}"
                    placeholder="e.g., 1234567890123456"
                  />
                </div>
              ) : (
                <p className='text-xs text-gray-500'>A new 16-digit UHID will be generated automatically for you</p>
              )}
            </div>
          </>
        )}
        <div className='w-full '>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
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