import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const AshaLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, ashaToken, setAshaToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(backendUrl + '/api/asha/login', { email, password })
    if (data.success) {
      localStorage.setItem('ashaToken', data.token)
      setAshaToken(data.token)
      toast.success('Login successful!')
    } else {
      toast.error(data.message)
    }
  }

  useEffect(() => {
    if (ashaToken) {
      navigate('/asha-dashboard')
    }
  }, [ashaToken, navigate])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='max-w-md m-auto w-full bg-white shadow-md rounded-2xl p-8 flex flex-col gap-4'>
        <p className='text-2xl font-semibold'>ASHA Worker Login</p>
        <p className='text-sm text-gray-600'>Login to access rural users' health records</p>
        
        <div className='w-full'>
          <p className='font-medium'>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
          <p className='font-medium'>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        
        <button className='bg-primary text-white w-full py-3 my-2 rounded-md text-base font-medium'>Login</button>
        <p className='text-center'>New ASHA worker? <span onClick={() => navigate('/asha-register')} className='text-primary underline cursor-pointer'>Register here</span></p>
      </div>
    </form>
  )
}

export default AshaLogin
