import React from 'react'
import { useNavigate } from 'react-router-dom'

const AuthGateway = () => {
  const navigate = useNavigate()
  return (
    <div className='min-h-[70vh] flex items-center'>
      <div className='max-w-md m-auto w-full bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4'>
        <p className='text-2xl font-semibold text-center'>Login or Sign Up</p>
        <p className='text-center text-gray-600'>Choose who you are</p>
        <button onClick={() => navigate('/login')} className='bg-primary text-white w-full py-3 rounded-md'>I am a User / Patient</button>
        <button onClick={() => navigate('/asha-register')} className='border border-primary text-primary w-full py-3 rounded-md'>I am an ASHA Worker</button>
      </div>
    </div>
  )
}

export default AuthGateway


